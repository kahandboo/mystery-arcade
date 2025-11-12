import { INPUT_MESSAGES } from "../utils/Constants.js";
import { MissionUtils } from "@woowacourse/mission-utils";

class Input {
  static getPurchaseAmountInput() {
    return MissionUtils.Console.readLineAsync(INPUT_MESSAGES.PURCHASE_AMOUNT);
  }

  static getLottoNumbersInput() {
    return MissionUtils.Console.readLineAsync(INPUT_MESSAGES.LOTTO_NUMBERS);
  }

  static getBonusNumberInput() {
    return MissionUtils.Console.readLineAsync(INPUT_MESSAGES.BONUS_NUMBER);
  }

  static parseLottoNumbersInput(lottoNumbersInput) {
    return lottoNumbersInput.split(",").map(Number);
  }

  static convertPurchaseAmountToNumber(purchaseAmountInput) {
    return Number(purchaseAmountInput);
  }

  static convertBonusNumberToNumber(bonusNumberInput) {
    return Number(bonusNumberInput);
  }
}

export default Input;