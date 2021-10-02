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
  cell.bottom.alive = true
  cell.top.alive = true
  cell.left.alive = true

  Mousetrap.bind('right', function(e) {
    life = life.check()
  });
 
</script>

<div>
  {#each ([...cells]).filter(c => true || c.alive) as cell, i}
    <div class='cell {cell.alive ? '' : 'dead'}' id={cell.id} style="top: {cell.y}px; left: {cell.x}px;">
    </div> 
  {/each}
</div>

<style>
  .cell {
    color: black;
    background: white;
    position: absolute;
    width: 50px;
    height: 50px;
  }

  .cell.dead {
    background-color:gray !important;
    opacity: .5;
    z-index: -1;
  }
</style>
