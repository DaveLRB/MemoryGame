const cards = [
  "mario",
  "joaquim",
  "antonio",
  "pedro",
  "filipa",
  "bruna",
  "maria",
  "paulo",
  "mario",
  "joaquim",
  "antonio",
  "pedro",
  "filipa",
  "bruna",
  "maria",
  "paulo",
];
const cardNames = {
  mario: "Mário",
  joaquim: "Joaquim",
  antonio: "António",
  pedro: "Pedro",
  filipa: "Filipa",
  bruna: "Bruna",
  maria: "Maria",
  paulo: "Paulo",
  mario: "Mário",
  joaquim: "Joaquim",
  antonio: "António",
  pedro: "Pedro",
  filipa: "Filipa",
  bruna: "Bruna",
  maria: "Maria",
  paulo: "Paulo",
};

initGame();

let clickedCards = [];
let matchedCards = [];
let modal = document.getElementById("custom-alert");
let closeButton = document.getElementsByClassName("close")[0];

closeButton.onclick = function() {
  modal.style.display = "none";
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
    const button=document.createElement("button"); 
    button.innerHTML = card;
    button.textContent = cardNames[card];
    button.classList.add("card");
    container.appendChild(button);
  });

  container.addEventListener("click", function (event) {
    const clickCard = event.target;
    if (clickCard.classList.contains("card")) {
      handleCardClick(clickCard);
    }
  });

  function handleCardClick(card) {
    const cardName = card.textContent.trim(); 

    if (clickedCards.length < 2 && !matchedCards.includes(card)) {
      card.textContent = cardNames[cardName]; 
      card.classList.add("opened"); 
      clickedCards.push(card);

      if (clickedCards.length === 2) {
        const [card1, card2] = clickedCards;
        const cardName1 = card1.textContent.trim(); 
        const cardName2 = card2.textContent.trim(); 
        const isMatch = cardNames[cardName1] === cardNames[cardName2]; 

        if (isMatch) {
          matchedCards.push(card1, card2);
          card1.classList.add("matched"); 
          card2.classList.add("matched");
          clickedCards = [];
        } else {
          setTimeout(() => {
            card1.textContent = cardNames[cardName1]; 
            card2.textContent = cardNames[cardName2]; 
            card1.classList.remove("opened");
            card2.classList.remove("opened");
            clickedCards = [];
          }, 1000);
        }
      }

      if (matchedCards.length === cards.length) {
        modal.style.display = "block";
      }
    }
  }
}