# Documentacion Proyecto Final

## Integrantes
    No.|             Nombres                  |     Carné
    ---|--------------------------------------|---------------
     1 |    Ronal Vincio Gómez Santos         |   2019-012886
    ---|--------------------------------------|---------------
     2 |    Fátima Fernanda Higueros Aguaré   |   2024-011300
    ---|--------------------------------------|---------------
     3 |    Jocelyn Eunice Morales Hernández  |   2021-077313
    ---|--------------------------------------|---------------
     4 |    Luis Pablo Barrios López          |   
    ---|--------------------------------------|---------------
     5 |    Diego Alejandro del Cid Sanúm     |   2024-009781


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
[WIREFRAMES.pdf](https://github.com/user-attachments/files/17593680/WIREFRAMES.pdf)

## 5. Mockups
[MOCKUP.pdf](https://github.com/user-attachments/files/17613311/MOCKUP.pdf)

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

Al presionar el botón 'Editar' de un cliente específico, se abrirá nuevamente el modal con el formulario. La diferencia es que la información del cliente seleccionado ya estará cargada en el formulario, lo que nos permitirá realizar los cambios necesarios.
![image](https://github.com/user-attachments/assets/55e2b9f6-7aaf-47ef-8d11-e056cbc7d602)

> [!NOTE]
> Después de realizar los cambios deseados en la información del cliente y hacer clic en el botón 'Editar cliente', se mostrará la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/47805757-ec65-455f-8957-f3c59dccaeb6)

> [!WARNING]
> Al presionar el botón 'Eliminar' de un cliente específico, se mostrará una alerta preguntando: '¿Estás seguro? No podrás deshacer esta acción.' También se ofrecerá la opción de 'Eliminar' o 'Cancelar'. Si se presiona el botón 'Cancelar', la alerta se cerrará sin realizar ninguna acción. Sin embargo, si se elige 'Eliminar', el cliente se eliminará de forma permanente.
> ![image](https://github.com/user-attachments/assets/e3d47837-22ef-455d-886d-53f50be44d71)

> [!NOTE]
> Si se está seguro de eliminar al cliente, aparecerá la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/78fda84f-4a7a-4586-8a99-038e33ae91a2)



##### Página productos (CRUD Productos)
Al presionar el botón 'Productos' en la barra de navegación, accederemos al CRUD de productos, donde podremos realizar acciones como insertar un nuevo producto, editar la información de un producto existente o eliminar un producto.
![image](https://github.com/user-attachments/assets/fedd59b9-d6f9-41dc-842b-6e192cfc9189)

Al presionar el botón 'Agregar producto', se mostrará un modal con un formulario donde podremos ingresar la información del nuevo producto que se está registrando.
![image](https://github.com/user-attachments/assets/570af58b-8611-4838-a348-47d71db2bced)

> [!NOTE]
> Al ingresar la información del producto correctamente y hacer clic en el botón 'Agregar producto', se mostrará la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/74ff147f-071a-4452-8141-128ab654ffc4)

Al presionar el botón 'Editar' de un producto específico, se abrirá nuevamente el modal con el formulario. La diferencia es que la información del producto seleccionado ya estará cargada en el formulario, lo que nos permitirá realizar los cambios necesarios.
![image](https://github.com/user-attachments/assets/048d8572-6b91-4586-8fac-53537ab05bad)

> [!NOTE]
> Después de realizar los cambios deseados en la información del producto y hacer clic en el botón 'Editar producto', se mostrará la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/e984cb27-27cf-4129-9dc3-29ed0ba9622d)

> [!WARNING]
> Al presionar el botón 'Eliminar' de un producto específico, se mostrará una alerta preguntando: '¿Estás seguro? No podrás deshacer esta acción.' También se ofrecerá la opción de 'Eliminar' o 'Cancelar'. Si se presiona el botón 'Cancelar', la alerta se cerrará sin realizar ninguna acción. Sin embargo, si se elige 'Eliminar', el producto se eliminará de forma permanente.
> ![image](https://github.com/user-attachments/assets/ac4cc3d5-41a6-4582-95af-c09236859d96)

> [!NOTE]
> Si se está seguro de eliminar el producto, aparecerá la siguiente alerta:
![image](https://github.com/user-attachments/assets/ae69e011-4d94-42bb-b490-7a1bb2281eb8)



##### Página administradores (CRUD Administradores)
Al presionar el botón 'Administradores' en la barra de navegación, accederemos al CRUD de administradores, donde podremos realizar acciones como insertar un nuevo administrador, editar la información de un administrador existente o eliminar un administrador.
![image](https://github.com/user-attachments/assets/cedb40d3-bba1-4ea0-abf3-d4ee8f1ee4f5)

Al presionar el botón 'Agregar administrador', se mostrará un modal con un formulario donde podremos ingresar la información del nuevo administrador que se está registrando.

> [!IMPORTANT]
> El correo ingresado para el nuevo administrador no debe coincidir con el registrado por otro administrador.

![image](https://github.com/user-attachments/assets/8053eae5-2536-4f2d-bbdd-c0d0aaae6776)

> [!CAUTION]
> Si se ingresa un correo que ya está en uso por otro administrador, se mostrará una alerta indicando el conflicto.
> ![image](https://github.com/user-attachments/assets/33fc5cff-dd07-46c8-a8a0-68dcd90a702c)

> [!NOTE]
> Al ingresar la información del administrador correctamente y hacer clic en el botón 'Agregar administrador', se mostrará la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/339b55d4-b9f8-45a0-a2a8-93965265ed1e)

Al presionar el botón 'Editar' de un administrador específico, se abrirá nuevamente el modal con el formulario. La diferencia es que la información del administrador seleccionado ya estará cargada en el formulario, lo que nos permitirá realizar los cambios necesarios.
![image](https://github.com/user-attachments/assets/a1f11ac3-d83f-4bda-9473-b07a9e511e0d)

> [!NOTE]
> Después de realizar los cambios deseados en la información del administrador y hacer clic en el botón 'Editar administrador', se mostrará la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/24595cc5-c39a-4d6a-99e7-df2ff3646583)


> [!WARNING]
> Al presionar el botón 'Eliminar' de un administrador específico, se mostrará una alerta preguntando: '¿Estás seguro? No podrás deshacer esta acción.' También se ofrecerá la opción de 'Eliminar' o 'Cancelar'. Si se presiona el botón 'Cancelar', la alerta se cerrará sin realizar ninguna acción. Sin embargo, si se elige 'Eliminar', el administrador se eliminará de forma permanente.
> ![image](https://github.com/user-attachments/assets/450708b9-531f-4118-80ca-f7ae9c985f01)

> [!NOTE]
> Si se está seguro de eliminar al administrador, aparecerá la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/0b6941a6-61a4-4bf7-b906-354eef295980)








##### Página reportes (Reporte de ventas filtado por clientes, productos, rango de fechas y comentarios)
Al presionar el botón 'Reportes' en la barra de navegación, accederemos a la página donde podremos mostrar reportes de las órdenes realizadas por los clientes. La visualización del reporte se dividirá en pestañas: 'Ver todo', 'Filtrar por cliente', 'Filtrar por producto', 'Filtrar por un rango de fechas' y 'Ver los comentarios de los productos'.
![image](https://github.com/user-attachments/assets/b2f439eb-9bfb-4ea9-97f0-ee2e1adb057f)

> [!NOTE]
> Al hacer clic en el botón verde para ver el detalle del pedido, se abrirá un modal que mostrará la información completa de los productos incluidos en el pedido realizado por el cliente. También se presentarán detalles importantes, como el precio de cada producto, la cantidad total de productos comprados y el subtotal.
> ![image](https://github.com/user-attachments/assets/3e18348d-4e1f-4309-aba0-0fd7bc45878c)


Al hacer clic en la pestaña de cliente, accederemos a la opción de filtrar los pedidos según el ID del cliente ingresado.
![image](https://github.com/user-attachments/assets/0f5c78c6-ca11-4835-82e0-c579d7391015)

> [!WARNING]
> Si no se ingresa ningún ID, aparecerá la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/e4993537-300f-4b8c-9231-f12766297405)

> [!NOTE]
> Al ingresar un ID de cliente válido, se mostrará un listado de los pedidos realizados por ese cliente. Además, al hacer clic en el botón verde de "Ver detalles", podremos acceder a la información específica de los productos adquiridos.
> ![image](https://github.com/user-attachments/assets/c728271a-e691-472f-9185-60115eb84870)


Al hacer clic en la pestaña de producto, accederemos a la opción de filtrar los pedidos según el ID del producto ingresado.
![image](https://github.com/user-attachments/assets/19672ce6-1553-47af-bdc9-d28913ace487)

> [!WARNING]
> Si no se ingresa ningún ID, aparecerá la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/3fd8dfad-79bc-4c5c-b750-44e64f08af8e)

> [!NOTE]
> Al ingresar un ID de producto válido, se mostrará un listado de los pedidos en los que aparezca el ID del producto ingresado. Además, al hacer clic en el botón verde de "Ver detalles", podremos acceder a la información específica de los productos adquiridos.
> ![image](https://github.com/user-attachments/assets/b62742bc-5efa-4043-bd0a-4d7fbf363384)


Al hacer clic en la pestaña de rango de fecha, accederemos a la opción de filtrar los pedidos un rango de fecha establecido por el administrador.
![image](https://github.com/user-attachments/assets/6e5371a2-4997-45de-963a-37f678730c49)

> [!WARNING]
> Si no se ingresa ningún rango de fecha, aparecerá la siguiente alerta:
> ![image](https://github.com/user-attachments/assets/584c513d-232e-487b-a187-3f5d4d144803)

> [!NOTE]
> Al ingresar un rango de fecha válido, se mostrará un listado de los pedidos que se realizaron dentro del rango establecido por el administrador. Además, al hacer clic en el botón verde de "Ver detalles", podremos acceder a la información específica de los productos adquiridos.
> ![image](https://github.com/user-attachments/assets/4cdf4159-9241-4178-bbd9-62e77f0f28eb)

Al hacer clic en la pestaña de comentarios, podremos ver las opiniones que los clientes han dejado sobre los productos.
![image](https://github.com/user-attachments/assets/3a23756e-283e-428c-aa96-41c5de3077ce)

> [!NOTE]
> Al presionar el botón verde, se abrirá un modal donde podrás visualizar todos los comentarios que los clientes han dejado sobre el producto, así como su calificación.
> ![image](https://github.com/user-attachments/assets/d65d81de-c87a-4507-bf02-4cde1432cc19)


## 7. Informe Final de Tecnologías Utilizadas

### 7.1. Base de Datos:
#### MyPhpAdmin:
Se utilizó MyPhpAdmin para realizar el CRUD (Crear, Leer, Actualizar y Eliminar) de los clientes, productos, administradores, pedidos y detalles de pedidos. Además, se implementaron triggers y procedimientos almacenados para optimizar las operaciones y garantizar la integridad de los datos.

#### MongoDB:
MongoDB se utilizó para almacenar los comentarios de los clientes hacia los productos. Además, es una parte fundamental para implementar productos recomendados, basándose en las calificaciones anteriores de los clientes hacia esos productos. Su naturaleza NoSQL permite almacenar datos no estructurados de manera flexible, facilitando tanto la interacción como el análisis de las opiniones y preferencias de los usuarios.

### 7.2. Backend:

#### SpringBoot
En el backend, utilizamos Spring Boot, que nos ayudó en la creación de diferentes endpoints para almacenar, editar y eliminar información. Este framework facilita la configuración y el desarrollo de aplicaciones Java, y se conecta tanto con la base de datos relacional como con la base de datos NoSQL, permitiendo una gestión eficiente de los datos en diferentes formatos.

### 7.3. FrontEnd:

#### React
En el frontend, utilizamos React, lo que nos permitió crear una interfaz visual atractiva y dinámica para interactuar con nuestros diferentes endpoints del backend. React facilita la construcción de componentes reutilizables y la gestión del estado de la aplicación.

#### Herramientas Visuales
También empleamos herramientas visuales como Bootstrap y SweetAlert, junto con componentes de diversas librerías de React, para mejorar la experiencia del usuario y la estética de la aplicación.



