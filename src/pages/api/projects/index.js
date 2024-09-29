// pages/api/projects/index.js
import { db } from '../../../../firebase';
import { isAuthenticated } from '@/app/libs/auth';

const withMiddleware = (handler) => async (req, res) => {
    try {
        const authenticated = await isAuthenticated(req);
        if (!authenticated) {
            return res.status(401).json({ success: false, message: 'Authentication failed' });
        }
        // Call the handler if authenticated
        return handler(req, res);
    } catch (error) {
        console.error('Error in middleware:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getHandler = async (req, res) => {
    try {
        // Get all data from Firestore
        const snapshot = await db.collection('projects').get();
        const posts = snapshot.docs.map(doc => ({
            id: doc.id,      // Include the document ID
            ...doc.data()    // Spread the document data
        }));
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error retrieving posts' });
    }
};

const postHandler = async (req, res) => {
    const { body } = req;

    // Validate the data coming in
    if (!body.heading) {
        return res.status(400).json({ message: 'heading is required' });
    }
    if (!body.text) {
        return res.status(400).json({ message: 'text is required' });
    }
    if (!body.imageUrl) {
        return res.status(400).json({ message: 'imageUrl is required' });
    }
    if (!body.skillsUrl) {
        return res.status(400).json({ message: 'skillsUrl is required' });
    }
    try {
        // Insert data into Firestore
        const postRef = await db.collection('projects').add({
            heading: body.heading,
            text: body.text,
            imageUrl: body.imageUrl,
            skillsUrl: body.skillsUrl,
            htmlContent: "",
            htmlImage: "",
        });

        const post = { id: postRef.id, ...body }; // Include the document ID in the response
        return res.status(201).json({ message: 'Successfully created Project Data', post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating Project Data' });
    }
};

const handler = async (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    } else if (req.method === 'POST') {
        return withMiddleware(postHandler)(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
