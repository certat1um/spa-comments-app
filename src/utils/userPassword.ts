import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

export const hashPass = (pass: string): Promise<string> => {
  return bcrypt.hash(pass, 2);
};

export const checkPass = (
  plain_pass: string,
  crypted_pass: string,
): Promise<boolean> => {
  return bcrypt.compare(plain_pass, crypted_pass);
};
