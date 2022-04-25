import { Cell } from "./Cell";
import Eventful from "./Eventful";

export class Life extends Eventful {
  constructor() {
    super();
    console.log("∞ initated life...");

    this.rows = new Map();

    this.time = 42;
  }

  get cells() {
    return [...this.rows.values()].reduce(
      (cells, x) => [...cells, ...x.values()],
      []
    );
  }

  get aliveCells() {
	  return this.cells.filter(c => c.alive)
  }

  checkReverse() {
    let actions = [...this.cells].map((c) => {
      return c.alive ? Cell.check(c) : () => c.die();
    });

    actions.forEach((action) => action && action());
    this.time -= 1;

    return this;
  }

  check() {
    let actions = [...this.cells].map((c) => {
      return c.alive ? Cell.check(c) : () => c.die();
    });
    actions.forEach((action) => action && action());

    this.time += 1;

    return this;
  }

  get(x, y) {
    if (!this.rows.has(x)) return void 0;
    return this.rows.get(x).get(y);
  }

  create(cell) {
    if (!this.rows.has(cell.x)) this.rows.set(cell.x, new Map());
    this.rows.get(cell.x).set(cell.y, cell);

    // this.dispatchEvent('updateCells')
  }

  kill(cell) {
    this.rows.get(cell.x)?.delete(cell.y);
    if (this.rows.get(cell.x) == 0) this.rows.delete(cell.x);

    // this.dispatchEvent('updateCells')
  }
}
