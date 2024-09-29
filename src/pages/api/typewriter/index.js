import { db } from '../../../../firebase';
import { isAuthenticated } from '@/app/libs/auth';
import admin from 'firebase-admin';

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

const postHandler = async (req, res) => {
    const { body } = req;

    // Validate the data coming in
    if (!body.title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        // Insert data into Firestore
        const postRef = await db.collection('typewriter').add({
            title: body.title,
            created: admin.firestore.Timestamp.fromDate(new Date()),
        });

        const post = { id: postRef.id }; // Include the generated ID
        return res.status(201).json({ message: 'Successfully created Typewriter Data', post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating post' });
    }
};

const getHandler = async (req, res) => {
    try {
        // Get all data from Firestore
        const snapshot = await db.collection('typewriter').get();
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error retrieving posts' });
    }
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        return withMiddleware(postHandler)(req, res);
    } else if (req.method === 'GET') {
        return getHandler(req, res);
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
