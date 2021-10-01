import console from '../helpers/console'

export class Life {
	constructor() {
		console.log("∞ initated life...")
		this.cells = []
	}

	create(cell) {
		// new div
		this.cells.push(cell)
	}
}