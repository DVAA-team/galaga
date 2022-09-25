import crypto from 'node:crypto';

type THashingPassword = {
  hashedPassword: Buffer;
  salt: Buffer;
};

export const hashingPassword = (
  password: string,
  salt?: Buffer
): Promise<THashingPassword> =>
  new Promise((resolve, reject) => {
    let localSalt: Buffer;
    if (!salt) {
      localSalt = crypto.randomBytes(16);
    } else {
      localSalt = salt;
    }
    crypto.pbkdf2(
      password,
      localSalt,
      310000,
      32,
      'sha256',
      (err, hashedPassword) => {
        if (err) {
          return reject(err);
        }
        return resolve({ hashedPassword, salt: localSalt });
      }
    );
  });
