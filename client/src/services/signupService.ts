import axios from 'axios';

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

const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
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
