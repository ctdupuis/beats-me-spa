class Fetch {
    constructor(url) {
        this.url = url
    }

    static get {
        return fetch(this.url).then( r => r.json())
    }
}