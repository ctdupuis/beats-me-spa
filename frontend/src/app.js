class App {
    constructor(){
        this.baseURL = "http://localhost:3000";
        this.albumsURL = `${this.baseURL}/albums`;
        this.genrePath = `${this.baseURL}/genres`;
        this.signupPath = `${this.baseURL}/signup`;
        this.loginPath = `${this.baseURL}/login`;
        this.newAlbumForm = document.querySelector('form#new-album');
        this.newAlb = false;
        this.flexContainer = document.querySelector('div.flex-container');
        this.formBtn = document.getElementById('form-btn');
        this.inputs = document.querySelectorAll('input.track-input');
        this.radios = document.getElementsByClassName('radio');
        this.genSelect = document.getElementById('genre');
        // this.signup = document.getElementById('signup');
        // this.login = document.getElementById('login');
        // this.seshForm = document.getElementById('sesh');
        // this.seshSubmit = document.getElementById('sesh-submit');
    }

    renderAlbums = () => {
        new Fetch(this.albumsURL).get()
        .then(json => {            
            json.forEach(alb => {
                let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs)
                this.makeCard(this.flexContainer, album)
            });
            let delBtns = document.querySelectorAll('button.delete');
            delBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    new Fetch(this.albumsURL, e).delete();
                    alert("Album Deleted");
                    e.target.parentElement.remove();
                });
            })
        })
        .catch(err => console.log(err))
    }

    makeCard = (parentElement, album) => {
        let html = `
        <div class="album-card" data-alb-id="${album.id}">
            <span class="alb-name">${album.name}</span><span class="album-genre">${album.genre}</span>
            <div class="img-container">
            <img src="${album.imgURL}">
            </div>
            <span class="alb-artist">${album.artist}</span>
            <button class="delete" data-del-id="${album.id}">Delete</button>
        </div> `
        parentElement.innerHTML += html;
        let songsDiv = document.createElement('div');
        songsDiv.setAttribute('class', 'tracklist-container');
        for (let i = 0; i < album.songs.length; i++) {
            songsDiv.innerHTML += `
            <div class="song-container">
            <div class="song-title">${i + 1}. ${album.songs[i].title}</div><div class="song-runtime">${album.songs[i].runtime}</div>
            </div>
            `
        }
        let albCard = document.querySelector(`[data-alb-id='${album.id}']`);
        albCard.appendChild(songsDiv);
        // this.checkOwnership(albCard);
    }

    displayForm = () => {
        this.newAlb = !this.newAlb;
        if (this.newAlb){
            this.newAlbumForm.style.display = 'inline-block';
            this.formBtn.innerText = 'Cancel';
        } else {
            this.newAlbumForm.style.display = 'none';
            this.formBtn.innerText = 'New Submission';
        }
    }

    postData = (e) => {
        // let albumdata = this.setupAlbObj(e)
        new Fetch(this.albumsURL, e).post()
        .then(alb => {
            let album = new Album(alb.id, alb.name, alb.artist.name, alb.genre.name, alb.img_url, alb.songs);
            this.makeCard(this.flexContainer, album); 
            let delBtns = document.querySelectorAll('button.delete');
            delBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    new Fetch(this.albumsURL, e).delete();
                    alert("Album Deleted");
                    e.target.parentElement.remove();
                })
            }) 
        })
        e.preventDefault();
        debugger
        this.newAlbumForm.style.display = "none";
        this.formBtn.style.display = '';
        this.newAlb = !this.newAlb
    }

    addListeners = () => {
        // adds listeners to radio buttons to generate form fields
        for (let i = 0; i < this.radios.length; i++) {
            this.radios[i].addEventListener('click', function(e){
                // grab the inputs
                let inputs = document.querySelectorAll('input.track-input');
                // two inputs per song
                let target = Number(e.target.value * 2);
                // generate fields based on radio value, hide the rest if user switches radio option
                for(let j = 0; j < target; j++) {
                    inputs[j].style.display = "inline-block";
                }
                for (target; target < inputs.length; target++){
                    inputs[target].style.display = "none";
                }
            })
        }
        this.newAlbumForm.addEventListener("submit", this.postData);
        this.formBtn.addEventListener("click", this.displayForm);
        new Fetch(this.genrePath).get().then(json => json.forEach(gen =>{
            this.genSelect.innerHTML += `<option value='${gen.name}'>${gen.name}</option>`;
        }))
    //     this.signup.addEventListener('click', (e) => {
    //         this.seshForm.style.display = '';
    //         this.seshForm.setAttribute('action', '/signup');
    //         this.seshSubmit.value = 'Sign Up';
    //     })
    //     this.login.addEventListener('click', (e) => {
    //         this.seshForm.style.display = '';
    //         this.seshForm.setAttribute('action', '/login');
    //         this.seshSubmit.value = 'Log In';
    //     })
    //     this.seshForm.addEventListener('submit', (e) => {
    //         let url = ''
    //         // debugger
    //         if (this.seshSubmit.value === "Sign Up") {
    //             url = `${this.baseURL}/signup`;
    //         } else if (this.seshSubmit.value === "Log In"){
    //             url = `${this.baseURL}/login`;
    //         }
    //         // debugger
    //         new Fetch(url, e).authenticate()
    //         .then(r => {
    //             // debugger
    //             localStorage.setItem('auth', JSON.stringify(r));
    //             new Session
    //             let html = `<div class='user-div'>Welcome, ${Session.user}</div>`;
    //             // debugger
    //             document.querySelector('div.header').innerHTML += html;
    //             document.querySelectorAll('div.album-card').forEach(card => this.checkOwnership(card));
    //         });
    //         // debugger
    //         this.seshForm.style.display = 'none';
    //         // debugger
    //         this.signup.style.display = 'none';
    //         this.login.innerText = "Log Out";
    //         // debugger
    //         e.preventDefault();
    //     })
    }

    // checkOwnership = (card) => {
    //     if (card.dataset.user !== Session.user) {
    //         card.children[4].style.display = 'none';
    //     } else {
    //         card.children[4].style.display = '';
    //     }
    // }

    start = () => {
        this.renderAlbums();
        this.addListeners();
    }

}




  

