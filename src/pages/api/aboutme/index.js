import prisma from "@/app/libs/prisma";

const getHandler = async (req, res) => {
    try {
        // Get all data from db
        const posts = await prisma.Aboutme.findMany();
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