import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const StudentCourse = sequelize.define('student_course', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'student', 
            key: 'student_id',
        },
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'course', 
            key: 'course_id',
        },
    },
    attendance: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'student_course',
    timestamps: false,
});

export default StudentCourse;
