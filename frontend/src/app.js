class App {
    constructor(){
        // this.go = new Fetch
        // this.baseURL = baseURL
        this.albumsURL = `http://localhost:3000/albums`
        this.newAlbumForm = document.querySelector('form#new-album')
        this.newAlb = false
        this.flexContainer = document.querySelector('div.flex-container')
        this.formBtn = document.getElementById('form-btn')
        this.inputs = document.querySelectorAll('input.track-input')
        this.radios = document.getElementsByClassName('radio')
        this.newAlbumForm.addEventListener("submit", this.postAlbum)
        this.formBtn.addEventListener("click", this.displayForm)
        this.headerObj = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
        // document.addEventListener("DOMContentLoaded" )
       
    }

    renderAlbums = () => {
        new Fetch(this.albumsURL).getAlbums()
        .then(json => { 
            json.forEach(alb => {
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs)
            this.makeCard(this.flexContainer, album)
            this.addListeners()
        })
        })
        .catch(err => console.log(err))
    }

    makeCard = (parentElement, album) => {
        let html = `
        <div class="album-card" data-alb-id="${album.id}">
            <span class="alb-name">${album.name} | ${album.genre}</span>
            <div class="img-container">
            <img src="${album.imgURL}">
            </div>
            <span class="alb-artist">${album.artist}</span>
            <button class="delete" data-del-id="${album.id}">Delete</button>
        </div> `
        parentElement.innerHTML += html
        let songsDiv = document.createElement('div')
        songsDiv.setAttribute('class', 'tracklist-container')
        for (let i = 0; i < album.songs.length; i++) {
            songsDiv.innerHTML += `
            <div class="song-container">
            <div class="song-title">${i + 1}. ${album.songs[i].title} <div>${album.songs[i].runtime}</div></div>
            </div>
            `
        }
        document.querySelector(`[data-alb-id='${album.id}']`).appendChild(songsDiv)
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
        // form an array of input fields
        let songs = Array.from(event.target.children).filter(child => {
            return child.className === 'track-input'
        })
        // loop to format the field values for submission
        let x = 0
        while (songs[x] !== undefined) {
            let songObj = Object.assign({}, {title: songs[x].value, runtime: songs[x+1].value});
            albumdata.album.songs_attributes.push(songObj)
            x += 2
        }
        let object = {
            method: 'POST',
            headers: this.headerObj,
            body: JSON.stringify(albumdata)
        }
        fetch(this.albumsURL, object)
        .then(res => res.json())
        .then(alb => {
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs)
            this.makeCard(this.flexContainer, album) 
            this.addListeners() 
        })
        event.preventDefault();
        this.newAlbumForm.style.display = "none"
    }

    deleteAlbum = (albumID, url) => {
        let object = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applicaiton/json'
            }
        }
        fetch(`${url}/${albumID}`, object)
        .then(r => r)
        .then(alert('Album deleted'))
        let divCard = document.querySelector(`[data-alb-id='${albumID}']`)
        divCard.remove()
    }

    addListeners = () => {
        // adds listeners to buttons
        for (let i = 0; i < this.radios.length; i++) {
            this.radios[i].addEventListener('click', function(e){
                let inputs = document.querySelectorAll('input.track-input')
                let target = Number(e.target.value * 2)
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
        let delBtns = document.querySelectorAll('button.delete')
        delBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteAlbum(e.target.dataset.delId, this.albumsURL)
            })
        }) 
    }

    start = () => {
        this.renderAlbums()        
    }

}




  

