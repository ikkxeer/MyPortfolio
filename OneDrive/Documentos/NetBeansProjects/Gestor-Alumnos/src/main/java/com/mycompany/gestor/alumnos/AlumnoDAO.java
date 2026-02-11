/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.gestor.alumnos;

import java.sql.Connection;
import java.sql.PreparedStatement;

/**
 * Classe que servirá para realizar las consultas a la base de datos
 * 
 * @author Iker Aramburu
 */
public class AlumnoDAO {
    private DB baseDeDatos = new DB();
    private Connection conn = baseDeDatos.conectarMysql();

    public void InsertarAlumno(String nombre, String primerApellido, String segundoApellido, String fechaNacimiento, String classe) {
        String query = "INSERT INTO alumnos (Nombre, PrimerApellido, SegundoApellido, FechaNacimiento, Classe) VALUES(?, ?, ?, ?, ?)";        
        try (PreparedStatement pstm = conn.prepareStatement(query)) {
            pstm.setString(1, nombre);
            pstm.setString(2, primerApellido);
            pstm.setString(3, segundoApellido);
            pstm.setString(4, fechaNacimiento);
            pstm.setString(5, classe);
            
            pstm.executeUpdate();
            System.out.println("Alumno " + nombre + " insertado!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
