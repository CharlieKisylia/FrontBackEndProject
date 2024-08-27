package com.example;

import com.google.gson.Gson;

import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import static spark.Spark.*;

public class App {
    private static final Gson gson = new Gson(); 

    public static void main(String[] args) {
        port(4567);

        enableCORS("*", "*", "*");

        DBInitializer.initialize();

        post("/register", (Request req, Response res) -> {
            User user = gson.fromJson(req.body(), User.class);

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

        post("/login", (Request req, Response res) -> {
            User loginAttempt = gson.fromJson(req.body(), User.class);
            UserDAO userDAO = new UserDAO();
            boolean isValid = userDAO.validateUser(loginAttempt.getUsername(), loginAttempt.getPassword());
        
            res.type("application/json");
            if (isValid) {
                return gson.toJson(new ResponseMessage("Login successful"));
            } else {
                res.status(401);
                return gson.toJson(new ResponseMessage("Invalid username or password"));
            }
        });
    }

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
            response.header("Access-Control-Allow-Credentials", "true");
        });
    }
}

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
