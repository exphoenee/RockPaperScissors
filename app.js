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
    this.computerRollLength = 15;

    this.app = document.getElementById("app");
    this.start = document.querySelector(".start");
    this.next = document.querySelector(".next");
    this.prev = document.querySelector(".prev");
    this.rules = document.querySelector(".rules");
    this.rulesModal = document.querySelector(".rules.modal");
    this.resultModal = document.querySelector(".result.modal");

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
      this.userChoice = this.choice[this.userChoiceIndex];
      this.setUserChoiceImage();
    });

    this.prev.addEventListener("click", (e) => {
      e.preventDefault();
      this.userChoiceIndex--;
      if (this.userChoiceIndex < 0) {
        this.userChoiceIndex = this.choice.length - 1;
      }
      this.userChoice = this.choice[this.userChoiceIndex];
      this.setUserChoiceImage();
    });

    this.start.addEventListener("click", () => {
      for (let i = 0; i < this.computerRollLength; i++) {
        setTimeout(() => {
          this.computerChoiceIndex = Math.floor(
            Math.random() * this.choice.length
          );
          this.computerChoice = this.choice[this.computerChoiceIndex];
          this.setComputerChoiceImage();
          if (i === 0) {
            this.determineWinner();
            this.showResult();
          }
        }, 10 * (this.computerRollLength + 1 - i) * (this.computerRollLength + 1 - i));
      }
    });

    [this.rules, this.rulesModal].forEach((modal) =>
      modal.addEventListener("click", () => {
        this.rulesModal.classList.toggle("show");
      })
    );

    this.resultModal.addEventListener("click", () => {
      this.resultModal.classList.toggle("show");
    });

    this.generateRules();
    this.initialize();
  }

  setUserChoiceImage() {
    this.setHidden(this.playerImages, this.userChoiceIndex);
  }

  setComputerChoiceImage() {
    this.setHidden(this.computerImages, this.computerChoiceIndex);
  }

  setHidden(images, index) {
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
    this.rules = `
    <h2>Game rules:</h2>
    <p>Use the arrows to set your threw, then click to "check" to start the game!</p>
    <p>${this.choice
      .map((c) => `${c.value} beats ${c.beats.join(" and ")}.</p>`)
      .join("")}
    <p style="color: red">Click here to close this popup!</p>`;
    this.rulesModal.innerHTML = this.rules;
  }

  showRules() {
    console.log(this.rules);
  }

  showResult() {
    this.resultModal.innerHTML = `
    <h2>${this.result}</h2>
    <p>You threw ${this.userChoice.value}</p>
    <p>CPU threw ${this.computerChoice.value}</p>
    <p style="color: red">Click here to close this popup!</p>`;
    this.resultModal.classList.add("show");
  }

  initialize() {
    this.setUserChoiceImage();
    this.setComputerChoiceImage();
  }
}

const game = new Game();
