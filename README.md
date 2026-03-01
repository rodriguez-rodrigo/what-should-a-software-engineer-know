# what-should-a-software-engineer-know

# Architecture & System Design Theory
## CAP Theorem
### CAP Trade-offs
## ACID vs BASE
## Idempotency
## Event-driven vs Architecture
## Saga pattern (orchestration vs choreography)
## Circuit breaker pattern
## Backpressure
## Bulkhead pattern
## Exponential backoff
## Logical clocks vs physical clocks
Logical clock is a mechanism used in distributed systems to track the order of events without relying on physical time, the physical clocks are based on real-world time, while logical clocks are based on the sequence of events,
so instead of asking, "What time did this happen?", we ask, "What event happened before another?"

Eg: **Lamport Logical Clock**
Imagine a chat distributed system, and in this system we have two servers, Server A and Server B.

| Server A                          | Server B                                    |
|-----------------------------------|---------------------------------------------|
| counter = 0                       |                                             |
| message = "hello"                 |                                             |
| sendMessage(message, counter + 1) |                                             |
|                                   | counter = 0                                 |
|                                   | Incomming Message                           |
|                                   | counter = max(counter, receivedCounter) + 1 |
|                                   | response = "Hi"                             |
|                                   | sendMessage(response, counter + 1 )         |

Now is easy to see that the message "hello" happened before "Hi", because the counter of "hello" is 1 and the counter of "Hi" is 2, so we can say that "hello" happened before "Hi", even if the physical time of both messages is the same.

| Event         | Counter |
|---------------|---------|
| "hello"       | 1       |
| "Hi"          | 2       |

source: https://en.wikipedia.org/wiki/Logical_clock

## Monolithic vs Microservices
#### Benefits of microservices architecture
#### Trade-offs of microservices architecture
#### Benefits of monolithic architecture
#### Trade-offs of monolithic architecture

## Why distributed systems fail in real life?
### Fallacies of distributed computing
The fallacies are a set of assertions describing false assumptions that programmers new to distributed applications make.
1. The network is reliable;
2. Latency is zero;
3. Bandwidth is infinite;
4. The network is secure;
5. Topology doesn't change;
6. There is one administrator;
7. Transport cost is zero:
8. The network is homogeneous:

Source: https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing

**The network** is not reliable,most failures come from broken assumptions about the network and most code is written assuming happy-path networking, but reality is different, packets drops, connections hang, DNS breaks, load balancers misbehave , TLS certificates expires.

**Partial failures**: when we are working in monolith is pretty clear that if it crashes then everything crashes, but, in distributed systems when one component fails, other keeps running, that may sound good but it creates timeouts, retries, duplicated messages, inconsistent state, zombie processes, the system becomes half alive which is harder to detect than dead.

**Retries cause cascading failures**. Retries are necessary but naive retries cause retry storm due to **Retry storm antipattern**, Thunder herd problems (https://en.wikipedia.org/wiki/Thundering_herd_problem), database overload and queue explosion, this is the reason why Exponential backoff, Circuit breakers and Bulheads exists otherwise, small failures become outages, look Architecture & System Design Theory section for more details.

**Distributed state is hard:** Consistency is the core problem, you can't have everything, you have to choose between consistency, availability and partition tolerance

**Time is a lie:** Time is not linear, clocks can drift, time zones exist, leap seconds exist, time is hard to manage in distributed systems, you have to deal with it. Distributed systems that rely on "latest timestamp wins", ordering by timestamp, token expiration base on local clocks will eventually corrupt data. This is the reason why we have Logical clocks (https://en.wikipedia.org/wiki/Logical_clock) and Monotonic counters.

**Humans are in the loop:** Real outages ofter involve misconfigured kubernetes, expired credentials, rotated secrets not deployed, wrong environment variables, rolling deploy gone wrong.

**Observability is incomplete:** Logs for debugging are often missing, metrics don't correlate and traces are not properly propagated, this causes during incidents that you don't know what is failing and why. 

**Emergent Behavior:** Individually correct components can interact in unexpected ways, for example Service A retries on timeout, Services B autos-scales on CPU, Database throttles under load, Queue reorders messages, no one designed to fail, but it fails anyway.

**Complexity Grows Non-linearly:** Monolith complexity is equal to N, Distributed systems complexity is equal to N^2, because of the interactions between components, it is counterintuitive we create microservices to reduce complexity but we end up with more complexity, this is the reason why we have to be careful when adopting microservices architecture, and we have to be sure that the benefits outweigh the trade-offs.

---
# Frontend

## React

### JXS Syntax
JSX stands for JavaScript XML, it is a syntax extension for JavaScript that allows you to write HTML-like syntax in your JavaScript code, it is used in React to describe what the UI should look like.

```js
const element = <h1>Hello, world!</h1>;
```

Source: https://legacy.reactjs.org/docs/introducing-jsx.html

### Class vs Functional Components
Class components are the traditional way of writing React components, they are ES6 classes that extend the `React.Component` class, they have a `render` method that returns the JSX to be rendered

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

More detailed example here https://github.com/rodriguez-rodrigo/what-should-a-software-engineer-know/examples/react/src/components/class-component.tsx

---

# Backend

## REST & RESTful APIs

REST means Representational State Transfer, it is an architectural style for designing networked applications, a set of constraints for building web services.
RESTful APIs are web services that conform to all REST constraints, they are stateless, cacheable, client-server, idempotent, layered system, uniform interface and code on demand (optional).

In REST everything is a resource, this resource ca be represented in many formats like JSON, XML, etc., and every resource is identified by a URI, for example:
- `GET /users` -> get all users
- `POST /users` -> create a new user
- `GET /users/{id}` -> get a user by id
- `PUT /users/{id}` -> update a user by id
- `DELETE /users/{id}` -> delete a user by id

If you see the example above, we are using HTTP verbs (GET, POST, PUT, DELETE) to perform operations on resources (users), and we are using URIs to identify resources,
- GET is used to retrieve resources.
- POST is used to create resources.
- PUT is used to update resources.
- DELETE is used to delete resources.
- PATCH is used to partially update resources, the difference between PUT and PATCH is that PUT replaces the entire resource, while PATCH only updates the specified fields.

In REST every request from client to server must contain all the information needed to understand and process the request, this is called statelessness, the server does not store any state about the client session on the server side, this means that each request is independent and can be processed without any knowledge of previous requests.
**So where do we store the state?** The state is stored on the client side, for example in cookies, local storage, or in the request itself (e.g., JWT token).

HTTP codes are used to indicate the result of the request, for example:
- 200 OK: The request was successful.
- 201 Created: The request was successful and a new resource was created.
- 204 No Content: The request was successful but there is no content to return.
- 400 Bad Request: The request was invalid or cannot be served.

And so on..., you can find the full list of HTTP status codes here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

Resources: https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm

### Pagination
When we have a large number of resources, it is not efficient to return all of them in a single response, this is where pagination comes in, it allows us to return a subset of resources in a single response, and it also allows us to navigate through the resources, for example:
- `GET /users?page=1&size=10` -> get the first 10 users
- `GET /users?page=2&size=10` -> get the next 10 users

This is called page-based pagination, it is simple to implement, but it has some drawbacks, for example, if we have a large number of resources, and we want to get the last page, we have to calculate the total number of pages and then request the last page, this can be inefficient and can cause performance issues.

We can also use other pagination strategies like cursor-based pagination, where we use a cursor to keep track of the last resource returned, and we can use that cursor to get the next set of resources, for example:
- `GET /users?cursor=abc123&size=10` -> get the next 10 users after the user with cursor abc123

---

# Databases

---

# DevOps Cloud & Infrastructure

## Docker vs Kubernetes

They don't compete each other, they are complementary, Docker is a containerization platform that allows you to package your application and its dependencies into a container, while Kubernetes is a container orchestration platform that allows you to manage and deploy your containers at scale.

**Docker** 
Is a tool that allows you to create, deploy, and run applications in containers. A container is a lightweight, standalone, executable package of software that includes everything needed to run an application: code, runtime, system tools, libraries, and settings.

**Kubernetes**
Is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It provides a framework for running distributed systems resiliently, with scaling and failover for your application.

> So in terms of analogy docker helps you to build a house and kubernetes helps you to manage a city of houses.

The typical flow is:
1. You build your application and its dependencies into a Docker image.
2. You push that image to a container registry (e.g., Docker Hub, AWS ECR).
3. You deploy that image to a Kubernetes cluster, where Kubernetes will manage the deployment, scaling, and management of your application.

## Kafka vs RabbitMQ vs AWS SQS

Kafka, RabbitMQ and AWS SQS are all message brokers, they are used to decouple the components of a distributed system, they allow you to send messages between different components of your system asynchronously.

**Kafka** is a distributed streaming platform that is designed for high-throughput, fault-tolerant, and scalable messaging. It is often used for real-time data processing, event sourcing, and log aggregation.

**RabbitMQ** is a message broker that is designed for reliability and ease of use. It supports multiple messaging protocols and has a rich set of features for routing and managing messages.

---

# Testing

---

# Security

---

# Observability

---

---


# Computer Science Foundations

## Core

### Data Structure
- Arrays
- Lists
- Stacks
- Queues
- Trees
- Graphs
- Hash maps

### Algorithms
- Sorting
- Searching
- Recursion
- Complexity analysis
- Big-O notation
- Concurrency & multithreading
  - Race conditions
  - Locks
  - Atomic Operations
- Memory management
  - Garbage collection
  - Pointers
  - Memory leaks
  - Heap vs Stack
  - GC basics in Java

### Databases
- Relational databases
- NoSQL databases
- Differences between SQL and NoSQL
- Normalization
- Indexing strategies
- Query planning basics
- Transactions (ACID
- Isolation levels)
- Deadlocks

#### SQL
- Complex joins
- Window functions
- Query optimization
- Indexing strategies
- Stored procedures
- Locking behavior
- JSON in Postgres
- Execution plans

# Backend Engineering
- OOP
- SOLID
- Functional programming
  - First-class functions
  - Higher-order functions
  - Pure functions
  - Immutability
  - Streams and Lambdas in Java
- Concurrency and parallelism
  - Threads
  - Async programming
  - Event-driven architecture
- Exception handling
- Design patterns
  - Singleton
  - Factory
  - Observer
  - Strategy
  - Decorator
  - Adapter
  - MVC
  - MVVM
- Microservices architecture
- RESTful APIs
- GraphQL
- gRPC
- Message queues (e.g., RabbitMQ, Kafka)
- Caching strategies (e.g., Redis, Memcached)
- Authentication and authorization (e.g., OAuth, JWT)
- Security best practices (e.g., OWASP Top Ten)
- Testing methodologies (unit, integration, end-to-end)
- CI/CD pipelines
---

# Java Specific

## Spring Boot Ecosystem
- Dependency Injection
- Configuration management
- Profiles
- Bean lifecycle

### Web & REST
- Controllers
- Exception handling
- Validation
- DTO mapping
- OpenAPI integration (Swagger)

### Persistence
- JPA/Hibernate
- Lazy vs Eager loading
- N+1 query problem
- Transactions management
- Migrations (Flyway, Liquibase)

### Security
- Spring Security basics
- JWT authentication
- OAuth2 basics

---

# Service-Oriented Architecture (SOA) / Microservices
- Monolithic vs microservices architecture
- API Gateway pattern
- Service discovery (e.g., Eureka, Consul)
- Circuit breaker pattern (e.g., Hystrix)
- Event driven architecture
- Event sourcing
- CQRS (Command Query Responsibility Segregation)
- Distributed tracing (e.g., Zipkin, Jaeger)
- Idempotency in distributed systems
- Distributed transactions and eventual consistency
- Sage pattern
- Observability (metrics, logging, tracing)

---
# RESTful Services
- REST principles
- HTTP verbs properly used
- Status codes correctly used
- Versioning strategies
- HATEOAS
- OpenAPI specification

--- 

# Frontend Engineering
- Hooks
- State management pattern
- Controlled vs uncontrolled components
- Context API
- Performance optimization techniques (e.g., memoization, lazy loading)
- Error boundaries

## Typescript
- Type system (interfaces, types, enums)
- Advanced types (union, intersection, mapped types)
- Generics
- Utility types
- Type narrowing
- Strict mode

## Architecture
- Component structure patterns
- API integration
- Form handling
- Frontend testing

---

# TDD/BDD
- Write test first (Red -> Green -> Refactor)
- Unit test
- Integration tests
- Testcontainers
- BDD basics
- Mock vs Stub
- Test pyramid
- Code coverage limitations

---

# DevOps & CI/CD
- What CI actually does
- What CD actually means
- Git workflows
- Branch strategies
- Docker fundamentals
- Container lifecycle
- Image layering

## CI/CD Tools
- Github Actions
- Gitlab CI
- Jenkins

---

# Kubernetes (PKS) + Infrastructure
- Pods
- Deployments
- Services
- Ingress
- ConfigMaps
- Secrets
- Liveness/readiness probes
- Rolling updates
- Resource limits
- Scaling
- Difference between VMs and containers
- Horizontal vs Vertical Scaling

---

# Streaming: Kafka + Avro

## Kafka
- Topics
- Partitions
- Consumer groups
- Offset management
- Exactly-once vs at-leat-once vs at-most-once delivery
- Retention policies

## Avro
- Schema registry
- Backward/fordward compatibility
- Schema evolution

---

# UML & Design Skills
- Sequence diagrams
- Class diagrams
- Component diagrams
- Deployment diagrams

---

# Engineering Practices
- Clean Architecture
- DDD
- Hexagonal architecture
- Code reviews
- Refactoring strategies
- Documentation standards


> Add Antipattern somewhere in the architecture section, and maybe in the engineering practices section as well.