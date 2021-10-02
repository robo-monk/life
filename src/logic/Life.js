import { Cell } from './Cell'
import console from '../helpers/console'

export class Life {
	constructor() {
		console.log("∞ initated life...")

		// this.cells = []
		this.rows = new Map()

		this.time = 42;
	}

	get cells() {
		return ([...this.rows.values()]).reduce((cells, x) => [...cells, ...x.values()], [])
	}

	check() {
		// console.log(toBeKilled)
		// console.log('kiilll', toBeKilled.length, 'current', this.cells.length, 'final array should be', this.cells.length - toBeKilled.length)
		// toBeKilled.forEach(cell => cell.forceKill = true)
		// console.log('kiilled is', this.cells.length)
		// for (let row of this.x.values()) {
		// 	for (let cell of row.values()) {
		// 		if (cell.aliveNeighboors.length == 0) this.kill(cell)
		// 	}
		// }
		this.killIrrelevant()

		let actions = [...this.cells].map(c => {
			// if (c.aliveNeighboors.length == 0){
			// 	this.kill(c)
			// 	return void 0
			// }

			return Cell.check(c, true)
		})
			// setTimeout(() => {
		actions.forEach((action) => action && action())

		this.time += 1
		// console.log(this.cells)
			// }, 500)

		return this
	}

	killIrrelevant() {
		this.cells.filter(c => !c.alive).forEach((cell) => cell.die())
	}

	get(x, y) {
		if (!this.rows.has(x)) return void 0
		return this.rows.get(x).get(y)
	}

	create(cell) {
		// console.log('creating', cell)
		// new div
		// console.log(JSON.stringify(Object.fromEntries(this.x)))
		if (!this.rows.has(cell.x)) this.rows.set(cell.x, new Map())


		this.rows.get(cell.x).set(cell.y, cell)
		// console.log(JSON.stringify(Object.fromEntries(this.x)))
		// console.log(this.x)
		// this.cells.add(cell)
	}

	kill(cell) {
		// console.log('killing', this.rows, cell.x, cell.y)
		this.rows.get(cell.x)?.delete(cell.y)
		if (this.rows.get(cell.x) == 0) this.rows.delete(cell.x)
	}
}
