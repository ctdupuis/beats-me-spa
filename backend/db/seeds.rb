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

genres.each do |genre|
    Genre.create(name: genre)
end

def make_seeds(track_hash, album, artist, genre, img)
    genre = Genre.find_or_create_by(name: genre)
    artist = Artist.find_or_create_by(name: artist)
    alb = Album.new(name: album, artist_id: artist.id, genre_id: genre.id, img_url: img)
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

make_seeds(up_tracks, "Under Pressure", "Logic", "Rap", up_img)

    