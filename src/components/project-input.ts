import { Component } from "./base-component";
import { Validatable, validate } from "../util/validation";
import { projectState } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super(`project-input`, "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }
  renderContent() {}
  private gatherUserInput = (): [string, string, number] | void => {
    const enteredTitle = this.titleInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  };

  private clearUserInput = (): void => {
    this.peopleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.titleInputElement.value = "";
  };
  private submitHandler = (event: Event) => {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearUserInput();
    }
  };

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}
