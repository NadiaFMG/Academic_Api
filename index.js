import app from './src/app.js';
import sequelize from './src/database/index.js';
import 'dotenv/config';
// import { Sequelize } from 'sequelize';
// const config = require('./config/config.json');

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincroniza los modelos con la base de datos (opcional en producción)
    // await sequelize.sync({ force: false }); // Usar { force: true } borra y recrea las tablas

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

main();





