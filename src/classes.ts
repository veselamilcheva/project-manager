// const person: {
//   name: string;
//   age: number;
// } = {
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: 'Maximilian',
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author']
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR' };

const person = {
  name: 'Maximilian',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
};

// person.role.push('admin');
// person.role[1] = 10;

// person.role = [0, 'admin', 'user'];

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  // console.log(hobby.map()); // !!! ERROR !!!
}

if (person.role === Role.AUTHOR) {
  console.log('is author');
}


//class
abstract class Department {
  protected employees: string[] = [];

  constructor(private readonly id: number, private name: string) {}

  // describe() {
  //   console.log(`Department ${this.name} ${this.id}`);
  // }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  abstract describe(this: Department) : void;

}

//extended class inheritance
class ITDepartment extends Department {
  private lastReport: string;
  private static instance: ITDepartment;

  //getter
  get mostRecentReport() {
    if(this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No reports found');
  }

  //setter
  set mostRecentReport(value: string) {
    if(!value) {
      throw new Error('Please pass in value');
    }
    this.addReport(value);
  }

  private constructor(id: number, public admins: string[], private reports: string[]) {
    super(id, 'IT');
    this.admins = admins;
    this.lastReport = reports[0];
  }

  //instead of making new new ITDepartment outside the class SINGELTON
  static getInstance() {
    if(ITDepartment.instance) {
      return this.instance;
    }
    this.instance = new ITDepartment(1,['Max'], ['Report1', 'Report2']);
    return this.instance;
  }

  addEmployee(name: string) {
    if(name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(report: string) {
    this.reports.push(report);
  }

  describe() {
    console.log('abstract methods overwritten from another class' + this.admins);
  }
}

//const it = new ITDepartment(1,['Max'], ['Report1', 'Report2']);
const it = ITDepartment.getInstance(); //replacement of the code above
it.mostRecentReport = 'Report4';
it.describe();
it.addEmployee('Max');
it.addEmployee('Ves');
it.printEmployeeInformation();
it.addReport('Report5');
console.log('mostRecentReport',it.mostRecentReport);
console.log(it);