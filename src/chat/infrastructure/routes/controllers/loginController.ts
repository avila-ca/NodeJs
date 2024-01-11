import { Request, Response } from 'express';
import { useCases } from '../../dependencyInjection';
import { log } from 'console';

export const loginController = async (req: Request, res: Response) => {
  const { userName, userPassword } = req.body;
  try {
    const user = await useCases.postLoginUser({
      userName: userName,
      userPassword: userPassword
    });
    if (!user) return res.status(400).json('Invalid user name or password');

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
