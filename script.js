const board = document.getElementById('board');
const startButton = document.getElementById('startButton');
const completedCounter = document.getElementById('completed');
const remainingCounter = document.getElementById('remaining');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let remainingPairs = 8;
let timer = 0;
let timerInterval;
let gameStarted = false;

// Crear cartas y añadirlas al tablero
function createBoard() {
  const images = [];
  for (let i = 1; i <= 8; i++) {
    images.push(`img/gato${i}.jpeg`, `img/gato${i}.jpeg`);
  }

  // Barajar imágenes con mayor aleatoriedad
  let shuffledImages = shuffleImages(images);

  shuffledImages.forEach((image) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;

    const img = document.createElement('img');
    img.src = image;
    card.appendChild(img);

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
    cards.push(card);
  });
}

// Función para barajar las imágenes (mejor aleatoriedad)
function shuffleImages(images) {
  for (let i = images.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [images[i], images[randomIndex]] = [images[randomIndex], images[i]];
  }
  return images;
}

// Girar carta
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Verificar coincidencia
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.image === card2.dataset.image) {
    matchedPairs++;
    remainingPairs--;
    completedCounter.textContent = matchedPairs;
    remainingCounter.textContent = remainingPairs;
    flippedCards = [];

    if (matchedPairs === 8) {
      clearInterval(timerInterval);
      message.textContent = '¡Felicidades, ganaste!';
      startButton.textContent = 'Iniciar';
      gameStarted = false;
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Iniciar temporizador
function startTimer() {
  timer = 0;
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
}

// Iniciar/Finalizar juego
function toggleGame() {
  if (!gameStarted) {
    startGame();
    startButton.textContent = 'Finalizar';
    gameStarted = true;
  } else {
    endGame();
  }
}

// Finalizar juego
function endGame() {
  clearInterval(timerInterval);
  startButton.textContent = 'Iniciar';
  message.textContent = '¡Juego terminado!';
  gameStarted = false;
}

// Configuración inicial del juego
function startGame() {
  board.innerHTML = '';
  message.textContent = '';
  matchedPairs = 0;
  remainingPairs = 8;
  completedCounter.textContent = matchedPairs;
  remainingCounter.textContent = remainingPairs;
  timerDisplay.textContent = '0';
  clearInterval(timerInterval);
  createBoard();
  startTimer();
}

startButton.addEventListener('click', toggleGame);

// Inicializar el tablero con cartas ocultas
createBoard();
