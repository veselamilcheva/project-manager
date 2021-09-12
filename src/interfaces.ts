//interface - blueprint of a class use interface as a type

interface Person {
  name: string,
  age: number,

  greet(phrase: string): void;
}

//same as custom type - but interface is only for objects implement interface in a class contract for classes
// type Person = {
//   name: string,
//   age: number,

//   greet(phrase: string): void;
// }

let user1: Person;

user1 = {
  name: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + this.name);
  }
}

user1.greet('Hi there - I am ');


//interfaces with classes

interface Greetable {
  name: string,
  age: number,

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log('in the class', phrase + this.name);
  }
}

let user2: Greetable;
user2 = new Person('Ves');

user2.greet('Hi I am Massimo maybe ');



