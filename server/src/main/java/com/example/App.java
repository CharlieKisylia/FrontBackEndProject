package com.example;

import static spark.Spark.*;

import com.example.DBInitializer;
import com.example.UserDAO;

public class App {
    public static void main(String[] args) {
        port(4567);

        // Enable CORS
        enableCORS("*", "*", "*");

        // Initialize the database
        DBInitializer.initialize();

        post("/register", (req, res) -> {
            String username = req.queryParams("username");
            String password = req.queryParams("password");
            String email = req.queryParams("email");

            // Log the received parameters
            System.out.println("Received: " + username + ", " + password + ", " + email);

            UserDAO userDAO = new UserDAO();
            boolean result = userDAO.createUser(username, password, email);

            if (result) {
                return "{\"message\":\"User registered successfully\"}";
            } else {
                res.status(500);
                return "{\"message\":\"User registration failed\"}";
            }
        });
    }

    // Method to configure CORS
    private static void enableCORS(final String origin, final String methods, final String headers) {
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Request-Method", methods);
            response.header("Access-Control-Allow-Headers", headers);
            // Optional: Allow credentials to be included
            response.header("Access-Control-Allow-Credentials", "true");
        });
    }
}