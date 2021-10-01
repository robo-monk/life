import console from '../helpers/console'

export class Cell {
	constructor({
		life, top, left, right, bottom
	}) {
		this.life = life
		// this = { ...this, top, left, right, bottom }
	}

	get neighboors() {
		return [ this.topLeft, this.top, this.topRight, this.left, this.right, this.bottomLeft, this.bottom, this.bottomRight];
	}

	get aliveNeighboors() {
		return [ this.topLeft, this.top, this.topRight, this.left, this.right, this.bottomLeft, this.bottom, this.bottomRight].filter(n => !!n)
	}

	create(x = 0, y = 0) {
		// creates the cell 
		this.x = x 
		this.y = y

		this.life.create(this);
	}

	// checkNeighboors() {

		
	// 	/*
			
	// 		-oo
	// 		ooo
	// 		ooo
	// 	*/
	// 	this.topLeft = new Cell({
	// 		top: this,
	// 		left: this,
	// 		bottomLeft: this,
	// 		bottomRight: this,

	// 	})

	// 	this.topRight
	// 	this.bottomLeft
	// 	this.bottomRight
	// 	// this.neighboors.forEach(neigh => {

			
	// 	// })
	// }

	check(){
		//check every neightboor if they exist

		/*
		1. Any life cell with `neigboors==2 || neightboors==3 survives`
		2. Any dead cell with `neigboors==3 revives`
		3. Any others, die 
		*/

		let n = this.aliveNeighboors.length()

		if (n === 2 || n === 3) return true;
		return die()
	}

	// die() {
	// 	this.aliveNeighboors.forEach(n => n.)

	// }
	
	get topLeft() {
		return this.top?.left
	}

	get topRight() {
		return this.top?.right
	}
	
	get bottomLeft() {
		return this.bottom?.left
	}

	get bottomRight() {
		return this.bottom?.right
	}


}