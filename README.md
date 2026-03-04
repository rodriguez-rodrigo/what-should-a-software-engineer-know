# what-should-a-software-engineer-know

# Architecture & System Design Theory

## Diagrams
- C4 Model: Context, Container, Component, Code
- Sequence Diagrams
- Class Diagrams
- Deployment Diagrams
- Data Flow Diagrams
- Entity-Relationship Diagrams
- State Diagrams

## Design principles & Architecture Design
- Core principles:
  - SOLID
  - DRY
  - KISS
  - YAGNI
- Architecture Styles:
  - Layered Architecture (Controller -> Service -> Repository)
  - Monolithic Architecture
  - Microservices Architecture
  - Event-driven Architecture
  - Hexagonal Architecture (Ports and Adapters)
  - Clean Architecture
  - CQRS (Command Query Responsibility Segregation)
  - Event Sourcing

## CAP Theorem
The CAP theorem states that in distributed systems you can only guarantee 2 out of 3 properties:
- (C) Consistency: Every read get the latest write, all the nodes see the same data.
- (A) Availability: Every request get a response
- (P) Partition Tolerance: The system continues to operate despite network communication failures between nodes.

If you choose Consistency and Partition Tolerance, system may reject requests.
If you choose Availability and Partition, the system may return stale data.
You cannot choose Consistency and Availability in practice because Partition Tolerance is a must in distributed systems.

> We can state this a little bit more, Partition Tolerance is a must, we have to think about network failures, so we have to choose between Consistency and Availability.

## Idempotency
## Event-driven vs Architecture
## Saga pattern (orchestration vs choreography)
## Circuit breaker pattern
Is a design pattern in distribuited systems to prevent your application from repeatedly calling a service that is failing.
It works like a electrical circuit breaker and it has three states:
- Closed: Normal state, requests go through.
- Open: No requests are sent to the service, after a timeout, the circuit breaker goes to half-open state.
- Half-open: Allow a few requests, if they succeed, the circuit breaker goes back to closed state, if they fail, the circuit breaker goes back to open state.

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

More detailed example here https://github.com/rodriguez-rodrigo/what-should-a-software-engineer-know/blob/main/examples/react/src/components/class-component.tsx

Functional components are a newer way of writing React components, they are JavaScript functions that return JSX, they can also use hooks to manage state and side effects

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Lifecycle methods vs Hooks

React components have a lifecycle, which is the series of methods that are called at different stages of a component's life:
1. Mount: when the component is first rendered
2. Update: when the component is re-rendered due to changes in props or state
3. Unmount: when the component is removed from the DOM

These lifecycles changes depending on the type of component, in class components is pretty simple since you have specific methods for each stage of the lifecycle:

```tsx
class MyComponent extends React.Component {
    componentDidMount() {
        console.log("Mounted")
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log("Updated")
    }
    
    componentWillUnmount() {
        console.log("Unmounted")
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        // return true or false to determine if the component should re-render
    }
    
    render() {
        return <div>My Component < /div>;
    }
}
```

In the other hand functional components don't have lifecycle methods, instead they use hooks to manage side effects and state:

```ts
function MyComponent() {
    useEffect(() => {
        console.log("Mounted or Updated")
        return () => {
            console.log("Unmounted")
        }
    }, [])
}
```
As you can see in the example above, the `useEffect` hook is used to manage side effects, and all the logic for mounting, updating and unmounting is handled inside the hook.

- Mount
```ts
useEffect(() => {
    console.log("Mounted")
}, [])
```

- Update
```ts
useEffect(() => {
    console.log("Updated")
}, [state])
```

- Unmount
```ts
useEffect(() => {
    return () => {
        console.log("Unmounted")
    }
}, [])
```

- ShouldComponentUpdate
```ts
const MemoizedComponent = React.memo(MyComponent, (prevProps, nextProps) => {
    // return true if props are equal, false if props are different
})
```

### useMemo vs useCallback

The `useMemo` hook is used to memoize the result of a function, it takes a function and an array of dependencies, and it returns the memoized result of the function, it is useful for optimizing performance by avoiding expensive calculations on every render.

```ts
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

The `useCallback` hook is used to memoize a function, it takes a function and an array of dependencies, and it returns the memoized version of the function, it is useful for optimizing performance by avoiding unnecessary re-renders of child components that depend on the function.

```ts
const memoizedCallback = useCallback((props) => {
    doSomething(props);
}, [a, b]);
```

### Context API vs  Redux

The Context API is a built-in feature of React that allows you to share state across components without having to pass props down manually at every level, it is useful for simple state management and for avoiding prop drilling.
Redux is a state management library that provides a predictable state container for JavaScript applications, it is useful for managing complex state and for providing a single source of truth for the state of the application.

### useState vs useReducer

The `useState` hook is a simple way to manage state in a functional component, it takes an initial state and returns an array with the current state and a function to update it, it is useful for managing simple state that doesn't require complex logic.

```ts
const [count, setCount] = useState(0);
```

The `useReducer` hook is a more powerful way to manage state in a functional component, it takes a reducer function and an initial state, and it returns the current state and a dispatch function to update it, it is useful for managing complex state that requires complex logic.

```ts
const [state, dispatch] = useReducer(reducer, initialState);
```

### useLayoutEffect vs useEffect

The `useEffect` executes right after the render is committed to the screen, it is useful for performing side effects that don't require 
blocking the browser from updating the screen, such as fetching data, setting up subscriptions, and manually changing the DOM in React components. 
The `useLayoutEffect` executes synchronously after all DOM mutations but before the browser has a chance to paint, it is useful for performing side effects that require blocking the browser from updating the screen, such as measuring the layout of the DOM elements, or synchronously re-rendering the component.

### Controlled vs Uncontrolled Components
Controlled components are components that are controlled by React, they have their state managed by React, and they are updated through props, for example:

```tsx
function ControlledInput() {
    const [value, setValue] = useState("");
    return <input value={value} onChange={(e) => setValue(e.target.value)} />
}
```
Uncontrolled components are components that are not controlled by React, they have their state managed by the DOM, and they are updated through refs, for example:
```tsfunction UncontrolledInput() {
    const inputRef = useRef(null);
    const handleSubmit = () => {
        console.log(inputRef.current.value);
    }
    return (<>
        <input ref={inputRef} />
        <button onClick={handleSubmit}>Submit</button>
    </>)
```

### React Event System
React has a synthetic event system that is a cross-browser wrapper around the browser's native event system, 
it is designed to work the same across all browsers, and it also provides some additional features such as event delegation and batching updates:
- Event delegation: React uses event delegation to handle events, it attaches a single event listener to the root of the document, and it uses event bubbling to determine which component should handle the event, this is more efficient than attaching an event listener to each component.
- Batching updates: React batches updates to the DOM, it groups multiple updates together and applies them in a single batch, this is more efficient than applying each update individually, for example:
```ts
function MyComponent() {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }
    return <button onClick={handleClick}>Count: {count}</button>;
```
In the example above, when the button is clicked, the `handleClick` function is called, and it calls `setCount` three times, 
but React will batch these updates together and only apply the last update, so the count will only increase by 1 instead of 3, 
this is because React batches updates to the DOM, and it only applies the last update in the batch, this is more efficient than applying each update individually, 
and it also prevents unnecessary re-renders of the component.

### Prop types vs TypeScript
Prop types is a runtime type checking for React props, it is a way to validate the props passed to a component, it is useful for catching bugs and providing better error messages, for example:
```js
import PropTypes from 'prop-types';

function MyComponent(props) {
    return <div>{props.name}</div>;
}

MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
};
```
TypeScript is a statically typed superset of JavaScript that provides type checking at compile time, it is a way to catch bugs and provide better code completion and refactoring tools.
Currently, `Typescript` is the most popular way to add type checking to React applications, it provides a more robust and scalable solution for type checking than prop types,

> Anyway if you are building a library or a component that will be used by other developers, it is a good practice to use prop types to provide runtime type checking and better error messages, even if you are using TypeScript for your application.

### Refs
Refs are a way to access the DOM elements directly in React, they are created using the `useRef` hook, and they can be used to access the DOM elements, for example:
```ts
function MyComponent() {
    const inputRef = useRef(null);
    const handleClick = () => {
        console.log(inputRef.current.value);
    }
    return (<>
        <input ref={inputRef} />
        <button onClick={handleClick}>Submit</button>
    </>)
}
```

#### Forwarding refs
Forwarding refs is a technique for automatically passing a ref through a component to one of its children, it is useful for creating reusable components that can be used in different contexts, for example:

```tsx
const MyInput = React.forwardRef((props, ref) => {
    return <input ref={ref} {...props} />;
});

function MyComponent() {
    const inputRef = useRef(null);
    const handleClick = () => {
        console.log(inputRef.current.value);
    }
    return (<>
        <MyInput ref={inputRef} />
        <button onClick={handleClick}>Submit</button>
    </>)
}
```
In the example above, the `MyInput` component is a reusable component that can be used in different contexts, and it forwards the ref to the underlying `input` element, so when we use the `MyInput` component in the `MyComponent`, we can access the `input` element directly using the `inputRef`.

### Virtual DOM
The virtual DOM is a lightweight representation of the actual DOM, it is a JavaScript object that represents the structure of the DOM, it is used by React to optimize the rendering process, when a component's state or props change, React creates a new virtual DOM tree, and it compares it with the previous virtual DOM tree, and it calculates the minimum number of changes needed to update the actual DOM.
React will re-render the component when:
1. The component's state changes
2. The component's props change
3. The parent component re-renders

### Redux-thunk vs Redux-saga
Redux-thunk is a middleware that allows you to write action creators that return a function instead of an action, it is useful for handling asynchronous actions in Redux, for example:
```ts
function fetchData() {
    return (dispatch) => {
        dispatch({ type: 'FETCH_DATA_REQUEST' });
        fetch('/api/data')
            .then(response => response.json())
            .then(data => dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }))
            .catch(error => dispatch({ type: 'FETCH_DATA_FAILURE', payload: error }));
    };
}
```
Redux-saga is a middleware that allows you to write sagas, which are generator functions that can be used to handle side effects in Redux, it is useful for handling complex asynchronous actions and for managing the flow of actions in a more declarative way, for example:
```ts
function* fetchDataSaga() {
    try {
        yield put({ type: 'FETCH_DATA_REQUEST' });
        const response = yield call(fetch, '/api/data');
        const data = yield response.json();
        yield put({ type: 'FETCH_DATA_SUCCESS', payload: data });
    } catch (error) {
        yield put({ type: 'FETCH_DATA_FAILURE', payload: error });
    }
```

### Code reuse strategies
- Higher-order components (HOCs): A higher-order component is a function that takes a component and returns a new component, it is useful for reusing component logic and for creating reusable components, for example:
```tsx
function withLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return <Component {...props} />;
    };
```
- Render props: A render prop is a function prop that a component uses to know what to render, it is useful for sharing code between components using a prop whose value is a function, for example:
```tsx
function MouseTracker({ render }) {
  const [x, setX] = React.useState(0);
  return <div onMouseMove={e => setX(e.clientX)}>{render(x)}</div>;
}
<MouseTracker render={x => <p>Mouse X: {x}</p>} />
```

- Custom hooks: A custom hook is a function that uses one or more of the built-in hooks, it is useful for reusing stateful logic between components, for example:
```ts
function useCounter(initial = 0) {
  const [count, setCount] = React.useState(initial);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
const { count, increment } = useCounter();
```

- Utility functions: Utility functions are regular JavaScript functions that can be used to perform common tasks, they are useful for reusing code that doesn't depend on the component's state or props, for example:
```tsx
function formatDate(date) {
    return date.toLocaleDateString();
}
<p>{formatDate(new Date())}</p>
```

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

## Java Core Skills

## Java 8/11/17/21/2
- Java 8: Lambda expressions, Stream API, Optional, Date and Time API
```java
// Lambda expression & Stream API
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
List<String> filteredNames = names.stream()
    .filter(name -> name.startsWith("A"))
    .collect(Collectors.toList());

// Optional
String greeting = Optional.of("Hello")
    .map(s -> s + " World")
    .orElse("Hi");

// Date and Time API
LocalDate today = LocalDate.now();
```
- Java 11: var keyword, HttpClient, String methods
```java
// var keyword
var message = "Hello, World!";

// HttpClient
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

// String methods
String str = " Hello, World! ";
String trimmed = str.strip(); // "Hello, World!"
```

- Java 17: Sealed classes, Records, Pattern matching for instanceof
```java
// Sealed classes
public sealed class Shape permits Circle, Rectangle {}

// Records
public record Point(int x, int y) {}

// Pattern matching for instanceof
class Example {
    public void example(Object obj) {
         if (obj instanceof String s) {
             System.out.println(s.toUpperCase());
         }
    }
}
```

- Java 21: Virtual threads, Structured concurrency, Record patterns
```java
// Virtual threads
Thread.startVirtualThread(() -> {
    System.out.println("Hello from a virtual thread!");
});

// Structured concurrency
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future<String> future1 = scope.fork(() -> {
        // Task 1
        return "Result from task 1";
    });
    Future<String> future2 = scope.fork(() -> {
        // Task 2
        return "Result from task 2";
    });
    scope.join();
    String result1 = future1.resultNow();
    String result2 = future2.resultNow();
    System.out.println(result1);
    System.out.println(result2);
}
// Record patterns
record Point(int x, int y) {}
public void example(Object obj) {
    if (obj instanceof Point(int x, int y)) {
        System.out.println("Point coordinates: " + x + ", " + y);
    }
}
```

- Java 23: Pattern matching for switch, Record patterns enhancements, Virtual threads improvements
```java
// Pattern matching for switch
public String example(Object obj) {
    return switch (obj) {
        case String s -> "It's a string: " + s;
        case Integer i -> "It's an integer: " + i;
        default -> "Unknown type";
    };
}
```

- Java 25: Record patterns enhancements, Virtual threads improvements, Structured concurrency improvements

### JVM Internals
- Class loading: The process of loading classes into the JVM, including the class loader hierarchy and the different types of class loaders (bootstrap, platform, application).
- Memory management: The JVM manages memory through a combination of heap and stack memory.
  - Heap memory is used for dynamic memory allocation.
  - Stack memory is used for method execution and local variables.
- Garbage collection: The process of automatically freeing up memory that is no longer being used, the JVM has several garbage collection algorithms (e.g., Serial, Parallel, CMS, G1) that are optimized for different use cases.
- Just-In-Time (JIT) compilation: JIT reads bytecode and watches for "hot" code paths, which are executed frequently, and compiles them into native machine code for improved performance.
- Java Native Interface (JNI): A framework that allows Java code to interact with native applications and libraries written in other languages (e.g., C, C++).

### Functional Programming in Java
Java is primarily an object-oriented programming language, but it also has functional programming features that were introduced in Java 8, such as lambda expressions, the Stream API, and the Optional class. These features allow developers to write more concise and expressive code, and they also enable a more functional programming style in Java.
- Lambda expressions: A lambda expression is a concise way to represent an anonymous function, it can be used to create instances of functional interfaces (interfaces with a single abstract method), for example:
- Stream API: The Stream API is a powerful tool for working with collections of data, it allows you to perform operations on collections in a functional style, such as filtering, mapping, and reducing, for example:
- Optional: The Optional class is a container object that may or may not contain a non-null value, it is used to represent the presence or absence of a value, and it provides methods for working with the value if it is present, for example:

### Spring Core
Is the foundation module of the Spring Framework, it provides the core features of the framework, such as:
- Dependency injection.
- Aspect-oriented programming.
- Support for various configuration styles (e.g., XML, Java-based, annotation-based).

## OOP Principles
- Encapsulation: The principle of hiding the internal state and behavior of an object and only exposing a public interface.
- Inheritance: The principle of creating new classes based on existing classes, allowing for code reuse and the creation of a class hierarchy.
- Polymorphism: The principle of allowing objects of different classes to be treated as objects of a common superclass, enabling flexibility and extensibility in code.
- Abstraction: The principle of hiding complex implementation details and exposing only the necessary features of an object, allowing for a simpler and more intuitive interface.
---

## RMM (Richardson Maturity Model)
The Richardson Maturity Model is a way to evaluate the maturity of a RESTful API, it is based on the level of REST constraints that the API conforms to, it has four levels:
- Level 0: The API does not conform to any REST constraints, it is a simple HTTP API that uses HTTP as a transport protocol, but it does not use HTTP verbs or status codes correctly, for example:
```http
POST /users
{ "name": "Alice" }
```
- Level 1: The API conforms to the resource constraint, it uses URIs to identify resources, but it does not use HTTP verbs or status codes correctly, for example:
```http
POST /users
{ "name": "Alice" }
```
- Level 2: The API conforms to the resource and HTTP verb constraints, it uses URIs to identify resources and it uses HTTP verbs correctly, but it does not use HTTP status codes correctly, for example:
```http
POST /users
{ "name": "Alice" }
```
- Level 3: The API conforms to all REST constraints, it uses URIs to identify resources, it uses HTTP verbs correctly, and it uses HTTP status codes correctly, for example:
```http
POST /users
{ "name": "Alice" }
```

## MAP (Microservice API Pattern)
Is a catalog of best practices for designing microservice APIs in microservices architecture:
1. API Endpoint Patterns: How you define the shape of your API:
   - Operation-based: explicit actions ( createOrder() )
   - Resource-based: REST style (e.g., /users, /users/{id}).
   - Event-driven API: publish/subscribe
2. API Interaction patterns
   - Request-Response: synchronous communication
   - Messaging: asynchronous communication
   - Streaming: real-time data flow
3. API Evolution patterns
   - Versioning
   - Deprecation
   - Backward compatibility
4. API Security patterns
   - Authentication
   - Authorization
   - Rate limiting
   - Idempotency

## API Gateway Pattern
Is a single entry point for all clients to access the microservices in a microservices architecture, it is responsible for:
- Request routing
- Authentication and authorization
- Rate limiting
- Logging
- Aggregating multiple service calls
- Hiding internal architecture

# Databases

## ACID vs BASE
ACID are 4 properties that guarantee transactions typically in systems like PostgreSQL or MySQL:
- Atomicity: The entire transaction is treated as a single unit of work, either all operations succeed or all operations fail.
- Consistency: The transaction must bring the database from one valid state to another valid state, it must maintain the integrity of the database.
- Isolation: The transaction must be isolated from other transactions, it should not interfere with other transactions that are running concurrently.
- Durability: Once a transaction is committed, it will remain committed even in the case of a system failure, it guarantees that the changes made by the transaction will not be lost.

In the other hand, BASE is the opposite of ACID, and it is used in NoSQL databases Like MongoDB, Cassandra, Amazon DynamoDB:
- Basically Available: The system will always be available, even in the data is not consistent, it prioritizes availability over consistency.
- Soft state: The state can change over time, event without input.
- Eventual consistency: The data will eventually become consistent.

---



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