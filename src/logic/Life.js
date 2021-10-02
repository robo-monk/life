import { Cell } from './Cell'
import console from '../helpers/console'

export class Life {
	constructor() {
		console.log("∞ initated life...")

		// this.cells = []
		this.x = new Map()
	}

	get cells() {
		return [...this.x.values()].reduce((cells, x) => cells = [ ...cells, ...x.values()], [])
	}

	check() {
		let actions = [...this.cells].map(c => Cell.check(c, false))
		return new Promise((resolve) => {
			// setTimeout(() => {
			actions.forEach((action) => action())
			this.cells.forEach(c => !c.alive && this.kill(c))
			console.log(this.cells)
			resolve(this)
			// }, 500)

		})
		// return this
	}

	get(x, y) {
		if (!this.x.has(x)) return void 0
		return this.x.get(x).get(y)
	}

	create(cell) {
		console.log('creating', cell)
		// new div
		console.log(JSON.stringify(Object.fromEntries(this.x)))
		if (!this.x.has(cell.x)) this.x.set(cell.x, new Map())


		this.x.get(cell.x).set(cell.y, cell)
		// console.log(JSON.stringify(Object.fromEntries(this.x)))
		console.log(this.x)
		// this.cells.add(cell)
	}

	kill(cell) {
		this.x.get(cell.x)?.delete(cell.y)
	}
}