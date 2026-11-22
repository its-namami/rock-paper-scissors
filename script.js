const getComputerChoice = () => {
  switch (Math.floor(Math.random() * 3)) {
  case 0: return "rock";
  case 1: return "paper";
  case 2: return "scissors";
  }
}

const getHumanChoice = () => prompt("Enter your choice")?.toLowerCase()

let humanScore = 0;
let computerScore = 0;

alert(`Human chose ${getHumanChoice()}`);
alert(`Computer chose ${getComputerChoice()}`)
