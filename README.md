# TypeScript Deep Dive: Interfaces vs Types and Union & Intersection Types

If anyone want to working with TypeScript or considering adopting it for your project, understanding its type system is crucial for writing robust, maintainable code. Today, we'll explore two fundamental aspects of TypeScript that often cause confusion among developers: the difference between interfaces and types, and the powerful concept of union and intersection types.

## Interfaces vs Types: Understanding the Nuances

While interfaces and types can sometimes be used interchangeably in TypeScript, they have distinct characteristics that make them suitable for different scenarios.

### Key Differences

**1. Declaration Merging**

One of the most significant differences is that interfaces support declaration merging, while types don't. This means you can define an interface multiple times, and TypeScript will automatically merge them.

```typescript
// Declaration merging with interfaces
interface User {
  name: string;
}

interface User {
  age: number;
}

// TypeScript merges these into:
// interface User {
//   name: string;
//   age: number;
// }

const user: User = {
  name: "Alice",
  age: 30
}; // Valid!

// With types, this isn't possible:
type Animal = {
  species: string;
};

// This would cause an error: Duplicate identifier 'Animal'
// type Animal = {
//   age: number;
// };
```

**2. Extending Behavior**

Both can be extended, but in different ways:

```typescript
// Extending interfaces
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

// Extending types
type Person = {
  name: string;
};

type Employee = Person & {
  employeeId: number;
};
```

Notice how types use intersection (`&`) to extend, while interfaces use the `extends` keyword.

**3. Complex Type Operations**

Types can represent more complex operations that aren't possible with interfaces:

```typescript
// Types can represent unions
type Status = "pending" | "approved" | "rejected";

// Types can use mapped type modifiers
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

// Types can use conditional types
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### When to Use Which

- **Use interfaces when:**
  - You're defining object shapes that might be extended later
  - You're working in an object-oriented style with classes implementing interfaces
  - You want to leverage declaration merging

- **Use types when:**
  - You need to create union or intersection types
  - You're working with function types or tuple types
  - You need to use mapped or conditional types
  - You want to ensure your type definition cannot be modified through declaration merging

## Union and Intersection Types: Combining Types for Flexibility

TypeScript's union and intersection types provide powerful ways to compose complex types from simpler ones.

### Union Types (`|`)

Union types allow a value to be one of several types, expressed using the pipe (`|`) operator:

```typescript
type ContactMethod = "email" | "phone" | "mail";

// Can hold strings or numbers
type StringOrNumber = string | number;

function displayId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

displayId("A123"); // Works with string
displayId(456);    // Works with number
```

Unions are extremely useful for modeling scenarios where a value could be of different types:

```typescript
// A more complex example
type ApiResponse<T> = 
  | { status: "success"; data: T; } 
  | { status: "error"; error: string; };

function handleResponse(response: ApiResponse<User>) {
  if (response.status === "success") {
    // TypeScript knows 'data' exists here
    processUser(response.data);
  } else {
    // TypeScript knows 'error' exists here
    logError(response.error);
  }
}
```

### Intersection Types (`&`)

Intersection types combine multiple types into one, requiring an object to fulfill all the combined types:

```typescript
type HasName = { name: string };
type HasAge = { age: number };

type Person = HasName & HasAge;

// Must have both name and age properties
const alice: Person = {
  name: "Alice",
  age: 30
};
```

Intersections are especially powerful when working with mixins or composing functionality:

```typescript
interface Logger {
  log(message: string): void;
}

interface Serializable {
  serialize(): string;
}

// Combines both capabilities
type LoggableSerializable = Logger & Serializable;

class ConfigService implements LoggableSerializable {
  constructor(private config: Record<string, any>) {}
  
  log(message: string) {
    console.log(`[Config] ${message}`);
  }
  
  serialize() {
    return JSON.stringify(this.config);
  }
}
```

### Real-World Use Cases

**State Management in React:**

```typescript
type LoadingState = {
  status: "loading";
};

type SuccessState<T> = {
  status: "success";
  data: T;
};

type ErrorState = {
  status: "error";
  error: string;
};

// Union of possible states
type RequestState<T> = LoadingState | SuccessState<T> | ErrorState;

function Component() {
  const [state, setState] = useState<RequestState<User>>({ status: "loading" });
  
  // Type narrowing based on status
  if (state.status === "loading") {
    return <Spinner />;
  } else if (state.status === "error") {
    return <ErrorMessage message={state.error} />;
  } else {
    // TypeScript knows state.data exists here
    return <UserProfile user={state.data} />;
  }
}
```

**API Composition:**

```typescript
// Base properties for all API entities
type Entity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// Specific models
type User = Entity & {
  name: string;
  email: string;
};

type Product = Entity & {
  title: string;
  price: number;
};

// Generic CRUD operations
function createEntity<T extends Entity>(entity: Omit<T, "id" | "createdAt" | "updatedAt">) {
  // Implementation...
}
```

## Conclusion

Understanding the differences between interfaces and types, along with mastering union and intersection types, significantly enhances your ability to model complex data and behaviors in TypeScript. 

Interfaces excel at defining clear contracts for object shapes, especially in object-oriented contexts with inheritance. Types offer greater flexibility for complex type manipulations and compositions.

Union and intersection types allow you to compose sophisticated type relationships that accurately model your application's domain, leading to better type safety and developer experience.

By choosing the right tool for each situation, you can leverage TypeScript's type system to catch errors at compile-time, improve code documentation, and enhance maintainability across your projects.

Remember that the best TypeScript code often uses a combination of these features, creating a type system that's both strict enough to catch errors and flexible enough to express complex relationships.