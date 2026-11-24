"use strict";

const getComputerChoice = () => {
  switch (Math.floor(Math.random() * 3)) {
  case 0: return "rock";
  case 1: return "paper";
  case 2: return "scissors";
  }
}

const playRound = (humanChoice, computerChoice, resultsNode, roundNumber) => {
  switch(getResult(humanChoice, computerChoice)) {
  case "draw":
    return displayRoundResult(`Round ${roundNumber}: It's a draw. Both have used ${humanChoice}.`, resultsNode);
  case "win":
    displayRoundResult(`Round ${roundNumber}: You win. You: ${humanChoice} vs Computer: ${computerChoice}.`, resultsNode);
    return 1;
  case "lose":
    displayRoundResult(`Round ${roundNumber}: You lose. You: ${humanChoice} vs Computer: ${computerChoice}.`, resultsNode);
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

const displayRoundResult = (stringResult, parentNode) => {
  const result = document.createElement("p");
  result.classList.add("round-result");
  result.textContent = stringResult;
  parentNode.appendChild(result);
};

const displayGameResult = (stringResult, parentNode) => {
  const result = document.createElement("p");
  result.classList.add("game-result");
  result.textContent = stringResult;
  parentNode.appendChild(result);
};

const waitPlayerSelectEvent = () => new Promise(resolve => {
  document.addEventListener("player-select", e => {
    resolve(e.detail.selection);
  }, { once: true });
});

const updateScoreboard = (humanScore, computerScore, scoreboardNode) => {
  scoreboardNode.textContent = `You: ${humanScore} - ${computerScore} :Computer`;
}

const playGame = async (roundsNumber, resultsNode, scoreboardNode) => {
  let humanScore = 0;
  let computerScore = 0;
  
  for(let i = 0; i < roundsNumber; i++) {
    let playerSelection = await waitPlayerSelectEvent();
    
    const computerSelection = getComputerChoice();
    
    switch (playRound(playerSelection, computerSelection, resultsNode, i + 1)) {
    case 1:
      humanScore++;
      break;
    case -1:
      computerScore++;
    }

    updateScoreboard(humanScore, computerScore, scoreboardNode);
  }

  if (humanScore === computerScore) {
    return displayGameResult("The game is a draw!", resultsNode);
  }
  
  if (humanScore > computerScore) {
    return displayGameResult("You win the game!", resultsNode);
  }

  displayGameResult("You lose the game!", resultsNode);  
}

const playerSelectionDiv = document.querySelector('#player-selection');
const results = document.querySelector('#results');
const scoreboard = document.querySelector('#scoreboard');

playerSelectionDiv.addEventListener('click', e => {
  const playerSelectEvent = new CustomEvent('player-select', {
    detail: { selection: e.target.id }
  });

  document.dispatchEvent(playerSelectEvent);
});

playGame(5, results, scoreboard); // test
