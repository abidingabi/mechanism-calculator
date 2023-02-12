<script lang="ts">
  import { timeToPosition } from "../mechanism";
  import { ConstantLoadLinearMechanism } from "../constant-load-linear";
  import type { Motor } from "../motor";
  import { constants, currentDraw, knownMotors } from "../motor";
  import {
    forceUnits,
    massUnits,
    positionUnits,
    timeUnits,
    velocityUnits,
  } from "../units";

  import MotorInput from "./MotorInput.svelte";
  import QuantityInput from "./QuantityInput.svelte";
  import Graph from "./Graph.svelte";
  import { makeGraphable, makeYAxis } from "./Graph.svelte";

  let motor: Motor = knownMotors[0][1];
  let radius: number = 1;
  let loadForce: number;
  let mass: number = 1;
  let initialPosition: number;
  let initialVelocity: number;
  let time: number = 5;
  let positionGoal: number;

  let mechanism = null;

  $: mechanism = new ConstantLoadLinearMechanism(
    constants(motor),
    motor.voltage,
    radius,
    loadForce,
    mass,
    initialPosition,
    initialVelocity
  );

  function iterateUntilNegative(
    f: (x: number) => number,
    stepSize: number,
    initial: number
  ): number {
    let current = initial;
    while (f(current) > 0) {
      current += stepSize;
    }

    return current - stepSize;
  }

  function iterateUntilMinimum(
    f: (x: number) => number,
    stepSize: number,
    initial: number
  ) {
    let signedStep = f(initial + stepSize) > f(initial) ? -stepSize : stepSize;

    let currentX = initial;
    while (f(currentX + signedStep) < f(currentX)) {
      currentX += signedStep;
    }

    return currentX;
  }
  $: timeToPositionRadius = (g: number) => (r: number) =>
    timeToPosition(
      new ConstantLoadLinearMechanism(
        constants(motor),
        motor.voltage,
        r,
        loadForce,
        mass,
        initialPosition,
        initialVelocity
      ),
      g
    );
</script>

<MotorInput needElectrical={false} bind:value={motor} />
<QuantityInput
  label="Radius:"
  units={positionUnits}
  range="positive"
  bind:value={radius}
/>
<QuantityInput label="Load Force:" units={forceUnits} bind:value={loadForce} />
<QuantityInput
  label="Mass:"
  units={massUnits}
  range="positive"
  bind:value={mass}
/>
<QuantityInput
  label="Initial Position:"
  units={positionUnits}
  bind:value={initialPosition}
/>
<QuantityInput
  label="Initial Velocity:"
  units={velocityUnits}
  bind:value={initialVelocity}
/>
<QuantityInput label="Time" units={timeUnits} bind:value={time} />
<QuantityInput
  label="Position Goal"
  units={positionUnits}
  bind:value={positionGoal}
/>

<Graph
  xAxis="Time (s)"
  graphables={[
    makeGraphable(
      "Position (m)",
      (t) => mechanism.position(t),
      0,
      time,
      makeYAxis("Position (m)", "left")
    ),
    makeGraphable(
      "Position Goal (m)",
      (_) => positionGoal,
      0,
      time,
      makeYAxis("Position (m)", "left")
    ),
    makeGraphable(
      "Velocity (m/s)",
      (t) => mechanism.velocity(t),
      0,
      time,
      makeYAxis("Velocity (m/s)", "left")
    ),
    makeGraphable(
      "Current (A)",
      (t) =>
        currentDraw(motor, mechanism.equivalentAngularMechanism.velocity(t)),
      0,
      time,
      makeYAxis("Current (A)", "right")
    ),
  ]}
/>

<Graph
  xAxis="Radius (m)"
  graphables={[
    makeGraphable(
      "Time to Goal (s)",
      timeToPositionRadius(positionGoal),
      iterateUntilNegative(timeToPositionRadius(positionGoal), -0.01, radius),
      iterateUntilNegative(timeToPositionRadius(positionGoal), 0.01, radius),
      makeYAxis("Time to Goal (s)", "left")
    ),
  ]}
/>

<Graph
  xAxis="Goal (m)"
  graphables={[
    makeGraphable(
      "Radius (m)",
      (g) =>
        iterateUntilMinimum((r) => timeToPositionRadius(g)(r), 0.00001, radius),
      positionGoal / 10,
      positionGoal * 3,
      makeYAxis("Radius Minimizing Time to Goal (m)", "left")
    ),
  ]}
  samples={50}
/>
