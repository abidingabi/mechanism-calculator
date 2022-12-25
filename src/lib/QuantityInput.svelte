<script lang="ts">
  import type { UnitCollection } from "../units";

  export let label: string;
  export let units: UnitCollection;
  export let placeholder: string = "quantity";
  export let value: number;

  let magnitude = 0;
  let selectedUnit = units.units[0];

  $: value = magnitude * selectedUnit.multiplier;
</script>

<div>
  <label for={label}>{label}</label>
  <input id={label} type="number" bind:value={magnitude} {placeholder} />
  <select bind:value={selectedUnit}>
    {#each units.units as unit}
      <option value={unit}>
        {unit.name}
      </option>
    {/each}
  </select>

  <span>= {value.toFixed(2)} {units.baseUnit.name}</span>
</div>
