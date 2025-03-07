const nameInput = document.querySelector("#amigo");
const addButton = document.querySelector("#addButton");
const drawButton = document.querySelector("#drawButton");
const resetButton = document.querySelector("#resetButton");
const nameList = document.querySelector("#listaAmigos");
const drawResult = document.querySelector("#drawResult");
const message = document.querySelector("#message");
const modal = document.querySelector("#instructionsModal"); //
const closeModal = document.querySelector("#closeModal");

let names = [];
let availableNames = []; // Lista de nombres aún no sorteados

// Mostrar el modal al cargar la página
window.addEventListener("load", () => {
  modal.classList.add("show");
});

// Cerrar el modal al hacer clic en "Entendido"
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

function showMessage(msg) {
  message.textContent = msg;
}

function addName() {
  const name = nameInput.value.trim();

  // Validar que el nombre tenga al menos 3 letras
  if (name.length < 3) {
    showMessage("El nombre debe tener al menos 3 letras.");
    return;
  }

  if (names.includes(name)) {
    showMessage("Este nombre ya ha sido agregado.");
    return;
  }

  names.push(name);
  availableNames.push(name); // También lo agregamos a la lista de disponibles
  updateNameList();
  nameInput.value = "";
  checkDrawButton();
  showMessage("");
}

function updateNameList() {
  nameList.innerHTML = "";
  names.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    nameList.appendChild(li);
  });
}

function checkDrawButton() {
  drawButton.disabled = names.length < 4 || names.length % 2 !== 0;
}

function drawSecretFriend() {
  if (availableNames.length === 0) return; // No hace nada si ya no hay nombres

  let randomIndex = Math.floor(Math.random() * availableNames.length);
  let selectedName = availableNames.splice(randomIndex, 1)[0]; // Remueve y obtiene el nombre

  drawResult.textContent = `Tu amigo secreto es: ${selectedName}`;

  // Si ya no quedan nombres por sortear
  if (availableNames.length === 0) {
    setTimeout(() => {
      // Mostrar mensaje de finalización del juego por 3 segundos
      showMessage("¡El sorteo ha finalizado!");

      setTimeout(() => {
        showMessage(""); // Borra el mensaje
        resetGame(); // Llamar a la función de reinicio automático
      }, 3000);
    }, 3000); // Se ejecuta después de que desaparezca el último resultado
  } else {
    // Si aún quedan nombres, simplemente oculta el resultado después de 3 segundos
    setTimeout(() => {
      drawResult.textContent = "";
    }, 3000);
  }

  drawButton.disabled = availableNames.length === 0; // Deshabilitar si ya no hay nombres
}

// Función para reiniciar el juego automáticamente
function resetGame() {
  names = [];
  availableNames = [];
  updateNameList();
  drawResult.textContent = "";
  showMessage("");
  checkDrawButton();
  nameInput.value = "";
}

// Evento para añadir nombres
addButton.addEventListener("click", addName);
nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addName();
});

// Evento para sortear
drawButton.addEventListener("click", drawSecretFriend);

// Evento para reiniciar sin confirmación
resetButton.addEventListener("click", () => {
  names = [];
  availableNames = [];
  updateNameList();
  drawResult.textContent = "";
  showMessage("");
  checkDrawButton();
  nameInput.value = "";
});
