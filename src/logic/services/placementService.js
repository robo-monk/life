import { Cell } from "../Cell.js";
import inventory from "./inventory/inventory.js";
import Eventful from "../Eventful.js";

export default class PlacementService extends Eventful {
    constructor(life) {
        super();
        this.life = life;
        this.inventory = this.inventory ? inventory : undefined;
    }

    set inventory(i) {
        if (i === undefined) return;
        localStorage.setItem('inventory', JSON.stringify(i));
        this.dispatchEvent('inventoryChange', i);
    }

    get inventory() {
        return JSON.parse(localStorage.getItem('inventory') || '{}');
    }

    build(schema, [x, y], {
        aliveSyms = ['x', 'O', 'o'],
    } = {}) {

        console.time(`creating life \n\n ${schema} \n\n`)
        // @ts-ignore
        let rootCell = new Cell({
            life: this.life,
            alive: true,
            x, y
        });

        let indexCell = rootCell;
        schema.split('\n').forEach((row, i) => {
            row = row.trim();
            if (!row.length) return;

            Array.from(row).forEach((sym, ii) => {
                indexCell.alive = aliveSyms.includes(sym)
                indexCell = indexCell.right
            });

            indexCell = indexCell.bottom
            let _i = row.length;
            while (_i > 0) {
                indexCell = indexCell.left
                _i -= 1
            }
        });

        console.timeEnd(`creating life \n\n ${schema} \n\n`)
    }

    buildRLE(rle, [x, y]) {
        const rows = rle.split("\n")
        let rleObj = {
            comments: [],
            info: {},
            lines: []
        }

        const cipheredLines = []
        rows.map(r => r.trim()).forEach(row => {
            // parse comments
            if (row[0] == "#") return rleObj.comments.push(row);

            // parser of this: x = 36, y = 9, rule = B3/S23
            if (row[0] == "x") {
                let json = "{" + row.split(",").map(r => `"${r.trim().replace(" = ", '":"')}"`).join(",") + "}"
                let o = JSON.parse(json)
                Object.entries(o).forEach(([key, value]) => o[key] = parseInt(value) > 0 ? parseInt(value) : value);
                return rleObj.info = o
            }

            // else is soemthing like 24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4b
            cipheredLines.push(row)
        })

        const newLineSym = "$"
        const deadSym = "b"
        const aliveSym = "o"
        let _rows = []

        cipheredLines.join("").split(newLineSym).forEach(row => {
            let rowBuffer = ""
            let buffer = ''
            Array.from(row).forEach(char => {
                if ([deadSym, aliveSym].includes(char)) {
                    const multiplier = parseInt(buffer) || 1
                    buffer = ''
                    rowBuffer += (char == aliveSym ? 'o' : '.')
                        .repeat(multiplier)

                } else {
                    buffer += char
                }
            })

            // pad with dead cells
            rowBuffer += ".".repeat(rleObj.info.x - rowBuffer.length)
            _rows.push(rowBuffer)
        })

        console.log('rows', _rows);
        this.build(_rows.join('\n'), [x, y]);
    }
}
