const inputTag = document.querySelector("input") as HTMLInputElement;
const toList = document.querySelector(".list")  as HTMLDivElement;
const inputForm = document.querySelector("form")!;


interface OneToDo {
    toDo: String;
}

class ToDoList implements OneToDo {
    constructor (public toDo: string) {}
    
    list() {
        return `- ${this.toDo}.`;
    }

 }

inputTag.addEventListener('submit', (e: any) => {
    e.preventDefault(); 

    const oneObj = new ToDoList(inputTag.value);

    toList.innerText = oneObj.list();
    console.log(toList.innerText);
    inputForm.reset(); 
})