
import Person from '../models/person.js';
import Student from '../models/student.js';
import Course from '../models/course.js'; 
import StudentCourse from '../models/student_course.js'; 


// todos los estudiantes
export async function getAllStudents(req, res) {
    try {
        const allStudents = await Student.findAll({
            include: [{
                model: Person,
                as: 'person'
            }]
        });
        res.json(allStudents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//  estudiante por ID
export async function getStudentById(req, res) {
    try {
        const student = await Student.findByPk(req.params.id, {
            include: [{
                model: Person,
                as: 'person'
            }]
        });
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear estudiante
export async function createStudent(req, res) {
    try {
        const { person_id, course, study } = req.body;

        const person = await Person.findByPk(person_id);
        if (!person) {
            return res.status(400).json({ error: 'No existe una persona con el ID proporcionado' });
        }

        const newStudent = await Student.create({
            student_id: person_id,
            course,
            study
        });

        const studentWithPerson = await Student.findByPk(newStudent.student_id, {
            include: [{
                model: Person,
                as: 'person'
            }]
        });

        res.status(201).json(studentWithPerson);
    } catch (error) {
        console.error("Error al crear estudiante:", error);
        res.status(500).json({ error: error.message });
    }
}

// Actualizar
export async function updateStudent(req, res) {
    try {
        const { course, study } = req.body;
        const updatedStudent = await Student.update(
            { course, study },
            { where: { student_id: req.params.id } }
        );
        if (updatedStudent[0]) {
            const studentWithPerson = await Student.findByPk(req.params.id, {
                include: [{
                    model: Person,
                    as: 'person'
                }]
            });
            res.json(studentWithPerson);
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar 
export async function deleteStudent(req, res) {
    try {
        const deletedStudent = await Student.destroy({
            where: { student_id: req.params.id }
        });
        if (deletedStudent) {
            res.json({ message: 'Estudiante eliminado' });
        } else {
            res.status(404).json({ message: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// traer información  de un estudiante
export async function getStudentStudyInfo(req, res) {
    try {
        const studentId = req.params.student_id;
        const student = await Student.findByPk(studentId, {
            include: [{
                model: Person,
                as: 'person'
            }]
        });

        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

      
        const studentCourses = await StudentCourse.findAll({
            where: { student_id: studentId },
            include: [{
                model: Course,
                as: 'course'
            }]
        });

        const courses = studentCourses.map(sc => ({
            id: sc.course.course_id,
            name: sc.course.name
        }));


       if (courses.length > 0) {
            res.json({
                message: `El estudiante con ID ${student.student_id} está estudiando los siguientes cursos: ${courses.map(c => c.name).join(', ')}`,
                courses: courses
            });
        } else {
             res.json({ message: `El estudiante con ID ${student.student_id} no está asociado a ningún curso.`, courses: [] });
        }

    } catch (error) {
        console.error("Error en getStudentStudyInfo:", error);
        res.status(500).json({ error: error.message });
    }
}



