class SlotMachine {
  constructor() {
    this.fruits = ["🍒", "🍇", "🍊", "🍋", "🍉", "🍓"];
    this.reels = document.querySelectorAll(".reel");
    this.spinButton = document.getElementById("startSpinButton");
    this.reels = [
      new Reel(),
      new Reel(),
      new Reel(),
    ];

    this.spinButton.addEventListener("click", () => {
      this.startGame();
    });
  }

  startGame() {
    this.reels.forEach((reel) => {
      reel.spin();
    });

    setTimeout(() => {
      this.stopGame();
    }, 3000)
  }

  stopGame() {
    this.reels.forEach((reel) => {
      reel.stop();
    });
  }

  checkWin() {
    this.reels.forEach((reel) => {
      this.finalSymbols.push(reel.symbolArray[reel.currentSymbolIndex])
    })
  }
}

const slots = new SlotMachine(); // Instance of game - slot machine
