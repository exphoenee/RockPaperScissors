const choice = {
  0: { value: "rock", beating: "scissors" },
  1: { value: "paper", beating: "rock" },
  2: { value: "scissors", beating: "paper" },
};

//Get user's choice
const getUserChoice = (userInput) => {
  const userChoice =
    Object.keys(choice)
      .map((item) => choice[item].name === userInput.name)
      .reduce((acc, curr) => (acc += +curr)) > 0
      ? userInput
      : console.log("Error! You must select a valid option!");
  console.log("You threw " + userChoice.value);
  return userChoice;
};

//Get computer's choice
const getComputerChoice = () => {
  const computerChoice = choice[Math.floor(Math.random() * 3)];
  console.log("CPU threw " + computerChoice.value);
  return computerChoice;
};

//Compare & determine the winner
const determineWinner = (userChoice, computerChoice) => {
  const result =
    userChoice.beating === computerChoice.value
      ? "You win"
      : computerChoice.beating === userChoice.value
      ? "Computer wins!"
      : "This game is a tie!";
  console.log(result);
};

function getChoice(userChoice) {
  return choice[
    Object.keys(choice).filter(
      (c) => choice[c].value === userChoice.toLowerCase()
    )[0]
  ];
}

//The program!
const playGame = () => {
  const userChoice = getUserChoice(getChoice("scissors"));

  const computerChoice = getComputerChoice();

  determineWinner(userChoice, computerChoice);
};

playGame();
