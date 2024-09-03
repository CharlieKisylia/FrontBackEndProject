package com.example;

import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import static spark.Spark.*;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import com.example.DBInitializer;
import com.example.UserDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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

        post("/updateRecord", (req, res) -> {
            String body = req.body();
        
            JsonObject json;
            try {
                json = JsonParser.parseString(body).getAsJsonObject();
            } catch (Exception e) {
                System.err.println("Failed to parse JSON: " + e.getMessage());
                res.status(400); // Bad Request
                return "Invalid JSON format";
            }
        
            String username = json.get("username").getAsString();
            String result = json.get("result").getAsString();
        
            Connection conn = null;
            PreparedStatement stmt = null;
            try {
                conn = DB.getConnection(); // Ensure this method is correct
                System.out.println("Database connection established.");
        
                if (result.equals("win")) {
                    stmt = conn.prepareStatement("UPDATE users SET wins = wins + 1 WHERE username = ?");
                } else if (result.equals("lose")) {
                    stmt = conn.prepareStatement("UPDATE users SET losses = losses + 1 WHERE username = ?");
                } else {
                    System.err.println("Invalid result value: " + result);
                    res.status(400); // Bad Request
                    return "Invalid result value";
                }
        
                stmt.setString(1, username);
                int rowsAffected = stmt.executeUpdate();
        
                // Fetch updated wins and losses
                stmt = conn.prepareStatement("SELECT wins, losses FROM users WHERE username = ?");
                stmt.setString(1, username);
                ResultSet rs = stmt.executeQuery();
                int wins = 0;
                int losses = 0;
                if (rs.next()) {
                    wins = rs.getInt("wins");
                    losses = rs.getInt("losses");
                } else {
                    System.err.println("No user found with username: " + username);
                    res.status(404); // Not Found
                    return "User not found";
                }
        
                JsonObject responseJson = new JsonObject();
                responseJson.addProperty("wins", wins);
                responseJson.addProperty("losses", losses);
        
                res.type("application/json");
                return responseJson.toString();
        
            } catch (SQLException e) {
                System.err.println("SQL Exception: " + e.getMessage());
                res.status(500); // Internal Server Error
                return "Error updating record: " + e.getMessage();
            } finally {
                if (stmt != null) try { stmt.close(); } catch (SQLException e) { /* Ignored */ }
                if (conn != null) try { conn.close(); } catch (SQLException e) { /* Ignored */ }
            }
        });
        

    }

    private static void enableCORS(final String origin, final String methods, final String headers) {
        // Handle preflight requests
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

        // Handle actual requests
        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", origin);
            response.header("Access-Control-Allow-Methods", methods);
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
