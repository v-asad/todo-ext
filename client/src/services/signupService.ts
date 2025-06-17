import axios from 'axios';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
}

const API_URL = 'http://localhost:8080';

export const signupService = {
  signup: async (data: SignupData): Promise<SignupResponse> => {
    const response = await axios.post(`${API_URL}/users/signup`, {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    });
    return response.data;
  },
};
