// lib/auth.js

// Example function to check if request is authenticated
export function isAuthenticated(request) {
    // Get the authorization header
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Basic ')) {
        // Extract the Base64 encoded part of the header
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        // Validate username and password
        if (username === process.env.AUTH_USERNAME && password === process.env.AUTH_PASSWORD) {
            return true;
        }
    }

    return false
}
