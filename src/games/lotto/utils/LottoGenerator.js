import Lotto from "../domain/Lotto.js";
import { pickUniqueNumbersInRange } from "./Constants.js";

class LottoGenerator {
  static generateSingle() {
    const numbers = LottoGenerator.#getLottoNumbers();
    return new Lotto(numbers);
  }

  static generateMultiple(count) {
    return Array.from({ length: count }, () => LottoGenerator.generateSingle());
  }

  static #getLottoNumbers() {
    const numbers = pickUniqueNumbersInRange(1, 45, 6);
    return numbers;
  }
}

export default LottoGenerator;