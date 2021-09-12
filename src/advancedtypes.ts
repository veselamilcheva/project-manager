//intersection types
type Admin = {
  name: string;
  privileges: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}


//interface ElevatedEmployee extends Emplyee, Admin {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-servers'],
  startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; 

//type guards: instanceof, typeof, in
function add(a: Combinable, b: Combinable) {
  if(typeof a === 'string' || typeof b === 'string') {  //typeof guard ?!?
    return add.toString() + b.toString();
  }
  return a + b;
}


type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name' + emp.name);
  if('privileges' in emp) {       //guard
    console.log('Privelege' + emp.privileges);
  }
  if('startDate' in emp) {       //guard
    console.log('startDate' + emp.startDate);
  }
}


printEmployeeInformation(e1);


class Car {
  drive() {
    console.log('Driving me crazy...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
      console.log('Loading a cargo ....' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle( vechicle: Vehicle) {
  vechicle.drive();
  if (vechicle instanceof Truck) { //not with interfaces type guards
    vechicle.loadCargo(1000);
  }
}

useVehicle(v2);


//Discriminated unions

interface Bird {
  type: 'bird'; //assigning type so we can confirm when used
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch(animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
    return speed;
}

const result = moveAnimal({type: 'bird', flyingSpeed: 10});

console.log(result);

//Optional chaining
const fetchData = {
  id: 'u1',
  nname: 'Max',
  job: { title: 'CEO', description: 'Company' }
}

console.log(fetchData?.job?.description);

//nullish data interesting !!!

const userInput = null;
const storeData = userInput ?? 'DEFAULT';

console.log(storeData);

