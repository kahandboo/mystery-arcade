class LottoGame {
  constructor(purchasedLottos, inputLotto, bonus) {
    this.purchasedLottos = purchasedLottos; 
    this.inputLotto = inputLotto;
    this.bonus = bonus;  
  }

  getAllRanks() {
    return this.purchasedLottos.map(purchasedLotto =>
      purchasedLotto.determineRank(this.inputLotto, this.bonus)
    );
  }
}

export default LottoGame;