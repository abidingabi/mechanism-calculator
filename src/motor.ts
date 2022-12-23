/**
 * Represents a motor, in SI units.
 */
export interface Motor {
  readonly stallTorque: number;
  readonly freeSpeed: number;
}

/**
 * Constructs a new motor that is geared ratio times slower.
 */
export function gear(motor: Motor, ratio: number): Motor {
  return {
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
  };
}
