<script>
  // @ts-nocheck
  import { Life } from "../logic/Life";
  import { Cell } from "../logic/Cell";
  import Stats from "./Stats.svelte";
  import Mousetrap from "mousetrap";
  import Settings from "./Settings.svelte";
  import Draggable from "./Draggable.svelte";

  const cellSize = 45;
  const cellMargin = 5;
  const gap = cellSize + cellMargin;

  let life = new Life();
  let settings = {};
  let canvasDragable = false;
  let stats = {};

  function handleDrag(event) {
    let {top, left, element} = event.detail
    console.log(top, left);
    // settings.x
  }

  $: cells = life.cells;
  $: {
    let [meanX, meanY] = life.aliveCells.reduce(
      ([x, y], cell) => [
        cell.x / life.aliveCells.length + x,
        cell.y / life.aliveCells.length + y,
      ],
      [0, 0]
    );
    console.log("mean", meanX, meanY);
    const dist = ([x1, y1], [x2, y2]) =>
      Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    let [centerCell] = life.aliveCells
      .map((cell) => [cell, dist([cell.x, cell.y], [meanX, meanY])])
      .reduce(([_, bestDist], [cell, dist]) =>
        dist < bestDist ? [cell, dist] : [_, bestDist]
      );

    centerCell.isCenter = true;
    draggableCoords = [centerCell.x*gap, centerCell.y*gap]
    // console.log('center cell is', centerCell)
  }
  $: data = {
    ...stats,
    time: life.time,
    created: performance.now(),
    cells,
  };

  function findCenterCell() {
    let [meanX, meanY] = cells.map((cell) => [cell.x, cell.y]);
  }
function buildGlider(x, y) {
    let cell = new Cell({
      life,
      alive: true,
      x,
      y,
    });
    // cell.right.alive = true;
    cell.bottom.right.alive = true;
    cell.bottom.right.bottom.alive = true;
    cell.bottom.right.bottom.left.alive = true;
    cell.bottom.right.bottom.left.left.alive = true;
    // cell.bottom.bottom.bottom.alive = true;
    // cell.top.alive = true;
    // cell.left.alive = true;
  }
  function buildCross(x, y) {
    let cell = new Cell({
      life,
      alive: true,
      x,
      y,
    });
    cell.right.alive = true;
    cell.bottom.alive = true;
    cell.bottom.bottom.alive = true;
    cell.bottom.bottom.bottom.alive = true;
    cell.top.alive = true;
    cell.left.alive = true;
  }

  buildGlider(0, 0);
  // buildCross(0, 0);
  // buildCross(1, 400)
  // buildCross(400, 200)
  // buildCross(800, 200)
  // buildCross(800, 400)
  // buildCross(800, 800)

  function buildHept(x, y) {
    let cell = new Cell({
      life,
      alive: true,
      x,
      y,
    });

    cell.bottom.alive = true;
    cell.bottom.right.alive = true;
    cell.bottom.right.right.alive = true;
    cell.bottom.right.bottom.alive = true;
    cell.bottom.right.right.alive = true;
    cell.bottom.right.right.top.alive = true;
    cell.bottom.right.right.top.right.alive = true;
  }

  // buildHept(2500, 500)
  // buildCross(2800, 1800)

  // buildCross(400, 400)
  let rendering = false;
  function render(reverse = false) {
    if (rendering) return;
    rendering = true;
    let start = performance.now();
    requestAnimationFrame(() => {
      stats.ms = performance.now() - start;
      // stats.ms = Math.round(performance.now() - start)
      life = (reverse ? life.checkReverse : life.check).bind(life)();
      draggableCoords = []
      rendering = false;
    });
  }

  Mousetrap.bind("right", function (e) {
    render();
  });
  Mousetrap.bind("left", function (e) {
    render(true);
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
    i = setInterval(render, 1000 / frameRate);
  }

  $: if (settings.autoplay) {
    autoplay(settings.speed / 10);
  } else {
    clearInterval(i);
  }

  let draggableSurface = null;
  let draggableCoords = [0, 0];
</script>

<div bind:this={draggableSurface} class="draggable-surface">
  <Draggable
    bind:draggable={canvasDragable}
    bind:draggableElement={draggableSurface}
    bind:coords={draggableCoords}
    on:drag={handleDrag}
  >
    <div id="canvas">
      {#each [...cells].filter((c) => true || c.alive) as cell, i}
        <div
          class="cell {cell.alive ? '' : 'dead'} {cell.isCenter
            ? 'center'
            : ''}"
          id={cell.id}
          style="top: {cell.y * gap}px; left: {cell.x * gap}px;"
        />
      {/each}
    </div>
  </Draggable>
</div>

<Stats bind:data class="stats" />
<Settings bind:settings class="settings" />

<style>
  .draggable-surface {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(128, 128, 128, 0.303);
  }
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
    width: 45px;
    height: 45px;
  }

  .cell.center {
    background: lime;
  }
  .cell.dead {
    display: none;
    background-color: gray !important;
    opacity: 0.5;
    z-index: -1;
  }
</style>
