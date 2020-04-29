# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
genres = ["Hip Hop",
        "Jazz",   
        "Rock",
        "Blues",
        "Folk",
        "Musical Theatre",
        "Pop",
        "Classical",
        "Country",
        "Heavy Metal",
        "R&B",
        "Reggae",
        "Punk Rock",
        "Funk",
        "Techno",
        "Soul",
        "House",
        "Electronic Dance",
        "Disco",
        "Alternative Rock",
        "Gospel",
        "Orchestra",
        "Instrumental",
        "Electro",
        "Ambient",
        "Grunge",
        "Indie Rock",
        "Trance",
        "Industrial",
        "Dubstep",
        "Psychedelic",
        "Ska",
        "Progressive Rock",
        "Experimental",
        "Pop Rock",
        "Drum and Bass",
        "Breakbeat",
        "Blues Rock",
        "Hardcore Punk",
        "Hard Rock",
        "Opera",
        "Bluegrass",
        "Dub",
        "Death Metal",
        "Folk Rock"
]

def make_seeds(track_hash, album, artist, genre, img)
    genre = Genre.find_or_create_by(name: genre)
    artist = Artist.find_or_create_by(name: artist)
    alb = Album.new(name: album, artist_id: artist.id, genre_id: genre.id, img_url: img, artist_name: artist.name)
    track_hash.each do |k, v|
        song = Song.new(v)
        song.artist_id = artist.id 
        song.save
        alb.songs << song
        alb.save
    end
end

up_img = "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Logic_Under_Pressure_9.10.14.jpg/220px-Logic_Under_Pressure_9.10.14.jpg"
up_tracks = {
    :t1 => {:title => "Intro", :runtime => "3:02"},
    :t2 => {:title => "Soul Food", :runtime => "4:52"},
    :t3 => {:title => "I'm Gone", :runtime => "4:42"},
    :t4 => {:title => "Gang Related", :runtime => "2:47"},
    :t5 => {:title => "Buried Alive", :runtime => "5:37"},
    :t6 => {:title => "Bounce", :runtime => "4:04"},
    :t7 => {:title => "Growing Pains III", :runtime => "4:06"},
    :t8 => {:title => "Never Enough", :runtime => "4:22"},
    :t9 => {:title => "Metropolis", :runtime => "4:55"},
    :t10 => {:title => "Nikki", :runtime => "3:23"},
    :t11 => {:title => "Under Pressure", :runtime => "9:19"},
    :t12 => {:title => "Till the End", :runtime => "5:12"}
}

swimming_img = "https://i.pinimg.com/originals/63/94/31/63943167a3e0fe622a4a11466ebeab8a.jpg"
swimming_tracks = {
    :t1 => {:title => "Come Back to Earth", :runtime => "2:41"},
    :t2 => {:title => "Hurt Feelings", :runtime => "4:05"},
    :t3 => {:title => "What's the Use?", :runtime => "4:48"},
    :t4 => {:title => "Perfecto", :runtime => "3:35"},
    :t5 => {:title => "Self Care", :runtime => "5:45"},
    :t6 => {:title => "Wings", :runtime => "4:10"},
    :t7 => {:title => "Ladders", :runtime => "4:47"},
    :t8 => {:title => "Small Worlds", :runtime => "4:31"},
    :t9 => {:title => "Conversation Pt.1", :runtime => "3:30"},
    :t10 => {:title => "Dunno", :runtime => "3:57"},
    :t11 => {:title => "Jet Fuel", :runtime => "5:45"},
    :t12 => {:title => "2009", :runtime => "5:47"},
    :t13 => {:title => "So It Goes", :runtime => "5:12"}
}

make_seeds(up_tracks, "Under Pressure", "Logic", "Rap", up_img)
make_seeds(swimming_tracks, "Swimming", "Mac Miller", "Hip Hop", swimming_img)

    