<script>
// @ts-nocheck
  import { Life } from "../logic/Life";
  import { Cell } from "../logic/Cell";
  import Mousetrap from 'mousetrap'

  let life = new Life();
  $: cells = life.cells;

  let cell = new Cell({
    life, alive: true,
    x: 400, y: 400
  });

  cell.right.alive = true
  cell.right.bottom.alive = true
  cell.right.bottom.bottom.alive = true
  cell.left.alive = true

  Mousetrap.bind('space', async function(e) {
    console.log('spaceeeeeee')
    life = await life.check()
    console.log(life.cells);
  });
 
  // cell.check(true)

  // life.check()
  // life.check()
  // life.check()
  
  // console.log(life.cells)
</script>

<div>
  {#each ([...cells]).filter(c => true || c.alive) as cell, i}
    <div class='cell {cell.alive ? '' : 'dead'}' id={cell.id} style="top: {cell.y}px; left: {cell.x}px;">
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

  .cell.dead {
    background: gray;
    display: none;
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
