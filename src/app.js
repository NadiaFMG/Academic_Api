import express from 'express';
import personRoutes from './routes/person.js';
import teacherRoutes from './routes/teacher.js'; 
import courseRoutes from './routes/course.js'; 
import studentRoutes from './routes/student.js'; 
import studentCourseRoutes from './routes/student_course.js'; 



const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/person', personRoutes);
app.use('/teacher', teacherRoutes); 
app.use('/course', courseRoutes); 
app.use('/student', studentRoutes); 
app.use('/student_course', studentCourseRoutes); 


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});


export default app;
