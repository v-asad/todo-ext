import axios from 'axios';

const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/users`;

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
