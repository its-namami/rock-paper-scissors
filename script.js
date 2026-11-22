"use strict";

const getComputerChoice = () => {
  switch (Math.floor(Math.random() * 3)) {
  case 0: return "rock";
  case 1: return "paper";
  case 2: return "scissors";
  }
}

const getHumanChoice = () => prompt("Enter your choice", "rock")?.toLowerCase()

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

const playGame = () => {
  let humanScore = 0;
  let computerScore = 0;

  for(let i = 0; i < 5; i++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    switch (playRound(humanSelection, computerSelection)) {
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

playGame();
