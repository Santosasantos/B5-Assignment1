# TypeScript Deep Dive: Interfaces vs Types and Union & Intersection Types

Typescript is made on the top of JavaScript but it's introducing the integration of more suitable advanced features which offering us to make our system more robust and maintainable. Today, we'll explore two fundamental aspects of TypeScript that often cause confusion among developers: the difference between interfaces and types, and the powerful concept of union and intersection types.

## Interfaces vs Types: Understanding the Nuances

Though in typescript interface and Type alias uses like interchangeable but they have distinct characteristics that make them suitable for different scenarios.

### Key Differences

**1. Declaration Merging**

One of the most significant differences is that interfaces support declaration merging, while types don't. This means you can define an interface multiple times, and TypeScript will automatically merge them.

```typescript
// Declaration merging with interfaces
interface Person {
  name: string;
}

interface User {
  nid: number;
}

// TypeScript merges these into:
// interface Person {
//   name: string;
//   nid: number;
// }

const person1: Person = {
  name: "Santo",
  age: 23
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

## Union and Intersection Types: Combining Types for Flexibility

TypeScript's union and intersection types provide powerful ways to compose complex types from simpler ones.

### Union Types (`|`)

Union types allow a value to be one of several types, expressed using the pipe (`|`) operator:

```typescript
type Vehicle = "car" | "bike" | "ship";

// Can hold strings or numbers
type StringOrNumber = string | number;

function displayId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

displayId("Hello"); // Works with string
displayId(23);    // Works with number
```

### Intersection Types (`&`)

Intersection types combine multiple types into one, requiring an object to fulfill all the combined types:

```typescript
type HasName = { name: string };
type HasAge = { age: number };

type Person = HasName & HasAge;

// Must have both name and age properties
const alice: Person = {
  name: "Santo",
  age: 23
};
```

## Conclusion

Understanding the differences between interfaces and types, along with mastering union and intersection types, significantly enhances your ability to model complex data and behaviors in TypeScript. 

Interfaces excel at defining clear contracts for object shapes, especially in object-oriented contexts with inheritance. Types offer greater flexibility for complex type manipulations and compositions.

Union and intersection types allow you to compose sophisticated type relationships that accurately model your application's domain, leading to better type safety and developer experience.

By choosing the right tool for each situation, you can leverage TypeScript's type system to catch errors at compile-time, improve code documentation, and enhance maintainability across your projects.

Remember that the best TypeScript code often uses a combination of these features, creating a type system that's both strict enough to catch errors and flexible enough to express complex relationships.