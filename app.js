class Game {
  constructor() {
    this.choice = [
      { value: "rock", beats: ["scissors", "lizard"] },
      { value: "paper", beats: ["rock", "spock"] },
      { value: "scissors", beats: ["paper", "lizard"] },
      { value: "lizard", beats: ["paper", "spock"] },
      { value: "spock", beats: ["rock", "scissors"] },
    ];

    this.language = "hu";
    this.playerNames = ["player", "computer"];

    this.dictionary = {
      en: {
        rock: "rock",
        paper: "paper",
        scissors: "scissors",
        lizard: "lizard",
        spock: "Spock",
        paperT: "paper",
        scissorsT: "scissors",
        lizardT: "lizard",
        spockT: "Spock",
        gameRules: "Game rules",
        rulesDesc:
          'Use the arrows to set your threw,<br />then click to "check" to start the game!',
        beats: "beats",
        and: "and",
        popupInstruction: "Click the popup to close it!",
        youThrew: "You threw",
        CPUThrew: "CPU threw",
        popupClosing: "Closing popup...",
        popupClosingIn: "Closing in",
        popupTimeout: "seconds",
        resultTie: "It's a tie!",
        resultPlayerWon: "You won!",
        resultComputerWon: "Computer wins!",
        computerName: "Computer",
        playerName: "Player",
        threws: "Threws",
        wins: "wins",
        error: "Error! You must select a valid option!",
      },
      de: {
        rock: "Stein",
        paper: "Papier",
        scissors: "Schere",
        lizard: "Echse",
        spock: "Spock",
        gameRules: "Spielregeln",
        paperT: "Papier",
        scissorsT: "Schere",
        lizardT: "Echse",
        spockT: "Spock",
        gameRules: "Spielregeln",
        rulesDesc:
          'Benutze die Pfeile, um deinen Wurf einzustellen, <br /> dann klicke auf "Häkchen", um das Spiel zu starten!',
        beats: "schlägt",
        and: "und",
        popupInstruction: "Klick auf das Popup-Fenster, um zu schließen!",
        youThrew: "Du hast geworfen",
        CPUThrew: "Der Computer hat geworfen",
        popupClosing: "Das Popup wird geschlossen!",
        popupClosingIn: "Schließt in",
        popupTimeout: "Sekunden",
        resultTie: "Unentschieden!",
        resultPlayerWon: "Du hast gewonnen!",
        resultComputerWon: "Der Computer hat gewonnen!",
        computerName: "Komputer",
        playerName: "Spieler",
        threws: "geworfen",
        wins: "Gewinnt",
        error: "Fehler! Du musst eine gültige Option auswählen!",
      },
      hu: {
        rock: "kő",
        paper: "papír",
        scissors: "olló",
        lizard: "gyík",
        spock: "Spock",
        rockT: "követ",
        paperT: "papírt",
        scissorsT: "ollót",
        lizardT: "gyíkot",
        spockT: "Spockot",
        gameRules: "Játékszabályok",
        rulesDesc:
          'A nyilakkal a válaszd ki amit mutatni akarsz,<br />majd kattintson a "pipa" gombra a játék indításához!',
        beats: "üti",
        and: "és",
        popupInstruction: "Kattints a felugró ablakra a bezáráshoz!",
        youThrew: "Te mutattál",
        CPUThrew: "A CPU mutatott",
        popupClosing: "A felugró ablak bezárása...",
        popupClosingIn: "Bezáródik",
        popupTimeout: "másodperc múlva",
        resultTie: "Döntetlen!",
        resultPlayerWon: "Nyertél!",
        resultComputerWon: "A CPU nyert!",
        computerName: "Számítógép",
        playerName: "Játékos",
        threws: "Mutatott",
        wins: "Nyert",
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

    this.generateRules();
    this.initialize();
  }

  getDomELements() {
    this.app = document.getElementById("app");

    this.startButton = document.querySelector(".start");
    this.nextButton = document.querySelector(".next");
    this.prevButton = document.querySelector(".prev");
    this.rulesButton = document.querySelector(".rules");
    this.statButton = document.querySelector(".statistics");
    this.langButton = document.querySelector(".language");
    this.langChange = Array.from(document.querySelectorAll(".language-button"));
    this.licensingButton = document.querySelector(".licensing");
    this.statisticsButton = document.querySelector(".statistics");

    this.playerName = document.querySelector("#player-name");
    this.computerName = document.querySelector("#computer-name");
    this.mainTitle = document.querySelector("#main-title");

    this.computerWins = document.querySelector(".computer-wins");
    this.userWins = document.querySelector(".user-wins");

    this.rulesModal = document.querySelector(".rules.modal");
    this.resultModal = document.querySelector(".result.modal");
    this.languageModal = document.querySelector(".language.modal");
    this.statisticsModal = document.querySelector(".statistics.modal");
    this.licenceModal = document.querySelector(".licence.modal");
    this.statisticsModal = document.querySelector(".statistics.modal");

    this.playerImages = Array.from(document.querySelectorAll(".images.player"));
    this.computerImages = Array.from(
      document.querySelectorAll(".images.computer")
    );
  }

  setScores() {
    this.computerWins.innerHTML = this.computerWinsCount;
    this.userWins.innerHTML = this.userWinsCount;
    localStorage.setItem("computerWinsCount", this.computerWinsCount);
    localStorage.setItem("userWinsCount", this.userWinsCount);
  }

  initializeButton() {
    this.nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.userChoiceIndex++;
      if (this.userChoiceIndex > this.choice.length - 1) {
        this.userChoiceIndex = 0;
      }
      this.userChoice = this.choice[this.userChoiceIndex];
      this.setUserChoiceImage();
    });

    this.prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.userChoiceIndex--;
      if (this.userChoiceIndex < 0) {
        this.userChoiceIndex = this.choice.length - 1;
      }
      this.userChoice = this.choice[this.userChoiceIndex];
      this.setUserChoiceImage();
    });

    this.startButton.addEventListener("click", () => {
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

    [this.rulesButton, this.rulesModal].forEach((elem) =>
      elem.addEventListener("click", () => {
        this.rulesModal.classList.toggle("show");
      })
    );

    [this.langButton, this.languageModal].forEach((elem) =>
      elem.addEventListener("click", () =>
        this.languageModal.classList.toggle("show")
      )
    );

    [this.licensingButton, this.licenceModal].forEach((elem) =>
      elem.addEventListener("click", () =>
        this.licenceModal.classList.toggle("show")
      )
    );

    [this.statisticsButton, this.statisticsModal].forEach((elem) =>
      elem.addEventListener("click", () =>
        this.statisticsModal.classList.toggle("show")
      )
    );

    this.resultModal.addEventListener("click", () => {
      this.resultModal.classList.remove("show");
    });

    this.langChange.forEach((lc) => {
      lc.addEventListener("click", (e) => {
        this.language = lc.dataset.lang;
        this.updateLang();
      });
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
        : alert(this.dictionary[this.language].error);
  }

  //Get computer's choice
  getComputerChoice() {
    this.computerChoice =
      this.choice[Math.floor(Math.random() * this.choice.length)];
  }

  //Compare & determine the winner
  determineWinner() {
    let playerWins = null;
    this.result = this.getTranslation("resultTie");
    if (this.userChoice.beats.includes(this.computerChoice.value)) {
      playerWins = true;
      this.result = this.getTranslation("resultPlayerWon");
      this.userWinsCount++;
    }
    if (this.computerChoice.beats.includes(this.userChoice.value)) {
      playerWins = false;
      this.result = this.getTranslation("resultComputerWon");
      this.computerWinsCount++;
    }
    this.setScores();
    this.calculateStatistics(playerWins);
  }

  calculateStatistics(playerWins) {
    let winner, looser;
    if (playerWins === true) {
      winner = this.userChoice.value;
      looser = this.computerChoice.value;
      this.statistics["player"][winner] = this.statistics["player"][winner] + 1;
    }
    if (playerWins === false) {
      winner = this.computerChoice.value;
      looser = this.userChoice.value;
      this.statistics["computer"][winner] =
        this.statistics["computer"][winner] + 1;
    }
    this.updateStatistics();
    this.createStatistics();
  }

  createStatistics() {
    const header = [
      this.getTranslation("playerName"),
      this.getTranslation("threws"),
      this.getTranslation("wins"),
    ];

    const table = `<table><thead>
      <tr>${header.map((col) => `<th>${col}</th>`).join("")}</tr>
      </thead><tbody>
      ${Object.keys(this.statistics)
        .map((player) => {
          return `${Object.keys(this.statistics[player])
            .map((threw, index) => {
              return `
            <tr>${
              index == 0
                ? `<td rowspan="5" class="${player}-block">${this.getTranslation(
                    player + "Name"
                  )}</td>`
                : ``
            }
              <td class="${player}-cell">${this.getTranslation(threw)}</td>
              <td class="${player}-cell">${this.statistics[player][threw]}</td>
            </tr>`;
            })
            .join("")}`;
        })
        .join("")}
      </tbody></table>`;

    this.statisticsModal.innerHTML = table;
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
          `<p>${this.getTranslation(c.value)} ${this.getTranslation(
            "beats"
          )} ${c.beats
            .map((b) => this.getTranslation(b + "T"))
            .join(` ${this.getTranslation("and")} `)}.</p>`
      )
      .join("")}
    <p style="color: red">${this.getTranslation("popupInstruction")}</p>`;
    this.rulesModal.querySelector(".rules-text").innerHTML = this.rules;
  }

  showResult() {
    this.resultModal.innerHTML = `
    <h2>${this.result}</h2>
    <p>${this.getTranslation("youThrew")} ${this.getTranslation(
      this.userChoice.value + "T"
    )}</p>
    <p>${this.getTranslation("CPUThrew")} ${this.getTranslation(
      this.computerChoice.value + "T"
    )}</p>`;
    const counter = document.createElement("p");
    this.resultModal.appendChild(counter);
    counter.classList.add("counter");
    this.resultModal.classList.add("show");
    for (let i = this.popupTimeout; i >= 0; i--) {
      setTimeout(() => {
        if (i === 0) {
          counter.innerHTML = this.getTranslation("popupClosing");
          this.resultModal.classList.remove("show");
        } else {
          counter.innerHTML = `${this.getTranslation(
            "popupClosingIn"
          )} <span style="width:1.2rem;display:inline-block;">${i}</span> ${this.getTranslation(
            "popupTimeout"
          )}...`;
        }
      }, (this.popupTimeout - i) * 3000);
    }
  }

  getTitle() {
    return this.choice
      .map((threw) => this.getTranslation(threw.value))
      .join(", ");
  }

  updateLang() {
    this.playerName.innerHTML = this.getTranslation("playerName");
    this.computerName.innerHTML = this.getTranslation("computerName");
    this.mainTitle.innerHTML = this.getTitle();
    document.documentElement.setAttribute("lang", this.language);
  }
  initializeStatistics() {
    const oldStat = localStorage.getItem("statistics");
    oldStat
      ? (this.statistics = JSON.parse(oldStat))
      : this.playerNames.forEach((player) => {
          this.statistics[player] = {};
          this.choice.forEach((item) => {
            this.statistics[player][item.value] = 0;
          });
        });
  }

  updateStatistics() {
    localStorage.setItem("statistics", JSON.stringify(this.statistics));
  }

  initialize() {
    this.initializeButton();
    this.initializeStatistics();
    this.setUserChoiceImage();
    this.createStatistics();
    this.setComputerChoiceImage();
    this.setScores();
  }
}

const game = new Game();
