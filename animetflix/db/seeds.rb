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

def glinks(movie_id, genreArr)
  genreArr.each do |genre|
     GenreLink.create!(movie_id: movie_id, genre_id: Genre.find_by(name: genre).id)
  end
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
#1 
glinks(1, ["Fantasy", "Action", "Adventure"])

Movie.create!(title: "Akira", yr: 1988, director: "Katsuhiro Otomo", rating: "R", runtime: 125, description: "In 1988 the Japanese government drops an atomic bomb on Tokyo after ESP experiments on children go awry. In 2019, 31 years after the nuking of the city, Kaneda, a bike gang leader, tries to save his friend Tetsuo from a secret government project. He battles anti-government activists, greedy politicians, irresponsible scientists and a powerful military leader until Tetsuo's supernatural powers suddenly manifest. A final battle is fought in Tokyo Olympiad exposing the experiment's secrets.")
#2 
glinks(2, ["Thriller", "Action", "Sci-Fi"])

Movie.create!(title: "Grave of the Fireflies", yr: 1993, director: "Isao Takahata", rating: "PG-13", runtime: 90, description: "A devastating meditation on the human cost of war, this animated tale follows Seita (Tsutomu Tatsumi), a teenager charged with the care of his younger sister, Setsuko (Ayano Shiraishi), after an American firebombing during World War II separates the two children from their parents. Their tale of survival is as heartbreaking as it is true to life. The siblings rely completely on each other and struggle against all odds to stay together and stay alive")
#3 Drama, War
glinks(3, ["Drama", "War"])

Movie.create!(title: "Dragon Ball Super Broly", yr: 2018, director: "Tatsuya Nagamine", rating: "PG", runtime: 101, description: "One fateful day, a Saiyan appears before Goku and Vegeta who they have never seen before: Broly. With the return of Frieza from hell, a fierce battle awaits these three Saiyans who have followed completely different destinies.")
#4 Action, Fantasy, Sci-fi
glinks(4, ["Fantasy", "Action", "Sci-Fi"])

Movie.create!(title: "Summer Wars", yr: 2009, director: "Mamoru Hosoda", rating: "PG", runtime: 101, description: "Kenji a teenage math prodigy, recruited by his secret crush Natsuki for the ultimate summer job - passing himself off as Natsuki's boyfriend during her grandmother's 90th birthday celebration. But when Kenji solves a 2,056 digit math riddle sent to his cell phone, he unwittingly breaches the security barricade protecting Oz, a globe-spanning virtual world where millions of people and governments interact through their avatars. Now a malicious AI program is hijacking Oz accounts, growing exponentially more powerful and sowing chaos and destruction in its wake.")
#5 Action, Adventure, Sci-Fi, Comedy
glinks(5, ["Adventure", "Action", "Sci-Fi", "Comedy"])

Movie.create!(title: "The Wind Rises", yr: 2013, director: "Hayao Miyazaki", rating: "PG-13", runtime: 126, description: "A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi (Hideaki Anno), whose storied career includes the creation of the A6M World War II fighter plane.")
#6 Drama, War, Romance, Period
glinks(6, ["Drama", "War", "Romance", "Period"])

Movie.create!(title: "Sword of the Stranger", yr: 2007, director: "Masahiro Andô", rating: "NR", runtime: 103, description: "A swordsman becomes caught up in a struggle between morality, righteousness and devotion after he agrees to take a raggedy boy and his dog to a Buddhist temple.")
#7 Period, Action, Historical, Adventure
glinks(7, ["Adventure", "Action", "Period"])

Movie.create!(title: "Howl's Moving Castle", yr: 2004, director: "Hayao Miyazaki", rating: "PG", runtime: 119, description: "Sophie has an uneventful life at her late father's hat shop, but all that changes when she befriends wizard Howl, who lives in a magical flying castle. However, the evil Witch of Waste takes issue with their budding relationship and casts a spell on young Sophie, which ages her prematurely. Now Howl must use all his magical talents to battle the jealous hag and return Sophie to her former youth and beauty.")
#8 Romance, Fantasy, Drama
glinks(8, ["Drama", "Fantasy", "Romance"])

Movie.create!(title: "Ghost in the Shell", yr: 1995, director: "Mamoru Oshii", rating: "R", runtime: 95, description: 'Cyborg federal agent Maj. Motoko Kusanagi trails "The Puppet Master" , who illegally hacks into the computerized minds of cyborg-human hybrids. Her pursuit of a man who can modify the identity of strangers leaves Motoko pondering her own makeup and what life might be like if she had more human traits.')
#9 Action, Sci-Fi, Drama
glinks(9, ["Action", "Sci-Fi", "Drama"])

Movie.create!(title: "Princess Mononoke", yr: 1997, director: "Hayao Miyazaki", rating: "PG-13", runtime: 134, description: "In the 14th century, the harmony that humans, animals and gods have enjoyed begins to crumble. The protagonist, young Ashitaka - infected by an animal attack, seeks a cure from the deer-like god Shishigami. In his travels, he sees humans ravaging the earth, bringing down the wrath of wolf god Moro and his human companion Princess Mononoke. Hiskattempts to broker peace between her and the humans brings only conflict.")
#10 Drama, Fantasy, Action, Adventure
glinks(10, ["Adventure", "Action", "Drama", "Fantasy"])

Movie.create!(title: "My Neighbor Totoro", yr: 1988, director: "Hayao Miyazaki", rating: "G", runtime: 100, description: "Satsuke and her younger sister, Mei, settle into an old country house with their father and wait for their mother to recover from an illness in an area hospital. As the sisters explore their new home, they encounter and befriend playful spirits in their house and the nearby forest, most notably the massive cuddly creature known as Totoro.")
#11 Drama, Fantasy, Family
glinks(11, ["Drama", "Fantasy", "Family", "Comedy"])

Movie.create!(title: "Spirited Away", yr: 2001, director: "Hayao Miyazaki", rating: "PG", runtime: 125, description: "10-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku, who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.")
#12 Fantasy, Family, Drama
glinks(12, ["Drama", "Fantasy", "Family"])

Movie.create!(title: "The Tale of Princess Kaguya", yr: 2013, director: "Isao Takahata", rating: "PG", runtime: 137, description: "A tiny nymph found inside a bamboo stalk grows into a beautiful and desirable young woman, who orders her suitors to prove their love by completing a series of near-impossible tasks.")
#13 Drama, Fantasy, Period
glinks(13, ["Drama", "Fantasy", "Period"])

Movie.create!(title: "Porco Ross", yr: 1992, director: "Hayao Miyazaki", rating: "PG", runtime: 102, description: "In Italy in the 1930s, sky pirates in biplanes terrorize wealthy cruise ships as they sail the Adriatic Sea. The only pilot brave enough to stop the scourge is the mysterious Porco Rosso, a former World War I flying ace who was somehow turned into a pig during the war. As he prepares to battle the pirate crew's American ace, Porco Rosso enlists the help of spunky girl mechanic Fio Piccolo and his longtime friend Madame Gina.")
#14 Drama, Fantasy, Period
glinks(14, ["Drama", "Fantasy", "Period", "Action"])

Movie.create!(title: "Whisper of the Heart", yr: 1995, director: "Yoshifumi Kondō", rating: "PG", runtime: 111, description: "Based on the manga with the same title, this animated film follows Shizuku, an inquisitive young girl and a voracious reader, who longs to be a writer when she grows up. One day she notices that all of her library books have previously been taken out by one Seiji Amasawa. Amid chasing after a large cat, befriending an eccentric antiques dealer and writing her first novel, Shizuku aims to find this mysterious boy who may well be her soul mate.")
#15 Drama, Romance
glinks(15, ["Drama", "Romance"])

Movie.create!(title: "The Girl Who Leapt Through Time", yr: 2008, director: "Mamoru Hosoda", rating: "NR", runtime: 98, description: "When a typical young high school girl discovers that she has the unique ability to traverse space and time, her efforts to use the power as a means of preserving the relationships she shares with her closest friends reveals the perpetually shifting nature of personal relationships.")
#16 Drama, Adventure, Family, Sci-Fi
glinks(16, ["Drama", "Adventure", "Family", "Sci-Fi"])

Movie.create!(title: "A Silent Voice ", yr: 2016, director: "Naoko Yamada", rating: "NR", runtime: 130, description: "When a grade school student with impaired hearing is bullied mercilessly, she transfers to another school. Years later, one of her former tormentors sets out to make amends.")
#17 Drama, Romance 
glinks(17, ["Drama", "Romance"])

Movie.create!(title: "Kiki’s Delivery Service", yr: 1989, director: "Hayao Miyazaki", rating: "G", runtime: 103, description: "13-year-old Kiki moves to a seaside town with her talking cat, Jiji, to spend a year alone, in accordance with her village's tradition for witches in training. After learning to control her broomstick, Kiki sets up a flying courier service and soon becomes a fixture in the community.")
#18 Drama, Family, Fantasy
glinks(18, ["Drama", "Fantasy", "Family"])

Movie.create!(title: "Samurai X: The Movie", yr: 1997, director: "Hatsuki Tsuji", rating: "NR", runtime: 90, description: "Himura Kenshin, the wandering samurai, was once known as Battousai, the \"Man Slayer,\" and used his unsurpassed prowess as a fighter to fight in the Japanese civil war and bring about the beginning of the Meiji period. That time is over now, however, and Kenshin has vowed to never kill again, and spend the rest of his life in atonement for all the lives that ended under his blade.")
#19 Drama, Action, Period
glinks(19, ["Drama", "Action", "Period"])

Movie.create!(title: "My Hero Academia: Two Heroes", yr: 2018, director: "Kenji Nagasaki", rating: "PG-13", runtime: 95, description: "Deku and All Might receive an invitation to I-Expo, The World's Leading Exhibition of Quirk Abilities and Hero Item Innovations. Suddenly, I-Expo's Top-Of-The-Line Security System gets hacked by villains and a sinister plan is set in motion. It's a serious threat to Hero Society and one man holds the key to it all.")
#20 Action, Adventure, Fantasy, Sci-Fi
glinks(20, ["Fantasy", "Adventure", "Action", "Family", "Sci-Fi"])

Movie.create!(title: "Patema Inverted", yr: 2013, director: "Yasuhiro Yoshiura", rating: "NR", runtime: 99, description: "A young girl, from a civilization that resides in deep underground tunnels, finds herself trapped in an inverted world and teams up with a resident to escape and return home.")
#21 Fantasy, Sci-Fi, Adventure
glinks(21, ["Fantasy", "Adventure", "Sci-Fi"])

Movie.create!(title: "Mary and the Witch's Flower", yr: 2017, director: "Hiromasa Yonebayashi", rating: "PG", runtime: 103, description: "Young Mary discovers an old broomstick and the strange Fly-by-Night flower, a rare plant that blossoms once every seven years. Together, the flower and the broomstick whisk Mary above the clouds, and far away to a school of magic run by headmistress Madam Mumblechook and the brilliant Doctor Dee. But terrible things are happening at the school, and when Mary tells a lie, she must risk her life to try and set things right.")
#22 Fantasy, Adventure, Family
glinks(22, ["Fantasy", "Adventure", "Family"])

Movie.create!(title: "Dragon Ball Z: Battle of Gods", yr: 2013, director: "Masahiro Hosoda", rating: "PG", runtime: 105, description: "The Z-Fighters must contend with Beerus, the God of Destruction. But it takes a god to fight a god, and none of them are gods... not even the Saiyans.")
#Action, Fantasy, Sci-fi
glinks(23, ["Fantasy", "Action", "Sci-Fi"])

Movie.create!(title: "Millennium Actress", yr: 2001, director: "Satoshi Kon", rating: "PG", runtime: 87, description: "Filmmaker Genya Tachibana begins work on a documentary about famed Japanese actress Chiyoko Fujiwara. Now well into old age, Chiyoko has become reclusive and shy about any publicity, but she eventually warms up to Tachibana and starts to relate her life story. As the decades pass, Chiyoko is transformed from a teen with big dreams into a full-blown celebrity, while her cinematic characters span various eras, from ancient Japan to the distant future.")
glinks(24, ["Period", "Drama", "Fantasy"])

Movie.create!(title: "One Piece Film: Z", yr: 2012, director: "Tatsuya Nagamine", rating: "NR", runtime: 108, description: "When the Dyna Stones are stolen by the diabolical former marine admiral Zephyr, now known as `Z', it's up to the Straw Hat Pirates to save the new world.")
glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])

Movie.create!(title: "Pokémon: The First Movie", yr: 1998, director: "Kunihiko Yuyama", rating: "G", runtime: 96, description: "Ash Ketchum and his friends Misty, Brock, and Pikachu, discover Mewtwo, a super-powered Pokemon created through biological engineering. Mewtwo has powers of which a mere Pokemon can only dream, and when he uses his skills to create even more super-Pokemon, Ash and his Pokemon friends must join forces to battle for survival.")
glinks(26, ["Fantasy", "Family", "Sci-Fi", "Action", "Adventure"])

Movie.create!(title: "Perfect Blue", yr: 1997, director: "Satoshi Kon", rating: "R", runtime: 90, description: "A retired pop singer turned actress' sense of reality is shaken when she is stalked by an obsessed fan and seemingly a ghost of her past.")
glinks(27, ["Thriller", "Horror", "Drama"])

Movie.create!(title: "Dragon Ball: The Path to Power", yr: 1996, director: "Yamauchi Shigeyasu", rating: "NR", runtime: 80, description: "When an adventure-hungry girl named Bulma runs across a bizarre young boy named Goku, they set out to recover the mystical Dragon Balls, artifacts of incredible power. Whomever collects all seven Dragon Balls can call forth the Eternal Dragon, a powerful creature that will grant whatever wish their heart desires.")
glinks(28, ["Fantasy", "Action", "Adventure", "Comedy"])

Movie.create!(title: "Mirai", yr: 2018, director: "Mamoru Hosoda", rating: "PG", runtime: 100, description: "A young boy named Kun feels forgotten by his family when his little sister Mirai arrives. Running away from home, Kun stumbles upon a magical garden that serves as a time-travelling gateway where he encounters his mother as a little girl and has a series of adventures with his baby sister, who is all grown up, opening a new perspective on his world.")
glinks(29, ["Fantasy", "Drama", "Adventure"])

Movie.create!(title: "One Piece Film: Strong World", yr: 2009, director: "Munehisa Sakai", rating: "NR", runtime: 113, description: "Straw Hat Pirates must save their navigator and stop the legendary Pirate, Shiki the Golden Lion from conquering East Blue.")
glinks(30, ["Fantasy", "Action", "Adventure", "Comedy"])

Movie.create!(title: "One Piece Film: Gold", yr: 2017, director: "Hiroaki Miyamoto", rating: "NR", runtime: 120, description: "The Straw Hat Pirates come to Gran Tesoro, the richest ship in the world.")
glinks(31, ["Fantasy", "Action", "Adventure", "Comedy"])

# Movie.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])


# Movie.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# #Drama, War



# GenreLink.create!(movie_id: 1, genre_id: 2)
# GenreLink.create!(movie_id: 1, genre_id: 4)
# GenreLink.create!(movie_id: 1, genre_id: 9)
# GenreLink.create!(movie_id: 2, genre_id: 11)
# GenreLink.create!(movie_id: 2, genre_id: 9)
# GenreLink.create!(movie_id: 2, genre_id: 3)
# GenreLink.create!(movie_id: 3, genre_id: 8)
# GenreLink.create!(movie_id: 3, genre_id: 7)
# GenreLink.create!(movie_id: 3, genre_id: 6)
# GenreLink.create!(movie_id: 4, genre_id: 9)
# GenreLink.create!(movie_id: 4, genre_id: 2)
# GenreLink.create!(movie_id: 4, genre_id: 3)
# GenreLink.create!(movie_id: 5, genre_id: 9)
# GenreLink.create!(movie_id: 5, genre_id: 10)
# GenreLink.create!(movie_id: 5, genre_id: 3)
# GenreLink.create!(movie_id: 5, genre_id: 4)
# GenreLink.create!(movie_id: 6, genre_id: 8)
# GenreLink.create!(movie_id: 6, genre_id: 7)
# GenreLink.create!(movie_id: 6, genre_id: 5)
# GenreLink.create!(movie_id: 6, genre_id: 6)
# GenreLink.create!(movie_id: 7, genre_id: 4)
# GenreLink.create!(movie_id: 7, genre_id: 6)
# GenreLink.create!(movie_id: 7, genre_id: 9)
# GenreLink.create!(movie_id: 8, genre_id: 5)
# GenreLink.create!(movie_id: 8, genre_id: 2)
# GenreLink.create!(movie_id: 8, genre_id: 8)
# GenreLink.create!(movie_id: 9, genre_id: 9)
# GenreLink.create!(movie_id: 9, genre_id: 8)
# GenreLink.create!(movie_id: 9, genre_id: 3)
# GenreLink.create!(movie_id: 9, genre_id: 11)
# GenreLink.create!(movie_id: 10, genre_id: 8)
# GenreLink.create!(movie_id: 10, genre_id: 2)
# GenreLink.create!(movie_id: 10, genre_id: 4)
# GenreLink.create!(movie_id: 10, genre_id: 9)
# GenreLink.create!(movie_id: 10, genre_id: 6)
# GenreLink.create!(movie_id: 11, genre_id: 2)
# GenreLink.create!(movie_id: 11, genre_id: 1)
# GenreLink.create!(movie_id: 11, genre_id: 8)
# GenreLink.create!(movie_id: 12, genre_id: 2)
# GenreLink.create!(movie_id: 12, genre_id: 1)
# GenreLink.create!(movie_id: 12, genre_id: 8)
# GenreLink.create!(movie_id: 13, genre_id: 2)
# GenreLink.create!(movie_id: 13, genre_id: 8)
# GenreLink.create!(movie_id: 13, genre_id: 6)
# GenreLink.create!(movie_id: 14, genre_id: 2)
# GenreLink.create!(movie_id: 14, genre_id: 8)
# GenreLink.create!(movie_id: 14, genre_id: 6)
# GenreLink.create!(movie_id: 15, genre_id: 8)
# GenreLink.create!(movie_id: 15, genre_id: 5)
# GenreLink.create!(movie_id: 16, genre_id: 8)
# GenreLink.create!(movie_id: 16, genre_id: 4)
# GenreLink.create!(movie_id: 16, genre_id: 3)
# GenreLink.create!(movie_id: 16, genre_id: 1)
# GenreLink.create!(movie_id: 17, genre_id: 8)
# GenreLink.create!(movie_id: 17, genre_id: 5)
# GenreLink.create!(movie_id: 18, genre_id: 1)
# GenreLink.create!(movie_id: 18, genre_id: 8)
# GenreLink.create!(movie_id: 18, genre_id: 2)
# # GenreLink.create!(movie_id: , genre_id: )


# # GENRES = [
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






