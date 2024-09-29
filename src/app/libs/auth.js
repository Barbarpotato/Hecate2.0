// lib/auth.js

// Example function to check if request is authenticated
export async function isAuthenticated(request) {
    // Get the authorization header
    const token = request.headers.authorization || request.headers.Authorization;

    const response = await fetch("https://coretify.vercel.app/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token })
    });

    if (!response.ok) {
        return false
    }

    return true
}
