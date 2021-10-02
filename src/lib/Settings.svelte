<script>
  // @ts-nocheck
  //   import { Cell } from "../logic/Cell";
  import Mousetrap from "mousetrap";
  let storedSettings = JSON.parse(localStorage.getItem("settings") || {});
  export const settings = {
    autoplay: false,
    speed: 0,
    ...storedSettings,
  };
  $: localStorage.setItem("settings", JSON.stringify(settings));

  //   Mousetrap.bind('right', function(e) {
  // 	life = life.check()
  //   });
</script>

<div>
  <span>
    Autoplay:
    <input type="checkbox" bind:checked={settings.autoplay} />
  </span>
  <span>
    Speed:
    <input
      type="range"
      min="0"
      max="420"
      step="1"
      bind:value={settings.speed}
    />
    <span class="sub">{settings.speed} </span>
  </span>
</div>

<style>
  :root {
    color: whitesmoke;
    font-size: 2em;
  }

  input[type="checkbox"] {
    padding: 25px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    filter: invert();
  }

  div {
    display: flex;
    flex-direction: column;
    width: fit-content;
    position: fixed;
    top: 10px;
    left: 10px;

    user-select: none;
  }
  span {
    text-align: left;
    display: flex;
    align-items: center;
  }

  .sub {
    font-size: 1em !important;
    color: gray;
    margin: 5px;
  }
</style>
