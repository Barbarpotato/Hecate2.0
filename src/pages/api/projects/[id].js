// pages/api/typewriter/[id].js
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
            await db.collection('projects').doc(id).delete();
            res.status(200).json({ message: 'Successfully deleted project' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete project' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { htmlContent, htmlImage } = req.body;

            if (!htmlContent || !htmlImage) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const projectRef = db.collection('projects').doc(id);
            await projectRef.update({
                htmlContent: htmlContent,
                htmlImage: htmlImage,
            });

            const updatedProject = await projectRef.get();
            res.status(200).json({ id: updatedProject.id, ...updatedProject.data() });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update Project entry' });
        }
    } else {
        res.setHeader('Allow', ['DELETE', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default withMiddleware(handler);
