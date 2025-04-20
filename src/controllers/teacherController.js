
import Teacher from '../models/teacher.js';
import Person from '../models/person.js';
import Student from '../models/student.js';

//todos los docentes
export async function getAllTeachers(req, res) {
    try {
        const allTeachers = await Teacher.findAll({
            include: [{
                model: Person,
                as: 'person'
            }]
        });
        res.json(allTeachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//docente por ID
export async function getTeacherById(req, res) {
    try {
        const teacher = await Teacher.findByPk(req.params.id, {
            include: [{
                model: Person,
                as: 'person'
            }]
        });
        if (teacher) {
            res.json(teacher);
        } else {
            res.status(404).json({ message: 'Docente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear docente
export async function createTeacher(req, res) {
    try {
        const { teacher_id, specialty, academic_degree } = req.body;

        if (!teacher_id) {
            return res.status(400).json({ error: "El campo teacher_id es requerido para crear un docente." });
        }

        const personExists = await Person.findByPk(teacher_id);
        if (!personExists) {
            return res.status(400).json({ error: "No existe una persona con el teacher_id proporcionado." });
        }

        // Verificar si existe como estudiante
        const existingStudent = await Student.findByPk(teacher_id);
        if (existingStudent) {
            return res.status(400).json({ error: "La persona ya existe como estudiante y no puede ser profesor." });
        }

        const newTeacher = await Teacher.create({ teacher_id, specialty, academic_degree });

        const teacherWithPerson = await Teacher.findByPk(newTeacher.teacher_id, {
            include: [{
                model: Person,
                as: 'person'
            }]
        });

        res.status(201).json(teacherWithPerson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar docente
export async function updateTeacher(req, res) {
    try {
        const { specialty, academic_degree } = req.body;
        const updatedTeacher = await Teacher.update(
            { specialty, academic_degree },
            { where: { teacher_id: req.params.id } }
        );
        if (updatedTeacher[0]) {
            const teacherWithPerson = await Teacher.findByPk(req.params.id, {
                include: [{
                    model: Person,
                    as: 'person'
                }]
            });
            res.json(teacherWithPerson);
        } else {
            res.status(404).json({ message: 'Docente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar docente
export async function deleteTeacher(req, res) {
    try {
        const deletedTeacher = await Teacher.destroy({
            where: { teacher_id: req.params.id },
        });
        if (deletedTeacher) {
            res.json({ message: 'Docente eliminado' });
        } else {
            res.status(404).json({ message: 'Docente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}