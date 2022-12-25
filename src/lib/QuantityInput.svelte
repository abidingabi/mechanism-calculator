<script lang="ts">
  import NumericInput from "./NumericInput.svelte";
  import type { UnitCollection } from "../units";

  export let label: string;
  export let units: UnitCollection;
  export let range: "all" | "nonnegative" | "positive" = "all";
  export let value: number;

  let magnitude = 0;
  let selectedUnit = units.units[0];

  $: value = magnitude * selectedUnit.multiplier;
</script>

<div>
  <NumericInput {label} {range} bind:value={magnitude} />
  <select bind:value={selectedUnit}>
    {#each units.units as unit}
      <option value={unit}>
        {unit.name}
      </option>
    {/each}
  </select>

  <span>= {value.toFixed(2)} {units.baseUnit.name}</span>
</div>
