import prisma from "@/app/libs/prisma";
import { isAuthenticated } from '@/app/libs/auth';

const withMiddleware = (handler) => async (req, res) => {
    if (!isAuthenticated(req)) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    return handler(req, res);
};

const postHandler = async (req, res) => {
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
};

const getHandler = async (req, res) => {
    try {
        // Get all data from db
        const posts = await prisma.typewriter.findMany();
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
