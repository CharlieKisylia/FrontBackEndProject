package com.example;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DBInitializer {
    private static final String DB_URL = "jdbc:sqlite:db/userdb.sqlite";

    public static void initialize() {
        String sql = "CREATE TABLE IF NOT EXISTS users (" +
                     "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                     "username TEXT NOT NULL UNIQUE, " +
                     "password TEXT NOT NULL, " +
                     "email TEXT NOT NULL, " +
                     "wins INTEGER DEFAULT 0, " +
                     "losses INTEGER DEFAULT 0)";
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
