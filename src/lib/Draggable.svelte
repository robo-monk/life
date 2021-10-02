<script>
  import { onMount, xlink_attr } from "svelte/internal";

  let element;
  $: element;

  // drag
  // @ts-nocheck
  //   import { Cell } from "../logic/Cell";
  //   import Mousetrap from "mousetrap";
  //   export let cells = [];

  export let draggable = true;
  let dragging = false;

  let last = {};

  function start() {
    dragging = draggable ? true : false;
  }
  function end() {}

  function move(e) {
    // console.log(e);
    // element.style.top =
  }
  onMount(() => {
    let _styles = getComputedStyle(element);
    let tick = true;
    let top = 0;
    let left = 0;
    document.addEventListener("mousemove", (e) => {
      if (!draggable || !dragging) return;
      if (!tick) return;
      tick = false;
      requestAnimationFrame(() => {
        if (dragging) {
          top = top + 2 * e.movementY;
          left = left + 2 * e.movementX;

          element.style.top = top + "px";
          element.style.left = left + "px";
        }

        tick = true;
      });
    });

    document.addEventListener("mouseup", (e) => {
      dragging = false;
    });
  });
  //   Mousetrap.bind('right', function(e) {
  // 	life = life.check()
  //   });
</script>

<div
  bind:this={element}
  on:mousedown={start}
  class="{dragging ? 'dragging' : ''} {draggable ? 'dragme' : ''}"
>
  <slot />
</div>

<style>
  div {
    position: relative;
    width: fit-content;
    height: fit-content;
    /* transition: all .2s ease; */
  }
  .dragme {
    cursor: grab;
  }

  .dragging {
    cursor: grabbing;
  }
</style>
