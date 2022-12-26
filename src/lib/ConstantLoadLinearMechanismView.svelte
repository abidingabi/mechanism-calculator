<script lang="ts">
  import { timeToPosition } from "../mechanism";
  import { ConstantLoadLinearMechanism } from "../constant-load-linear";
  import type { Motor } from "../motor";
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

  let motor: Motor;
  let radius: number = 1;
  let loadForce: number;
  let mass: number = 1;
  let initialPosition: number;
  let initialVelocity: number;
  let time: number = 5;
  let positionGoal: number;

  let mechanism = null;

  $: mechanism = new ConstantLoadLinearMechanism(
    motor,
    radius,
    loadForce,
    mass,
    initialPosition,
    initialVelocity
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

{#if mechanism.equivalentAngularMechanism.motor != undefined}
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
        makeYAxis("Velocity (m/s)", "right")
      ),
    ]}
  />

  <Graph
    xAxis="Radius (m)"
    graphables={[
      makeGraphable(
        "Time to Goal (s)",
        (r) =>
          timeToPosition(
            new ConstantLoadLinearMechanism(
              motor,
              r,
              loadForce,
              mass,
              initialPosition,
              initialVelocity
            ),
            positionGoal
          ),
        0.01,
        1,
        makeYAxis("Time to Goal (s)", "left")
      ),
    ]}
  />
{/if}
