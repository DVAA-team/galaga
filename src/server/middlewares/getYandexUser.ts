import { RequestHandler } from 'express';
import axios from 'axios';

const getYandexUser: RequestHandler = async (req, res, next) => {
  const cookie = Object.entries(req.cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  try {
    const { data } = await axios.get(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        withCredentials: true,
        headers: {
          cookie,
        },
      }
    );

    res.locals.user = data;
  } catch (error) {
    res.locals.user = null;
  } finally {
    next();
  }
};

export default getYandexUser;
