import { Router, Request, Response } from "express";

import UserService from "../services/UserService";

const router = Router();

router.get('/', async (req:Request, res:Response) => {
  const users = await UserService.getAllUsers();
  return res.json(users);
});

router.post('/', async (req:Request, res:Response) => {
  try {
    const body = req.body;
    
    const user = await UserService.createUserWithEmailAndPassword(body);
  
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});

export default router;