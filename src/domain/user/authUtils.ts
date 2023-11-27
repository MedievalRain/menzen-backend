import * as bcrypt from "bcrypt";

export const generateHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
export const validatePassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};
