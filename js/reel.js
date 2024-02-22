class Reel {
  constructor() {
    this.defaultSymbols = [
      { symbol: "🍒", value: 10 },
      { symbol: "🍇", value: 20 },
      { symbol: "🍋", value: 30 },
      { symbol: "🍉", value: 40 },
      { symbol: "🍊", value: 60 },
    ];

    this.symbolArray = [...this.defaultSymbols];
    this.currentSymbolIndex = 0;
    this.animationIndex = 0;
    this.reelElement = document.createElement("div");
    this.reelElement.classList.add("reel");
    this.symbolElement = document.createElement("div");
    this.symbolElement.classList.add("symbol");
    this.symbolElement2 = this.symbolElement.cloneNode(true);
    this.symbolStack = [
      this.symbolElement,
      this.symbolElement2
    ];
    this.reelElement.appendChild(this.symbolElement)
    this.reelElement.appendChild(this.symbolElement2);
    this.spinInterval = null;
    this.isSpinning = false;
    document.querySelector(".slots").appendChild(this.reelElement);
  }

  // Methods
  reelSymbolShuffler() { //Array randomizer 
    for (let i = this.symbolArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.symbolArray[i], this.symbolArray[j]] = [this.symbolArray[j], this.symbolArray[i]];
    }
  }

  spin(isGodMode) { 
    if(this.isSpinning) return;
    this.isSpinning = true;
    this.reelSymbolShuffler();
    if(isGodMode) {
      this.symbolArray = [...this.defaultSymbols];
    }
    this.reset();

    this.spinInterval = setInterval(() => {
      const prevAnimationIndex = this.animationIndex === 0 ? 1 : 0;
      this.symbolStack[prevAnimationIndex].classList.remove("spin");
      this.reelElement.removeChild(this.symbolStack[prevAnimationIndex]);
      this.reelElement.prepend(this.symbolStack[prevAnimationIndex]);
      this.symbolStack[this.animationIndex].textContent = this.symbolArray[this.currentSymbolIndex].symbol;
      this.symbolStack[this.animationIndex].classList.add("spin");
      this.currentSymbolIndex = (this.currentSymbolIndex + 1) % this.symbolArray.length;
      this.animationIndex = this.animationIndex === 0 ? 1 : 0; // next index
    }, 140);
  }

  stop() {
    const prevAnimationIndex = this.animationIndex === 0 ? 1 : 0;
    clearInterval(this.spinInterval);
    this.isSpinning = false;
    this.symbolStack[prevAnimationIndex].classList.add("stop-spin");
  }

  reset() {
    const prevAnimationIndex = this.animationIndex === 0 ? 1 : 0;
    this.symbolStack[prevAnimationIndex].classList.remove("stop-spin");
    this.symbolStack[prevAnimationIndex].classList.remove("spin");
    this.reelElement.removeChild(this.symbolStack[this.animationIndex]);
    this.currentSymbolIndex = 0;
    this.animationIndex = 0;
    this.reelElement.appendChild(this.symbolElement)
    this.reelElement.appendChild(this.symbolElement2);
    this.spinInterval = null;
    this.isSpinning = false;
  }
}


//my code is awesome