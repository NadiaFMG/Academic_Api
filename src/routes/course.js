
import express from 'express';
//import { authenticateToken } from '../middlewares/authMiddleware.js'; 
import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} from '../controllers/courseController.js';

const router = express.Router();

// Rutas públicas
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

router.post('/', /* authenticateToken, */ createCourse);
router.put('/:id', /* authenticateToken, */ updateCourse);
router.delete('/:id', /* authenticateToken, */ deleteCourse);

export default router;