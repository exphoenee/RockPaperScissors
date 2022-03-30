const choice = [
  { value: "rock", beats: ["scissors", "lizard"] },
  { value: "paper", beats: ["rock", "spock"] },
  { value: "scissors", beats: ["paper", "lizard"] },
  { value: "spock", beats: ["rock", "scissors"] },
  { value: "lizard", beats: ["paper", "spock"] },
];

//Get user's choice
const getUserChoice = (userInput) => {
  const userChoice =
    choice
      .map((item) => item.name === userInput.name)
      .reduce((acc, curr) => (acc += +curr)) > 0
      ? userInput
      : console.log("Error! You must select a valid option!");
  console.log("You threw " + userChoice.value);
  return userChoice;
};

//Get computer's choice
const getComputerChoice = () => {
  const computerChoice = choice[Math.floor(Math.random() * 5)];
  console.log("CPU threw " + computerChoice.value);
  return computerChoice;
};

//Compare & determine the winner
const determineWinner = (userChoice, computerChoice) => {
  const result = userChoice.beats.includes(computerChoice.value)
    ? "You win!"
    : computerChoice.beats.includes(userChoice.value)
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

function generateRules() {
  const rules = `Game rules:\n${choice
    .map((c) => `${c.value} beats ${c.beats.join(" and ")}`)
    .join("\n")}\n----------------------------`;
  console.log(rules);
  return rules;
}

//The program!
const playGame = () => {
  generateRules();
  const userChoice = getUserChoice(getChoice("scissors"));
  const computerChoice = getComputerChoice();
  determineWinner(userChoice, computerChoice);
};

playGame();
