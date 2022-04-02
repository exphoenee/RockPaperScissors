class Game {
  constructor() {
    this.choice = [
      { value: "rock", beats: ["scissors", "lizard"] },
      { value: "paper", beats: ["rock", "spock"] },
      { value: "scissors", beats: ["paper", "lizard"] },
      { value: "lizard", beats: ["paper", "spock"] },
      { value: "spock", beats: ["rock", "scissors"] },
    ];

    this.language = "en";
    this.dictionary = {
      en: {
        rock: "rock",
        paper: "paper",
        scissors: "scissors",
        lizard: "lizard",
        spock: "Spock",
        gameRules: "Game rules",
        rulesDesc:
          'Use the arrows to set your threw,<br />then click to "check" to start the game!',
        beats: "beats",
        and: "and",
        popupInstruction: "Click the popup to close it!",
        youThrew: "You threw",
        CPUThrew: "CPU threw",
        popupClosing: "Closing popup...",
        popupClosingin: "Closing in",
        popupTimeout: "seconds",
        resultTie: "It's a tie!",
        resultPlayerWon: "You won!",
        resultComputerWon: "Computer wins!",
        error: "Error! You must select a valid option!",
      },
      de: {
        rock: "Stein",
        paper: "Papier",
        scissors: "Schere",
        lizard: "Echse",
        spock: "Spock",
        gameRules: "Spielregeln",
        rulesDesc:
          'Benutze die Pfeile, um deinen Wurf einzustellen, <br /> dann klicke auf "Häkchen", um das Spiel zu starten!',
        beats: "schlägt",
        and: "und",
        popupInstruction: "Klick auf das Popup-Fenster, um zu schließen!",
        youThrew: "Du hast geworfen",
        CPUThrew: "Der Computer hat geworfen",
        popupClosing: "Das Popup wird geschlossen!",
        popupClosingin: "Schließt in",
        popupTimeout: "Sekunden",
        resultTie: "Unentschieden!",
        resultPlayerWon: "Du hast gewonnen!",
        resultComputerWon: "Der Computer hat gewonnen!",
        error: "Fehler! Du musst eine gültige Option auswählen!",
      },
      hu: {
        rock: "kő",
        paper: "papír",
        scissors: "olló",
        lizard: "gyík",
        spock: "Spock",
        gameRules: "Játékszabályok",
        rulesDesc:
          'Használd a nyilakat a dobás beállításához,<br />majd kattintson a "pipa" gombra a játék indításához!',
        beats: "üti",
        and: "és",
        popupInstruction: "Kattints a felugró ablakra a bezáráshoz!",
        youThrew: "Te dobáltad",
        CPUThrew: "A CPU dobott",
        popupClosing: "A felugró ablak bezárása...",
        popupClosingin: "Bezáródik",
        popupTimeout: "másodperc múlva",
        resultTie: "Döntetlen!",
        resultPlayerWon: "Nyertél!",
        resultComputerWon: "A CPU nyert!",
        error: "Hiba! Érvénytelen választás!",
      },
    };

    this.statistics = {};

    this.userChoiceIndex = Math.floor(Math.random() * this.choice.length);
    this.userChoice = this.choice[this.userChoiceIndex];
    this.computerChoiceIndex = Math.floor(Math.random() * this.choice.length);
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
        : console.log(this.dictionary[this.language].error);
  }

  //Get computer's choice
  getComputerChoice() {
    this.computerChoice =
      this.choice[Math.floor(Math.random() * this.choice.length)];
  }

  //Compare & determine the winner
  determineWinner() {
    this.result = this.getTranslation("resultTie");
    if (this.userChoice.beats.includes(this.computerChoice.value)) {
      this.result = this.getTranslation("resultPlayerWon");
      this.userWinsCount++;
    }
    if (this.computerChoice.beats.includes(this.userChoice.value)) {
      this.result = this.getTranslation("resultComputerWon");
      this.computerWinsCount++;
    }
  }

  getTranslation(string) {
    return this.dictionary[this.language][string];
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
    <h2>${this.getTranslation("gameRules")}:</h2>
    <p>${this.getTranslation("rulesDesc")}</p>
    ${this.choice
      .map(
        (c) =>
          `<p>${c.value} ${this.getTranslation("beats")} ${c.beats.join(
            ` ${this.getTranslation("beats")} `
          )}.</p>`
      )
      .join("")}
    <p style="color: red">${this.getTranslation("popupInstruction")}</p>`;
    this.rulesModal.querySelector(".rules-text").innerHTML = this.rules;
  }

  showResult() {
    this.resultModal.innerHTML = `
    <h2>${this.result}</h2>
    <p>You threw ${this.userChoice.value}</p>
    <p>CPU threw ${this.computerChoice.value}</p>`;
    const counter = document.createElement("p");
    this.resultModal.appendChild(counter);
    counter.classList.add("counter");
    this.resultModal.classList.add("show");
    for (let i = this.popupTimeout; i >= 0; i--) {
      setTimeout(() => {
        if (i === 0) {
          counter.innerHTML = `Popup is closing...`;
          this.resultModal.classList.remove("show");
        } else {
          counter.innerHTML = `Colsing in <span style="width:1.2rem;display:inline-block;">${i}</span> seconds...`;
        }
      }, (this.popupTimeout - i) * 3000);
    }
  }

  initialize() {
    this.setUserChoiceImage();
    this.setComputerChoiceImage();
    this.setScores();
  }
}

const game = new Game();
