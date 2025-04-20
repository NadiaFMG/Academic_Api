import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import Teacher from './teacher.js';
import Student from './student.js';
import StudentCourse from './student_course.js';

const Course = sequelize.define('course', {
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'teacher',
            key: 'teacher_id',
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'course',
    timestamps: false,
});

Course.belongsTo(Teacher, { foreignKey: 'teacher_id', as: 'teacher' });

export default Course;
