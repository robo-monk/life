export default class Eventful {
    constructor() {
        this.events = new Map();
    }
    dispatchEvent(event, ...params) {
        let cbs = this.events.get(event) || [];
        cbs.forEach(cb => cb(...params))
    }

    on(event, ...callbacks) {
        this.events.set(event, [...(this.events.get(event) || []), ...callbacks]);
    }
}
