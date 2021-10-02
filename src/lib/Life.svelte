<script>
  // @ts-nocheck
  import { Life } from "../logic/Life";
  import { Cell } from "../logic/Cell";
  import Stats from "./Stats.svelte";
  import Mousetrap from "mousetrap";
  import Settings from "./Settings.svelte";
  import Draggable from "./Draggable.svelte";

  let life = new Life();
  let settings = {};
  let canvasDragable = false;

  $: cells = life.cells;

  let cell = new Cell({
    life,
    alive: true,
    x: 400,
    y: 400,
  });

  cell.right.alive = true;
  cell.bottom.alive = true;
  cell.top.alive = true;
  cell.left.alive = true;

  Mousetrap.bind("right", function (e) {
    life = life.check();
  });

  Mousetrap.bind(
    "space",
    function (e) {
      canvasDragable = true;
      return false;
    },
    "keydown"
  );
  Mousetrap.bind(
    "space",
    function (e) {
      canvasDragable = false;
      return false;
    },
    "keyup"
  );

  // frameRate = 1

  let i;
  function autoplay(frameRate = 1) {
    if (i) clearInterval(i);
    if (frameRate == 0) return;
    i = setInterval(() => {
      requestAnimationFrame(() => {
        life = life.check();
      });
    }, 1000 / frameRate);
  }

  $: if (settings.autoplay) {
    autoplay(settings.speed / 10);
  }
</script>

<Draggable bind:draggable={canvasDragable}>
  <div id="canvas">
    {#each [...cells].filter((c) => true || c.alive) as cell, i}
      <div
        class="cell {cell.alive ? '' : 'dead'}"
        id={cell.id}
        style="top: {cell.y}px; left: {cell.x}px;"
      />
    {/each}
  </div>
</Draggable>

<Stats bind:cells class="stats" />
<Settings bind:settings class="settings" />

<style>
  #canvas {
    position: relative;
    top: 0;
    left: 0;
    width: 200vw;
    height: 200vh;
  }
  .cell {
    color: black;
    background: white;
    position: absolute;
    width: 50px;
    height: 50px;
  }

  .cell.dead {
    display: none;
    background-color: gray !important;
    opacity: 0.5;
    z-index: -1;
  }
</style>
