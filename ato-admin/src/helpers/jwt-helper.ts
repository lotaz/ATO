import { jwtDecode } from 'jwt-decode';
import { Role, UserInfo } from '../types';

// Define the structure of your token payload (this is based on your example)
interface JwtPayload {
  aud: string; // Audience, should be a URL or identifier of the server
  exp: number; // Expiration time (epoch timestamp)
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string; // Optional, role claim
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string; // Optional, name claim
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string; // Optional, name identifier claim
  iss: string; // Issuer, usually a URL
  jti: string; // JWT ID, unique identifier for the token
}

// Function to decrypt JWT and store the user info
export const decryptJWT = (token: string): UserInfo | null => {
  try {
    // Decode the JWT (we're not verifying the signature, just extracting the payload)
    const decoded: JwtPayload = jwtDecode(token);

    // Check if the token is expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      throw new Error('JWT token is expired');
    }

    const user: UserInfo = {
      name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as Role
    };

    // Store the user information in session storage

    console.log('User info stored in session:', user);

    return user;
  } catch (error) {
    return null;
  }
};

// Example usage with your JWT token
