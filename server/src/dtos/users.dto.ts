/**
 * @example
 * {
 *   "email": "user@example.com",
 *   "password": "yourpassword"
 * }
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * @example
 * {
 *   "email": "user@example.com",
 *   "password": "yourpassword",
 *   "name": "John Doe"
 * }
 */
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  // Add any additional signup fields here
  [key: string]: any;
}
