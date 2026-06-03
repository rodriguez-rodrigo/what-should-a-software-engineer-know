package com.test.java;

import org.jspecify.annotations.NonNull;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.function.Supplier;

@SpringBootApplication
public class JavaApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(JavaApplication.class, args);
    }

    @Override
    public void run(String @NonNull ... args) throws Exception {

        // Ejemplo de uso de Stream API para filtrar y transformar una lista de cadenas
        List<String> list = List.of("Ana", "Maria", "João");

        var results = list.stream()
                .filter(s -> s.startsWith("Maria"))
                .map(String::toUpperCase)
                .toList();

        System.out.println(results);

        // Ejemplo de uso de Optional para manejar valores nulos
        var optionalName = java.util.Optional.empty();
        optionalName.ifPresentOrElse(
                n -> System.out.println("El nombre es: " + n),
                () -> System.out.println("El nombre no está presente")
        );

		// Ejemplo de uso de lambda para crear una función anónima
		Supplier<String> lambda = () -> "Hola desde la lambda!";
		System.out.println(lambda.get());

		// Terminal Operations

    }
}
