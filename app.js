const choice = {
  0: { value: "rock", beating: "scissors" },
  1: { value: "paper", beating: "rock" },
  2: { value: "scissors", beating: "paper" },
};

//Get user's choice
const getUserChoice = (userInput) => {
  userInput = userInput.toLowerCase();
  return Object.keys(choice)
    .map((item) => choice[item] === userInput)
    .reduce((acc, curr) => (acc += +curr)) > 0
    ? userInput
    : console.log("Error! You must select a valid option!");
};

//Get computer's choice
const getComputerChoice = () => {
  return choice[Math.floor(Math.random() * 3)];
};

//Compare & determine the winner
const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "This game is a tie!";
  }
  if (userChoice === "rock") {
    if (computerChoice === "scissors") {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  }
  if (userChoice === "paper") {
    if (computerChoice === "rock") {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  }
  if (userChoice === "scissors") {
    if (computerChoice === "paper") {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  }
};

//The program!
const playGame = () => {
  const userChoice = getUserChoice("scissors");
  const computerChoice = getComputerChoice();
  console.log("You threw " + userChoice);
  console.log("CPU threw " + computerChoice);
  console.log(determineWinner(userChoice, computerChoice));
};

playGame();
