
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcrypt'; 
import Person from '../models/person.js';

dotenv.config();

export async function getAllPersons(req, res) {
    try {
        const allPersons = await Person.findAll();
        res.json(allPersons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getPersonById(req, res) {
    try {
        const person = await Person.findByPk(req.params.id);
        if (person) {
            res.json(person);
        } else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function createPerson(req, res) {
    try {
        const { document, name, age, address, phone_number, email, registration_date, password } = req.body;

        if (!document || !name || !password) { 
            return res.status(400).json({ error: "Faltan campos obligatorios (document, name, password)" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Usa bcrypt.hash
        const newPerson = await Person.create({
            document: document,
            name: name,
            age: age,
            address: address,
            phone_number: phone_number,
            email: email,
            registration_date: registration_date,
            password: hashedPassword,
        });
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updatePerson(req, res) {
    try {
        const { document, name, age, address, phone_number, email, registration_date, password } = req.body;
        let updateData = {
            document: document,
            name: name,
            age: age,
            address: address,
            phone_number: phone_number,
            email: email,
            registration_date: registration_date,
        };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); 
            updateData.password = hashedPassword;
        }
        const updatedPerson = await Person.update(updateData, {
            where: { id: req.params.id },
        });
        if (updatedPerson[0]) {
            res.json({ message: 'Persona actualizada' });
        } else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deletePerson(req, res) {
    try {
        const deletedPerson = await Person.destroy({
            where: { id: req.params.id },
        });
        if (deletedPerson) {
            res.json({ message: 'Persona eliminada' });
        } else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function loginPerson(req, res) {
    try {
        const { name, password } = req.body;

        const person = await Person.findOne({ where: { name: name } });

        if (!person) {
            return res.status(400).json({ error: "Persona no encontrada" });
        }

        const validPassword = await bcrypt.compare(password, person.password); // Usa bcrypt.compare
        if (!validPassword) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            {
                id: person.id,
                document: person.document,
                name: person.name,
                age: person.age,
                address: person.address,
                phone_number: person.phone_number,
                email: person.email,
                registration_date: person.registration_date,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error durante el inicio de sesión", details: error.message });
    }
}