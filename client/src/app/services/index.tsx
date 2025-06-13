import axios, { AxiosError } from 'axios';

const END_POINT = 'http://localhost:8080/users';

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
  } catch (error: unknown) {
    const err = error as AxiosError<AxiosError>;
    throw new Error(err.response?.data?.message || 'Login failed: email or password incorrect.');
  }
};
