import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';
import Person from './person.js';


const Student = sequelize.define('student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        //  hereda el id de Person
    },
    course: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    tableName: 'student',
    timestamps: false, 
});


Student.belongsTo(Person, { foreignKey: 'student_id', as: 'person', onDelete: 'CASCADE' });
Person.hasOne(Student, { foreignKey: 'student_id', as: 'student', onDelete: 'CASCADE' });

export default Student;
