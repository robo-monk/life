<script>
	// @ts-nocheck
	import { Life } from '../logic/Life';
	import { Cell } from '../logic/Cell';
	import Stats from './Stats.svelte';
	import Mousetrap from 'mousetrap';
	import Settings from './Settings.svelte';
	import Draggable from './Draggable.svelte';
	import Builder from "./Builder.svelte"
	import PlacementService from '../logic/services/placementService';
import { query_selector_all } from 'svelte/internal';


	const cellSize = 45;
	const cellMargin = 5;
	const gap = cellSize + cellMargin;

	let life = new Life();
	let placementService = new PlacementService(life);
	let settings = {};
	let canvasDragable = false;
	let stats = {};

	function handleDrag(event) {
		let { top, left, element } = event.detail;
		console.log(top, left);
		// settings.x
	}

	life.on('builderUpdate', () => {
		cells = life.cells;
	})

	$: cells = life.cells;

	$: {
		if (false && settings.autoplay && life.aliveCells.length) {
			let [meanX, meanY] = life.aliveCells.reduce(
				([x, y], cell) => [
					cell.x / life.aliveCells.length + x,
					cell.y / life.aliveCells.length + y,
				],
				[0, 0]
			);
			console.log('mean', meanX, meanY);
			const dist = ([x1, y1], [x2, y2]) =>
				Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

			let [centerCell] = life.aliveCells
				.map((cell) => [cell, dist([cell.x, cell.y], [meanX, meanY])])
				.reduce(([_, bestDist], [cell, dist]) =>
					dist < bestDist ? [cell, dist] : [_, bestDist]
				);

			centerCell.isCenter = true;
			draggableCoords = [centerCell.x * gap, centerCell.y * gap];
		}
		// console.log('center cell is', centerCell)
	}

	$: data = {
		...stats,
		time: life.time,
		created: performance.now(),
		cells,
	};

	const inv = placementService.inventory;

	placementService.buildRLE(inv["glider"], [0, 0])
	// placementService.buildRLE(inv["whatever"], [0, 0])
	// placementService.getWikiInventory();

	let rendering = false;
	function render(reverse = false) {
		reverse = false;
		if (rendering) return;
		rendering = true;
		let start = performance.now();
		requestAnimationFrame(() => {
			stats.ms = performance.now() - start;
			// stats.ms = Math.round(performance.now() - start)
			life = (reverse ? life.checkReverse : life.check).bind(life)();
			draggableCoords = [];
			rendering = false;
		});
	}

	Mousetrap.bind('right', function (e) {
		render();
	});
	Mousetrap.bind('left', function (e) {
		render(true);
	});

	Mousetrap.bind(
		'space',
		function (e) {
			canvasDragable = true;
			return false;
		},
		'keydown'
	);

	Mousetrap.bind(
		'space',
		function (e) {
			canvasDragable = false;
			return false;
		},
		'keyup'
	);

	let showBuildingService = false;

	Mousetrap.bind(
		'b',
		() => showBuildingService = !showBuildingService
	)

	let showInfoForCell = null;
	$: console.log("showing info for cell", showInfoForCell);
	$: if (showInfoForCell) {
		let c = showInfoForCell;
		let selector = c.neighboors.map(n => n.id).reduce((selector, id) => selector + `, #cell-${id}`, `#cell-`);
		document.querySelectorAll(selector).forEach(el => el.classList.add('highlighted'))
	} else {
		document.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'))
	}

	
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
	{#if showBuildingService} 
		<div id='builder'>
			<Builder bind:placementService /> 
		</div>
	{/if}
	{#if showInfoForCell} 
		<div id='cell-info'>
			{ showInfoForCell.id }
			{ showInfoForCell.evaluateNextCycle() }
		</div>
	{/if}
	<Draggable
		bind:draggable={canvasDragable}
		bind:draggableElement={draggableSurface}
		bind:coords={draggableCoords}
		on:drag={handleDrag}
	>
	<div class='highlighted dead'></div>
		<div id="canvas">
			{#each [...cells].filter((c) => true || c.alive) as cell, i}
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<div
					class="cell {cell.alive ? '' : 'dead'} {cell.isCenter
						? 'center'
						: ''}"
					id={`cell-${cell.id}`}
					style="top: {cell.y * gap}px; left: {cell.x * gap}px;"
					on:mouseover={ () => showInfoForCell = cell }
					on:mouseleave={ () => { 
						if (showInfoForCell === cell) showInfoForCell = null 
					}}
				/>
			{/each}
		</div>
	</Draggable>
</div>

<Stats bind:data />
<Settings bind:settings />

<style>
	#builder {
		z-index: 9999999999999999;
		position: fixed;
		bottom: 10px;
		right: 20px;
	}

	#cell-info {
		position: fixed;
		top: 10px;
		width: 100%;
		text-align: center;

	}

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
		cursor: pointer;
	}

	.cell.center {
		background: lime;
	}

	.cell:hover {
		background: rgb(0, 81, 147) !important;
	}

	.highlighted {
		background: rgb(0, 140, 255) !important;
	}

	.highlighted.dead {
		display: block !important;
		z-index: 1;
		background: rgba(60, 88, 99, 0.321) !important;
	}


	.cell.dead {
		/* display: none; */
		/* background-color: gray !important; */
		opacity: 0.5;
		/* z-index: -1; */
	}

	
</style>
