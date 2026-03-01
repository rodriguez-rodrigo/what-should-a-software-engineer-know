# 🧠 SQL Roadmap – Guía de Aprendizaje

---

## Etapa 0 – Fundamentos (antes de escribir SQL)

**Objetivo:** Entender qué está pasando por debajo.

### 1️⃣ Conceptos Básicos
- ¿Qué es una base de datos?
- ¿Qué es una tabla?
- Filas vs columnas
- Tipos de datos
- ¿Qué es un RDBMS?

### Tecnologías de Referencia
> No hace falta profundidad todavía, solo contexto.

- PostgreSQL
- MySQL
- SQLite

---

## 🟢 Etapa 1 – SQL Básico (lectura de datos)

**Objetivo:** Que pueda consultar datos con confianza.

### 1️⃣ SELECT
```sql
SELECT * FROM users;
```

### 2️⃣ WHERE
- Operadores: `=`, `>`, `<`, `BETWEEN`, `IN`, `LIKE`

### 3️⃣ ORDER BY
### 4️⃣ LIMIT / OFFSET

### 5️⃣ Funciones Básicas
| Función | Descripción |
|---------|-------------|
| `COUNT` | Cuenta registros |
| `SUM` | Suma valores |
| `AVG` | Promedio |
| `MIN` | Valor mínimo |
| `MAX` | Valor máximo |

### 6️⃣ GROUP BY + HAVING

---

### 👉 Ejercicio Clave

**Base tipo e-commerce:** `users`, `orders`, `products`

**Preguntas reales:**
- ¿Cuántos pedidos hizo cada usuario?
- ¿Cuál es el producto más vendido?
- ¿Qué usuarios gastaron más de X?

> Si entiende esto bien, ya tiene una base sólida.

---

## 🟡 Etapa 2 – Relaciones (lo que separa juniors de intermedios)

**Objetivo:** Entender el modelo relacional.

### 1️⃣ Claves primarias
### 2️⃣ Claves foráneas
### 3️⃣ Normalización básica
- 1NF, 2NF (sin volverse teórico)

### 4️⃣ JOIN

| Tipo | Descripción |
|------|-------------|
| `INNER JOIN` | Solo coincidencias |
| `LEFT JOIN` | Todo de la izquierda |
| `RIGHT JOIN` | Todo de la derecha (usar menos) |
| `FULL JOIN` | Todas las filas (concepto) |

**Ejemplo clásico:**
```sql
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;
```

---

### 👉 Ejercicios Importantes

- Listar usuarios con su último pedido
- Usuarios sin pedidos
- Total gastado por usuario

> Si domina JOIN, ya entiende el corazón del SQL.

---

## 🟠 Etapa 3 – Escritura y modificación de datos

**Objetivo:** Que pueda trabajar en un sistema real.

### 1️⃣ INSERT
### 2️⃣ UPDATE
### 3️⃣ DELETE

### 4️⃣ Transacciones

```sql
BEGIN;
-- operaciones
COMMIT;
-- o
ROLLBACK;
```

> Acá podés conectar con conceptos como ACID.

---

## 🔵 Etapa 4 – Subqueries y cosas más avanzadas

**Objetivo:** Empezar a pensar como SQL y no como programador imperativo.

### 1️⃣ Subqueries
- En `SELECT`
- En `WHERE`
- Correlacionadas

### 2️⃣ CTE (WITH)
### 3️⃣ Window Functions
- `ROW_NUMBER()`
- `RANK()`
- `SUM() OVER()`

> Muy importante si quiere nivel profesional.

---

## 🟣 Etapa 5 – Performance y mundo real

> Esto ya es nivel más serio.

### 1️⃣ Índices
- ¿Qué son?
- ¿Cuándo ayudan?
- ¿Cuándo no?

### 2️⃣ EXPLAIN
### 3️⃣ N+1 problem (si viene del mundo backend)
### 4️⃣ Locks y concurrencia (si quiere senior level)

---

## 🧩 Etapa 6 – Modelado de datos

> Esto casi nadie lo enseña y es clave.

- Modelar un e-commerce
- Modelar un sistema de turnos
- Many-to-many
- Tablas pivot

> Acá realmente aprende diseño.

---

## 📚 Herramientas prácticas para enseñar

- **DB local:** PostgreSQL
- **GUI:** DBeaver
- **Playground online:** SQL Fiddle

---

## 🎯 Estructura sugerida para curso (8–10 clases)

1. Fundamentos + SELECT
2. WHERE + funciones
3. GROUP BY
4. JOIN
5. Modelado básico
6. INSERT / UPDATE / DELETE
7. Subqueries + CTE
8. Índices + performance

---

## 🏁 Consejo pedagógico importante

**No enseñes SQL como sintaxis.** Enseñalo como resolver preguntas de negocio.

| En vez de... | Decí: |
|--------------|-------|
| "Hoy vemos GROUP BY" | "La empresa quiere saber cuánto factura por mes" |

> Eso cambia totalmente la comprensión.
