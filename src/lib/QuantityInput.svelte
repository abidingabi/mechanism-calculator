<script lang="ts">
  import type { UnitCollection } from "../units";

  export let units: UnitCollection;
  export let placeholder: string = "quantity";

  let magnitude = 0;
  let selectedUnit = units.units[0];

  $: value = magnitude * selectedUnit.multiplier;
</script>

<input type="number" bind:value={magnitude} {placeholder} />
<select bind:value={selectedUnit}>
  {#each units.units as unit, index}
    <option selected={index == 0} value={unit}>
      {unit.name}
    </option>
  {/each}
</select>

<span>= {value.toFixed(2)} {units.baseUnit.name}</span>
