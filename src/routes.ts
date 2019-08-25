import { Router, Request, Response } from "express";
import UserCtrl from "./controllers/UserCtrl";

const router = Router()
router.get('/', (req:Request, res: Response) => res.json("Welcome to app-wallet API"));

router.use('/users', UserCtrl);

export default router;