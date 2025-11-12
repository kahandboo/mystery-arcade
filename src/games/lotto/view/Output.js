import { MissionUtils } from "@woowacourse/mission-utils";
import { OUTPUT_MESSAGES, RANK } from "../utils/Constants.js";

class Output {
  static printPurchaseCount(count) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.PURCHASE_COUNT(count));
  }

  static printPurchasedLottos(PurchasedLottos) {
    PurchasedLottos.forEach((purchasedLotto) => {
      const numbers = purchasedLotto.numbers;
      const sortedNumbers = [...numbers].sort((a, b) => a - b);
      const formattedString = `[${sortedNumbers.join(', ')}]`;

      MissionUtils.Console.print(formattedString);
    });
  }

  static printRankResults(rankCounts) {
    const ranks = Object.values(RANK);
    MissionUtils.Console.print(OUTPUT_MESSAGES.RESULT_HEADER);
    MissionUtils.Console.print(OUTPUT_MESSAGES.DIVIDER);

    ranks.forEach((rank) => {
      if (rank !== RANK.NONE) {
        const rankKey = rank.key;
        const count = rankCounts[rankKey];
        const formatRankMessage = OUTPUT_MESSAGES[rankKey];

        MissionUtils.Console.print(formatRankMessage(count));
      }
    });
  }

  static printProfitRate(profitRate) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.TOTAL_RETURN(profitRate));
  }

  static printError(errorMsg) {
    MissionUtils.Console.print(errorMsg);
  }
}

export default Output;