<script>
  // @ts-nocheck
  //   import { Cell } from "../logic/Cell";
  import Mousetrap from "mousetrap";
  import Chart from "./Chart.svelte";
  export let data = {};
  let lastData = {
    created: performance.now(),
    frequency: 0,
  };

  $: {
    data = {
      ...data,
      frequency: (lastData.frequency + (data.created - lastData.created)) / 2,
    };

    lastData = data;
  }

  function round(n, digits = 2) {
    return Math.round(n * 10 ** digits) / 10 ** digits;
  }

  let chartData = {};
  $: {
    // let [x, y] = data.cells.reduce(
    //   (coords, cell) => {
    //     if (!cell.alive) {
    //       coords[0].push(cell.x);
    //       coords[1].push(cell.y);
    //     }
    //     return coords;
    //   },
    //   [[], []]
    // );
    chartData = data.cells.filter(c => c.alive);
  }

  //   export let cells = [];

  //   Mousetrap.bind('right', function(e) {
  // 	life = life.check()
  //   });
</script>

<div>
  <span> Alive Cells: {data.cells?.filter((c) => c.alive).length} </span>
  <span>
    Cells In Memory: {data.cells?.length}
  </span>
  <span>
    Latency: {round(data.ms)} ms
  </span>
  <span>
    Time: {data.time}
  </span>
  <span>
    Frequency: {round(data.frequency)}
  </span>

  <Chart bind:data={chartData} />
</div>

<style>
  :root {
    color: whitesmoke;
    font-size: 2em;
  }

  div {
    display: flex;
    flex-direction: column;
    width: fit-content;
    position: fixed;
    top: 10px;
    right: 10px;
    user-select: none;
  }
  span {
    text-align: left;
    display: block;
  }
</style>
