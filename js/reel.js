class Reel {
  constructor() {
    this.symbolArray = [
      { symbol: "🍒", value: 10 },
      { symbol: "🍇", value: 20 },
      { symbol: "🍋", value: 30 },
      { symbol: "🍉", value: 40 },
      { symbol: "🍊", value: 60 },
    ];

    this.element = document.createElement("div");
    this.element.classList.add("reel");
    this.currentSymbolIndex = 0;
    this.spinInterval = null;
    document.querySelector(".slots").appendChild(this.element);
  }

  reelSymbolShuffler() { //Array randomizer 
    for (let i = this.symbolArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.symbolArray[i], this.symbolArray[j]] = [this.symbolArray[j], this.symbolArray[i]];
    }
  }

  spin() { 
    this.reelSymbolShuffler();
    this.spinInterval = setInterval(() => {
      this.element.textContent = this.symbolArray[this.currentSymbolIndex].symbol;
      this.currentSymbolIndex = (this.currentSymbolIndex + 1) % this.symbolArray.length;
    }, 200);
  }

  stop() {
    clearInterval(this.spinInterval);
  }
}
