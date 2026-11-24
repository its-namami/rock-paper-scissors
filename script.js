"use strict";

const getComputerChoice = () => {
  switch (Math.floor(Math.random() * 3)) {
  case 0: return "rock";
  case 1: return "paper";
  case 2: return "scissors";
  }
}

const playRound = (humanChoice, computerChoice) => {
  switch(getResult(humanChoice, computerChoice)) {
  case "draw":
    return alert(`It's a draw. Both have used ${humanChoice}.`);
  case "win":
    alert(`You win. You: ${humanChoice} vs Computer: ${computerChoice}.`);
    return 1;
  case "lose":
    alert(`You lose. You: ${humanChoice} vs Computer: ${computerChoice}.`);
    return -1;
  }
}

const getResult = (humanChoice, computerChoice) => {
  const winningCombinations = ["rockscissors", "paperrock", "scissorspaper"];
  
  if (humanChoice === computerChoice) {
    return "draw";
  }

  if (winningCombinations.includes(humanChoice + computerChoice)) {
    return "win";
  }

  return "lose";
}

const playGame = async (rounds) => {
  let humanScore = 0;
  let computerScore = 0;
  
  for(let i = 0; i < rounds; i++) {
    let playerSelection = await new Promise(resolve => {
      document.addEventListener('player-select', e => {
        resolve(e.detail.selection);
      }, { once: true });
    });
    
    const computerSelection = getComputerChoice();
    
    switch (playRound(playerSelection, computerSelection)) {
    case 1:
      humanScore++;
      break;
    case -1:
      computerScore++;
    }
  }

  if (humanScore === computerScore) {
    return alert("The game is a draw!");
  }
  
  if (humanScore > computerScore) {
    return alert("You win the game!");
  }

  alert("You lose the game!");  
}

const playerSelectionDiv = document.querySelector('#player-selection');

playerSelectionDiv.addEventListener('click', e => {
  const playerSelectEvent = new CustomEvent('player-select', {
    detail: { selection: e.target.id }
  });

  document.dispatchEvent(playerSelectEvent);
});

playGame(5); // test
