package com.test.java.creatingobjects;

public final class Euro implements Money<Euro> {
    private final double amount;
    private final String currency;

    private Euro(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

     public static Euro valueOf(double amount) {
        return new Euro(amount, "EUR");
    }

    @Override
    public double amount() {
        return this.amount;
    }

    @Override
    public String currency() {
        return this.currency;
    }
}
