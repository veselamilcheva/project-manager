//Generics
//const names: string[] = [];

const names: Array<string> = [];
//names[0].split(' ');

const promise: Promise<string> = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('This is done done done!!!!')
  }, 2000);
});


promise.then((data) => {
  console.log(data);
})

//build own genereci types

function merge<T extends object, U extends object>( objA: T, objB: U) {  //we don't care what is exactly the object string number but it is known that they are objects
  return Object.assign(objA, objB);
}

const resultMerge = merge({age: 4, hobbies: ['Tennis', 'Coding']}, {numberAge: 30});

console.log(resultMerge.hobbies);


interface Lengthy { //specify the type of length !??!?!? wtf we check that whtever we got has a length property
  length: number;
}


function countAndPrint<T extends Lengthy>(elem: T) {
  let desc = 'Got no value';
  if(elem.length === 1) {
    desc = 'Got 1 element'
  } else if (elem.length > 1) {
    desc = 'Got ' + elem.length + ' elements';
  }
  return [elem, desc];
}

console.log(countAndPrint('Hi there!'))


//key of contstrain property

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}


const resExtend = extractAndConvert( {name: 'Max'}, 'name'); //need to pas something in the {} and the string
console.log(resExtend);


//generic classes

class DataStorage<T extends string | number | boolean> { //only primitive due to splice and indexOf
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if(this.data.indexOf(item) === -1) { // check if it has elements 
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); // returns -1 if no elemenets find
  }

  getItems() {
    return [...this.data];
  }

}

const textStorage = new DataStorage<string>();

textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());


const textStorageNumbers = new DataStorage<number>();

textStorageNumbers.addItem(123);
textStorageNumbers.addItem(123345678);
textStorageNumbers.removeItem(123);
console.log(textStorageNumbers.getItems());


//utilized generic types Partial, Readonly

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date; 
  return courseGoal as CourseGoal; //type casting in the end will be from that type
}

// //Readonly
// let namesArr: Readonly<string[]> = ['Max', 'Anna'];
// namesArr.push('Manu');
// namesArr.pop;


//Unions -could be either one string bool or number  and Generics - lock inb certain type


