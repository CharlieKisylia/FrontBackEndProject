package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DB {
    private static final String URL = "jdbc:sqlite:userdb.sqlite";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL);
    }
}