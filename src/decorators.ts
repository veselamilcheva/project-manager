function Logger(logString: string) { //capital letter !!!decorator created before we even call the class
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  }
}

function WithTemplate(template: string, hookId: string) {
  return function<T extends {new(...arg: any[]): {name: string}}>(
    originalConstructor: T) {
    return class extends originalConstructor { //new constructor function replaces the original constructor function
      constructor(...arg: any[]) {
        super();
        const hookEl = document.getElementById(hookId);
        const p = new originalConstructor();
        if(hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = p.name;
        }
      }
    }
  }
}


@Logger('LOGGING') //decorator function (factory decorators) 1
@WithTemplate('<h1>My Person Object</h1>', 'app') //execution of the actuall decorator function happens bottom first 2

class Person1 {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person1();

console.log(pers);


//Advance Decoarators

function Log(target: any, propertyName: string | Symbol) { //Property decorator for title 
  console.log('Log Property decorator', target, propertyName)
}

function Log2(target: any, name: string,  descriptor: PropertyDescriptor) { //Accessor decorator for get / set 
  console.log('Log2 Accessor decorator',target, name, descriptor)
}

function Log3(target: any, name: string | Symbol,  descriptor: PropertyDescriptor) { //Method decorator it has value and method you can return in all decorators
  console.log('Log3 Method decorator',target, name, descriptor)
}

function Log4(target: any, name: string | Symbol,  position: number) { //Parameter decorator it has the index of the argument
  console.log('Log4 Parameter decorator',target, name, position)
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if( val > 0 ) {
      this._price = val;
    }
    throw new Error('Invalid price > 0');
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book2', 119);


//AutoBind 
function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {  //descriptor
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  }
  return adjDescriptor;
}

class Printer {
  message = 'This works';

  @AutoBind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

//Validators-----------------------class-validator(git better way)-----------------------------------------------

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  } 
}

const registeredValidators: ValidatorConfig = {};
 
function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}
 
function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validateFn(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if(!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      console.log('validator',validator)
      switch(validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);


  if(!validateFn(createdCourse)) {
    alert('invalid InputDeviceInfo, please try again');
    return; 
  }
  console.log(createdCourse);
} )
