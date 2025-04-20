
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import {
    getAllPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson,
    loginPerson,
 
} from '../controllers/personController.js';

const router = express.Router();


router.post('/login', loginPerson); 

// Rutas protegidas
router.get('/', authenticateToken, getAllPersons); 
router.get('/:id', authenticateToken, getPersonById); 
router.post('/', createPerson); 
router.put('/:id', authenticateToken, updatePerson); 
router.delete('/:id', authenticateToken, deletePerson); 


export default router;