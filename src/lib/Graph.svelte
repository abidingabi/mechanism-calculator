<script lang="ts" context="module">
  export interface Graphable {
    func: (x: number) => number;
    xMin: number;
    xMax: number;
    samples: number;
  }

  export function makeGraphable(
    func: (x: number) => number,
    xMin: number,
    xMax: number,
    samples: number = 100
  ): Graphable {
    return {
      func,
      xMin,
      xMax,
      samples,
    };
  }
</script>

<script lang="ts">
  import { afterUpdate } from "svelte";
  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
  } from "chart.js";

  Chart.register(LineController, LineElement, PointElement, LinearScale);

  export let graphables: Graphable[];

  const data = {
    datasets: graphables.map((g) => {
      let dx = (g.xMax - g.xMin) / (g.samples - 1);
      return {
        data: Array.from({ length: g.samples }, (_, i) => {
          return [g.xMin + dx * i, g.func(g.xMin + dx * i)];
        }),
      };
    }),
  };

  const chartOptions = {
    type: "line",
    data,

    options: {
      scales: {
        x: {
          type: "linear",
        },
        y: {
          beginAtZero: true,
          type: "linear",
        },
      },

      elements: {
        line: {
          cubicInterpolationMode: "monotone",
          borderWidth: 5,
        },
      },
    },
  };

  let canvas: HTMLCanvasElement;

  afterUpdate(() => {
    new Chart(canvas, chartOptions as any);
  });
</script>

<canvas bind:this={canvas} />
