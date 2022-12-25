<script>
  import Graph from "./lib/Graph.svelte";
  import { makeGraphable } from "./lib/Graph.svelte";
  import QuantityInput from "./lib/QuantityInput.svelte";
  import { angularVelocityUnits } from "./units";
</script>

<main>
  <h1>Mechanism Calculator</h1>

  <QuantityInput units={angularVelocityUnits} />
  <Graph
    graphables={[
      makeGraphable((x) => x, -10, 5),
      makeGraphable((x) => x * x, -5, 5),
      makeGraphable((x) => x * x * x, -5, 5),
      makeGraphable((x) => Math.exp(x), -5, 5),
    ]}
  />
</main>
