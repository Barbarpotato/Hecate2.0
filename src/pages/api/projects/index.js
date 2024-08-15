import prisma from "@/app/libs/prisma";
import { isAuthenticated } from '@/app/libs/auth';

const withMiddleware = (handler) => async (req, res) => {
    if (!isAuthenticated(req)) {
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
    return handler(req, res);
};

const getHandler = async (req, res) => {
    try {
        // Get all data from db
        const posts = await prisma.project.findMany();
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
        // Insert data into db
        const post = await prisma.project.create({
            data: {
                heading: body.heading,
                text: body.text,
                imageUrl: body.imageUrl,
                skillsUrl: body.skillsUrl,
                htmlContent: body.htmlContent,
                htmlImage: body.htmlImage
            },
        });
        return res.status(201).json({ message: 'Successfully created Project Data', post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating Project Data' });
    }
};


const handler = async (req, res) => {
    if (req.method === 'GET') {
        return getHandler(req, res);
    }
    else if (req.method === 'POST') {
        return withMiddleware(postHandler)(req, res);
    }
    else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;