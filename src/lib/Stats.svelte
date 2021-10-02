<script>
  // @ts-nocheck
  //   import { Cell } from "../logic/Cell";
  import Mousetrap from "mousetrap";
  export let cells = [];

  //   Mousetrap.bind('right', function(e) {
  // 	life = life.check()
  //   });
</script>

<div>
  <span> Alive Cells: {cells.filter((c) => c.alive).length} </span>
  <span>
    Cells In Memory: {cells.length}
  </span>
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
  }
  span {
    text-align: left;
    display: block;
  }
</style>
