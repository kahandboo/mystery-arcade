const INPUT_MESSAGES = {
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
  LOTTO_NUMBERS: "\n당첨 번호를 입력해 주세요.\n",
  BONUS_NUMBER: "\n보너스 번호를 입력해 주세요.\n",
};

const RANK = Object.freeze({
  NONE: { key: 'NONE', match: 2, prize: 0 },
  FIFTH: { key: 'FIFTH', match: 3, prize: 5000 },
  FOURTH: { key: 'FOURTH', match: 4, prize: 50000 },
  THIRD: { key: 'THIRD', match: 5, prize: 1500000 },
  SECOND: { key: 'SECOND', match: 5, prize: 30000000 },
  FIRST: { key: 'FIRST', match: 6, prize: 2000000000 },
});

const OUTPUT_MESSAGES = {
  PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  RESULT_HEADER: "\n당첨 통계", 
  DIVIDER: "---",             
  FIFTH: (count) => `${RANK.FIFTH.match}개 일치 (${RANK.FIFTH.prize.toLocaleString()}원) - ${count}개`,
  FOURTH: (count) => `${RANK.FOURTH.match}개 일치 (${RANK.FOURTH.prize.toLocaleString()}원) - ${count}개`,
  THIRD: (count) => `${RANK.THIRD.match}개 일치 (${RANK.THIRD.prize.toLocaleString()}원) - ${count}개`,
  SECOND: (count) => `${RANK.SECOND.match}개 일치, 보너스 볼 일치 (${RANK.SECOND.prize.toLocaleString()}원) - ${count}개`,
  FIRST: (count) => `${RANK.FIRST.match}개 일치 (${RANK.FIRST.prize.toLocaleString()}원) - ${count}개`,
  TOTAL_RETURN: (profitRate) => `총 수익률은 ${profitRate}%입니다.`
};

const ERROR_PREFIX = "[ERROR]";

const ERROR_MESSAGES = {
  BONUS_NUMBER_OUT_OF_RANGE: `${ERROR_PREFIX} 보너스 번호는 1~45 사이의 숫자여야 합니다.`,
  INVALID_LOTTO_NUMBER_COUNT: `${ERROR_PREFIX} 로또 번호는 6개여야 합니다.`,
  DUPLICATE_LOTTO_NUMBERS: `${ERROR_PREFIX} 로또 번호는 중복될 수 없습니다.`,
  LOTTO_NUMBER_OUT_OF_RANGE: `${ERROR_PREFIX} 로또 번호는 1~45 사이의 숫자여야 합니다.`,
  AMOUNT_LESS_THAN_MINIMUM: `${ERROR_PREFIX} 구입금액은 1000원 이상이어야 합니다.`,
  INVALID_AMOUNT_UNIT: `${ERROR_PREFIX} 구입금액은 1000원으로 나누어 떨어져야 합니다.`
};

export { INPUT_MESSAGES, OUTPUT_MESSAGES, ERROR_MESSAGES, RANK };