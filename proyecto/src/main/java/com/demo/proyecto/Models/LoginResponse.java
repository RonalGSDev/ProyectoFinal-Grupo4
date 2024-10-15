package com.demo.proyecto.Models; 

public class LoginResponse {
    private int idCliente; 
    private String message;

    public LoginResponse(int idCliente, String message) {
        this.idCliente = idCliente;
        this.message = message;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
