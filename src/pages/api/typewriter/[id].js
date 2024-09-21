import { db } from '../../../../firebase';
import { isAuthenticated } from '@/app/libs/auth';

const withMiddleware = (handler) => async (req, res) => {
    if (!isAuthenticated(req)) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    return handler(req, res);
};

const handler = async (req, res) => {

    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const typewriterRef = db.collection('typewriter').doc(id); // Get reference to the document

            const doc = await typewriterRef.get();
            if (!doc.exists) {
                return res.status(404).json({ error: 'Typewriter not found' });
            }

            await typewriterRef.delete(); // Delete the document
            res.status(200).json({ message: 'Typewriter deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete typewriter' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default withMiddleware(handler);
