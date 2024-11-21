import { Router } from "express";
import {update, create, getId, getAll, deleteP} from "../controllers/producto.controller.js";
import {validate} from  "../middlewares/validator.middleware.js";
import { createProductValidator, updateProductValidator, getProductByNameValidator } from "../validators/producto.validator.js";
import {verifyToken} from "../middlewares/token.middleware.js";

const router = Router();

router.get("/All", getAll);
router.get("/:id", getId);
router.post("/", validate(createProductValidator), create);
router.put("/:id", update);
router.delete("/:id", deleteP);

export default router;