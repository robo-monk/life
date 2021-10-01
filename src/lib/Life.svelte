<script>
// @ts-nocheck
  import { Life } from "../logic/Life";
  import { Cell } from "../logic/Cell";

  const life = new Life();
  $: cells = life.cells;

  let cell = new Cell({
    life,
    x: 400, y: 400
  });

  cell.create();
  cell.right.create().right.create().bottom.create().bottom.bottom.create().right.right.right.right.create()

  cell.check(true)
  console.log(life.cells);
  
  console.log(life.cells)
</script>

<div>
  {#each cells as cell, i}
    <div class='cell' style="top: {cell.y}px; left: {cell.x}px;">
    </div> 
  {/each}
</div>

<style>
  .cell {
    background: black;
    position: absolute;
    width: 50px;
    height: 50px;
  }
  /* button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  } */
</style>
