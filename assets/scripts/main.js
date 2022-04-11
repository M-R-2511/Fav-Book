let list = document.querySelector(".app__list");
let textInput = document.querySelector(".add-book");
let clearBtn = document.querySelector(".clear");

// Data will be saved here
let dataText = [
  "The Hunger Games",
  "A Little Princess",
  "Isolated",
  "Moon Knight",
];

// create elements
function showData() {
  list.innerHTML = "";
  for (let i = 0; i < dataText.length; i++) {
    list.innerHTML += `
        <li>
            <span>${dataText[i]}</span>
            <button onclick="deleteItem(${i})">delete</button>
        </li>
      `;
  }

  // to show clear btn
  if (dataText.length > 0) {
    clearBtn.style.transform = "translateY(0px)";
    clearBtn.innerHTML = "Clear: " + dataText.length;
    clearBtn.style.cursor = "pointer";
  }
}
// show data on reload
showData();

// Add book to list
function addBook(e, form) {
  e.preventDefault();

  if (!textInput.value.trim()) {
    return;
  }

  dataText.push(textInput.value);

  showData();

  //   form.reset();
  textInput.value = "";
}

// Delete one item
function deleteItem(e) {
  dataText.splice(e, 1);
  showData();
}

// Search items
function search(e) {
  let lowerChar = e.value.toLowerCase();

  list.innerHTML = "";
  for (let i = 0; i < dataText.length; i++) {
    if (dataText[i].toLocaleLowerCase().includes(lowerChar)) {
      list.innerHTML += `
          <li onmouseenter="colorBorderDefault(${this})">
          <span>${dataText[i]}</span>
          <button onclick="deleteItem(${i})">delete</button>
          </li>
        `;
    }
  }
}

// form search
function handelSubmit(e) {
  e.preventDefault();
}

// Delete all items
function clearAll() {
  dataText = [];
  list.innerHTML = "";
  clearBtn.style.transform = "translateY(50px)";
  clearBtn.style.cursor = "default";
}

// Change border of colors
let li = document.querySelectorAll(".app__list li");

const colors = [
  "#40486D",
  "#1482b5",
  "#009868",
  "#808000",
  "#C19A6B",
  "#540D6E",
  "#FFD23F",
  "#000",
];

localStorage.colors = JSON.stringify(colors);

const colorsStorage = JSON.parse(localStorage.colors);

if (!localStorage.color || localStorage.color >= colors.length - 1) {
  localStorage.color = -1;
}

window.onload = () => {
  localStorage.color++;

  li.forEach((e) => (e.style.borderColor = colors[localStorage.color]));
};

for (let i = 0; i < colorsS.length; i++) {
  li.forEach((e) => () => {});
}
