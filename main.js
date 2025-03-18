const btnInsert = document.getElementById("btnInsert");
const btnClearEntry = document.getElementById("btnClearEntry");
const btnClearItems = document.getElementById("btnClearItems");
const btnGetTotal = document.getElementById("btnGetTotal");
const btnIdentify = document.getElementById("btnIdentify");
const sortSelect = document.getElementById("sortSelect");

const tbl = document.getElementById("tblNumbers");

let numbersArr = [];
let total = 0;

// Insert number into the array
function insertNumber() {
    const txtNum = document.getElementById("txtNum").value;
    const regex = /^[0-9]+$/;

    if (txtNum.match(regex)) {
        let num = parseInt(txtNum);
        numbersArr.push(num);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a valid positive number.");
        document.getElementById("txtNum").value = "";
        return;
    }

    displayNumbers();
}

// Display all numbers in the table
function displayNumbers() {
    tbl.innerHTML = ""; // Clear existing rows
    total = 0;

    if (numbersArr.length > 0) {
        numbersArr.forEach((num, i) => {
            const tr = document.createElement("tr");
            const tdNum = document.createElement("td");
            const tdType = document.createElement("td");
            const tdRemove = document.createElement("td");
            const tdEdit = document.createElement("td");

            tdNum.innerText = num;
            tdType.innerText = num % 2 === 0 ? "EVEN" : "ODD";
            tdType.style.color = num % 2 === 0 ? "green" : "blue";

            // Remove Button
            const btnRemove = document.createElement("button");
            btnRemove.innerText = "Remove";
            btnRemove.onclick = () => removeNumber(i);

            // Edit Button
            const btnEdit = document.createElement("button");
            btnEdit.innerText = "Edit";
            btnEdit.onclick = () => editNumber(i);

            tdRemove.appendChild(btnRemove);
            tdEdit.appendChild(btnEdit);

            tr.appendChild(tdNum);
            tr.appendChild(tdType);
            tr.appendChild(tdRemove);
            tr.appendChild(tdEdit);

            tbl.appendChild(tr);

            total += num;
        });

        // Display highest and lowest values
        document.getElementById("highest").innerText = Math.max(...numbersArr);
        document.getElementById("lowest").innerText = Math.min(...numbersArr);
    } else {
        document.getElementById("highest").innerText = "-";
        document.getElementById("lowest").innerText = "-";
    }
}

// Remove number from the array
function removeNumber(index) {
    numbersArr.splice(index, 1);
    displayNumbers();
}

// Edit a number in the array
function editNumber(index) {
    const newValue = prompt("Enter new number:", numbersArr[index]);
    const regex = /^[0-9]+$/;

    if (newValue && newValue.match(regex)) {
        numbersArr[index] = parseInt(newValue);
        displayNumbers();
    } else {
        alert("Invalid input. Please enter a positive number.");
    }
}

// Clear the input field
btnClearEntry.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

// Clear all numbers from the array
btnClearItems.addEventListener("click", () => {
    numbersArr = [];
    displayNumbers();
});

// Get the total of all numbers
btnGetTotal.addEventListener("click", () => {
    alert(`Total of Numbers: ${total}`);
});

// Identify highest and lowest numbers
btnIdentify.addEventListener("click", () => {
    if (numbersArr.length > 0) {
        alert(`Highest: ${Math.max(...numbersArr)}\nLowest: ${Math.min(...numbersArr)}`);
    } else {
        alert("No numbers to analyze.");
    }
});

// Sort numbers based on selection
sortSelect.addEventListener("change", () => {
    if (sortSelect.value === "Ascending") {
        numbersArr.sort((a, b) => a - b);
    } else if (sortSelect.value === "Descending") {
        numbersArr.sort((a, b) => b - a);
    }
    displayNumbers();
});

// Add event listener to insert number on button click or 'Enter' key
btnInsert.addEventListener("click", insertNumber);
document.getElementById("txtNum").addEventListener("keydown", (event) => {
    if (event.key === "Enter") insertNumber();
});

