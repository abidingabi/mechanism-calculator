<script lang="ts">
  import type { knownMotors } from "../motor";
  import type { Motor } from "../motor";
  import MotorInput from "./MotorInput.svelte";
  import Graph from "./Graph.svelte";
  import { makeGraphable } from "./Graph.svelte";

  export let motor: Motor;

  $: torque = (speed: number) =>
    motor.stallTorque * (1 - speed / motor.freeSpeed);

  $: powerOutput = (speed: number) => torque(speed) * speed;

  $: currentDraw = (speed: number) =>
    ((motor.freeCurrent - motor.stallCurrent) / motor.freeSpeed) * speed +
    motor.stallCurrent;

  $: efficiency = (speed: number) =>
    100 * powerOutput(speed) / (currentDraw(speed) * motor.voltage);
</script>

{#if motor != undefined}
  <Graph
    graphables={[
      makeGraphable(torque, 0, motor.freeSpeed),
      makeGraphable(powerOutput, 0, motor.freeSpeed),
      makeGraphable(currentDraw, 0, motor.freeSpeed),
      makeGraphable(efficiency, 0, motor.freeSpeed),
    ]}
  />
{/if}
