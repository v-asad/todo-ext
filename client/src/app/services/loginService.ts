import axios from 'axios';

const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

type LoginPayLoad = {
  email: string;
  password: string;
};

type LoginResult = { token: string } | { error: string };

export const login = async (payload: LoginPayLoad): Promise<LoginResult> => {
  try {
    const response = await axios.post(`${END_POINT}/login`, payload, config);

    const { token } = response.data;

    localStorage.setItem('token', token);

    return { token };
  } catch (error) {
    let message = 'Unexpected error occurred while logging in.';

    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: string };
      message = data?.message || 'Login failed: email or password incorrect.';
    }

    console.error('Login error:', error);
    return { error: message };
  }
};
