import express from "express";
import {createpublisher} from '../controllers/publisher.js'
import  {getPublishers}  from '../controllers/publisher.js';
import { deleteUser } from "../controllers/publisher.js";
const router=express.Router();

router.get("/",getPublishers);
router.post("/",createpublisher);
router.delete("/:id",deleteUser);

export default router;