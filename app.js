class Game {
  constructor() {
    this.baseURL = window.location.origin;
    this.developerMode = "http://127.0.0.1:5500" === this.baseURL;

    this.choice = [
      { value: "rock", beats: ["scissors", "lizard"] },
      { value: "paper", beats: ["rock", "spock"] },
      { value: "scissors", beats: ["paper", "lizard"] },
      { value: "lizard", beats: ["paper", "spock"] },
      { value: "spock", beats: ["rock", "scissors"] },
    ];

    this.language = localStorage.getItem("language") || "hu";
    this.darkmode = localStorage.getItem("darkmode") || "ligth";
    this.playerNames = ["player", "computer"];
    this.imageLoaded = 0;

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
        summary: "Summary",
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
        summary: "Insgesammt",
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
        summary: "Összesen",
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

    this.popupTimeout = 3;

    this.getDomELements();

    this.initialize();
  }

  getDomELements() {
    this.app = document.getElementById("app");
    this.menu = document.getElementById("menu");
    this.settings = document.getElementById("settings");
    this.loaderScreen = document.getElementById("loader-screen");
    this.favicon = document.querySelector("#favicon");

    //buttons
    this.startButton = document.querySelector(".start.button");
    this.nextButton = document.querySelector(".next.button");
    this.prevButton = document.querySelector(".prev.button");
    this.rulesButton = document.querySelector(".rules.button");
    this.statButton = document.querySelector(".statistics.button");
    this.langButton = document.querySelector(".language.button");
    this.licensingButton = document.querySelector(".licensing.button");
    this.statisticsButton = document.querySelector(".statistics.button");
    this.settingsButton = document.querySelector(".settings.button");
    this.lightdark = document.querySelector(".lightdark.button");

    //modals
    this.rulesModal = document.querySelector(".rules.modal");
    this.resultModal = document.querySelector(".result.modal");
    this.languageModal = document.querySelector(".language.modal");
    this.statisticsModal = document.querySelector(".statistics.modal");
    this.licensingModal = document.querySelector(".licensing.modal");

    //language changers
    this.langChange = Array.from(document.querySelectorAll(".language-button"));

    //scoreboard
    this.playerName = document.querySelector("#player-name");
    this.computerName = document.querySelector("#computer-name");
    this.computerWins = document.querySelector(".computer-wins");
    this.userWins = document.querySelector(".user-wins");

    //main title
    this.mainTitle = document.querySelector("#main-title");

    //threw icons
    this.playerImages = Array.from(document.querySelectorAll(".images.player"));
    this.computerImages = Array.from(
      document.querySelectorAll(".images.computer")
    );
  }

  initializeImages() {
    const images = Array.from(document.querySelectorAll(".loader-image"));
    this.imageCount = images.length;
    images.forEach((image) => this.asynImageLoader(image));
  }

  asynImageLoader(img) {
    const fileName = img.dataset.filename;

    const url = `${this.baseURL}/${
      this.developerMode ? "" : "rpsls/"
    }${fileName}`;

    fetch(url).then((response) =>
      response
        .blob()
        .then((blob) => {
          img.src = URL.createObjectURL(blob);
          img.alt = `image: ${fileName.split(".")[0]}`;
          img.classList.remove("loader-image");
          const loaded = img.addEventListener(
            "load",
            () => {
              this.imageLoaded++;
              if (this.imageLoaded === this.imageCount) {
                this.app.classList.remove("off");
                this.loaderScreen.classList.add("off");
                this.loaderScreen.addEventListener("transitionend", () =>
                  this.loaderScreen.remove()
                );
              }
            },
            { once: true }
          );
        })
        .catch((error) => console.log(error))
    );
  }

  initTitleChange() {
    setInterval(() => {
      const choice =
        this.choice[Math.floor(Math.random() * this.choice.length)];

      const choiceName = this.getTranslation(choice.value);
      document.title =
        choiceName[0].toUpperCase() + choiceName.substring(1) + "!";

      this.favicon.href = `./media/${choice.value}.png`;
    }, 1000);
  }

  setScores() {
    const results = {};
    Object.keys(this.statistics).forEach((player) => {
      results[player] = Object.keys(this.statistics[player]).reduce(
        (sum, threw) => sum + +this.statistics[player][threw],
        0
      );
    });
    this.computerWins.innerHTML = results.computer;
    this.userWins.innerHTML = results.player;
  }

  nextThrew() {
    this.userChoiceIndex++;
    if (this.userChoiceIndex > this.choice.length - 1) {
      this.userChoiceIndex = 0;
    }
    this.userChoice = this.choice[this.userChoiceIndex];
    this.setUserChoiceImage();
  }

  prevThrew() {
    this.userChoiceIndex--;
    if (this.userChoiceIndex < 0) {
      this.userChoiceIndex = this.choice.length - 1;
    }
    this.userChoice = this.choice[this.userChoiceIndex];
    this.setUserChoiceImage();
  }

  startGame() {
    for (let i = 0; i < this.computerRollLength; i++) {
      setTimeout(() => {
        this.computerChoiceIndex = Math.floor(
          Math.random() * this.choice.length
        );
        this.computerChoice = this.choice[this.computerChoiceIndex];
        this.setComputerChoiceImage();
        if (i === 0) {
          this.determineWinner();
          this.initializeStatistics();
          this.showResult();
        }
      }, 10 * (this.computerRollLength + 1 - i) * (this.computerRollLength + 1 - i));
    }
  }

  lightChange() {
    const changeDark = [
      this.app.parentElement,
      this.app,
      this.rulesModal,
      this.resultModal,
      this.languageModal,
      this.licensingModal,
      this.statisticsModal,
      this.settings,
    ];
    changeDark.forEach((elem) => elem.classList.toggle("dark"));
    localStorage.setItem(
      "darkmode",
      this.app.parentElement.classList.contains("dark")
    );

    const switchIcon = {
      dark: {
        sun: "off",
        moon: "on",
      },
    };

    this.app.classList.contains("dark");

    if (this.app.classList.contains("dark")) {
      child.classList.add(child.classList.contains("sun") ? "off" : "on");
      child.classList.remove(child.classList.contains("sun") ? "on" : "off");
    } else {
      child.classList.add(child.classList.contains("moon") ? "off" : "on");
      child.classList.remove(child.classList.contains("moon") ? "on" : "off");
    }
  }

  initButton(button, cb) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      cb();
    });
  }

  showMenu() {
    this.settings.classList.toggle("out");
  }

  initializeButtons() {
    const buttonActions = [
      { button: this.nextButton, action: this.nextThrew.bind(this) },
      { button: this.prevButton, action: this.prevThrew.bind(this) },
      { button: this.startButton, action: this.startGame.bind(this) },
      { button: this.settingsButton, action: this.showMenu.bind(this) },
      { button: this.lightdark, action: this.lightChange.bind(this) },
    ];
    buttonActions.forEach(({ button, action }) =>
      this.initButton(button, action)
    );
  }

  initializeModals() {
    const modalMaps = [
      {
        activator: [this.rulesButton, this.rulesModal],
        modal: this.rulesModal,
      },
      {
        activator: [this.langButton, this.languageModal],
        modal: this.languageModal,
      },
      {
        activator: [this.licensingButton, this.licensingModal],
        modal: this.licensingModal,
      },
      {
        activator: [this.statisticsButton, this.statisticsModal],
        modal: this.statisticsModal,
      },
      {
        activator: this.resultModal,
        modal: this.resultModal,
      },
    ];

    modalMaps.forEach(({ activator, modal }) => {
      this.initModal(activator, modal);
    });

    this.langChange.forEach((lc) => {
      lc.addEventListener("click", (e) => {
        this.language = lc.dataset.lang;
        this.updateLang();
      });
    });
  }

  makeArray(arr) {
    if (Array.isArray(arr)) {
      return arr;
    } else {
      return [arr];
    }
  }

  initModal(activator, modal) {
    this.makeArray(activator).forEach((elem) => {
      elem.addEventListener("click", () => {
        modal.classList.toggle("show");
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
    }
    if (this.computerChoice.beats.includes(this.userChoice.value)) {
      playerWins = false;
      this.result = this.getTranslation("resultComputerWon");
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
      "wins",
      ...this.playerNames.map((pn) => pn + "Name"),
      "summary",
    ];

    const table = `<table><thead>
      <tr>${header
        .map((col, index) => `<th>${this.getTranslation(col)}</th>`)
        .join("")}</tr>
      </thead><tbody>
      ${Object.keys(this.statistics["player"])
        .map((threw) => {
          return `
            <tr>
              <td class="player-cell">${this.getTranslation(threw)}</td>
              <td class="player-cell" style="text-align:center">${
                this.statistics["player"][threw] /
                  (+this.statistics["player"][threw] +
                    +this.statistics["computer"][threw]) +
                "%"
              }</td>
              <td class="computer-cell" style="text-align:center">${
                this.statistics["computer"][threw] /
                  (+this.statistics["player"][threw] +
                    +this.statistics["computer"][threw]) +
                "%"
              }</td>
              <td class="summary-cell" style="text-align:center">${
                this.statistics["player"][threw] +
                this.statistics["computer"][threw] /
                  (+this.statistics["player"][threw] +
                    +this.statistics["computer"][threw]) +
                "%"
              }</td>
            </tr>`;
        })
        .join("")}
        <tfoot>
          <tr>${[
            this.getTranslation("summary"),
            this.userWins.innerHTML,
            this.computerWins.innerHTML,
            +this.computerWins.innerHTML + +this.userWins.innerHTML,
          ]
            .map((footer) => `<th>${footer}</th>`)
            .join("")}</tr>
        </tfoot>
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
    this.generateRules();
    this.createStatistics();
    this.playerName.innerHTML = this.getTranslation("playerName");
    this.computerName.innerHTML = this.getTranslation("computerName");
    this.mainTitle.innerHTML = this.getTitle();
    document.documentElement.setAttribute("lang", this.language);
    localStorage.setItem("language", this.language);
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

    this.setScores();
  }

  updateStatistics() {
    localStorage.setItem("statistics", JSON.stringify(this.statistics));
  }

  initilizeDarkmode() {
    if (this.darkmode === "true") {
      this.lightChange();
    }
  }

  initialize() {
    this.initializeImages();
    window.onload = () => {
      this.initilizeDarkmode();
      this.initializeStatistics();
      this.initializeButtons();
      this.initializeModals();
      this.setUserChoiceImage();
      this.setComputerChoiceImage();
      this.updateLang();
      this.initTitleChange();
    };
  }
}

const game = new Game();
