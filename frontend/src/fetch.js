class Fetch {
    constructor(url) {
        this.url = url
    }

    static get(url) {
        return fetch(this.url).then( r => r.json())
    }
}