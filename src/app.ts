//Manage global state jeje VUEX it is
class ProjectState {
  private listeners = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {
    
  }

  static getInstance()  {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numberOfPeople
    };
    this.projects.push(newProject);
  }
}

const projectState = ProjectState.getInstance();



//Validation
interface Validatable {
  value: string | number;
  reguired: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;

  if(validatableInput.reguired) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if(validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && (validatableInput.value.length >= validatableInput.minLength);
  }

  if(validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && (validatableInput.value.length <= validatableInput.maxLength);
  }

  if(validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && (validatableInput.value >= validatableInput.min);
  }

  if(validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && (validatableInput.value <= validatableInput.max);
  }


  return isValid;
}

//autobind decorator
function AutoBinder(
  _: any, 
  _2: string, 
  descriptor: PropertyDescriptor ) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    }
    return adjDescriptor;
}

//Project List class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content, 
      true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    this.attach();
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

//Project Input class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content, 
      true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';


    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;


    this.configure();  
    this.attached();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      reguired: true
    }
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      reguired: true,
      minLength: 5,
    }
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      reguired: true,
      min: 5,
      max: 10
    }

    if(
      !validate(titleValidatable) 
      || !validate(descriptionValidatable) 
      || !validate(peopleValidatable)) {
        alert('Invalid input, please try again!');
        return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @AutoBinder
  private submitHandler( event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if(Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attached() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();

const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');










