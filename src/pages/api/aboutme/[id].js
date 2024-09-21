import { db } from '../../../../firebase';
import { isAuthenticated } from '@/app/libs/auth';

const withMiddleware = (handler) => async (req, res) => {
    if (!isAuthenticated(req)) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    return handler(req, res);
};

const handler = async (req, res) => {
    const { id } = req.query; // Get the document ID from the query parameters

    if (req.method === 'PUT') {
        try {
            // Extract data from the request body
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({ error: 'Content is required' });
            }

            // Perform the update in Firestore
            const typewriterRef = db.collection('aboutme').doc(id); // Reference to the document
            const doc = await typewriterRef.get();

            if (!doc.exists) {
                return res.status(404).json({ error: 'No such document' });
            }

            // Update the document
            await typewriterRef.update({
                content, // Include the data to be updated
            });

            const updatedDoc = await typewriterRef.get(); // Get the updated document
            res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() }); // Return the updated document
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update About Me entry' });
        }
    } else {
        res.setHeader('Allow', ['PUT']); // Adjust allowed methods
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withMiddleware(handler);
