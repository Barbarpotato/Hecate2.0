// pages/api/aboutme/index.js
import { db } from "../../../../firebase";// Adjust the path to your Firebase Admin setup

const getHandler = async (req, res) => {
    try {
        // Get all data from Firestore
        const snapshot = await db.collection('aboutme').get();
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

const handler = async (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
