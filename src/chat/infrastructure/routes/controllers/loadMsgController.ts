import { Request, Response } from 'express';
import { useCases } from '../../dependencyInjection';

export const loadMsgController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const oldMessages = await useCases.getMessages(id);
    res.status(200).json(oldMessages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
