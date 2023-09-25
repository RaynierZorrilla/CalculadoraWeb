const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const historyList = document.getElementById("history-list");
const clearHistoryButton = document.querySelector("#clear-history"); 

// Variable para almacenar la expresión actual
let currentExpression = "";

// Función para actualizar el historial en la página y en localStorage
function updateHistory(expression, result) {
  const listItem = document.createElement("li");
  listItem.textContent = `${expression} = ${result}`;
  historyList.appendChild(listItem);
  saveToLocalStorage();
}

// Función para guardar el historial en localStorage
function saveToLocalStorage() {
  const historyItems = Array.from(historyList.children).map((item) =>
    item.textContent
  );
  localStorage.setItem("calcHistory", JSON.stringify(historyItems));
}

// Función para cargar el historial desde localStorage al cargar la página
function loadFromLocalStorage() {
  const savedHistory = localStorage.getItem("calcHistory");
  if (savedHistory) {
    const historyItems = JSON.parse(savedHistory);
    historyItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      historyList.appendChild(listItem);
    });
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "=") {
      try {
        const result = eval(currentExpression); // Evalúa la expresión actual
        if (!isNaN(result)) { // Verifica si el resultado es un número válido
          display.value = result;
          if (currentExpression) { // Verifica si hay una expresión antes de agregar al historial
            updateHistory(currentExpression, result);
          }
        } else {
          throw new Error("Error en la expresión");
        }
        currentExpression = ""; // Reinicia la expresión actual
      } catch (error) {
        alert("Error en la expresión");
      }
    } else if (btn.id === "ac") {
      display.value = "";
      currentExpression = ""; // Reinicia la expresión actual
    } else if (btn.id == "de") {
      display.value = display.value.slice(0, -1);
      currentExpression = display.value;
    } else {
      display.value += btn.id;
      currentExpression = display.value;
    }
  });
});

// Cargar historial desde localStorage al cargar la página
window.addEventListener("load", loadFromLocalStorage);

// Función para borrar todo el historial en localStorage
function clearHistory() {
  localStorage.removeItem("calcHistory");
  historyList.innerHTML = "";
}

clearHistoryButton.addEventListener("click", clearHistory);
