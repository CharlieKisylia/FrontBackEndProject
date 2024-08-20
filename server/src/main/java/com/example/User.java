package com.example;

public class User {
    private String username;
    private String password;
    private String email;
    private int wins;
    private int losses;

    // Default constructor
    public User() {}

    // Constructor with parameters
    public User(String username, String password, String email, int wins, int losses) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.wins = wins;
        this.losses = losses;
    }

    // Getter and Setter methods
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLosses() {
        return losses;
    }

    public void setLosses(int losses) {
        this.losses = losses;
    }
}


