// @ts-nocheck
import console from '../helpers/console'
import { nanoid } from 'nanoid'
const cellSize = 50;
const cellMargin = 5;
const gap = cellSize + cellMargin

export class Cell {
	constructor({
		life, x, y, top, left, right, bottom, alive = false
	}) {
		this.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT" 
		this.life = life

		this._top = top
		this._left = left
		this._right = right
		this._bottom = bottom

		this.setPosition(x, y)
		console.log('initiated', this)

		this.alive = alive
		// this = { ...this, top, left, right, bottom }
	}

	get element() {
		return document.getElementById(this.id)
	}

	set alive(n) {
		// console.log('this setting alive', n, this.alive)
		if (n && this._alive) return console.log('this was already alive', this);

		this._alive = n
		if (n) {
			this.create()
		} else {
			this.die()
		}
	}

	get alive(){
		return this._alive ? true : false
	}

	get right() {
		return this.getOrGenerate([1, 0])
		// if (this._right) return this._right
		// this._right = this.generateCell([1, 0])
		// return this._right
	}

	get left() {
		return this.getOrGenerate([-1, 0])
		// if (this._left) return this._left
		// this._left = this.generateCell([-1, 0])
		// return this._left
	}

	get bottom() {
		return this.getOrGenerate([0, 1])
		// if (this._bottom) return this._bottom
		// this._bottom = this.generateCell([0, 1])
		// return this._bottom
		
	}
	
	get top() {
		return this.getOrGenerate([0, -1])
		// if (this._top) return this._top
		// this._top = this.generateCell([0, -1])
		// return this._top
	}

	getOrGenerate([x, y]) {
		let cell = this.life.get(...this.getAbsoluteCoords([x, y]))
		if (cell) return cell
		return this.generateCell([x, y])
	}

	
	get neighboors() {
		return [ this.top.left, this.top, this.top.right, this.left, this.right, this.bottom.left, this.bottom, this.bottom.right];
	}
	get aliveNeighboors() {
		return this.neighboors.filter(n => n.alive)
	}

	static check(self, directOnly=false) {
		console.log('>> checking..', self.id, JSON.stringify(self.aliveNeighboors.length), self.alive)
		// if (reset) self.checked = false;

		self.checked = true

		let cbs = directOnly ? [] : self.neighboors.map(n => Cell.check(n, true))
		let ourCb; 

		// ## Rules
		// 	1. Any life cell with `neigboors==2 || neightboors==3 survives`
		// 	2. Any dead cell with `neigboors==3 revives`
		// 	3. Any others, die 

		// this.neighboors.forEach(n => {
		// let self = this;
		
		if (self.alive && (self.aliveNeighboors.length == 2 || self.aliveNeighboors.length == 3)) {
			ourCb = () => { 
				console.log('>> living..', self.id, JSON.stringify(self.aliveNeighboors.length), self.alive)
			}
		} else if (!self.alive && self.aliveNeighboors.length == 3){
			ourCb = () => { 
				console.log('>> reviving..', self.id, JSON.stringify(self.aliveNeighboors.length), self.alive)
				self.alive = true
			}
		} else {
			ourCb = () => { 
				console.log('>> dying..', self.id, JSON.stringify(self.aliveNeighboors.length), self.alive)
				self.alive = false
			}
		}

		return () => {
			cbs.forEach(cb => cb && cb())
			ourCb()
		}
		// })
		// console.log('checking')

		// this.generateCell([], true);

		// this.checked = true
		// trigger check for each available neighboor
		// return this;
	}

	die(){
		this.life.kill(this)
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

	getAbsoluteCoords([x, y]) {
		return ([this.x + x*gap, this.y + y*gap])
	}

	generateCell([x, y], alive=false) {
		/*
			x=0, y=0, generate cell in the current position
			x=1, y=0, generate cell in the right 
			x=-1, y=-1, generate cell in the left bottom 
		*/
		[x, y] = this.getAbsoluteCoords([x, y])

		let relative; // 'top', 'right', 'left', 'bottom', where are we relative to the new cell? 
		if (x==0) {
			relative = y == 1 ? 'bottom' : 'top'
		} else {
			// x is 1 or -1
			relative = x == 1 ? 'left' : 'right'
		}

		return new Cell({
			life: this.life,
			x, y, alive,
			[relative]: this
		}).create()
	}


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