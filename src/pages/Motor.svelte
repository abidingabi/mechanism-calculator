<script>
  import Navbar from "../lib/Navbar.svelte";
  import MotorInput from "../lib/MotorInput.svelte";
  import MotorCurve from "../lib/MotorCurve.svelte";
  import KnownMotorInformation from "../lib/KnownMotorInformation.svelte";

  let motor;
</script>

<Navbar />

<main>
  <h1>Motor</h1>

  <div id="motor">
    <MotorInput bind:value={motor} />
    {#if motor != undefined}
      <MotorCurve {motor} />
    {/if}
  </div>

  <KnownMotorInformation />
</main>

<style>
  #motor {
    max-width: 75%;
  }
</style>
