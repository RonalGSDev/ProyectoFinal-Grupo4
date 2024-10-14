-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2024 a las 19:33:34
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
-- Base de datos: `proyectofinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `apellidos`, `correo`, `password`, `telefono`, `direccion`) VALUES
(1, 'Luis Fernando', 'Perez Garcia', 'luisfer@gmail.com', 'Luis123', '12345678', 'zona 1 Guatemala'),
(2, '1', '1', '1', '1', '1', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellidos`, `correo`, `password`, `telefono`, `direccion`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', '123', '3001234567', 'Calle 123, Ciudad'),
(2, 'Luis', 'García', 'luis.garcia@example.com', '123', '3002468135', 'Carrera 789, Ciudad'),
(3, 'María', 'López', 'maria.lopez@example.com', '123', '3007654321', 'Avenida 456, Ciudad'),
(4, 'Ronal Vinicio', 'Gomez Santos', 'gomezronal986@gmail.com', 'hola123', '77889944', 'Avenida 456, Ciudad'),
(5, 'Mario', 'Perez', 'mario@gmail.com', '1111', '76857685', 'zona 1 Xela'),
(6, 'asdasd', 'asdasd', 'fdssl986@gmail.com', '11111', 'asdsadas', 'sadasdas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedido`
--

CREATE TABLE `detallepedido` (
  `id` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Disparadores `detallepedido`
--
DELIMITER $$
CREATE TRIGGER `restar_stock` BEFORE INSERT ON `detallepedido` FOR EACH ROW BEGIN
    DECLARE current_stock INT;

    -- Obtener el stock actual del producto
    SELECT stock INTO current_stock FROM productos WHERE id = NEW.idProducto;

    -- Validar si hay suficiente stock para procesar el pedido
    IF current_stock < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No hay suficiente stock disponible para este producto';
    ELSE
        -- Restar la cantidad del stock si es suficiente
        UPDATE productos
        SET stock = stock - NEW.cantidad
        WHERE id = NEW.idProducto;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `fechaPedido` date DEFAULT curdate(),
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `url`) VALUES
(1, 'Samsung Galaxy A55', 'G, 8GB RAM, 256GB, Color Azul Hielo, Liberado', 2999.00, 100, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/MjI4YTJhNm_818.png'),
(2, 'Laptop Gaming HP Victus', '15.6 Pulgadas FHD, Intel Core I5 12450H, 8GB RAM, 512GB SSD, NVIDIA GeForce RTX 3050, 144Hz, W11H, Color Azul', 6195.00, 200, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/YWRhMmMyMT_1.png'),
(3, 'Laptop para juegos ASUS ', ' Strix G15, pantalla FHD tipo IPS de 15.6 300Hz 3ms, NVIDIA GeForce RTX 3050 Ti, AMD Ryzen 7 4800H, 16GB DDR4, 512GB PCIe SSD, teclado RGB, ', 8840.00, 0, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/YzY5MmU0Mj.jpg'),
(4, 'Galaxy S9 FE', 'Tablet Samsung Galaxy S9 FE 6GB RAM, 128GB ROM con Book Cover y S Pen', 2999.00, 58, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/MWU3NWQxYW_474.png'),
(5, 'Teclado Inalámbrico', 'Bluetooth Ultra Delgado, Color Negro, Argom', 250.00, 25, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/ZWFkMmYzMD.jpg'),
(6, 'Driving Force Shifte', 'Logitech Driving Force Shifter, Palanca de Cambios, Cableado', 485.00, 87, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/NDEwMDFjM2.jpg'),
(7, 'Tiras Led ', 'Tiras Led Cougar RGB Strip, Cougar', 188.00, 78, 'https://img.pacifiko.com/PROD/resize/2/1000x1000/NTA5YWRiYm.jpg'),
(8, 'Audífonos Inalámbricos', 'Audífonos Inalámbricos Con Sonido Envolvente Para Juegos, Color Negro, Gaming G733 Logitech', 1619.00, 42, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/MmE1ZTI4ND.jpg'),
(9, 'Teclado Logitech POP', 'Teclado Logitech POP Keys Inalámbrico Con Bluetooth, USB, Color Amarillo/Negro, Español', 599.00, 89, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/NjViYzhhOG_0_470.jpg'),
(10, 'Audífonos JBL', 'Audífonos JBL Vibe Flex Con Bluetooth Color Menta', 455.00, 623, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/Y2ZmZWFkOW_1.jpg'),
(11, 'Audífonos Inalámbricos Skullcandy', 'Audífonos Inalámbricos Skullcandy Dime 3 True Wireless Black', 275.00, 163, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/OGIyMTRmN2_473.png'),
(12, 'Bocinas Xtech', 'Bocinas Xtech Xts375Bk Alámbricas Diseño Elegante.\nSonido multimedia óptimo. Prácticos controles en la parte frontal del altavoz.', 145.00, 45, 'https://img.pacifiko.com/PROD/resize/0/1000x1000/XTS-375.jpg'),
(13, 'Bocinas Multimedia', 'Bocinas Multimedia Estéreo Para PC, Blanco, Eko 2.0 Argom. Amplificador activo incorporado. Capacidad alimentada por bus USB, no se requiere', 63.00, 15, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/MmZhZTkxMD_0_745.jpg'),
(14, 'Soporte para Audifonos', 'Soporte RGB Doble Para Audifonos, 2 Puertos USB, Yurei Xtech', 199.00, 15, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/Yjc3MjI3ND_0_910.jpg'),
(15, 'Celular Xiaomi Redmi', 'Celular Xiaomi Redmi Note 13, 8GB RAM, 256GB, Color Negro, Liberado', 1499.00, 200, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/NGY0NmYwZj_1.png'),
(16, 'Reloj Inteligente', 'Reloj Inteligente Xiaomi Smart Band 8 Active Color Negro', 215.00, 15, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/YzE5NmYyNz_576.png'),
(17, 'Celular Motorola Edge 50', 'Celular Motorola Edge 50 Fusion, 8GB RAM, 256GB, Color Azul Ártico, Liberado + Moto Buds Azul', 2468.00, 20, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/ZjIxNTA2MD_727.png'),
(18, 'Laptop Apple Macbook Air 13', 'Laptop Apple Macbook Air, 13 Pulgadas, Chip M2, 8CPU/8GPU, 8GB RAM, 256GB SSD, Color Beige', 9749.00, 20, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/Yjc4MDVkMT_622.jpg'),
(19, '2020 Apple MacBook Air', '2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID.', 5785.00, 0, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/ODlhMWEwYz.jpg'),
(20, 'Botellas De Tinta', 'Set De 4 Botellas De Tinta Original Color Amarillo, Cián, Magenta, Negro, 544 Epson', 369.00, 20, 'https://img.pacifiko.com/PROD/resize/1/1000x1000/NWNmZGFiZj_945.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `detallepedido_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
