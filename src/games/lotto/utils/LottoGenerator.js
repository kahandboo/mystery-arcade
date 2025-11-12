import Lotto from "../domain/Lotto.js";
import { MissionUtils } from "@woowacourse/mission-utils";

class LottoGenerator {
  static generateSingle() {
    const numbers = LottoGenerator.#getLottoNumbers();
    return new Lotto(numbers);
  }

  static generateMultiple(count) {
    return Array.from({ length: count }, () => LottoGenerator.generateSingle());
  }

  static #getLottoNumbers() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    return numbers;
  }
}

export default LottoGenerator;