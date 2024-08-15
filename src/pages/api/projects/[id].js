// pages/api/typewriter/[id].jsx
import prisma from "@/app/libs/prisma";
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
            const typewriter = await prisma.project.delete({
                where: {
                    id: parseInt(id),
                },
            });
            res.status(200).json(typewriter);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete project' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { htmlContent, htmlImage } = req.body;

            if (!htmlContent || !htmlImage) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const projectDetail = await prisma.project.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    htmlContent: htmlContent,
                    htmlImage: htmlImage
                },
            });

            res.status(200).json(projectDetail);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update Project entry' });
        }
    }
    else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withMiddleware(handler);
