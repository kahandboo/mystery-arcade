import { CONSTANTS } from "./Constants.js";

class Car {
  #name; 
  #score;

  constructor(name) {
    this.#name = name;
    this.#score = 0;
  }

  move() {
    const randomNumber = Math.floor(Math.random() * (CONSTANTS.RANDOM_RANGE_MAX - CONSTANTS.RANDOM_RANGE_MIN + 1)) + CONSTANTS.RANDOM_RANGE_MIN;
        
    if (randomNumber >= CONSTANTS.MIN_MOVE_NUMBER) {
      this.#score += 1;
    }       
  }

  getName() {
    return this.#name;
  }

  getScore() {
    return this.#score;
  }
}

export default Car;