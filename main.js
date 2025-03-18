const btnInsert = document.getElementById("btn1");
const btnClearEntry = document.getElementById("btn2");
const btnClearItems = document.getElementById("btn3");
const btnGetTotal = document.getElementById("btn4");
const btnShowHighestLowest = document.getElementById("btn5");
const sortSelect = document.getElementById("sortSelect");

const tbl = document.getElementById("tblNumbers");
const highestDisplay = document.getElementById("highest");
const lowestDisplay = document.getElementById("lowest");
const highestLowestSection = document.getElementById("highestLowest");

let numbersArr = [];
let total = 0;

// Insert a number
btnInsert.addEventListener("click", insertNumber);
document.getElementById("txtNum").addEventListener("keydown", (event) => {
    if (event.key === "Enter") insertNumber();
});

// Clear entry
btnClearEntry.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

// Clear all items
btnClearItems.addEventListener("click", () => {
    numbersArr = [];
    displayNumbers();
    highestLowestSection.style.display = "none";
});

// Get total
btnGetTotal.addEventListener("click", () => {
    alert(`Total of Numbers: ${total}`);
});

// Show highest and lowest
btnShowHighestLowest.addEventListener("click", () => {
    if (numbersArr.length > 0) {
        highestLowestSection.style.display = "block";
        highestDisplay.textContent = Math.max(...numbersArr);
        lowestDisplay.textContent = Math.min(...numbersArr);
    } else {
        alert("No numbers inserted yet!");
        highestLowestSection.style.display = "none";
    }
});

// Sorting options
sortSelect.addEventListener("change", () => {
    if (sortSelect.value === "Ascending") {
        numbersArr.sort((a, b) => a - b);
    } else if (sortSelect.value === "Descending") {
        numbersArr.sort((a, b) => b - a);
    }
    displayNumbers();
});

// Insert number function
function insertNumber() {
    const inputField = document.getElementById("txtNum");
    const num = parseInt(inputField.value);

    if (!isNaN(num) && num > 0) {
        numbersArr.push(num);
        inputField.value = "";
        displayNumbers();
        highestLowestSection.style.display = "none"; // Hide when inserting new data
    } else {
        alert("Please enter a valid positive number.");
        inputField.value = "";
    }
}

// Display numbers
function displayNumbers() {
    tbl.innerHTML = "";
    total = 0;

    numbersArr.forEach((num, index) => {
        const tr = document.createElement("tr");
        const tdNumber = document.createElement("td");
        const tdType = document.createElement("td");
        const tdActions = document.createElement("td");

        tdNumber.textContent = num;
        tdType.textContent = num % 2 === 0 ? "EVEN" : "ODD";
        tdType.className = num % 2 === 0 ? "even" : "odd";

        // Remove and Edit buttons
        const btnRemove = document.createElement("button");
        btnRemove.textContent = "Remove";
        btnRemove.addEventListener("click", () => removeNumber(index));

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.addEventListener("click", () => editNumber(index));

        tdActions.appendChild(btnRemove);
        tdActions.appendChild(btnEdit);

        tr.appendChild(tdNumber);
        tr.appendChild(tdType);
        tr.appendChild(tdActions);

        tbl.appendChild(tr);
        total += num;
    });

    btnGetTotal.style.display = numbersArr.length ? "inline" : "none";
    highestLowestSection.style.display = "none"; // Hide when list is updated
}

// Remove number
function removeNumber(index) {
    numbersArr.splice(index, 1);
    displayNumbers();
}

// Edit number
function editNumber(index) {
    const newValue = prompt("Enter new value:", numbersArr[index]);
    const num = parseInt(newValue);

    if (!isNaN(num) && num > 0) {
        numbersArr[index] = num;
        displayNumbers();
    } else {
        alert("Please enter a valid positive number.");
    }
}
