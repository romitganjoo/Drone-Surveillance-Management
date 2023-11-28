import express from "express";
import { deleteDronesById, addDrone, getDronesByOwner, getDronesByType, getAlertsByOwner , addAlert} from "../controllers/droneController.js";

const router = express.Router();

router.post('/add', addDrone);
router.post('/addAlert', addAlert);
router.get('/getDronesByType', getDronesByType);
router.get('/getDronesByOwner', getDronesByOwner);
router.delete('/drone_details', deleteDronesById);
router.get('/getAlertsByOwner', getAlertsByOwner);

export default router;