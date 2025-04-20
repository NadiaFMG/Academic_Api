import Student from '../models/student.js';
import Course from '../models/course.js';
import StudentCourse from '../models/student_course.js';


export async function getAllStudentCourses(req, res) {
    try {
        const studentCourses = await StudentCourse.findAll();
        res.json(studentCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getStudentCourseById(req, res) {
    try {
        const studentCourse = await StudentCourse.findByPk(req.params.id);
        if (studentCourse) {
            res.json(studentCourse);
        } else {
            res.status(404).json({ message: 'Registro estudiante-curso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createStudentCourse(req, res) {
    try {
        const { student_id, course_id, attendance } = req.body;

        // Verificar si el estudiante y el curso existen
        const studentExists = await Student.findByPk(student_id);
        const courseExists = await Course.findByPk(course_id);

        if (!studentExists) {
            return res.status(400).json({ error: 'No existe un estudiante con el ID proporcionado' });
        }
        if (!courseExists) {
            return res.status(400).json({ error: 'No existe un curso con el ID proporcionado' });
        }

        const newStudentCourse = await StudentCourse.create({ student_id, course_id, attendance });
        res.status(201).json(newStudentCourse);
    } catch (error) {
        console.error("Error al crear registro estudiante-curso:", error);
        res.status(500).json({ error: error.message });
    }
}


export async function updateStudentCourse(req, res) {
    try {
        const { student_id, course_id, attendance } = req.body;

        // Verificar si el estudiante y el curso existen
        const studentExists = await Student.findByPk(student_id);
        const courseExists = await Course.findByPk(course_id);

        if (!studentExists) {
            return res.status(400).json({ error: 'No existe un estudiante con el ID proporcionado' });
        }
        if (!courseExists) {
            return res.status(400).json({ error: 'No existe un curso con el ID proporcionado' });
        }

        const updatedStudentCourse = await StudentCourse.update(
            { student_id, course_id, attendance },
            { where: { id: req.params.id } }
        );
        if (updatedStudentCourse[0]) {
            const updatedRecord = await StudentCourse.findByPk(req.params.id);
            res.json(updatedRecord);
        } else {
            res.status(404).json({ message: 'Registro estudiante-curso no encontrado' });
        }
    } catch (error) {
        console.error("Error al actualizar registro estudiante-curso:", error);
        res.status(500).json({ error: error.message });
    }
}


export async function deleteStudentCourse(req, res) {
    try {
        const deletedStudentCourse = await StudentCourse.destroy({
            where: { id: req.params.id }
        });
        if (deletedStudentCourse) {
            res.json({ message: 'Registro estudiante-curso eliminado' });
        } else {
            res.status(404).json({ message: 'Registro estudiante-curso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
