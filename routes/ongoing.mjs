import express from 'express'
import { 
    createNewOngoing, 
    getOngoing, 
    getFilteredOngoing, 
    deleteClass, 
    updateOngoingClass,
    deleteAllClass 
} from '../controllers/ongoing.mjs';

const router = express.Router()
// Create new ongoing class
router.post('/createNewOngoing', createNewOngoing);

// Get all ongoing classes
router.get('/allData', getOngoing);

// Get filtered ongoing classes, according to current time
router.get('/showOngoing', getFilteredOngoing);

// Delete an ongoing class by ID
router.delete('/deleteClass/:id', deleteClass);

// Update an ongoing class by ID
router.put('/updateOngoingClass/:id', updateOngoingClass);

// Delete all ongoing classes
router.delete('/deleteAllClass', deleteAllClass);

export default router;
