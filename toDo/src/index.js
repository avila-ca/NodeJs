var inputTag = document.querySelector("input");
var toList = document.querySelector(".list");
var inputForm = document.querySelector("form");
var ToDoList = /** @class */ (function () {
    function ToDoList(toDo) {
        this.toDo = toDo;
    }
    ToDoList.prototype.list = function () {
        return "- ".concat(this.toDo, ".");
    };
    return ToDoList;
}());
inputTag.addEventListener('submit', function (e) {
    e.preventDefault();
    var oneObj = new ToDoList(inputTag.value);
    toList.innerText = oneObj.list();
    inputForm.reset();
});
