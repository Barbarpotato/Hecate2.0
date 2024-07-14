import prisma from "@/app/libs/prisma";
import { isAuthenticated } from '@/app/libs/auth';

const withMiddleware = (handler) => async (req, res) => {
    if (!isAuthenticated(req)) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    return handler(req, res);
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { body } = req;

        // Validate the data coming in
        if (!body.title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        try {
            // Insert data into db
            const post = await prisma.typewriter.create({
                data: {
                    title: body.title,
                    created: new Date(),
                },
            });
            return res.status(201).json({ message: 'Successfully created Typewriter Data', post });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error creating post' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default withMiddleware(handler);
