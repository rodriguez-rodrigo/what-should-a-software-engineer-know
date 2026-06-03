package com.test.java.creatingobjects;

public class Main {
    public static void main(String[] args) {
        var dollar1 = Money.dollar(1);
        var dollar2 = Money.dollar(2);

        var total = dollar1.add(dollar2, Dollar::valueOf);

        System.out.println("Total amount: " + total.amount() + " " + total.currency());


        var euro1 = Money.euro(1);
        var euro2 = Money.euro(2);

        var totalEuro = euro1.add(euro2, Euro::valueOf);

        System.out.println("Total amount: " + totalEuro.amount() + " " + totalEuro.currency());
    }
}
