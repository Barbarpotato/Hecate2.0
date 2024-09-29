const postHandler = async (req, res) => {
    const { username, password } = req.body;

    // Validate the data coming in
    if (!username || !password) {
        return res.status(400).json({ message: 'Invalid Request Body.' });
    }

    try {
        // calling coretify api
        const body = {
            username,
            password,
            app_token: process.env.APP_TOKEN,
        };

        const response = await fetch('https://coretify.vercel.app/login/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        // Check if the response is successful
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ message: errorData.message || 'Login failed' });
        }

        const data = await response.json();

        return res.status(200).json({ message: 'Login Successful', token: data?.token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating Project Data' });
    }
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        return postHandler(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
