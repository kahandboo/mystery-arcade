import { CAR_NAMES } from "../racingCar/Constants.js";

class CarGame {
  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  progressRound() {
    this.#cars.forEach(car => car.move(car));
  }

  getCars() {
    return [...this.#cars];
  }

  getWinners() {
    const maxScore = Math.max(...this.#cars.map(car => car.getScore()));
    const winners = this.#cars.filter(car => car.getScore() === maxScore);
    
    return winners;    
  }
}

function shuffle(array) {
  const newArray = [...array]; 
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

function generateCarNames(playerCarName, totalCount) {
  const availableNames = CAR_NAMES.filter(name => name !== playerCarName);
  const shuffledNames = shuffle(availableNames);
  const opponents = shuffledNames.slice(0, totalCount - 1);
  const allCars = [playerCarName, ...opponents];
  return allCars;
}

export { CarGame, generateCarNames };