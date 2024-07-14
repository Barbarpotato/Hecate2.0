import { isAuthenticated } from '@/app/libs/auth';

export function middleware(request) {
    // Call our authentication function to check the request
    if (isAuthenticated(request) == false) {
        // Respond with JSON indicating an error message
        return false;
    }
    return true;
}
