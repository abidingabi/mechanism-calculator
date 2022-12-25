<script lang="ts" context="module">
  export interface YAxis {
    label: string;
    position: "left" | "right";
    max: number;
  }

  export interface Graphable {
    label: string;
    func: (x: number) => number;
    xMin: number;
    xMax: number;
    yAxis: YAxis;
  }

  export function makeYAxis(
    label: string,
    position: "left" | "right" = "left",
    max: number = null
  ) {
    return {
      label,
      position,
      max,
    };
  }

  export function makeGraphable(
    label: string,
    func: (x: number) => number,
    xMin: number,
    xMax: number,
    yAxis: YAxis
  ): Graphable {
    return {
      label,
      func,
      xMin,
      xMax,
      yAxis,
    };
  }
</script>

<script lang="ts">
  import { afterUpdate } from "svelte";
  import {
    Chart,
    Colors,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
  } from "chart.js";

  Chart.register(
    Colors as any,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
  );

  export let xAxis: string;
  export let graphables: Graphable[];
  export let samples = 100;

  $: data = {
    datasets: graphables.map((g) => {
      let dx = (g.xMax - g.xMin) / (samples - 1);
      return {
        label: g.label,
        yAxisID: g.yAxis.label,
        data: Array.from({ length: samples }, (_, i) => {
          return [g.xMin + dx * i, g.func(g.xMin + dx * i)];
        }),
      };
    }),
  };

  let yScales: any;
  $: {
    yScales = {};

    for (const g of graphables) {
      yScales[g.yAxis.label] = {
        title: {
          text: g.yAxis.label,
          display: true,
        },
        type: "linear",
        position: g.yAxis.position,
        max: g.yAxis.max,
      };
    }
  }

  $: chartOptions = {
    type: "line",
    data,
    options: {
      scales: {
        ...yScales,
        x: {
          title: {
            text: xAxis,
            display: true,
          },
          type: "linear",
        },
      },
      elements: {
        line: {
          cubicInterpolationMode: "monotone",
          borderWidth: 5,
        },

        point: {
          radius: 0,
          hoverRadius: 8,
        },
      },

      interaction: {
        mode: "index",
        intersect: false,
      },

      plugins: {
        tooltip: {
          enabled: true,
          position: "nearest",
          callbacks: {
            beforeTitle: (_: any) => xAxis + ":",
          },
        },
        legend: {
          display: true,
        },
      },
    },
  };

  let canvas: HTMLCanvasElement;
  let chart: Chart = null;

  afterUpdate(() => {
    if (chart == null) {
      chart = new Chart(canvas, chartOptions as any);
    }

    for (let i = 0; i < chart.data.datasets.length; i++) {
      chart.data.datasets[i].data = data.datasets[i].data as any;
    }

    chart.update();
  });
</script>

<canvas bind:this={canvas} />
