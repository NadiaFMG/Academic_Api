-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2025 a las 07:37:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `academic_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `course`
--

INSERT INTO `course` (`course_id`, `name`, `teacher_id`, `description`) VALUES
(1, 'Introducción a la Programación', 6, 'Este curso proporciona una introducción fundamental a los conceptos básicos de la programación.'),
(2, 'Matematica', 6, 'Este curso cubre los fundamentos de la programación utilizando'),
(3, 'Introducción a la Programación', NULL, 'Este curso proporciona una introducción fundamental a los conceptos básicos de la programación.'),
(4, 'Introducción a la Programación', 6, 'Este curso proporciona una introducción fundamental a los conceptos básicos de la programación.'),
(5, 'Ingenieria', 8, 'Este curso cubre los fundamentos de la programación utilizando');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `document` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `person`
--

INSERT INTO `person` (`id`, `document`, `name`, `age`, `address`, `phone_number`, `email`, `registration_date`, `password`) VALUES
(4, '12345', 'John Doe', 36, '123 Main St', '555-1234', 'john.doe@example.com', '2025-04-19', '$2b$10$v2aJ4cyZJqN0V92RRjR0Mu37Q1tJ/LmoMkFy1vlexhXXfeCZpqd0q'),
(5, '1001234567', 'Carlos Estudiante', 20, 'Calle Falsa 123', '3101234567', 'carlos.estudiante@example.com', '2025-04-19', '$2b$10$t9EC/2hUC4b8aptE.WjXt.sQ/7jbt4VfpI4ubWYbxX2ZNx3VEFH6a'),
(6, '1001122333', 'Ana Pérez', 25, 'Avenida 742', '3159876543', 'ana.perez@example.com', '2025-04-19', '$2b$10$y1f0eSVszK5N8hDYDvo38unldQHWPOgjqL67GMMXuOFqBBp3sUu3y'),
(8, '1032', 'Lolita Maria', 45, 'calle 35 # 15-20, Apto 301', ' 2233445', 'loliMa@example', '2025-04-19', '$2b$10$6Nyr9XNFcJm20NAHjBOOo.Nk2YB4WfzcTqgynEKPebW8ZrFYEehtG'),
(9, '1032420', 'Juan Rayo', 45, 'carrera 35 # 15-20, Apto 301', ' 223349945', 'juanm@example', '2025-04-19', '$2b$10$n8.WUfkXHznlYsnoYhX56OqE4vE8kzQSJQDQVDmsdUp2TGfpt2Nku'),
(11, '103555', 'Mario Rios', 23, 'calle 65 # 15-20, Apto 301', ' 223465', 'julian@example', '2025-04-19', '$2b$10$BLSc86Lj.NqScbCIWu6e3OKqqZioS/60pznfzjz55nmGU38cCBQfW');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `course` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `student`
--

INSERT INTO `student` (`student_id`, `course`) VALUES
(4, 'Arquitectura'),
(5, 'ciencias'),
(9, 'Ingeniería de Sistemas'),
(11, 'Ingeniería de Sistemas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `student_course`
--

CREATE TABLE `student_course` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `attendance` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `student_course`
--

INSERT INTO `student_course` (`id`, `student_id`, `course_id`, `attendance`) VALUES
(1, 5, 2, 3),
(3, 9, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL,
  `specialty` varchar(100) DEFAULT NULL,
  `academic_degree` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `specialty`, `academic_degree`) VALUES
(6, 'Física', 'Magíster en Ciencias Físicas'),
(8, 'Historia del Arte', 'Maestría en Humanidades');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indices de la tabla `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document` (`document`);

--
-- Indices de la tabla `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- Indices de la tabla `student_course`
--
ALTER TABLE `student_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indices de la tabla `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `student_course`
--
ALTER TABLE `student_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);

--
-- Filtros para la tabla `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `person` (`id`);

--
-- Filtros para la tabla `student_course`
--
ALTER TABLE `student_course`
  ADD CONSTRAINT `student_course_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `student_course_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

--
-- Filtros para la tabla `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `person` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
