const toDoItems = [];


const addButton = document.getElementById("addButton");

function updateProgresBar() {
    let counter = 0;

    for (let i = 0; i < toDoItems.length; i++) {
        if (toDoItems[i].done) {
            counter++;
        }



        const precente = (counter / toDoItems.length) * 100;

        const progresbar = document.getElementById("progresBar");
        if (progresbar) {
            progresbar.style.width = `${precente}%`;
        }
    }
}

function createToDoitem(name, urgent, index) {
    const div = document.createElement("div");
    div.className = "alert alert-primary d-flex flex-column";
    div.role = "alert";

    if (urgent) {
        const strong = document.createElement("strong");
        strong.innerHTML = "URGENT";
        div.append(strong);
    }

    div.append(name);

    const cbDiv = document.createElement("div");
    cbDiv.className = "form-check";

    const input = document.createElement("input");
    input.className = "form-check-input";
    input.type = "checkbox";
    input.onclick = function () {
        toDoItems[index].done = !toDoItems[index].done;
        updateProgresBar();

    }

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.innerHTML = "Done";

    cbDiv.append(input);
    cbDiv.append(label);

    div.append(cbDiv);

    return div;
}

function addItem() {
    //Get data from form
    const nameInput = document.getElementById("nameInput");
    let nameInputValue = "";
    if (nameInput) nameInputValue = nameInput.value;

    if (!nameInputValue) return;

    const cbUrgent = document.getElementById("check");
    let cbUrgentValue = false;
    if (cbUrgent) cbUrgentValue = cbUrgent.checked;

    console.log(nameInputValue, cbUrgentValue);

    const newItem = createToDoitem(nameInputValue, cbUrgentValue, toDoItems.length);

    const items = document.getElementById("items");
    if (items) {
        if (items.children.length === 0)
            items.innerHTML = "";
        items.append(newItem);
        toDoItems.push({
            name: nameInputValue,
            urgent: cbUrgentValue,
            done: false

        });
        updateProgresBar();



    }

    ///Remove data from form
    if (nameInput) nameInput.value = "";
    if (cbUrgent) cbUrgent.checked = false;

}

if (addButton) {
    addButton.onclick = addItem;


}