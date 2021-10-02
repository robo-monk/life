import { Cell } from "./Cell";

export class Life {
  constructor() {
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

  check() {
    let actions = [...this.cells].map((c) => {
      return c.alive ? Cell.check(c, true) : () => c.die();
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
  }

  kill(cell) {
    this.rows.get(cell.x)?.delete(cell.y);
    if (this.rows.get(cell.x) == 0) this.rows.delete(cell.x);
  }
}
