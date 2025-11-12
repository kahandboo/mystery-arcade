import { ERROR_MESSAGES, RANK } from "../utils/Constants.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return [...this.#numbers];
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGES.INVALID_LOTTO_NUMBER_COUNT);
    }

    const numbersSet = new Set(numbers);
    if (numbersSet.size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATE_LOTTO_NUMBERS);
    }

    numbers.forEach((num) => {
      if (!Number.isInteger(num) || num < 1 || num > 45) {
        throw new Error(ERROR_MESSAGES.LOTTO_NUMBER_OUT_OF_RANGE);
      }
    });
  }

  #countMatches(inputLotto) {
    const inputNumbers = inputLotto.numbers; 
    return this.#numbers.filter(num => inputNumbers.includes(num)).length;
  }

  #hasBonus(bonus) {
    const bonusNumber = bonus.number;
    return this.#numbers.includes(bonusNumber);
  }

  determineRank(inputLotto, bonus) {
    const matchCount = this.#countMatches(inputLotto);
    const hasBonus = this.#hasBonus(bonus);

    if (matchCount === RANK.FIRST.match) return RANK.FIRST;
    if (matchCount === RANK.SECOND.match) {
      if (hasBonus) return RANK.SECOND;
      else return RANK.THIRD;
    }
    if (matchCount === RANK.FOURTH.match) return RANK.FOURTH;
    if (matchCount === RANK.FIFTH.match) return RANK.FIFTH;
    return RANK.NONE;
  }
}

export default Lotto;
