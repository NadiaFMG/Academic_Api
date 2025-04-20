import express from 'express';
import { getAllStudentCourses, getStudentCourseById, createStudentCourse, updateStudentCourse, deleteStudentCourse } from '../controllers/student_courseController.js';

const router = express.Router();

router.get('/', getAllStudentCourses);       
router.get('/:id', getStudentCourseById);    
router.post('/', createStudentCourse);         
router.put('/:id', updateStudentCourse);       
router.delete('/:id', deleteStudentCourse);    
export default router;
