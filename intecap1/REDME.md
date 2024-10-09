# EJERCICIO CRUD CON SPRING BOOT

## Tabla Productos

### Listar a los productos.

````

http://localhost:8080/productos/listar

````
![image](https://github.com/user-attachments/assets/dcce41a1-50e0-4d36-9bdb-47139ddf3bb4)

### Guardar un producto.

````

http://localhost:8080/productos/guardar


{
  "nombre": "Pantalon",
  "precio": 175.50,
  "stock": 10
}


````
![image](https://github.com/user-attachments/assets/f3af0e28-8bef-46b0-b1f1-d31d4315151c)


### Editar un producto.

````

http://localhost:8080/productos/editar


{
  "id": 11,
  "nombre": "Tenis para correr",
  "precio": 400.50,
  "stock": 20
}


````
![image](https://github.com/user-attachments/assets/a5fc786e-c53a-4feb-9012-0537f3a867c2)




### Eliminar un producto.

````

http://localhost:8080/productos/eliminar/10

````
![image](https://github.com/user-attachments/assets/3a01e53c-e975-40a3-b7aa-909d3ff29e41)

