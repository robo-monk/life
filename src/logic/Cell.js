// @ts-nocheck
import { nanoid } from 'nanoid'
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

		this.alive = alive
		this.cache = {} 
	}

	get time() {
		return this.life.time
	}

	get element() {
		return document.getElementById(this.id)
	}

	set alive(n) {
		if (n && this._alive) return;

		this._alive = n
		if (n) {
			this.create()
		} else {
			this.die()
		}
	}

	get alive(){
		return !!this._alive
	}

	get right() {
		return this.getOrGenerate([1, 0])
	}

	get left() {
		return this.getOrGenerate([-1, 0])
	}

	get bottom() {
		return this.getOrGenerate([0, 1])
	}
	
	get top() {
		return this.getOrGenerate([0, -1])
	}

	getOrGenerate([x, y], cache=false) {
		let key = `${x}${y}`

		if (this.cache.time == this.time && key in this.cache) return this.cache[key]

		let cell = this.life.get(...this.getAbsoluteCoords([x, y])) || this.generateCell([x, y])
		if (this.cache.time != this.time) {
			this.cache = {
				time: this.time,
			}
		}

		this.cache[key] = cell
		return cell
	}

	
	get neighboors() {
		return [ this.top.left, this.top, this.top.right, this.left, this.right, this.bottom.left, this.bottom, this.bottom.right];
	}
	get aliveNeighboors() {
		return this.neighboors.filter(n => n.alive)
	}

	static checkReverse(self) {

		if (self.lastChecked == self.time) return void 0
		self.lastChecked = self.time

		// let cbs = self.alive ? self.neighboors.map(n => Cell.check(n, false)) : []
		let cbs = self.alive ? self.neighboors.map(n => Cell.check(n, false)) : []
		let ourCb; 

		// ## Rules
		// 	1. Any life cell with `neigboors==2 || neightboors==3 survives`
		// 	2. Any dead cell with `neigboors==3 revives`
		// 	3. Any others, die 

		// 1. Any life with not 2 or 3

		if (!(self.alive && (self.aliveNeighboors.length == 2 || self.aliveNeighboors.length == 3))) {
			ourCb = void 0 
		} else if (!(!self.alive && self.aliveNeighboors.length == 3)) {
			ourCb = () => { 
				// console.log('>> reviving..', self.id, JSON.stringify(self.aliveNeighboors.length), self.alive)
				self.alive = true
			}
		} else {
			ourCb = () => { 
				// console.log('>> dying..', self.id, JSON.stringify(self.aliveNeighboors.length), self.alive)
				self.alive = false
			}
		}

		return () => {
			cbs.forEach(cb => cb && cb())
			ourCb && ourCb()
		}
	}

	static check(self) {

		if (self.lastChecked == self.time) return void 0
		self.lastChecked = self.time

		let cbs = self.alive ? self.neighboors.map(n => Cell.check(n, false)) : []
		let ourCb; 

		// ## Rules
		// 	1. Any life cell with `neigboors==2 || neightboors==3 survives`
		// 	2. Any dead cell with `neigboors==3 revives`
		// 	3. Any others, die 

		if (self.alive && (self.aliveNeighboors.length == 2 || self.aliveNeighboors.length == 3)) {
			ourCb = void 0 
		} else if (!self.alive && self.aliveNeighboors.length == 3) {
			ourCb = () => { 
				// console.log('>> reviving..', self.id, JSON.stringify(self.aliveNeighboors.length), self.alive)
				self.alive = true
			}
		} else {
			ourCb = () => { 
				// console.log('>> dying..', self.id, JSON.stringify(self.aliveNeighboors.length), self.alive)
				self.alive = false
			}
		}

		return () => {
			cbs.forEach(cb => cb && cb())
			ourCb && ourCb()
		}
	}

	die(){
		this.life.kill(this)
	}

	create() {
		this.life.create(this);
		return this
	}

	setPosition(x=0, y=0) {
		this.x = x 
		this.y = y
	}

	getAbsoluteCoords([x, y]) {
		return ([this.x + x, this.y + y])
	}

	generateCell([x, y], alive=false) {
		/*
			x=0, y=0, generate cell in the current position
			x=1, y=0, generate cell in the right 
			x=-1, y=-1, generate cell in the left bottom 
		*/

		[x, y] = this.getAbsoluteCoords([x, y])

		return new Cell({
			life: this.life,
			x, y, alive,
		}).create()
	}

}
