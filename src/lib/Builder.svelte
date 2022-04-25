<script>
    import Life from "./Life.svelte";
    export let placementService;
    $: console.log(">> placement service", placementService)
    let inventory = placementService.inventory;

    placementService.on('inventoryChange', () => {
        console.log('inventory change', placementService.inventory)
        inventory = placementService.inventory;
    });

    console.log(">> placement service", placementService)

    function hover(name, rle) {

    }

    function click(name, rle) {
        console.log('building rle', rle);
        console.log(">> placement service", placementService)
        placementService.buildRLE(rle, [0, 0]);
        placementService.life.dispatchEvent('builderUpdate');
    }

</script>

<div id='builder'>
    <h5 style="width: fit-content; margin: 0; margin-bottom: 10px;"> Build </h5>
    <div class='items'>
        {#each Object.entries(inventory) as [ name, RLE]}
            <div class='item' on:mouseover={() => hover(name, RLE)} on:click={() => click(name, RLE)}>
                <span> { name } </span>
            </div>
        {/each}
    </div>

</div>

<style>
    #builder {
        min-width: 100px;
        /* min-height: 200px; */
        background-color: #18181876;
        backdrop-filter: blur(10px);
        padding: 20px;
    }

    .items {
        display: flex;
        justify-content: left;
        flex-direction: column;
    }

    .item {
        transition: all .2s ease;
        height: 25px;
        font-size: 18px;
        display: flex;
        justify-content: left;
        align-items: center;
        cursor: pointer;
        color: rgba(245, 245, 245, 0.54);
    }

    .item:hover {
        height: 28px;
        font-size: 20px;
        color: white;
    }

</style>
