import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStudyInfo 
} from '../controllers/studentController.js';

const router = express.Router();


router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

router.get('/:id/study', getStudentStudyInfo); 
export default router;

