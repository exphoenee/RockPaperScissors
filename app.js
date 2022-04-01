class Game {
  constructor() {
    this.choice = [
      { value: "rock", beats: ["scissors", "lizard"] },
      { value: "paper", beats: ["rock", "spock"] },
      { value: "scissors", beats: ["paper", "lizard"] },
      { value: "lizard", beats: ["paper", "spock"] },
      { value: "spock", beats: ["rock", "scissors"] },
    ];

    this.userChoiceIndex = 0;
    this.userChoice = this.choice[this.userChoiceIndex];
    this.computerChoiceIndex = 0;
    this.computerChoice = this.choice[this.computerChoiceIndex];
    this.computerRollLength = 15;
    this.computerWinsCount = +localStorage.getItem("computerWinsCount") || 0;
    this.userWinsCount = +localStorage.getItem("userWinsCount") || 0;

    this.popupTimeout = 3;

    this.getDomELements();
    this.initializeButton();
    this.generateRules();
    this.initialize();
  }

  getDomELements() {
    this.app = document.getElementById("app");
    this.start = document.querySelector(".start");
    this.next = document.querySelector(".next");
    this.prev = document.querySelector(".prev");
    this.rules = document.querySelector(".rules");

    this.computerWins = document.querySelector(".computer-wins");
    this.userWins = document.querySelector(".user-wins");

    this.rulesModal = document.querySelector(".rules.modal");
    this.resultModal = document.querySelector(".result.modal");

    this.playerImages = Array.from(document.querySelectorAll(".images.player"));
    this.computerImages = Array.from(
      document.querySelectorAll(".images.computer")
    );
  }

  setScores() {
    console.log(this.computerWins, this.computerWinsCount);
    this.computerWins.innerHTML = this.computerWinsCount;
    this.userWins.innerHTML = this.userWinsCount;
    localStorage.setItem("computerWinsCount", this.computerWinsCount);
    localStorage.setItem("userWinsCount", this.userWinsCount);
  }

  initializeButton() {
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
            this.setScores();
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
  }

  setUserChoiceImage() {
    this.setHidden(this.playerImages, this.userChoice);
  }

  setComputerChoiceImage() {
    this.setHidden(this.computerImages, this.computerChoice);
  }

  setHidden(images, choiced) {
    images.forEach((img) => img.classList.add("hidden"));
    images
      .filter((img) => img.id === choiced.value)[0]
      .classList.remove("hidden");
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
    this.result = "This game is a tie!";
    if (this.userChoice.beats.includes(this.computerChoice.value)) {
      this.result = "You win!";
      this.userWinsCount++;
    }
    if (this.computerChoice.beats.includes(this.userChoice.value)) {
      this.result = "Computer wins!";
      this.computerWinsCount++;
    }
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
    <p>Use the arrows to set your threw,<br />then click to "check" to start the game!</p>
    ${this.choice
      .map((c) => `<p>${c.value} beats ${c.beats.join(" and ")}.</p>`)
      .join("")}
    <p style="color: red">Click the popup to close it!</p>`;
    this.rulesModal.querySelector(".rules-text").innerHTML = this.rules;
  }

  showResult() {
    this.resultModal.innerHTML = `
    <h2>${this.result}</h2>
    <p>You threw ${this.userChoice.value}</p>
    <p>CPU threw ${this.computerChoice.value}</p>
    <p style="color: red">Click the popup to close it!</p>`;
    const counter = document.createElement("p");
    this.resultModal.appendChild(counter);
    counter.classList.add("counter");
    counter.innerHTML = 3;
    this.resultModal.classList.add("show");
    setTimeout(() => {
      this.resultModal.classList.remove("show");
    }, 3000);
  }

  initialize() {
    this.setUserChoiceImage();
    this.setComputerChoiceImage();
    this.setScores();
  }
}

const game = new Game();
