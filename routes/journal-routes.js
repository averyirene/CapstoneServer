import express from 'express';
import * as journalController from '../controllers/journal-controller.js';
import { authenticateToken } from '../middleware/authenticateToken.js'; 
const router = express.Router();

router.post('/', authenticateToken, journalController.addJournalEntry);
router.get('/', authenticateToken, journalController.getAllJournalEntries);
router.get('/:id', authenticateToken, journalController.getSingleEntry);

export default router;
