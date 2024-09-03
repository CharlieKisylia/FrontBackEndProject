package com.example;

import com.google.gson.Gson;
import spark.Request;
import spark.Response;
import static spark.Spark.*;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.example.UserRoutes;

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

        // Register all user-related routes
        UserRoutes.registerRoutes();
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
