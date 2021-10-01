import console from '../helpers/console'

export class Life {
	constructor() {
		console.log("∞ initated life...")
		this.cells = []
	}

	transmit(message) {
		let cell = this.cells.find(c => c.alive)
		if (cell) cell.transmit(message)

		console.log("no alive cells found")
	}

	create(cell) {
		// new div
		this.cells.push(cell)
	}
}