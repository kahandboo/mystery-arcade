import { ERROR_MESSAGES } from "../utils/Constants.js";

class Bonus {
  #number;

  constructor(number) {
    this.#validate(number);
    this.#number = number;
  }

  get number() {
    return this.#number;
  }

  #validate(number) {
    if (!Number.isInteger(number) || number < 1 || number > 45) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_OUT_OF_RANGE);
    }
  }
}

export default Bonus;