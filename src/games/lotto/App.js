import Input from "./view/Input.js";
import Output from "./view/Output.js";
import PurchaseAmount from "./domain/PurchaseAmount.js";
import Lotto from "./domain/Lotto.js";
import Bonus from "./domain/Bonus.js";
import LottoGame from "./domain/LottoGame.js";
import LottoResult from "./domain/LottoResult.js"
import LottoGenerator from "./utils/LottoGenerator.js";

class App {
  async run() {
    const purchase = await this.#getValidPurchaseAmount();
    const purchaseCount = purchase.count;
    Output.printPurchaseCount(purchaseCount);

    const purchasedLottos = LottoGenerator.generateMultiple(purchaseCount);
    Output.printPurchasedLottos(purchasedLottos);

    const inputLotto = await this.#getValidLottoNumbers();
    const bonus = await this.#getValidBonusNumber();

    const lottoGame = new LottoGame(purchasedLottos, inputLotto, bonus);
    const ranks = lottoGame.getAllRanks();

    const lottoResult = new LottoResult();
    lottoResult.recordRank(ranks);
    const rankCounts = lottoResult.rankCounts;
    const profitRate = lottoResult.calculateProfitRate(purchase.amount);

    Output.printRankResults(rankCounts);
    Output.printProfitRate(profitRate);
  }

  async #getValidPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmountInput = await Input.getPurchaseAmountInput();
        const purchaseAmount = Input.convertPurchaseAmountToNumber(purchaseAmountInput);
        return new PurchaseAmount(purchaseAmount);
      } catch (error) {
        Output.printError(error.message); 
      }
    }
  }

  async #getValidLottoNumbers() {
    while (true) {
      try {
        const lottoNumbersInput = await Input.getLottoNumbersInput();
        const lottoNumbers = Input.parseLottoNumbersInput(lottoNumbersInput);    
        return new Lotto(lottoNumbers);
      } catch (error) {
        Output.printError(error.message);
      }
    }
  }

  async #getValidBonusNumber() {
    while (true) {
      try {
        const BonusNumberInput = await Input.getBonusNumberInput();
        const BonusNumber = Input.convertBonusNumberToNumber(BonusNumberInput);
        return new Bonus(BonusNumber);
      } catch (error) {
        Output.printError(error.message);
      }
    }
  }
}  

export default App;
