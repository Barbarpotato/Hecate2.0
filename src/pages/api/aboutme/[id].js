// pages/api/aboutme/[id].jsx
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

    if (req.method === 'PUT') {
        try {
            // Extract data from the request body
            const { content } = req.body;

            if (!content) {
                return res.status(400).json({ error: 'Content is required' });
            }

            // Perform the update
            const typewriter = await prisma.aboutme.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    content, // Include the data to be updated
                },
            });

            res.status(200).json(typewriter);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update Aboutme entry' });
        }
    } else {
        res.setHeader('Allow', ['PUT']); // Adjust allowed methods
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withMiddleware(handler);