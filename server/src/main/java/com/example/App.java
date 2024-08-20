package com.example;

import static spark.Spark.*;

public class App {
    public static void main(String[] args) {
        port(4567); // Port number for your server
        
        post("/register", (req, res) -> {
            // Extract user data from request
            String username = req.queryParams("username");
            String password = req.queryParams("password");
            String email = req.queryParams("email");

            // Create a new user in the database
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
