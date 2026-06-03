package com.test.java.creatingobjects;

import java.util.function.DoubleFunction;

public sealed interface Money<T extends Money<T>> permits Euro, Dollar{
    double amount();
    String currency();

    default T add(T another, DoubleFunction<T> factory){
        if(!this.currency().equals(another.currency())){
            throw new IllegalArgumentException("Cannot add different currencies");
        }

        return factory.apply(this.amount() + another.amount());
    }

    public static Dollar dollar(double amount){
        return Dollar.valueOf(amount);
    }

    public static Euro euro(double amount){
        return Euro.valueOf(amount);
    }
}
