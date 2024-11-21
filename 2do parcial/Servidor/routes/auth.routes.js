import { Router } from "express";
import {create, deleteU, login, update} from "../controllers/auth.controller.js";

const router = Router();

router.post("/",  login );
router.delete("/", deleteU);
router.put("/", update);
router.post("/create",  create);


export default router;