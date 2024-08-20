package com.example;

public class App {
    public static void main(String[] args) {
        UserDAO userDAO = new UserDAO();
        User user = userDAO.getUserByUsername("john_doe");

        if (user != null) {
            System.out.println("Username: " + user.getUsername());
            System.out.println("Email: " + user.getEmail());
            System.out.println("Wins: " + user.getWins());
            System.out.println("Losses: " + user.getLosses());
        } else {
            System.out.println("User not found.");
        }
    }
}
