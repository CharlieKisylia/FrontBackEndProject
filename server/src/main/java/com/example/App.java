package com.example;

import static spark.Spark.*;

public class App {
    public static void main(String[] args) {
        port(4567);

        // Initialize the database
        DBInitializer.initialize();

        post("/register", (req, res) -> {
            String username = req.queryParams("username");
            String password = req.queryParams("password");
            String email = req.queryParams("email");

            UserDAO userDAO = new UserDAO();
            boolean result = userDAO.createUser(username, password, email);

            if (result) {
                return "User registered successfully";
            } else {
                res.status(500);
                return "User registration failed";
            }
        });
    }
}
