// hashPasswords.js
import bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import Person from './src/models/person.js'; // Importa tu modelo Person

// Configura la conexión a tu base de datos (debería ser la misma que usas en tu aplicación)
const sequelize = new Sequelize('academic_bd', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // Asegúrate de que el puerto sea correcto
});

async function hashPasswords() {
    try {
        // Conéctate a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        // Obtén todos las personas
        const allPersons = await Person.findAll();

        // Hashea las contraseñas y actualiza la base de datos
        for (const person of allPersons) {
            if (person.password) { // Asegúrate de que la persona tenga una contraseña para hashear
                const hashedPassword = await bcrypt.hash(person.password, 10); // 10 es el número de rondas de hashing
                await Person.update({ password: hashedPassword }, { where: { id: person.id } });
                console.log(`Contraseña hasheada para la persona con ID ${person.id}`);
            } else {
                console.log(`La persona con ID ${person.id} no tiene contraseña para hashear.`);
            }
        }

        console.log('Todas las contraseñas han sido hasheadas.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Cierra la conexión a la base de datos
        await sequelize.close();
        console.log('Conexión a la base de datos cerrada.');
    }
}

hashPasswords();