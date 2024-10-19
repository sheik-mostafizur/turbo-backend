import * as bcrypt from 'bcrypt';

export const hashPassword = async (
  password: string,
  saltRounds: number = 10,
): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};
