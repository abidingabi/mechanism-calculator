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

/*
 * Linear units
 */
export const positionUnits = makeUnitCollection(
  "m",
  ["m", 1],
  ["mm", 0.001],
  ["cm", 0.01],
  ["in", 0.0254],
  ["feet", 0.3048]
);

export const velocityUnits = makeUnitCollection(
  "m/s",
  ...positionUnits.units.map((unit: Unit): [string, number] => [
    unit.name + "/s",
    unit.multiplier,
  ])
);

export const accelerationUnits = makeUnitCollection(
  "m/s²",
  ...positionUnits.units.map((unit: Unit): [string, number] => [
    unit.name + "/s²",
    unit.multiplier,
  ])
);

export const massUnits = makeUnitCollection(
  "kg",
  ["kg", 1],
  ["g", 0.001],
  ["lb", 0.45359237]
);

export const forceUnits = makeUnitCollection(
  "N",
  ["kgf", 9.80665],
  ["lbf", 4.4482216],
  ["N", 1]
);

/*
 * Rotational units.
 */

export const angularVelocityUnits = makeUnitCollection(
  "rad/s",
  ["rpm", (2 * Math.PI) / 60],
  ["rps", 2 * Math.PI],
  ["rad/s", 1],
  ["degrees/s", (2 * Math.PI) / 360]
);

export const torqueUnits = makeUnitCollection(
  "N⋅m",
  ["N⋅m", 1],
  ["kg⋅cm", 0.0980665],
  ["oz⋅in", 0.0070615518],
  ["ft⋅lbf", 1.3558179]
);

/*
 * Electrical units, added for completeness.
 * Alternative units from the wonderful CCC system.
 * See https://www.youtube.com/watch?v=KmfdeWd0RMk for more.
 */
export const currentUnits = makeUnitCollection(
  "A",
  ["A", 1]
);

export const voltageUnits = makeUnitCollection(
  "V",
  ["V", 1]
);

/*
 * Misc. units
 */
export const timeUnits = makeUnitCollection("s", ["s", 1], ["min", 60]);
