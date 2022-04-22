<script>
	// @ts-nocheck
	import { Life } from '../logic/Life';
	import { Cell } from '../logic/Cell';
	import Stats from './Stats.svelte';
	import Mousetrap from 'mousetrap';
	import Settings from './Settings.svelte';
	import Draggable from './Draggable.svelte';

	const cellSize = 45;
	const cellMargin = 5;
	const gap = cellSize + cellMargin;

	let life = new Life();
	let settings = {};
	let canvasDragable = false;
	let stats = {};

	function handleDrag(event) {
		let { top, left, element } = event.detail;
		console.log(top, left);
		// settings.x
	}

	$: cells = life.cells;

	$: {
		if (settings.autoplay) {
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

  function build(schema, [x, y], {
    aliveSyms= ['x', 'O', 'o'],
  } = {}) {

    console.time(`creating life \n\n ${schema} \n\n` )
    let rootCell = new Cell({
      life,
      alive: true,
      x, y
    });

    let indexCell = rootCell
    schema.split('\n').forEach((row, i) => {
      console.log('row', row)
      row = row.trim();
      if (!row.length) return;
      Array.from(row).forEach((sym, ii) => {
        indexCell.alive = aliveSyms.includes(sym)
        indexCell = indexCell.right
      });

      indexCell = indexCell.bottom
      let _i = row.length

      while ( _i > 0)  {
        indexCell = indexCell.left
        _i -= 1
      }
    });

    console.timeEnd(`creating life \n\n ${schema} \n\n` )
  }

  const inventory = {
    triangle: `
         x
        xxx
       xxxxx
      xxxxxxx
      `,

    glider: `
      x__
      _xx
      xx_
    `,
    
  }

  // build(inventory.glider, [ 5, 5 ])

  function buildRLE(rle, [x, y]) {
    const rows = rle.split("\n")
    let rleObj = {
      comments: [],
      info: {},
      lines: []
    }

    const cipheredLines = []
    rows.map(r => r.trim()).forEach(row => {
      // parse comments
      if (row[0] == "#") return rleObj.comments.push(row);

      // parser of this: x = 36, y = 9, rule = B3/S23
      if (row[0] == "x") {
        let json = "{" + row.split(",").map(r => `"${r.trim().replace(" = ", '":"')}"`).join(",") + "}"
        // console.log('json is', json)
        let o = JSON.parse(json)
        Object.entries(o).forEach(([key, value]) => o[key]  = parseInt(value) > 0 ? parseInt(value) : value);
        return rleObj.info = o
        // console.log('values', o)
      }

      // else is soemthing like 24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4b
      cipheredLines.push(row)

      // row.split(newLineSym).forEach(line => {

      // })
    })

    const newLineSym = "$"
    const deadSym = "b"
    const aliveSym = "o"
    let _rows = []

    cipheredLines.join("").split(newLineSym).forEach(row => {
      let rowBuffer = ""
      let buffer = ''
      Array.from(row).forEach(char => {
        if ([ deadSym, aliveSym].includes(char)) {
          const multiplier = parseInt(buffer) || 1
          buffer = ''
          rowBuffer += (char == aliveSym ? 'o' : '.')
                          .repeat(multiplier)
        
          // rowBuffer.push()
        } else {
          buffer += char
        }
      })

      // console.log('rle', rleObj)
      // console.log('left', rleObj.info.x, rowBuffer.length)
      // pad with dead cells
      rowBuffer += ".".repeat(rleObj.info.x - rowBuffer.length)
      _rows.push(rowBuffer)
    })

    console.log('rows', _rows);
    build(_rows.join('\n'), [x, y]);
  }

  const rle = `#N Big glider
#O Dean Hickerson
#C The first known diagonal spaceship other than the glider. Has period 4 and speed c/4.
#C www.conwaylife.com/wiki/index.php?title=Big_glider
x = 18, y = 18, rule = B3/S23
3b3o12b$3bo2b3o9b$4bobo11b$2o7bo8b$obo4bo2bo7b$o8b2o7b$b2o15b$bo2bo5bo
b2o4b$bo9b2obo3b$3bobo6b2o2bob$4b2obo4b2o3bo$8bo7bob$7b4o3bobob$7bob2o
3b4o$8bo3b2obo2b$13b2o3b$9bob3o4b$10bo2bo!`


const rle2 = `#N 64P2H1V0
#O Dean Hickerson
#C The smallest period 2 spaceship, discovered on July 28, 1989. Has speed c/2.
#C https://www.conwaylife.com/wiki/index.php?title=64P2H1V0
x = 31, y = 8, rule = b3/s23
5b3o15b3o5b$4bo3bo13bo3bo4b$3b2o4bo11bo4b2o3b$2bobob2ob2o3b3o3b2ob2obo
bo2b$b2obo4bob2ob3ob2obo4bob2ob$o4bo3bo4bobo4bo3bo4bo$12bo5bo12b$2o7b
2o9b2o7b2o!`
  buildRLE(rle2, [ -5, -5])

	function buildGlider(x, y) {
		let cell = new Cell({
			life,
			alive: true,
			x,
			y,
		});
		// cell.right.alive = true;
		cell.bottom.right.alive = true;
		cell.bottom.right.bottom.alive = true;
		cell.bottom.right.bottom.left.alive = true;
		cell.bottom.right.bottom.left.left.alive = true;
		// cell.bottom.bottom.bottom.alive = true;
		// cell.top.alive = true;
		// cell.left.alive = true;
	}
	function buildCross(x, y) {
		let cell = new Cell({
			life,
			alive: true,
			x,
			y,
		});
		cell.right.alive = true;
		cell.bottom.alive = true;
		cell.bottom.bottom.alive = true;
		cell.bottom.bottom.bottom.alive = true;
		cell.top.alive = true;
		cell.left.alive = true;
	}

	// buildGlider(0, 0);
	// buildCross(0, 0);
	// buildCross(1, 400)
	// buildCross(400, 200)
	// buildCross(800, 200)
	// buildCross(800, 400)
	// buildCross(800, 800)

	function buildHept(x, y) {
		let cell = new Cell({
			life,
			alive: true,
			x,
			y,
		});

		cell.bottom.alive = true;
		cell.bottom.right.alive = true;
		cell.bottom.right.right.alive = true;
		cell.bottom.right.bottom.alive = true;
		cell.bottom.right.right.alive = true;
		cell.bottom.right.right.top.alive = true;
		cell.bottom.right.right.top.right.alive = true;
	}

	// buildHept(2500, 500)
	// buildCross(2800, 1800)

	// buildCross(400, 400)
	let rendering = false;
	function render(reverse = false) {
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
	<Draggable
		bind:draggable={canvasDragable}
		bind:draggableElement={draggableSurface}
		bind:coords={draggableCoords}
		on:drag={handleDrag}
	>
		<div id="canvas">
			{#each [...cells].filter((c) => true || c.alive) as cell, i}
				<div
					class="cell {cell.alive ? '' : 'dead'} {cell.isCenter
						? 'center'
						: ''}"
					id={cell.id}
					style="top: {cell.y * gap}px; left: {cell.x * gap}px;"
				/>
			{/each}
		</div>
	</Draggable>
</div>

<Stats bind:data class="stats" />
<Settings bind:settings class="settings" />

<style>
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
	}

	.cell.center {
		background: lime;
	}

	.cell.dead {
		display: none;
		background-color: gray !important;
		opacity: 0.5;
		z-index: -1;
	}
</style>
