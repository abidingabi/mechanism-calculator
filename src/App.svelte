<script>
  import MotorInput from "./lib/MotorInput.svelte";
  import MotorCurve from "./lib/MotorCurve.svelte";

  let motor;
</script>

<main>
  <h1>Mechanism Calculator</h1>

  <MotorInput bind:value={motor} />
  <MotorCurve {motor} />
</main>
