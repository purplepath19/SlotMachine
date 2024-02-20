class SlotMachine {
  constructor() {
    this.spinButton = document.getElementById("startSpinButton");
    this.godModeButton = document.getElementById("godMode");
    this.reels = [
      new Reel(),
      new Reel(),
      new Reel(),
    ];
    this.isGodMode = false;
    this.winnings = 0;
    this.winningsElement = document.querySelector(".winnings");

    this.spinButton.addEventListener("click", () => {
      this.startGame();
    });

    this.godModeButton.addEventListener("click", () => {
      this.godModeButton.classList.toggle("active");
      this.isGodMode = this.godModeButton.classList.contains('active');
    });
  }

  startGame() {
    this.reels.forEach((reel) => {
      reel.spin(this.isGodMode);
    });

    setTimeout(() => {
      this.stopGame();
    }, 1000)
  }

  stopGame() {
    this.reels.forEach((reel) => {
      reel.stop();
    });
    this.checkWin();
  }

  printWinnings() {

  }

  checkWin() {
    const finalSymbols = [];
    this.reels.forEach((reel) => {
      let lastIndex = reel.currentSymbolIndex - 1;
      if(reel.currentSymbolIndex === 0) {
        lastIndex = reel.symbolArray.length - 1;
      }
      finalSymbols.push(reel.symbolArray[lastIndex])
    })

    const isWinner = finalSymbols.every((symbol) => {
      return finalSymbols[0].symbol === symbol.symbol;
    });

    if(isWinner) {
      this.winnings += finalSymbols[0].value;
    }

    this.winningsElement.textContent = this.winnings;
  }
}

const slots = new SlotMachine(); // Instance of game - slot machine
