let list = document.querySelector(".app__list");
let textInput = document.querySelector(".add-book");
let clearBtn = document.querySelector(".clear");

// ================= Data will be saved here =================
let dataText;

// ================= Check LocalStorage =================
if (localStorage.data) {
  dataText = JSON.parse(localStorage.data);
} else {
  dataText = [
    "The Hunger Games",
    "A Little Princess",
    "Isolated",
    "Moon Knight",
  ];

  localStorage.data = JSON.stringify(dataText);
}

// to save dataMatch here for comparison
let temp;
// ================= create elements =================
function showData(dataRender) {
  if (dataRender !== temp) {
    dataRender = JSON.parse(localStorage.data);
  }

  list.innerHTML = "";
  for (let i = 0; i < dataRender.length; i++) {
    list.innerHTML += `
        <li>
            <span>${dataRender[i]}</span>
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

  // Change Border Color
  changeBorderColor();

  // show battery state
  showBatteryState();
}
// ================= show data on reload =================
showData(dataText);

// ================= Add book to list =================
function addBook(e, form) {
  e.preventDefault();

  if (!textInput.value.trim()) {
    return;
  }

  dataText.push(textInput.value);
  localStorage.data = JSON.stringify(dataText);

  showData(dataText);

  // form.reset();
  textInput.value = "";
}

// ================= Delete one item =================
function deleteItem(e) {
  dataText.splice(e, 1);
  localStorage.data = JSON.stringify(dataText);

  showData(dataText);
}

// ================= Search items =================
function search(e) {
  let lowerChar = e.value.toLowerCase();
  let dataTextMatch = [];

  list.innerHTML = "";
  for (let i = 0; i < dataText.length; i++) {
    if (dataText[i].toLocaleLowerCase().includes(lowerChar)) {
      dataTextMatch.push(dataText[i]);
    }
  }

  temp = dataTextMatch;
  return showData(dataTextMatch);
}

// ================= form search =================
function handelSubmit(e) {
  e.preventDefault();
}

// ================= Delete all items =================
function clearAll() {
  dataText = [];
  localStorage.data = JSON.stringify(dataText);
  list.innerHTML = "";
  clearBtn.style.transform = "translateY(50px)";
  clearBtn.style.cursor = "default";
}

// ================= Change border of colors =================
function changeBorderColor() {
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
  };

  li.forEach((e) => {
    e.style.borderColor = colors[localStorage.color];
    localStorage.color++;
  });
}

// show battery state
function showBatteryState() {
  let batteryState = document.querySelector(".batteryState");
  let batteryTimeCharge = document.querySelector(".batteryTimeCharge");

  navigator.getBattery().then((battery) => {
    batteryState.innerHTML = `🔋: ${battery.level * 100}%`;

    if (battery.level >= 0.2) {
      batteryState.style.color = "var(--color-green)";
    } else {
      batteryState.style.color = "var(--color-red)";
      batteryState.title = "Battery is low...";
    }
    console.log(battery.charging);

    battery.onlevelchange = () => {
      if (battery.charging) {
        document.querySelector(".batteryTimeCharge").innerHTML =
          "Charging time: " +
          (battery.chargingTime / 60).toFixed(2) +
          " minutes";
      } else {
        document.querySelector(".batteryTimeCharge").innerHTML =
          "Discharging time: " +
          (battery.dischargingTime / 60).toFixed(2) +
          " minutes";
      }
    };
  });
}
