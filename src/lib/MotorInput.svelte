<script lang="ts">
  import NumericInput from "./NumericInput.svelte";
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
  let stallCurrent = 0;
  let freeCurrent = 0;
  let voltage = 0;

  let gearRatio = 1;
  let count = 1;

  $: baseMotor = customMotor
    ? {
        freeSpeed,
        stallTorque,
        stallCurrent,
        freeCurrent,
        voltage,
      }
    : selectedMotor;

  $: value = quantity(gear(baseMotor, gearRatio), count);
</script>

<div>
  <div>
    <NumericInput label="Gear Ratio:" range="positive" bind:value={gearRatio} />
  </div>
  <div>
    <NumericInput label="Motor Count:" range="positive" bind:value={count} />
  </div>

  <div>
    <label for="custom-motor">Custom Motor?:</label>
    <input type="checkbox" id="custom-motor" bind:checked={customMotor} />
  </div>

  {#if customMotor}
    <div>
      <QuantityInput
        label="Free Speed:"
        range="positive"
        units={angularVelocityUnits}
        bind:value={freeSpeed}
      />
      <QuantityInput
        label="Stall Torque:"
        range="positive"
        units={torqueUnits}
        bind:value={stallTorque}
      />

      {#if needElectrical}
        <QuantityInput
          label="Stall Current:"
          range="positive"
          units={currentUnits}
          bind:value={stallCurrent}
        />
        <QuantityInput
          label="Free Current:"
          range="positive"
          units={currentUnits}
          bind:value={freeCurrent}
        />
        <QuantityInput
          label="Voltage:"
          range="positive"
          units={voltageUnits}
          bind:value={voltage}
        />
      {/if}
    </div>
  {:else}
    <div>
      <label for="motor-select">Motor: </label>
      <select id="motor-select" bind:value={selectedMotor}>
        {#each knownMotors as [name, motor]}
          <option value={motor}>
            {name}
          </option>
        {/each}
      </select>
    </div>
  {/if}
</div>
