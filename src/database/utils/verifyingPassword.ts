import crypto from 'node:crypto';
import { hashingPassword } from './hashingPassword';

export const verifyingPassword = async (
  password: string,
  salt: Buffer,
  hashPassword: Buffer
): Promise<boolean> => {
  const { hashedPassword } = await hashingPassword(password, salt);
  return crypto.timingSafeEqual(hashPassword, hashedPassword);
};
