<script lang="ts">
  import { currentDraw } from "../motor";
  import type { Motor } from "../motor";
  import Graph from "./Graph.svelte";
  import { makeGraphable, makeYAxis } from "./Graph.svelte";

  export let motor: Motor;

  $: torque = (speed: number) =>
    motor.stallTorque * (1 - speed / motor.freeSpeed);

  $: powerOutput = (speed: number) => torque(speed) * speed;

  $: currentDrawSpeed = (speed: number) => currentDraw(motor, speed);

  $: efficiency = (speed: number) =>
    (100 * powerOutput(speed)) / (currentDrawSpeed(speed) * motor.voltage);

  /**
   * Calls a function that expects rad/s with a RPM input.
   * Also sets the minimum at 0, because of floating point error.
   */
  function inputRPM(func: (speed: number) => number): (rpm: number) => number {
    return (rpm) => Math.max(func((rpm * Math.PI * 2) / 60), 0);
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
      inputRPM(currentDrawSpeed),
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
