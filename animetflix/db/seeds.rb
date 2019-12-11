# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Movie.destroy_all
Genre.destroy_all
GenreLink.destroy_all
Watchlist.destroy_all

ApplicationRecord.connection.reset_pk_sequence!("users")
ApplicationRecord.connection.reset_pk_sequence!("movies")
ApplicationRecord.connection.reset_pk_sequence!("genres")
ApplicationRecord.connection.reset_pk_sequence!("genre_links")
ApplicationRecord.connection.reset_pk_sequence!("watchlists")

User.create!(email: "demo@demo.com", password: "anything")
User.create!(email: "otaku@demo.com", password: "anything")


GENRES = [
  "Family", #1
  "Fantasy", #2
  "Sci-Fi", #3
  "Adventure", #4 
  "Romance", #5
  "Period", #6
  "War", #7
  "Drama", #8
  "Action", #9
  "Comedy", #10
  "Thriller", #11
  "Horror" #12
]

GENRES.each do |genre|
  Genre.create!(name: genre)
end


#  id          :bigint           not null, primary key
#  title       :string           not null
#  yr          :integer          not null
#  description :text             not null
#  rating      :string           not null
#  runtime     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null

Movie.create!(title: "The Boy and the Beast", yr: 2015, director: "Mamoru Hosoda", rating: "PG-13", runtime: 120, description: "When Kyuta, a young orphan living on the streets of Shibuya, stumbles into a fantastic world of beasts, he's taken in by Kumatetsu, a gruff, rough-around-the-edges warrior beast who's been searching for the perfect apprentice. But when a deep darkness threatens to throw the human and beast worlds into chaos, the strong bond between this unlikely pair will be put to the ultimate test.")
#1 Fantasy, Action, Adventure

Movie.create!(title: "Akira", yr: 1988, director: "Katsuhiro Otomo", rating: "R", runtime: 125, description: "In 1988 the Japanese government drops an atomic bomb on Tokyo after ESP experiments on children go awry. In 2019, 31 years after the nuking of the city, Kaneda, a bike gang leader, tries to save his friend Tetsuo from a secret government project. He battles anti-government activists, greedy politicians, irresponsible scientists and a powerful military leader until Tetsuo's supernatural powers suddenly manifest. A final battle is fought in Tokyo Olympiad exposing the experiment's secrets.")
#2 Thriller, Action, Sci-Fi

Movie.create!(title: "Grave of the Fireflies", yr: 1993, director: "Isao Takahata", rating: "PG-13", runtime: 90, description: "A devastating meditation on the human cost of war, this animated tale follows Seita (Tsutomu Tatsumi), a teenager charged with the care of his younger sister, Setsuko (Ayano Shiraishi), after an American firebombing during World War II separates the two children from their parents. Their tale of survival is as heartbreaking as it is true to life. The siblings rely completely on each other and struggle against all odds to stay together and stay alive")
#3 Drama, War

Movie.create!(title: "Dragon Ball Super Broly", yr: 2018, director: "Tatsuya Nagamine", rating: "PG", runtime: 101, description: "One fateful day, a Saiyan appears before Goku and Vegeta who they have never seen before: Broly. With the return of Frieza from hell, a fierce battle awaits these three Saiyans who have followed completely different destinies.")
#4 Action, Fantasy, Sci-fi

Movie.create!(title: "Summer Wars", yr: 2009, director: "Mamoru Hosoda", rating: "PG", runtime: 101, description: "Kenji a teenage math prodigy, recruited by his secret crush Natsuki for the ultimate summer job - passing himself off as Natsuki's boyfriend during her grandmother's 90th birthday celebration. But when Kenji solves a 2,056 digit math riddle sent to his cell phone, he unwittingly breaches the security barricade protecting Oz, a globe-spanning virtual world where millions of people and governments interact through their avatars. Now a malicious AI program is hijacking Oz accounts, growing exponentially more powerful and sowing chaos and destruction in its wake.")
#5 Action, Adventure, Sci-Fi, Comedy

Movie.create!(title: "The Wind Rises", yr: 2013, director: "Hayao Miyazaki", rating: "PG-13", runtime: 126, description: "A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi (Hideaki Anno), whose storied career includes the creation of the A6M World War II fighter plane.")
#6 Drama, War, Romance, Period

Movie.create!(title: "Sword of the Stranger", yr: 2007, director: "Masahiro Andô", rating: "NR", runtime: 103, description: "A swordsman becomes caught up in a struggle between morality, righteousness and devotion after he agrees to take a raggedy boy and his dog to a Buddhist temple.")
#7 Period, Action, Historical, Adventure

Movie.create!(title: "Howl's Moving Castle", yr: 2004, director: "Hayao Miyazaki", rating: "PG", runtime: 119, description: "Sophie has an uneventful life at her late father's hat shop, but all that changes when she befriends wizard Howl, who lives in a magical flying castle. However, the evil Witch of Waste takes issue with their budding relationship and casts a spell on young Sophie, which ages her prematurely. Now Howl must use all his magical talents to battle the jealous hag and return Sophie to her former youth and beauty.")
#8 Romance, Fantasy, Drama

Movie.create!(title: "Ghost in the Shell", yr: 1995, director: "Mamoru Oshii", rating: "R", runtime: 95, description: 'Cyborg federal agent Maj. Motoko Kusanagi trails "The Puppet Master" , who illegally hacks into the computerized minds of cyborg-human hybrids. Her pursuit of a man who can modify the identity of strangers leaves Motoko pondering her own makeup and what life might be like if she had more human traits.')
#9 Action, Sci-Fi, Drama

Movie.create!(title: "Princess Mononoke", yr: 1997, director: "Hayao Miyazaki", rating: "PG-13", runtime: 134, description: "In the 14th century, the harmony that humans, animals and gods have enjoyed begins to crumble. The protagonist, young Ashitaka - infected by an animal attack, seeks a cure from the deer-like god Shishigami. In his travels, he sees humans ravaging the earth, bringing down the wrath of wolf god Moro and his human companion Princess Mononoke. Hiskattempts to broker peace between her and the humans brings only conflict.")
#10 Drama, Fantasy, Action, Adventure

Movie.create!(title: "My Neighbor Totoro", yr: 1988, director: "Hayao Miyazaki", rating: "G", runtime: 100, description: "Satsuke and her younger sister, Mei, settle into an old country house with their father and wait for their mother to recover from an illness in an area hospital. As the sisters explore their new home, they encounter and befriend playful spirits in their house and the nearby forest, most notably the massive cuddly creature known as Totoro.")
#11 Drama, Fantasy, Family

Movie.create!(title: "Spirited Away", yr: 2001, director: "Hayao Miyazaki", rating: "PG", runtime: 125, description: "10-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku, who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.")
#12 Fantasy, Family, Drama

Movie.create!(title: "The Tale of Princess Kaguya", yr: 2013, director: "Isao Takahata", rating: "PG", runtime: 137, description: "A tiny nymph found inside a bamboo stalk grows into a beautiful and desirable young woman, who orders her suitors to prove their love by completing a series of near-impossible tasks.")
#13 Drama, Fantasy, Period

Movie.create!(title: "Porco Ross", yr: 1992, director: "Hayao Miyazaki", rating: "PG", runtime: 102, description: "In Italy in the 1930s, sky pirates in biplanes terrorize wealthy cruise ships as they sail the Adriatic Sea. The only pilot brave enough to stop the scourge is the mysterious Porco Rosso, a former World War I flying ace who was somehow turned into a pig during the war. As he prepares to battle the pirate crew's American ace, Porco Rosso enlists the help of spunky girl mechanic Fio Piccolo and his longtime friend Madame Gina.")
#14 Drama, Fantasy, Period

Movie.create!(title: "Whisper of the Heart", yr: 1995, director: "Yoshifumi Kondō", rating: "PG", runtime: 111, description: "Based on the manga with the same title, this animated film follows Shizuku, an inquisitive young girl and a voracious reader, who longs to be a writer when she grows up. One day she notices that all of her library books have previously been taken out by one Seiji Amasawa. Amid chasing after a large cat, befriending an eccentric antiques dealer and writing her first novel, Shizuku aims to find this mysterious boy who may well be her soul mate.")
#15 Drama, Romance

Movie.create!(title: "The Girl Who Leapt Through Time", yr: 2008, director: "Mamoru Hosoda", rating: "NR", runtime: 98, description: "When a typical young high school girl discovers that she has the unique ability to traverse space and time, her efforts to use the power as a means of preserving the relationships she shares with her closest friends reveals the perpetually shifting nature of personal relationships.")
#16 Drama, Adventure, Family, Sci-Fi

Movie.create!(title: "A Silent Voice ", yr: 2016, director: "Naoko Yamada", rating: "NR", runtime: 130, description: "When a grade school student with impaired hearing is bullied mercilessly, she transfers to another school. Years later, one of her former tormentors sets out to make amends.")
#17 Drama, Romance 

Movie.create!(title: "Kiki’s Delivery Service", yr: 1989, director: "Hayao Miyazaki", rating: "G", runtime: 103, description: "13-year-old Kiki moves to a seaside town with her talking cat, Jiji, to spend a year alone, in accordance with her village's tradition for witches in training. After learning to control her broomstick, Kiki sets up a flying courier service and soon becomes a fixture in the community.")
#18 Drama, Family, Fantasy

# Movie.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# #Drama, War

# Movie.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# #Drama, War



GenreLink.create!(move_id: 1, genre_id: 2)
GenreLink.create!(move_id: 1, genre_id: 4)
GenreLink.create!(move_id: 1, genre_id: 9)
GenreLink.create!(move_id: 2, genre_id: 11)
GenreLink.create!(move_id: 2, genre_id: 9)
GenreLink.create!(move_id: 2, genre_id: 3)
GenreLink.create!(move_id: 3, genre_id: 8)
GenreLink.create!(move_id: 3, genre_id: 7)
GenreLink.create!(move_id: 3, genre_id: 6)
GenreLink.create!(move_id: 4, genre_id: 9)
GenreLink.create!(move_id: 4, genre_id: 2)
GenreLink.create!(move_id: 4, genre_id: 3)
GenreLink.create!(move_id: 5, genre_id: 9)
GenreLink.create!(move_id: 5, genre_id: 10)
GenreLink.create!(move_id: 5, genre_id: 3)
GenreLink.create!(move_id: 5, genre_id: 4)
GenreLink.create!(move_id: 6, genre_id: 8)
GenreLink.create!(move_id: 6, genre_id: 7)
GenreLink.create!(move_id: 6, genre_id: 5)
GenreLink.create!(move_id: 6, genre_id: 6)
GenreLink.create!(move_id: 7, genre_id: 4)
GenreLink.create!(move_id: 7, genre_id: 6)
GenreLink.create!(move_id: 7, genre_id: 9)
GenreLink.create!(move_id: 8, genre_id: 5)
GenreLink.create!(move_id: 8, genre_id: 2)
GenreLink.create!(move_id: 8, genre_id: 8)
GenreLink.create!(move_id: 9, genre_id: 9)
GenreLink.create!(move_id: 9, genre_id: 8)
GenreLink.create!(move_id: 9, genre_id: 3)
GenreLink.create!(move_id: 9, genre_id: 11)
GenreLink.create!(move_id: 10, genre_id: 8)
GenreLink.create!(move_id: 10, genre_id: 2)
GenreLink.create!(move_id: 10, genre_id: 4)
GenreLink.create!(move_id: 10, genre_id: 9)
GenreLink.create!(move_id: 10, genre_id: 6)
GenreLink.create!(move_id: 11, genre_id: 2)
GenreLink.create!(move_id: 11, genre_id: 1)
GenreLink.create!(move_id: 11, genre_id: 8)
GenreLink.create!(move_id: 12, genre_id: 2)
GenreLink.create!(move_id: 12, genre_id: 1)
GenreLink.create!(move_id: 12, genre_id: 8)
GenreLink.create!(move_id: 13, genre_id: 2)
GenreLink.create!(move_id: 13, genre_id: 8)
GenreLink.create!(move_id: 13, genre_id: 6)
GenreLink.create!(move_id: 14, genre_id: 2)
GenreLink.create!(move_id: 14, genre_id: 8)
GenreLink.create!(move_id: 14, genre_id: 6)
GenreLink.create!(move_id: 15, genre_id: 8)
GenreLink.create!(move_id: 15, genre_id: 5)
GenreLink.create!(move_id: 16, genre_id: 8)
GenreLink.create!(move_id: 16, genre_id: 4)
GenreLink.create!(move_id: 16, genre_id: 3)
GenreLink.create!(move_id: 16, genre_id: 1)
GenreLink.create!(move_id: 17, genre_id: 8)
GenreLink.create!(move_id: 17, genre_id: 5)
GenreLink.create!(move_id: 18, genre_id: 1)
GenreLink.create!(move_id: 18, genre_id: 8)
GenreLink.create!(move_id: 18, genre_id: 2)
# GenreLink.create!(move_id: , genre_id: )


# GENRES = [
#   "Family", #1
#   "Fantasy", #2
#   "Sci-Fi", #3
#   "Adventure", #4 
#   "Romance", #5
#   "Period", #6
#   "War", #7
#   "Drama", #8
#   "Action", #9
#   "Comedy", #10
#   "Thriller", #11
#   "Horror" #12
# ]






