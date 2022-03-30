class Game {
  constructor() {
    this.choice = [
      { value: "rock", beats: ["scissors", "lizard"] },
      { value: "paper", beats: ["rock", "spock"] },
      { value: "scissors", beats: ["paper", "lizard"] },
      { value: "spock", beats: ["rock", "scissors"] },
      { value: "lizard", beats: ["paper", "spock"] },
    ];

    this.userChoiceIndex = 0;
    this.userChoice = this.choice[this.userChoiceIndex];
    this.computerChoiceIndex = 0;
    this.computerChoice = this.choice[this.computerChoiceIndex];

    this.app = document.getElementById("app");
    this.start = document.querySelector(".start");
    this.next = document.querySelector(".next");
    this.prev = document.querySelector(".prev");
    this.rules = document.querySelector(".rules");

    this.playerImages = Array.from(document.querySelectorAll(".images.player"));
    this.computerImages = Array.from(
      document.querySelectorAll(".images.computer")
    );

    this.next.addEventListener("click", (e) => {
      e.preventDefault();
      this.userChoiceIndex++;
      if (this.userChoiceIndex > this.choice.length - 1) {
        this.userChoiceIndex = 0;
      }
      console.log(this.userChoiceIndex);
      this.setHidden();
    });

    this.prev.addEventListener("click", (e) => {
      e.preventDefault();
      this.userChoiceIndex--;
      if (this.userChoiceIndex < 0) {
        this.userChoiceIndex = this.choice.length - 1;
      }
      console.log(this.userChoiceIndex);
      this.setHidden();
    });

    this.start.addEventListener("click", () => {
      new Array(15).fill(0).forEach((e, i) => {
        setTimeout(() => {
          this.computerChoice = Math.floor(Math.random() * this.choice.length);
          this.setHidden(this.computerImages, this.computerChoice);
        }, (15 * 15 * 300) / (i * i * i)) +
          (15 - i) * 200;
      });
    });
    this.rules.addEventListener("click", () => {});

    this.generateRules();
    this.playGame();
  }

  setHidden(images = this.playerImages, index = this.userChoiceIndex) {
    images.forEach((img) => img.classList.add("hidden"));
    images[index].classList.remove("hidden");
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
    this.determineWinner();
    this.showResult();
  }
}

const game = new Game();
