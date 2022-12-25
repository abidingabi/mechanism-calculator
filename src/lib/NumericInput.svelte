<script lang="ts">
  export let label: string;
  export let range: "all" | "nonnegative" | "positive" = "all";
  export let value: number;

  function valid(value: number): boolean {
    if (value == null) {
      return false;
    }

    return (
      range == "all" ||
      (range == "nonnegative" && value >= 0) ||
      (range == "positive" && value > 0)
    );
  }

  let rawValue: number = value;
  $: invalid = !valid(rawValue);
  $: value = invalid ? value : rawValue;
</script>

<label for={label}>{label}</label>
<input type="number" id={label} class:invalid bind:value={rawValue} />

<style>
  .invalid {
    border-color: red;
  }
</style>
