<script>
  // @ts-nocheck
  import { Life } from "../logic/Life";
  import { Cell } from "../logic/Cell";
  import Stats from "./Stats.svelte";
  import Mousetrap from "mousetrap";
  import Settings from "./Settings.svelte";

  let life = new Life();
  let settings = {};

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

  // frameRate = 1

  let i;
  function autoplay(frameRate=1) {
    if (i) clearInterval(i);
    if (frameRate == 0) return;
    i = setInterval(() => {
      requestAnimationFrame(() => {
        life = life.check();
      });
    }, 1000/frameRate);
  }

  $: if (settings.autoplay) {
    autoplay(settings.speed/10)
  }
</script>

<div>
  {#each [...cells].filter((c) => true || c.alive) as cell, i}
    <div
      class="cell {cell.alive ? '' : 'dead'}"
      id={cell.id}
      style="top: {cell.y}px; left: {cell.x}px;"
    />
  {/each}
</div>

<Stats bind:cells class="stats" />
<Settings bind:settings class="settings" />

<style>
  .stats {
    position: fixed;
    top: 5px;
    left: 5px;
  }
  .stats {
    position: fixed;
    top: 5px;
    right: 5px;
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
