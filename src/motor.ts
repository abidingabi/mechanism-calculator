/**
 * Represents a motor, in SI units.
 */
export interface Motor {
  readonly stallTorque: number;
  readonly freeSpeed: number;
  readonly voltage: number;
  readonly stallCurrent: number;
  readonly freeCurrent: number;
}

/**
 * Constructs a new motor that is geared ratio times slower.
 */
export function gear(motor: Motor, ratio: number): Motor {
  return {
    ...motor,
    stallTorque: motor.stallTorque * ratio,
    freeSpeed: motor.freeSpeed / ratio,
  };
}

/**
 * Constructs a new motor that represents a collection of motors.
 */
export function quantity(motor: Motor, quantity: number): Motor {
  return {
    ...motor,
    stallTorque: motor.stallTorque * quantity,
    stallCurrent: motor.stallCurrent * quantity,
    freeCurrent: motor.freeCurrent * quantity,
  };
}

/**
 * Returns current draw of a motor under a given speed (in rad/s).
 */
export function currentDraw(motor: Motor, speed: number): number {
  const speedFraction = speed / motor.freeSpeed;
  const currentRange = motor.stallCurrent - motor.freeCurrent;

  return motor.stallCurrent - currentRange * speedFraction;
}

/**
 * Stores: motor name,
 * free speed (RPM),
 * stall torque (N⋅m),
 * voltage (V),
 * stall current (A),
 * free current (A)
 */
const motorSpecs: readonly [string, number, number, number, number, number][] =
  [
    ["goBILDA (MATRIX)", 5900, 0.19, 12, 11, 0.3],
    ["NeveRest", 5500, 0.17, 12, 9.8, 0.4],
    ["REV Core Hex", 125, 3.2, 12, 4.4, 0.2],
    ["REV HD Hex", 6000, 0.18, 12, 11, 0.3],
    ["TorqueNado", 5900, 0.17, 12, 9.8, 0.2],
    ["REV NEO", 5676, 2.6, 12, 150, 1.8],
    ["REV NEO 550", 11000, 0.97, 12, 100, 1.4],
  ];

/**
 * A list of names of motors along with their known specifications.
 */
export const knownMotors: readonly [string, Motor][] = motorSpecs.map(
  ([name, freeSpeedRPM, stallTorque, voltage, stallCurrent, freeCurrent]) => [
    name,
    {
      stallTorque,
      freeSpeed: (freeSpeedRPM * 2 * Math.PI) / 60,
      voltage,
      stallCurrent,
      freeCurrent,
    },
  ]
);
