import axios from 'axios';

const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export const verifyToken = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await axios.get(`${END_POINT}/verify-token`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data?.valid === true;
  } catch (error) {
    console.error('verification error :', error);
    return false;
  }
};
