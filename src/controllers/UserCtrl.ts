import { Router, Request, Response } from "express";

import expect from "expect";

import UserService from "../services/UserService";

const router = Router();

router.get('/', (req:Request, res:Response) => {
  res.json('GET /users');
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