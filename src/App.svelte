<script>
  // import MotorInput from "./lib/MotorInput.svelte";
  // import MotorCurve from "./lib/MotorCurve.svelte";
  import ConstantLoadLinearMechanismView from "./lib/ConstantLoadLinearMechanismView.svelte";

  let motor;
</script>

<main>
  <h1>Mechanism Calculator</h1>

  <ConstantLoadLinearMechanismView />

  <!-- <MotorInput bind:value={motor} />
       {#if motor != undefined}
       <MotorCurve {motor} />
       {/if} -->
</main>
