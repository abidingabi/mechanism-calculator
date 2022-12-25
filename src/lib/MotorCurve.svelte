<script lang="ts">
  import type { Motor } from "../motor";
  import Graph from "./Graph.svelte";
  import { makeGraphable, makeYAxis } from "./Graph.svelte";

  export let motor: Motor;

  $: torque = (speed: number) =>
    motor.stallTorque * (1 - speed / motor.freeSpeed);

  $: powerOutput = (speed: number) => torque(speed) * speed;

  $: currentDraw = (speed: number) =>
    ((motor.freeCurrent - motor.stallCurrent) / motor.freeSpeed) * speed +
    motor.stallCurrent;

  $: efficiency = (speed: number) =>
    (100 * powerOutput(speed)) / (currentDraw(speed) * motor.voltage);

  /**
   * Calls a function that expects rad/s with a RPM input.
   */
  function inputRPM(func: (speed: number) => number): (rpm: number) => number {
    return (rpm) => func((rpm * Math.PI * 2) / 60);
  }

  $: freeSpeedRPM = (60 * motor.freeSpeed) / (Math.PI * 2);
</script>

<Graph
  xAxis="Motor Speed (RPM)"
  graphables={[
    makeGraphable(
      "Output Power (W)",
      inputRPM(powerOutput),
      0,
      freeSpeedRPM,
      makeYAxis("Current (A), Power (W)")
    ),
    makeGraphable(
      "Current (A)",
      inputRPM(currentDraw),
      0,
      freeSpeedRPM,
      makeYAxis("Current (A), Power (W)")
    ),
    makeGraphable(
      "Torque (N⋅m)",
      inputRPM(torque),
      0,
      freeSpeedRPM,
      makeYAxis("Torque (N⋅m)", "right")
    ),
    makeGraphable(
      "Efficiency (%)",
      inputRPM(efficiency),
      0,
      freeSpeedRPM,
      makeYAxis("Efficiency (%)", "left", 100)
    ),
  ]}
/>
