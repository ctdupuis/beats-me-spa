class Fetch {
    constructor(url, method=null, data=null) {
        this.url = url
        this.headerObj = {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
        this.method = method
        this.data = data
        this.configObject = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"  
            },
            body: JSON.stringify(data)
        }
    }

    get = function() {
        return fetch(this.url)
        .then(r => r.json())
    }

    post = function() {
        return fetch(this.url, this.configObject)
        .then(r => r.json())
    }
    

    delete = function(event) {
        return fetch(`${this.url}/${event.target.dataset.delId}`, this.configObject)
        .then(r => r.json())
    }

    static destroy(url) {

    }
}


