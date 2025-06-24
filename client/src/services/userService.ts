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

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignupResponse = {
  success: boolean;
  message: string;
};

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  try {
    const userPayload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };

    const response = await axios.post(`${END_POINT}/signup`, userPayload, config);
    return {
      success: true,
      message: response.data?.message || 'Signup successful!',
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        return {
          success: false,
          message:
            'This email is already registered. Please use a different email or try logging in.',
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Something went wrong. Please try again.',
      };
    }

    return {
      success: false,
      message: 'An unexpected error occurred.',
    };
  }
};

export const verifyToken = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await axios.get(`${END_POINT}/verify-token`, config);

    return res.data?.valid === true;
  } catch (error) {
    console.error('verification error :', error);
    return false;
  }
};
