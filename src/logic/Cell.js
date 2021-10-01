// @ts-nocheck
import console from '../helpers/console'

const cellSize = 50;
const cellMargin = 5;

export class Cell {
	constructor({
		life, x, y, top, left, right, bottom, alive = true
	}) {
		this.life = life
		this.alive = alive || void 0

		this._top = top
		this._left = left
		this._right = right
		this._bottom = bottom

		this.setPosition(x, y)
		console.log('initiated', this)
		// this = { ...this, top, left, right, bottom }
	}

	get right() {
		if (this._right) return this._right
		this._right = this.generateCell([1, 0])
		return this._right
	}

	get left() {
		if (this._left) return this._left
		this._left = this.generateCell([-1, 0])
		return this._left
	}

	get bottom() {
		if (this._bottom) return this._bottom
		this._bottom = this.generateCell([0, 1])
		return this._bottom
		
	}
	
	get top() {
		if (this._top) return this._top
		this._top = this.generateCell([0, -1])
		return this._top
	}

	
	get neighboors() {
		return [ this.top.left, this.top, this.top.right, this.left, this.right, this.bottom.left, this.bottom, this.bottom.right];
	}

	check(reset=true) {
		if (reset) this.checked = false;
		if (this.checked) return this;

		console.log('checking')
		// this.neighboors.forEach(n => n.check())

		// this.checked = true
		// trigger check for each available neighboor
		return this;
	}

	create() {
		// creates the cell 
		this.life.create(this);
		return this
	}

	setPosition(x=0, y=0) {
		this.x = x 
		this.y = y
	}


	generateCell([x, y]) {
		/*
			x=0, y=0, generate cell in the current position
			x=1, y=0, generate cell in the right 
			x=-1, y=-1, generate cell in the left bottom 
		*/

		[x, y] = ([this.x + x*(cellSize + cellMargin), this.y + y*(cellMargin + cellSize)])

		let relative; // 'top', 'right', 'left', 'bottom', where are we relative to the new cell? 
		if (x==0) {
			relative = y == 1 ? 'bottom' : 'top'
		} else {
			// x is 1 or -1
			relative = x == 1 ? 'left' : 'right'
		}

		return new Cell({
			life: this.life,
			x, y,
			[relative]: this
		})
	}


	// get aliveNeighboors() {
	// 	return [ this.topLeft, this.top, this.topRight, this.left, this.right, this.bottomLeft, this.bottom, this.bottomRight].filter(n => !!n)
	// }

	// getAllLeftNeihgboors() {
	// 	return [ this.left, this.top.left, this.bottom.left ]
	// }
	
	// getAllRightNeighboors(){

	// 	return [ this.right, this.top.right, this.bottom.right ]
	// }

	// // getRelativePositionTo(cell)	{
	// // 	/*
	// // 		we are x and looking for relative position to o

	// // 		ox	 => [-1, 0]
	// // 		o-x	 => [-2, 0]

	// // 		-x-	 => [0, -1]
	// // 		-o-

	// // 		--x	 => [-1, -1]
	// // 		-o-
	// // 	*/

	// // 	// let [x,y]
	// // 	// this.getAllLeftNeihgboors().forEach(n => {
	// // 	// 	if (!n?.alive) return;
	// // 	// 	if (cell.getAllRightNeighboors().find(_n => n === _n)?.alive) 
	// // 	// }
	// // }

	// get x() {
	// }
	// get top() {
	// 	if (this._top) return this._top;
	// 	this._top = new Cell({
	// 		alive: false,
	// 	});
	// 	return this._top;
	// }
	// // checkNeighboors() {

		
	// // 	/*
			
	// // 		-oo
	// // 		ooo
	// // 		ooo
	// // 	*/
	// // 	this.topLeft = new Cell({
	// // 		top: this,
	// // 		left: this,
	// // 		bottomLeft: this,
	// // 		bottomRight: this,

	// // 	})

	// // 	this.topRight
	// // 	this.bottomLeft
	// // 	this.bottomRight
	// // 	// this.neighboors.forEach(neigh => {

			
	// // 	// })
	// // }

	// check(){
	// 	//check every neightboor if they exist

	// 	/*
	// 	1. Any life cell with `neigboors==2 || neightboors==3 survives`
	// 	2. Any dead cell with `neigboors==3 revives`
	// 	3. Any others, die 
	// 	*/

	// 	let n = this.aliveNeighboors.length()

	// 	if (n === 2 || n === 3) return true;
	// 	return die()
	// }

	// // die() {
	// // 	this.aliveNeighboors.forEach(n => n.)

	// // }
	
	// get topLeft() {
	// 	return this.top?.left
	// }

	// get topRight() {
	// 	return this.top?.right
	// }
	
	// get bottomLeft() {
	// 	return this.bottom?.left
	// }

	// get bottomRight() {
	// 	return this.bottom?.right
	// }


}