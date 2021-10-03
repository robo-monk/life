<script>
  import { onMount } from "svelte/internal";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let element;
  $: element;

  // drag
  // @ts-nocheck
  //   import { Cell } from "../logic/Cell";
  //   import Mousetrap from "mousetrap";
  //   export let cells = [];

  export let coords = [0, 0];
  export let draggable = true;
  export let draggableElement;
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

  $: if (draggableElement) {
    setup();
  }

  $: draggableElement?.classList[dragging ? "add" : "remove"]("dragging");

  onMount(() => {
    if (draggableElement == null) return void 0;
    draggableElement = element;

    element.style.transition = "all 2s ease";
    // draggableElement ||= element;
    // let _styles = getComputedStyle(element);
  });

  function throttle(cb) {
    let tick = true;
    return (...params) =>
      new Promise((resolve) => {
        if (!tick) return;
        tick = false;
        requestAnimationFrame(() => {
          resolve(cb(...params));
          tick = true;
        });
      });
  }

  function setup() {
    let top = 0;
    let left = 0;

    draggableElement.addEventListener("mousedown", (e) => {
      start();
    });

    document.addEventListener(
      "mousemove",
      throttle((e) => {
        if (!draggable || !dragging) return;
        //   if (!tick) return;
        //   tick = false;
        //   requestAnimationFrame(() => {
        if (dragging) {
          top = top + 2 * e.movementY;
          left = left + 2 * e.movementX;
          coords = [top, left];
          dispatch("drag", {
            top,
            left,
          });
        }
        //     }
        //   tick = true;
        //   });
      })
    );

    document.addEventListener("mouseup", (e) => {
      dragging = false;
    });
  }

  const updateCoords = throttle((coords) => {
    console.log("updating cors, coords", coords);
    element.style.top = -(coords[0] - window.innerHeight / 2) + "px";
    element.style.left = -(coords[1] - window.innerWidth / 2) + "px";
  });

  $: {
    if (element) {
      updateCoords(coords);
      //   element.style.top = coords[0] + "px";
      //   element.style.left = coords[1] + "px";
    }
  }

  //   Mousetrap.bind('right', function(e) {
  // 	life = life.check()
  //   });
</script>

<div
  bind:this={element}
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
