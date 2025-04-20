import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import Person from './person.js'; 

const Teacher = sequelize.define('teacher', {
    teacher_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        //  hereda el id de Person
    },
    specialty: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    academic_degree: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    tableName: 'teacher',
    timestamps: false,
});

// Definir la relación uno-a-uno con Person
Teacher.belongsTo(Person, { foreignKey: 'teacher_id', as: 'person', onDelete: 'CASCADE' });
Person.hasOne(Teacher, { foreignKey: 'teacher_id', as: 'teacher', onDelete: 'CASCADE' });

export default Teacher;