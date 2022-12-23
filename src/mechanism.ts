/**
 * Uses Newton's method to estimate where a given value of f occurs,
 * given f, f', and an initial guess. More iterations will give more precision.
 */
function newtonsMethod(
  value: number,
  f: (x: number) => number,
  df: (x: number) => number,
  initialGuess: number,
  iterations: number
): number {
  let guess = initialGuess;

  for (let i = 0; i < iterations; i++) {
    guess = guess - (f(guess) - value) / df(guess);
  }

  return guess;
}

export interface PositionMechanism {
  position(time: number): number;
  velocity(time: number): number;
}

export interface VelocityMechanism {
  velocity(time: number): number;
  acceleration(time: number): number;
}

/**
 * Used as the initial guess for times for Newton's method.
 */
const INITIAL_TIME_GUESS = 1.0;

/**
 * Estimates the time to a given goal position. More iterations will give more precision.
 */
export function timeToPosition(
  mechanism: PositionMechanism,
  goal: number,
  iterations: number = 10
): number {
  return newtonsMethod(
    goal,
    mechanism.position,
    mechanism.velocity,
    INITIAL_TIME_GUESS, // this is being used as the initial guess
    iterations
  );
}

export function timeToVelocity(
  mechanism: VelocityMechanism,
  goal: number,
  iterations: number = 10
): number {
  return newtonsMethod(
    goal,
    mechanism.velocity,
    mechanism.acceleration,
    INITIAL_TIME_GUESS,
    iterations
  );
}
