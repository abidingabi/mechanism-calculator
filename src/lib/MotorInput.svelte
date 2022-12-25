<script lang="ts">
  import QuantityInput from "./QuantityInput.svelte";
  import {
    angularVelocityUnits,
    currentUnits,
    torqueUnits,
    voltageUnits,
  } from "../units";
  import { gear, quantity, knownMotors } from "../motor";
  import type { Motor } from "../motor";

  /**
   * Determines whether electrical information is asked for custom motors.
   */
  export let needElectrical: boolean = true;
  export let value: Motor;

  let customMotor: boolean = false;

  let selectedMotor: Motor = knownMotors[0][1];

  // used for custom motor
  let freeSpeed = 0;
  let stallTorque = 0;
  let freeCurrent = 0;
  let stallCurrent = 0;
  let voltage = 0;

  let gearRatio = 1;
  let count = 1;

  $: baseMotor = customMotor
    ? {
        freeSpeed,
        stallTorque,
        freeCurrent,
        stallCurrent,
        voltage,
      }
    : selectedMotor;

  $: value = quantity(gear(baseMotor, gearRatio), count);
</script>

<div>
  <input type="checkbox" id="custom-motor" bind:checked={customMotor} />
  <label for="custom-motor">Custom Motor?</label>
</div>

{#if customMotor}
  <div>
    <QuantityInput units={angularVelocityUnits} bind:value={freeSpeed} />
    <QuantityInput units={torqueUnits} bind:value={stallTorque} />

    {#if needElectrical}
      <QuantityInput units={currentUnits} bind:value={freeCurrent} />
      <QuantityInput units={currentUnits} bind:value={stallCurrent} />
      <QuantityInput units={voltageUnits} bind:value={voltage} />
    {/if}
  </div>
{:else}
  <div>
    <select bind:value={selectedMotor}>
      {#each knownMotors as [name, motor]}
        <option value={motor}>
          {name}
        </option>
      {/each}
    </select>
  </div>
{/if}

<div>
  <label for="gear-ratio">Gear Ratio</label>
  <input type="number" id="gear-ratio" bind:value={gearRatio} min="0" />
</div>

<div>
  <label for="motor-count">Motor Count</label>
  <input type="number" id="motor-count" bind:value={count} min="1" />
</div>
