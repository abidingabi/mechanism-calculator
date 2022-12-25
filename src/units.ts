/*
 * Everything outside of the UI uses SI units,
 * however, conversion for both input/display is necessary.
 */

export interface Unit {
  name: string;
  /**
   * What number a number in the given unit has to be multiplied by
   * to give the SI equivalent.
   */
  multiplier: number;
}

/**
 * A BaseUnit is the base SI Unit, it by definition has a multiplier of 1.
 */
export interface BaseUnit extends Unit {
  multiplier: 1;
}

/**
 * Represents a type of unit (e.g. angular velocity).
 */
export interface UnitCollection {
  baseUnit: BaseUnit;
  /**
   * The order here dictates what order are used for dropdowns.
   */
  units: Unit[];
}

function makeUnitCollection(
  baseUnitName: string,
  ...unitDescriptions: [string, number][]
): UnitCollection {
  return {
    baseUnit: {
      name: baseUnitName,
      multiplier: 1,
    },
    units: unitDescriptions.map(([name, multiplier]) => {
      return { name, multiplier };
    }),
  };
}

export const angularVelocityUnits = makeUnitCollection(
  "rad/s",
  ["rpm", (2 * Math.PI) / 60],
  ["rps", 2 * Math.PI],
  ["rad/s", 1],
  ["degrees/s", (2 * Math.PI) / 360]
);
