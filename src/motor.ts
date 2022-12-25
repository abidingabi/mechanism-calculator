/**
 * Represents a motor, in SI units.
 */
export interface Motor {
  readonly stallTorque: number;
  readonly freeSpeed: number;
  readonly voltage: number;
  readonly freeCurrent: number;
  readonly stallCurrent: number;
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
    freeCurrent: motor.freeCurrent * quantity,
    stallCurrent: motor.stallCurrent * quantity,
  };
}

/**
 * Stores: motor name,
 * free speed (RPM),
 * voltage (V),
 * stall torque (N*m)
 * free current (A),
 * stall current (A)
 */
const motorSpecs: readonly [string, number, number, number, number, number][] =
  [
    ["goBILDA (Matrix)", 5900, 0.19, 12, 0.3, 11],
    ["NeveRest", 5500, 0.17, 12, 0.4, 9.8],
    ["REV Core Hex", 125, 3.2, 12, 0.2, 4.4],
    ["REV HD Hex", 6000, 0.18, 12, 0.3, 11],
    ["TorqueNado", 5900, 0.17, 12, 0.2, 9.8],
  ];

/**
 * A list of names of motors along with their known specifications.
 */
export const knownMotors: readonly [string, Motor][] = motorSpecs.map(
  ([name, freeSpeedRPM, stallTorque, voltage, freeCurrent, stallCurrent]) => [
    name,
    {
      stallTorque,
      freeSpeed: (freeSpeedRPM * 2 * Math.PI) / 60,
      voltage,
      freeCurrent,
      stallCurrent,
    },
  ]
);
