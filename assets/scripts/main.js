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

// ================= create elements =================
function showData(dataRender) {
  list.innerHTML = "";
  dataRender.forEach((book, index) => {
    list.innerHTML += `
        <li>
            <span>${book}</span>
            <button onclick="deleteItem(${index})">delete</button>
        </li>
      `;
  });

  // to show clear btn
  if (dataRender.length > 0) {
    clearBtn.style.transform = "translateY(0px)";
    clearBtn.innerHTML = "Clear: " + dataText.length;
    clearBtn.style.cursor = "pointer";
  } else {
    clearBtn.style.transform = "translateY(60px)";
    clearBtn.style.cursor = "default";
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
  dataText = JSON.parse(localStorage.data);
  showData(dataText);

  // form.reset();
  textInput.value = "";
}

// ================= Delete one item =================
function deleteItem(bookIndex) {
  dataText.splice(bookIndex, 1);
  localStorage.data = JSON.stringify(dataText);
  dataText = JSON.parse(localStorage.data);
  showData(dataText);
}

// ================= Search items =================
function search(searchInput) {
  value = searchInput.value;

  let lowerChar = value.toLowerCase();
  let dataTextMatch = [];

  dataTextMatch = dataText.filter((book) => {
    return book.toLowerCase().includes(lowerChar);
  });

  dataTextMatch = dataTextMatch.map((book) => {
    return book
      .split("")
      .map((char) => {
        return lowerChar.includes(char.toLowerCase())
          ? `<mark>${char}</mark>`
          : char;
      })
      .join("");
  });

  showData(dataTextMatch);
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
  showData(dataText);
}

// ================= Change border of colors =================
function changeBorderColor() {
  let li = document.querySelectorAll(".app__list li");

  li.forEach((e) => {
    e.style.borderColor = "#" + Math.random().toString(16).slice(2, 8);
  });
}

// show battery state
function showBatteryState() {
  let batteryState = document.querySelector(".batteryState");
  let batteryTimeCharge = document.querySelector(".batteryTimeCharge");

  navigator.getBattery().then((battery) => {
    // Battery percentage State
    batteryState.innerHTML = `🔋: ${battery.level * 100}%`;

    if (battery.level >= 0.2) {
      batteryState.style.color = "var(--color-green)";
    } else {
      batteryState.style.color = "var(--color-red)";
      batteryState.title = "Battery is low...";
    }
    // Battery Charge State
    document.querySelector(".batteryStateCharge").innerHTML =
      "Batter Charge is: " + battery.charging;

    // Battery Charge State
    battery.onlevelchange = () => {
      if (battery.charging) {
        document.querySelector(".batteryTimeCharge").innerHTML =
          "Charging time: " +
          Math.round(battery.chargingTime / 60) +
          " minutes";
      } else {
        document.querySelector(".batteryTimeCharge").innerHTML =
          "Discharging time: " +
          Math.round(battery.dischargingTime / 60) +
          " minutes";
      }
    };
  });
}
