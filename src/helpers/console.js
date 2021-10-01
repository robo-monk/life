class Console {
	constructor(dev=true) {
		this.dev = dev
	}

	log(...params) {
		if (this.dev) console.log(...params)
	}
	warn(...params) {
		if (this.dev) console.warn(...params)
	}
	error(...params) {
		if (this.dev) console.error(...params)
	}
}

export default new Console();