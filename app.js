class Game {
  constructor() {
    this.choice = [
      { value: "rock", beats: ["scissors", "lizard"] },
      { value: "paper", beats: ["rock", "spock"] },
      { value: "scissors", beats: ["paper", "lizard"] },
      { value: "spock", beats: ["rock", "scissors"] },
      { value: "lizard", beats: ["paper", "spock"] },
    ];
    this.generateRules();
    this.playGame();
  }

  //Get user's choice
  getUserChoice(userInputStr) {
    const userChoiceObj = this.getChoice(userInputStr);
    this.userChoice =
      this.choice
        .map((item) => item.name === userChoiceObj.name)
        .reduce((acc, curr) => (acc += +curr)) > 0
        ? userChoiceObj
        : console.log("Error! You must select a valid option!");
  }

  //Get computer's choice
  getComputerChoice() {
    this.computerChoice = this.choice[Math.floor(Math.random() * 5)];
  }

  //Compare & determine the winner
  determineWinner() {
    this.result = this.userChoice.beats.includes(this.computerChoice.value)
      ? "You win!"
      : this.computerChoice.beats.includes(this.userChoice.value)
      ? "Computer wins!"
      : "This game is a tie!";
  }

  getChoice(userChoice) {
    return this.choice[
      Object.keys(this.choice).filter(
        (c) => this.choice[c].value === userChoice.toLowerCase()
      )[0]
    ];
  }

  generateRules() {
    this.rules = `Game rules:\n${this.choice
      .map((c) => `${c.value} beats ${c.beats.join(" and ")}`)
      .join("\n")}\n----------------------------`;
  }

  showRules() {
    console.log(this.rules);
  }

  showResult() {
    console.log("You threw " + this.userChoice.value);
    console.log("CPU threw " + this.computerChoice.value);
    console.log(this.result);
  }

  //The program!
  playGame() {
    this.showRules();
    this.getUserChoice("scissors");
    this.getComputerChoice();
    this.determineWinner();
    this.showResult();
  }
}

const game = new Game();
