let cards = [
  "mario", "quim", "toni", "pedro", "pipa", "bruna", "maria", "paulo",
  "mario", "quim", "toni", "pedro", "pipa", "bruna", "maria", "paulo"
];

let cardNames = {
  mario: "Mário", quim: "Quim", toni: "Toni", pedro: "Pedro",
  pipa: "Pipa", bruna: "Bruna", maria: "Maria", paulo: "Paulo"
};

let clickedCards = [];
let matchedCards = [];
let modal = document.getElementById("custom-alert");
let closeButton = document.getElementsByClassName("close")[0];
let refreshButton = document.getElementsByClassName("refresh")[0];

refreshButton.onclick = function () {
  console.log("refresh init");
  location.reload();
}

closeButton.onclick = function () {
  console.log("close init");
  modal.style.display = "none";
  location.reload();
}

function random(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initGame() {
  const shuffleCards = random(cards);
  const container = document.getElementById("container");

  container.innerHTML = "";

  shuffleCards.forEach((card) => {
    const button = document.createElement("button");
    button.textContent = "🤷🏻‍♂️";
    button.classList.add("card");
    button.addEventListener("click", () => handleCardClick(button, card));
    container.appendChild(button);
  });
}

function handleCardClick(button, card) {
  if (!button.classList.contains("opened") && clickedCards.length < 2) {
    button.textContent = cardNames[card];
    button.classList.add("opened");
    clickedCards.push({ button, card });
    console.log("clickedCards");

    if (clickedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = clickedCards;
  const isMatch = cardNames[card1.card] === cardNames[card2.card];

  if (isMatch) {
    card1.button.classList.add("matched");
    card2.button.classList.add("matched");
    matchedCards.push(card1, card2);
    clickedCards = [];
    console.log("matchedCards")

    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        modal.style.display = "block";
      }, 100);
      console.log("modal loaded")
    }
  } else {
    setTimeout(() => {
      card1.button.textContent = "🤷🏻‍♂️";
      card2.button.textContent = "🤷🏻‍♂️";
      card1.button.classList.remove("opened");
      card2.button.classList.remove("opened");
      clickedCards = [];
    });
  }
}
initGame();
