import axios from 'axios';

const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/users`;

interface LoginPayLoad {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const loginService = async (payload: LoginPayLoad): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${END_POINT}/login`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as { message?: string })?.message;
      throw new Error(message || 'Login failed: email or password incorrect.');
    }
    throw new Error('Unexpected error occurred while logging in.');
  }
};
