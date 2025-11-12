import { ERROR_MESSAGES } from "../utils/Constants.js";

class PurchaseAmount {
  #amount;

  constructor(amount) {
    this.#validate(amount);
    this.#amount = amount;
  }

  get amount() {
    return this.#amount;
  }

  get count() {
    return this.#amount / 1000;
  }

  #validate(amount) {
    if (!Number.isInteger(amount) || amount < 1000) {
      throw new Error(ERROR_MESSAGES.AMOUNT_LESS_THAN_MINIMUM);
    }

    if (amount % 1000 !== 0) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT_UNIT);
    }
  }
}

export default PurchaseAmount;