import { db } from '../../../../firebase';

const postHandler = async (req, res) => {
    const { name, email, message } = req.body;

    // Validate the data coming in
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Invalid Request Body.' });
    }

    try {

        // insert form data to firebase
        const postRef = await db.collection('contact-us').add({
            name: name,
            email: email,
            message: message
        });

        return res.status(201).json({ message: 'Successfully sent message!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error sent message!' });
    }
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        return postHandler(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;