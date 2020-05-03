class App {
    constructor(){
        // this.baseURL = baseURL
        this.albumsURL = `http://localhost:3000/albums`
        this.newAlbumForm = document.querySelector('form#new-album')
        this.newAlb = false
        this.flexContainer = document.querySelector('div.flex-container')
        this.formBtn = document.getElementById('form-btn')
        this.inputs = document.querySelectorAll('input.track-input')
        this.radios = document.getElementsByClassName('radio')
        this._session = {}
        this.newAlbumForm.addEventListener("submit", this.postData)
        this.formBtn.addEventListener("click", this.displayForm)
       
    }

    renderAlbums = () => {
        new Fetch(this.albumsURL).get()
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

    postData = (e) => {
        // let albumdata = this.setupAlbObj(e)
        new Fetch(this.albumsURL, 'POST', e).post()
        .then(alb => {
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs)
            this.makeCard(this.flexContainer, album) 
            this.addListeners() 
        })
        e.preventDefault();
        this.newAlbumForm.style.display = "none"
    }

    addListeners = () => {
        // adds listeners to radio buttons to generate form fields
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
                new Fetch(this.albumsURL, 'DELETE').delete(e)
                alert("Album Deleted")
                e.target.parentElement.remove()
            })
        }) 
    }

    start = () => {
        this.renderAlbums()        
    }

}




  

