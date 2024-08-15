import express from 'express';
import * as symptomController from '../controllers/symptom-controller.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/', authenticateToken, symptomController.addSymptomEntry);
router.get('/', authenticateToken, symptomController.getSymptomEntries);

export default router;
