package com.test.java.creatingobjects;

public final class Dollar implements Money<Dollar>{
    private final double amount;
    private final String currency;

    private Dollar(double amount, String currency){
        this.amount = amount;
        this.currency = currency;
    }

    public static Dollar valueOf(double amount) {
        return new Dollar(amount, "USD");
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
