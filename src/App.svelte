<script>
  // import logo from './assets/svelte.png'
  import Life from "./lib/Life.svelte";
</script>

<main>
  <!-- <img src={logo} alt="Svelte Logo" /> -->
  <!-- <h1>Hello world!</h1> -->

  <Life />
  <!-- 
  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p> -->
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,300;0,400;0,700;1,300;1,700&display=swap");

  :root {
    font-family: "IBM Plex Mono", monospace;

    background-color: black;
    overflow: hidden;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }


  :global(.dragme) {
    cursor: grab;
    /* background: red; */
  }

  :global(.dragging) {
    cursor: grabbing;
  }
</style>
