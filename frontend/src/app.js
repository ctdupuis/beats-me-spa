class App {
    constructor(baseURL){
        this.baseURL = baseURL
        this.albums = []
        this.albumsURL = `${baseURL}/albums`
        this.newAlbumForm = document.querySelector('form#new-album')
        this.newAlb = false
        this.flexContainer = document.querySelector('div.flex-container')
        this.formBtn = document.getElementById('form-btn')
        this.inputs = document.querySelectorAll('input.track-input')
        this.radios = document.getElementsByClassName('radio')
        this.newAlbumForm.addEventListener("submit", this.postAlbum)
        this.formBtn.addEventListener("click", this.displayForm)
        this.headerObj = {
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }

    renderAlbums = () => {
        fetch(this.albumsURL)
        .then(r => r.json())
        .then(json => json.forEach(alb => {
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs)
            album.makeCard(this.flexContainer)
            let btn = document.querySelector(`[data-del-id='${alb.id}']`)
            btn.addEventListener('click', function() { 
                // debugger
                this.deleteAlbum(album) 
            })
            // debugger
        }))
        .catch(err => alert(err))
    }

    displayForm = () => {
        this.newAlb = !this.newAlb
        if (this.newAlb){
            this.newAlbumForm.style.display = 'block'
        } else {
            this.newAlbumForm.style.dispay = 'none'
        }
    }

    postAlbum = (event) => {
        let albumdata = {
            album: { 
                name: event.target.children["album-name"].value,
                artist_name: event.target.children["artist-name"].value,
                genre_name: event.target.children['genre'].value,
                img_url: event.target.children['album-img'].value,
                songs_attributes: []
            }
        }
        let songs = Array.from(event.target.children).filter(child => {
            return child.className === 'track-input'
        })
        let x = 0
        while (songs[x] !== undefined) {
            let songObj = Object.assign({}, {title: songs[x].value, runtime: songs[x+1].value});
            // debugger
            albumdata.album.songs_attributes.push(songObj)
            x += 2
        }
        // debugger
        let object = {
            method: 'POST',
            headers: this.headerObj,
            body: JSON.stringify(albumdata)
        }
        fetch(this.albumsURL, object)
        .then(res => res.json())
        .then(alb => {
            // debugger
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs)
            album.makeCard(this.flexContainer)    
        })
        event.preventDefault();
    }

    deleteAlbum = (album) => {
        let divCard = document.querySelector(`[data-alb-id='${album.id}']`)
        divCard.remove()
        debugger
    }

    addListeners = () => {
        // adds listeners to buttons
        for (let i = 0; i < this.radios.length; i++) {
            this.radios[i].addEventListener('click', function(e){
                let target = Number(e.target.value * 2)
                let inputs = document.querySelectorAll('input.track-input')
                for(let j = 0; j < target; j++) {
                    inputs[j].style.display = "flex"
                }
                for (target; target < inputs.length; target++){
                    inputs[target].style.display = "none"
                }
            })
        }
        document.getElementById('ep-info').addEventListener('click', function(e) {
            alert("An Extended Play is normally anywhere from 3-5 songs in length")
        })
        document.getElementById('lp-info').addEventListener('click', function(e) {
            alert("A Long Playing album is normally at least 6 songs in length")
        })
        let titleClone = this.inputs[this.inputs.length - 2].cloneNode(true)
        let runtimeClone = this.inputs[this.inputs.length - 1].cloneNode(true)
        debugger
    }

    start = () => {
        this.renderAlbums()
        this.addListeners()
    }

}




  

