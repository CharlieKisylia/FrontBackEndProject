package com.example;

import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import static spark.Spark.*;

public class App {
    private static final Gson gson = new Gson(); // Gson for JSON handling

    public static void main(String[] args) {
        port(4567);

        // Enable CORS
        enableCORS("*", "*", "*");

        // Initialize the database
        DBInitializer.initialize();

        post("/register", (Request req, Response res) -> {
            // Parse JSON request body
            User user = gson.fromJson(req.body(), User.class);

            // Log the received user data
            System.out.println("Received: " + user.getUsername() + ", " + user.getPassword() + ", " + user.getEmail());

            UserDAO userDAO = new UserDAO();
            boolean result = userDAO.createUser(user.getUsername(), user.getPassword(), user.getEmail());

            res.type("application/json");
            if (result) {
                return gson.toJson(new ResponseMessage("User registered successfully"));
            } else {
                res.status(500);
                return gson.toJson(new ResponseMessage("User registration failed"));
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

// Define ResponseMessage class for responses
class ResponseMessage {
    private String message;

    public ResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
