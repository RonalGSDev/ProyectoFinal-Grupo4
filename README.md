# Documentacion Proyecto Final - Grupo 4

# Entregables

## 1. Modelo entidad Relación

![image](https://github.com/user-attachments/assets/1e61e08d-d3c4-4ce1-977e-4374fd1e01b9)

## 2. Base de Datos Relacional

### 2.1. DDL
````
CREATE DATBASE proyecto;

CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    direccion VARCHAR(255) NOT NULL
);

CREATE TABLE administradores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    direccion VARCHAR(255) NOT NULL
);

CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    url VARCHAR(255)
);

CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    fechaPedido DATE DEFAULT CURRENT_DATE,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES clientes(id)
);

CREATE TABLE detallePedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (idPedido) REFERENCES pedidos(id),
    FOREIGN KEY (idProducto) REFERENCES productos(id)
);
````

### 2.2. DML

#### Tabla Clientes
````
INSERT INTO clientes (nombre, apellidos, correo, password, telefono, direccion) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'password123', '5551234567', 'Calle Falsa 123'),
('Ana', 'García', 'ana.garcia@example.com', 'securePass456', '5559876543', 'Avenida Siempre Viva 456');
````
#### Tabla Administradores
````
INSERT INTO administradores (nombre, apellidos, correo, password, telefono, direccion) VALUES
('Luis', 'Martínez', 'luis.martinez@example.com', 'adminPass789', '5552468101', 'Calle de la Paz 789'),
('María', 'López', 'maria.lopez@example.com', 'adminPass123', '5551357924', 'Boulevard de la Libertad 321');
````

#### Tabla Productos
````
INSERT INTO productos (nombre, descripcion, precio, stock, url) VALUES
('Laptop', 'Laptop con 16GB RAM y 512GB SSD', 1200.00, 10, 'https://example.com/laptop'),
('Teléfono', 'Teléfono inteligente con 128GB de almacenamiento', 800.00, 25, 'https://example.com/telefono');

````
#### Tabla Pedidos
````
INSERT INTO pedidos (idCliente, total) VALUES
(1, 2000.00), 
(2, 1500.00);
````
#### Tabla DetallePedidos
````
INSERT INTO detallePedido (idPedido, idProducto, cantidad) VALUES
(1, 1, 1),
(2, 2, 2); 
````

### 2.3. TRIGGER

````
CREATE TRIGGER restar_stock BEFORE INSERT ON detallePedido
FOR EACH ROW
BEGIN
    DECLARE current_stock INT;

    SELECT stock INTO current_stock FROM productos WHERE id = NEW.idProducto;

    IF current_stock < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No hay suficiente stock disponible para este producto';
    ELSE
        UPDATE productos
        SET stock = stock - NEW.cantidad
        WHERE id = NEW.idProducto;
    END IF;
END$$

DELIMITER ;
````

### 2.4. Procedimientos Almacenados
#### Listar y filtar los Pedidos realizados
````
DELIMITER //

CREATE PROCEDURE ObtenerPedidos(
    IN clienteid INT,
    IN productoid INT,
    IN fechainicio DATE,
    IN fechafin DATE
)
BEGIN
    SELECT 
        p.id AS idpedido,
        c.id AS idcliente,
        CONCAT(c.nombre, ' ', c.apellidos) AS nombrecompleto,
        p.fecha AS fecha,
        SUM(dp.cantidad) AS totalproductos,
        p.total
    FROM 
        pedidos p
    JOIN 
        clientes c ON p.idcliente = c.id
    LEFT JOIN 
        detallepedido dp ON p.id = dp.idpedido
    WHERE 
        (clienteid IS NULL AND productoid IS NULL AND fechainicio IS NULL AND fechafin IS NULL) OR
        (clienteid IS NOT NULL AND c.id = clienteid) OR
        (productoid IS NOT NULL AND dp.idproducto = productoid) OR
        (fechainicio IS NOT NULL AND fechafin IS NOT NULL AND p.fecha BETWEEN fechainicio AND fechafin)
    GROUP BY 
        p.id, c.id, c.nombre, c.apellidos, p.fecha
    ORDER BY 
        p.fecha DESC;  -- Puedes ajustar el orden según lo necesites
END //

DELIMITER ;
````

#### Listar los detalles del pedido realizado
````
DELIMITER //

CREATE PROCEDURE listardetallespedido(IN idpedido INT)
BEGIN
    SELECT 
        dp.idproducto,
        p.nombre,
        p.url,
        p.precio,
        dp.cantidad,
        (dp.cantidad * p.precio) AS subtotal
    FROM 
        detallepedido dp
    JOIN 
        productos p ON dp.idproducto = p.id
    WHERE 
        dp.idpedido = idpedido;
END //

DELIMITER ;
````

## 3. Base de Datos NoSql

### 3.1. Esquema 
````
const mongoose = require('mongoose');

const comentarios = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  idCliente: { type: String, required: true },
  nombres: { type: String, required: true },
  idProducto: { type: String, required: true },
  calificacion: { type: Number, required: true, min: 1, max: 5 }, 
  comentario: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

const Comentarios = mongoose.model('Comentarios', comentarios); 

module.exports = Comentarios; 

````
### 3.1. Ejemplo usando el Esquema
````
[
  {
    "id": "67180d205169f2e2abf40cf1",
    "idCliente": "1",
    "nombres": "Ronal Gómez",
    "idProducto": "3",
    "calificacion": 5.0,
    "comentario": "Este es un buen producto, me ayudo con mis tareas.",
    "fecha": "2024-10-22T20:37:52.510+00:00"
  },
  {
    "id": "67180defc65cea6432997552",
    "idCliente": "2",
    "nombres": "Juan Perez",
    "idProducto": "2",
    "calificacion": 2.0,
    "comentario": "buen producto 5.",
    "fecha": "2024-10-22T00:00:00.000+00:00"
  },
  {
    "id": "6718244b917b8b69e5c3c8f0",
    "idCliente": "4",
    "nombres": "Juan Perez",
    "idProducto": "12",
    "calificacion": 1.0,
    "comentario": "El sonido no es tan bueno, y tardó mucho en llegar a mi casa.",
    "fecha": "2024-10-22T00:00:00.000+00:00"
  }
]
````
## 4. Wireframes
[WIREFRAMES.pdf](https://github.com/user-attachments/files/17372670/WIREFRAMES.pdf)

## 5. Mockups
[MOCKUPS.pdf](https://github.com/user-attachments/files/17372672/MOCKUPS.pdf)

## 6. Pruebas de uso de la aplicación web

### 6.1. Página Princial

La aplicación web comienza con una página principal donde los usuarios pueden elegir si desean ingresar como Cliente o Administrador. Dependiendo de la selección, el usuario es redirigido a un formulario de login específico.
![image](https://github.com/user-attachments/assets/d328d66d-1be0-4dcc-a02a-5f7cae881520)

### 6.2. Área de Clientes

#### 6.2.1 Login de Clientes

Este es el inicio de sesión del cliente, donde los usuarios pueden acceder o crear una cuenta para ingresar a la página principal y realizar compras.
![image](https://github.com/user-attachments/assets/943b8ea6-2d53-4ef3-88e6-e06c79b2c261)

> [!WARNING]
> Si ingresan credenciales incorrectas, se mostrará un mensaje indicando que las credenciales no son válidas.
> ![image](https://github.com/user-attachments/assets/5cd89b57-820e-4157-bd47-b9dc10a983dc)

Al presionar el botón de 'Crear cuenta', la página redirigirá al usuario a un formulario que deberá completar para registrar su cuenta y poder acceder a la página principal para realizar compras.

> [!IMPORTANT]
> El correo ingresado por el usuario no debe coincidir con el registrado por otro usuario.

![image](https://github.com/user-attachments/assets/dc511f5f-0672-49f8-9e55-e31c9f18870f)

> [!CAUTION]
> Si se ingresa un correo que ya está en uso por otro usuario, se mostrará una alerta indicando el conflicto.
> ![image](https://github.com/user-attachments/assets/8c2266e8-8342-4cd6-8ce9-13c0b7dbffd5)

#### 6.2.2. Sección de compras

##### Área de compras
Después de ingresar las credenciales correctas, seremos dirigidos a una página para realizar compras, que será muy similar a la página principal. La diferencia radicará en que la barra de navegación ofrecerá diferentes opciones, y se habilitará un botón para añadir productos al carrito.
![image](https://github.com/user-attachments/assets/be618e2e-88ac-4721-91cc-a14ff71b6042)

##### Área de informacion del producto
Al presionar el botón de 'Agregar al carrito' de un producto, se mostrará una vista con información más detallada sobre el artículo, así como la opción de ingresar la cantidad que se desea comprar. También habrá un botón de 'Comprar', que se encargará de enviar la información relevante del pedido al carrito.
![image](https://github.com/user-attachments/assets/c6fe518a-a9a7-4878-9dac-4d5aecae1483)

> [!WARNING]
> Al intentar realizar una compra en la que la cantidad del producto excede el stock disponible, se mostrará el siguiente mensaje:
> ![image](https://github.com/user-attachments/assets/a55c6903-cf6a-4e2d-9437-20fc2f464a66)

> [!NOTE]
> Al ingresar una cantidad adecuada, se mostrará el siguiente mensaje:
> ![image](https://github.com/user-attachments/assets/b97f547d-fe6f-409f-b2b5-51acd6705159)

##### Área de productos recomendados y comentarios
Además, en la parte inferior de la sección de detalles del producto, habrá un área dedicada a productos recomendados y una sección de comentarios, donde el cliente podrá ver qué artículos están en tendencia, leer comentarios de otros usuarios y dejar su propia opinión sobre el producto.
![image](https://github.com/user-attachments/assets/3b337981-8350-48e2-ac96-d70cc16ab24c)

##### Área del carrito
Al presionar el botón de carrito en la barra de navegación, seremos redirigidos a la página del carrito, donde podremos ver los productos que deseamos comprar. Se mostrará la información de cada producto, el subtotal correspondiente y el total general. También tendremos la opción de eliminar productos del carrito y, por último, contaremos con un botón para realizar la compra.
![image](https://github.com/user-attachments/assets/0b146588-623f-45a6-88cb-ede95003f7cf)

> [!NOTE]
> Al presionar el botón de 'Realizar pedido', toda la información del pedido y los productos seleccionados se enviarán a la base de datos, se mostrará el siguiente mensaje y el carrito se vaciará.
> ![image](https://github.com/user-attachments/assets/a423b7b8-90af-4bbd-9f81-fc2fbaa57635)
> ![image](https://github.com/user-attachments/assets/28a89e9b-8104-4ad7-8d29-38a14c7aa350)

> [!IMPORTANT]
> Después de completar la compra, podremos observar que el trigger que descuenta los productos adquiridos del stock se activa.
> ![image](https://github.com/user-attachments/assets/b4d052a0-b007-44c1-bc20-30accceadcda)




### 6.3. Área de Administradores

#### 6.3.1. Login de Administradores
Este es el inicio de sesión para administradores, donde solo los usuarios con credenciales de administrador podrán acceder a la página principal de administración.
![image](https://github.com/user-attachments/assets/f702ed26-04f8-4a70-a2da-b462d701f016)

> [!WARNING]
> Si ingresan credenciales incorrectas, se mostrará un mensaje indicando que las credenciales no son válidas.
> ![image](https://github.com/user-attachments/assets/8c230fab-971b-4936-8c1b-fef1ca86b32c)

#### 6.3.2. Sección de Administradores

##### Página principal administradores
Después de ingresar las credenciales correctas, seremos dirigidos a una página para gestionar datos específicos de los administradores. La barra de navegación ofrecerá diferentes opciones: 'Clientes' (para el CRUD de clientes), 'Productos' (para el CRUD de productos), 'Administradores' (para el CRUD de administradores), 'Reportes' y 'Cerrar sesión'.
![image](https://github.com/user-attachments/assets/4170ab2e-556c-45a9-a4a8-608177b4c17f)

##### Página clientes (CRUD Clientes)
Al presionar el botón 'Clientes' en la barra de navegación, accederemos al CRUD de clientes, donde podremos realizar acciones como insertar un nuevo cliente, editar la información de un cliente existente o eliminar un cliente.
![image](https://github.com/user-attachments/assets/56b7038a-44d0-407c-8404-8615b951cf08)


Al presionar el botón 'Agregar cliente', se mostrará un modal con un formulario donde podremos ingresar la información del nuevo cliente que se está registrando.

> [!IMPORTANT]
> El correo ingresado para el nuevo cliente no debe coincidir con el registrado por otro cliente.

![image](https://github.com/user-attachments/assets/ee67844e-d844-4db3-89a9-0947fff4dda8)


> [!CAUTION]
> Si se ingresa un correo que ya está en uso por otro cliente, se mostrará una alerta indicando el conflicto.
> ![image](https://github.com/user-attachments/assets/e918a981-0d2f-453c-941f-11505bbc4413)

> [!NOTE]
> Al ingresar la información del cliente correctamente y hacer clic en el botón 'Agregar cliente', se mostrará la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/cab95295-2009-423e-a3c0-572cedf44dd7)


##### Página productos (CRUD Productos)
Al presionar el botón 'Productos' en la barra de navegación, accederemos al CRUD de productos, donde podremos realizar acciones como insertar un nuevo producto, editar la información de un producto existente o eliminar un producto.
![image](https://github.com/user-attachments/assets/4bb70a5a-9c4d-4e57-87d0-53f9d87d3f59)


##### Página administradores (CRUD Administradores)
Al presionar el botón 'Administradores' en la barra de navegación, accederemos al CRUD de administradores, donde podremos realizar acciones como insertar un nuevo administrador, editar la información de un administrador existente o eliminar un administrador.
![image](https://github.com/user-attachments/assets/4e0bad34-d82b-4e7c-8726-639fdf5df2b1)


##### Página reportes (Reporte de ventas filtado por clientes, productos, rango de fechas y comentarios)
Al presionar el botón 'Reportes' en la barra de navegación, accederemos a la página donde podremos mostrar reportes de las órdenes realizadas por los clientes. La visualización del reporte se dividirá en pestañas: 'Ver todo', 'Filtrar por cliente', 'Filtrar por producto', 'Filtrar por un rango de fechas' y 'Ver los comentarios de los productos'.





