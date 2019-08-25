import { Router, Request, Response } from "express";

import AuthService from "../services/AuthService";

const router = Router();

router.post('/login', async (req:Request, res:Response) => {
  try {
    const body = req.body;
    
    const token = await AuthService.loginWithUsernameAndPassword(body);

    return res.json(token);
  } catch (error) {
    return res.json(error);
  }
});

export default router;