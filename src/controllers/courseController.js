// src/controllers/courseController.js
import Course from '../models/course.js';
import Teacher from '../models/teacher.js';
import Person from '../models/person.js';

// Obtener todos los cursos con su profesor y si está enseñando
export async function getAllCourses(req, res) {
    try {
        const allCourses = await Course.findAll({
            include: [{
                model: Teacher,
                as: 'teacher',
                include: [{
                    model: Person,
                    as: 'person'
                }]
            }]
        });

        const coursesWithTeachingStatus = allCourses.map(course => {
            const courseData = course.get({ plain: true });
            courseData.isTeaching = !!course.teacher_id;
            return courseData;
        });

        res.json(coursesWithTeachingStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un curso por ID con su profesor y si está enseñando
export async function getCourseById(req, res) {
    try {
        const course = await Course.findByPk(req.params.id, {
            include: [{
                model: Teacher,
                as: 'teacher',
                include: [{
                    model: Person,
                    as: 'person'
                }]
            }]
        });
        if (course) {
            const courseData = course.get({ plain: true });
            courseData.isTeaching = !!course.teacher_id;
            res.json(courseData);
        } else {
            res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo curso
export async function createCourse(req, res) {
    try {
        const { name, teacher_id, description } = req.body;

        if (teacher_id) {
            const teacherExists = await Teacher.findByPk(teacher_id);
            if (!teacherExists) {
                return res.status(400).json({ error: 'No existe un profesor con el teacher_id proporcionado.' });
            }
        }

        const newCourse = await Course.create({ name, teacher_id, description });
        const courseWithTeacher = await Course.findByPk(newCourse.course_id, {
            include: [{
                model: Teacher,
                as: 'teacher',
                include: [{
                    model: Person,
                    as: 'person'
                }]
            }]
        });
        res.status(201).json({ ...newCourse.get({ plain: true }), isTeaching: !!newCourse.teacher_id, teacher: courseWithTeacher.teacher });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un curso
export async function updateCourse(req, res) {
    try {
        const { name, teacher_id, description } = req.body;

        if (teacher_id) {
            const teacherExists = await Teacher.findByPk(teacher_id);
            if (!teacherExists) {
                return res.status(400).json({ error: 'No existe un profesor con el teacher_id proporcionado.' });
            }
        }

        const updatedCourse = await Course.update(
            { name, teacher_id, description },
            { where: { course_id: req.params.id } }
        );

        if (updatedCourse[0]) {
            const courseWithTeacher = await Course.findByPk(req.params.id, {
                include: [{
                    model: Teacher,
                    as: 'teacher',
                    include: [{
                        model: Person,
                        as: 'person'
                    }]
                }]
            });
            res.json({ ...courseWithTeacher.get({ plain: true }), isTeaching: !!courseWithTeacher.teacher_id, teacher: courseWithTeacher.teacher });
        } else {
            res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un curso
export async function deleteCourse(req, res) {
    try {
        const deletedCourse = await Course.destroy({
            where: { course_id: req.params.id },
        });
        if (deletedCourse) {
            res.json({ message: 'Curso eliminado' });
        } else {
            res.status(404).json({ message: 'Curso no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}