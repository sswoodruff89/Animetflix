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

movie1 = Movie.create!(title: "The Boy and the Beast", 
  yr: 2015, 
  director: "Mamoru Hosoda", 
  rating: "PG-13", 
  runtime: 120,
  score: 3.9,
  description: "When Kyuta stumbles into a fantastic world of beasts, he's taken in by Kumatetsu, a gruff, rough-around-the-edges warrior beast who's been searching for the perfect apprentice.")
#1 
glinks(1, ["Fantasy", "Action", "Adventure"])

movie2 = Movie.create!(title: "Akira", 
  yr: 1988, 
  director: "Katsuhiro Otomo", 
  rating: "R", 
  runtime: 125,
  score: 4.1,
  description: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath who can only be stopped by two teenagers and a group of psychics.")
#2 
glinks(2, ["Thriller", "Action", "Sci-Fi"])

movie3 = Movie.create!(title: "Grave of the Fireflies", 
  yr: 1993, 
  director: "Isao Takahata", 
  rating: "PG-13", 
  runtime: 90, 
  score: 4.3,
  description: "A devastating meditation on the human cost of war, this animated tale follows Seita, a teenager charged with the care of his younger sister, Setsuko, after an American firebombing during World War II separates the two children from their parents.")
#3 Drama, War
glinks(3, ["Drama", "War"])

movie4 = Movie.create!(title: "Dragon Ball Super Broly", 
  yr: 2018, 
  director: "Tatsuya Nagamine", 
  rating: "PG", 
  runtime: 101, 
  score: 3.9,
  description: "One fateful day, a Saiyan appears before Goku and Vegeta who they have never seen before: Broly. With the return of Frieza from hell, a fierce battle awaits these three Saiyans who have followed completely different destinies.")
#4 Action, Fantasy, Sci-fi
glinks(4, ["Fantasy", "Action", "Sci-Fi"])

movie5 = Movie.create!(title: "Summer Wars", 
  yr: 2009, 
  director: "Mamoru Hosoda", 
  rating: "PG", 
  runtime: 101, 
  score: 3.8,
  description: "A student tries to fix a problem he accidentally caused in OZ, a digital world, while pretending to be the fiancé of his friend at her grandmother's 90th birthday.")
#5 Action, Adventure, Sci-Fi, Comedy
glinks(5, ["Adventure", "Action", "Sci-Fi", "Comedy"])

movie6 = Movie.create!(title: "The Wind Rises", 
  yr: 2013, 
  director: "Hayao Miyazaki", 
  rating: "PG-13", 
  runtime: 126, 
  score: 3.9,
  description: "A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi (Hideaki Anno), whose storied career includes the creation of the A6M World War II fighter plane.")
#6 Drama, War, Romance, Period
glinks(6, ["Drama", "War", "Romance", "Period"])

movie7 = Movie.create!(title: "Sword of the Stranger", 
  yr: 2007, 
  director: "Masahiro Andô", 
  rating: "NR", 
  runtime: 103, 
  score: 3.9,
  description: "A swordsman becomes caught up in a struggle between morality, righteousness and devotion after he agrees to take a raggedy boy and his dog to a Buddhist temple.")
#7 Period, Action, Historical, Adventure
glinks(7, ["Adventure", "Action", "Period"])

movie8 = Movie.create!(title: "Howl's Moving Castle", 
  yr: 2004, 
  director: "Hayao Miyazaki", 
  rating: "PG", 
  runtime: 119, 
  score: 4.1,
  description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.")
#8 Romance, Fantasy, Drama
glinks(8, ["Drama", "Fantasy", "Romance"])

movie9 = Movie.create!(title: "Ghost in the Shell", 
  yr: 1995, 
  director: "Mamoru Oshii", 
  rating: "R", 
  runtime: 95,
  score: 4.0,
  description: 'Cyborg federal agent Maj. Motoko Kusanagi trails "The Puppet Master" , who illegally hacks into the computerized minds of cyborg-human hybrids.')
#9 Action, Sci-Fi, Drama
glinks(9, ["Action", "Sci-Fi", "Drama"])

movie10 = Movie.create!(title: "Princess Mononoke", 
  yr: 1997, 
  director: "Hayao Miyazaki", 
  rating: "PG-13", 
  runtime: 134, 
  score: 4.2,
  description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between San and the forest gods and Tatara, a mining colony.")
#10 Drama, Fantasy, Action, Adventure
glinks(10, ["Adventure", "Action", "Drama", "Fantasy"])

movie11 = Movie.create!(title: "My Neighbor Totoro", 
  yr: 1988, 
  director: "Hayao Miyazaki", 
  rating: "G", 
  runtime: 100,
  score: 4.1,
  description: "Satsuke and her younger sister, Mei, settle into an old country house with their father and wait for their mother to recover from an illness in an area hospital. As the sisters explore their new home, they encounter and befriend playful spirits in their house and the nearby forest, most notably the massive cuddly creature known as Totoro.")
#11 Drama, Fantasy, Family
glinks(11, ["Drama", "Fantasy", "Family", "Comedy"])

movie12 = Movie.create!(title: "Spirited Away", 
  yr: 2001, 
  director: "Hayao Miyazaki", 
  rating: "PG", 
  runtime: 125, 
  score: 4.3,
  description: "10-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku, who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.")
#12 Fantasy, Family, Drama
glinks(12, ["Drama", "Fantasy", "Family"])

movie13 = Movie.create!(title: "The Tale of Princess Kaguya", 
  yr: 2013, 
  director: "Isao Takahata", 
  rating: "PG", 
  runtime: 137, 
  score: 4.0,
  description: "A tiny nymph found inside a bamboo stalk grows into a beautiful and desirable young woman, who orders her suitors to prove their love by completing a series of near-impossible tasks.")
#13 Drama, Fantasy, Period
glinks(13, ["Drama", "Fantasy", "Period"])

movie14 = Movie.create!(title: "Porco Ross", 
  yr: 1992, 
  director: "Hayao Miyazaki", 
  rating: "PG", 
  runtime: 102, 
  score: 3.8,
  description: "In Italy in the 1930s, sky pirates in biplanes terrorize wealthy cruise ships as they sail the Adriatic Sea. The only pilot brave enough to stop the scourge is the mysterious Porco Rosso, a former World War I flying ace who was somehow turned into a pig during the war.")
#14 Drama, Fantasy, Period
glinks(14, ["Drama", "Fantasy", "Period", "Action"])

movie15 = Movie.create!(title: "Whisper of the Heart", 
  yr: 1995, 
  director: "Yoshifumi Kondō", 
  rating: "PG", 
  runtime: 111, 
  score: 4.0,
  description: "Based on the manga with the same title, this animated film follows Shizuku, an inquisitive young girl and a voracious reader, who longs to be a writer when she grows up. One day she notices that all of her library books have previously been taken out by one Seiji Amasawa. Amid chasing after a large cat, befriending an eccentric antiques dealer and writing her first novel, Shizuku aims to find this mysterious boy who may well be her soul mate.")
#15 Drama, Romance
glinks(15, ["Drama", "Romance"])

movie16 = Movie.create!(title: "The Girl Who Leapt Through Time", 
  yr: 2008, 
  director: "Mamoru Hosoda", 
  rating: "NR", 
  runtime: 98, 
  score: 3.9,
  description: "When a young high school girl discovers that she has the unique ability to traverse space and time, her efforts to use the power as a means of preserving the relationships she shares with her closest friends reveals the perpetually shifting nature of personal relationships.")
#16 Drama, Adventure, Family, Sci-Fi
glinks(16, ["Drama", "Adventure", "Family", "Sci-Fi"])

movie17 = Movie.create!(title: "A Silent Voice", 
  yr: 2016, 
  director: "Naoko Yamada",
  rating: "NR", 
  runtime: 130, 
  score: 4.1,
  description: "When a grade school student with impaired hearing is bullied mercilessly, she transfers to another school. Years later, one of her former tormentors sets out to make amends.")
#17 Drama, Romance 
glinks(17, ["Drama", "Romance"])

movie18 = Movie.create!(title: "Kiki’s Delivery Service", 
  yr: 1989, 
  director: "Hayao Miyazaki", 
  rating: "G", 
  runtime: 103, 
  score: 3.9,
  description: "13-year-old witch Kiki moves to a seaside town with her talking cat, Jiji, where she sets up a flying courier service.")
#18 Drama, Family, Fantasy
glinks(18, ["Drama", "Fantasy", "Family"])

movie19 = Movie.create!(title: "Samurai X: The Movie", 
  yr: 1997, 
  director: "Hatsuki Tsuji", 
  rating: "NR", 
  runtime: 90, 
  score: 3.7,
  description: "Himura Kenshin, the wandering samurai, was once known as Battousai, the \"Man Slayer,\" and used his unsurpassed prowess as a fighter to fight in the Japanese civil war and bring about the beginning of the Meiji period. That time is over now, however, and Kenshin has vowed to never kill again, and spend the rest of his life in atonement for all the lives that ended under his blade.")
#19 Drama, Action, Period
glinks(19, ["Drama", "Action", "Period"])

movie20 = Movie.create!(title: "My Hero Academia: Two Heroes", 
  yr: 2018, 
  director: "Kenji Nagasaki", 
  rating: "PG-13", 
  runtime: 95, 
  score: 3.5,
  description: "Deku and All Might receive an invitation to I-Expo, The World's Leading Exhibition of Quirk Abilities and Hero Item Innovations. Suddenly, I-Expo's Top-Of-The-Line Security System gets hacked by villains and a sinister plan is set in motion.")
#20 Action, Adventure, Fantasy, Sci-Fi
glinks(20, ["Fantasy", "Adventure", "Action", "Family", "Sci-Fi"])

movie21 = Movie.create!(title: "Patema Inverted", 
  yr: 2013, 
  director: "Yasuhiro Yoshiura", 
  rating: "NR", 
  runtime: 99, 
  score: 3.7,
  description: "A young girl, from a civilization that resides in deep underground tunnels, finds herself trapped in an inverted world and teams up with a resident to escape and return home.")
#21 Fantasy, Sci-Fi, Adventure
glinks(21, ["Fantasy", "Adventure", "Sci-Fi"])

movie22 = Movie.create!(title: "Mary and the Witch's Flower", 
  yr: 2017, 
  director: "Hiromasa Yonebayashi", 
  rating: "PG", 
  runtime: 103, 
  score: 3.4,
  description: "Young Mary discovers an old broomstick and the strange Fly-by-Night flower, a rare plant that blossoms once every seven years. Together, the flower and the broomstick whisk Mary above the clouds, and far away to a school of magic run by headmistress Madam Mumblechook and the brilliant Doctor Dee.")
#22 Fantasy, Adventure, Family
glinks(22, ["Fantasy", "Adventure", "Family"])

movie23 = Movie.create!(title: "Dragon Ball Z: Battle of Gods", 
  yr: 2013, 
  director: "Masahiro Hosoda", 
  rating: "PG", 
  runtime: 105, 
  score: 3.6,
  description: "The Z-Fighters must contend with Beerus, the God of Destruction. But it takes a god to fight a god, and none of them are gods... not even the Saiyans.")
#Action, Fantasy, Sci-fi
glinks(23, ["Fantasy", "Action", "Sci-Fi"])

movie24 = Movie.create!(title: "Millennium Actress", 
  yr: 2001, 
  director: "Satoshi Kon", 
  rating: "PG", 
  runtime: 87, 
  score: 3.9,
  description: "Filmmaker Genya Tachibana begins work on a documentary about famed Japanese actress Chiyoko Fujiwara. As the decades pass, Chiyoko is transformed from a teen with big dreams into a full-blown celebrity, while her cinematic characters span various eras, from ancient Japan to the distant future.")
glinks(24, ["Period", "Drama", "Fantasy"])

movie25 = Movie.create!(title: "One Piece Film: Z", 
  yr: 2012, 
  director: "Tatsuya Nagamine", 
  rating: "NR", 
  runtime: 108, 
  score: 3.9,
  description: "When the Dyna Stones are stolen by the diabolical former marine admiral Zephyr, now known as `Z', it's up to the Straw Hat Pirates to save the new world.")
glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])

movie26 = Movie.create!(title: "Pokémon: The First Movie", 
  yr: 1998, 
  director: "Kunihiko Yuyama", 
  rating: "G", 
  runtime: 96, 
  score: 3.1,
  description: "Ash Ketchum and his friends Misty, Brock, and Pikachu, discover Mewtwo, a super-powered Pokemon created through biological engineering.")
glinks(26, ["Fantasy", "Family", "Sci-Fi", "Action", "Adventure"])

movie27 = Movie.create!(title: "Perfect Blue", 
  yr: 1997, 
  director: "Satoshi Kon", 
  rating: "R", 
  runtime: 90, 
  score: 4.0,
  description: "A retired pop singer turned actress' sense of reality is shaken when she is stalked by an obsessed fan and seemingly a ghost of her past.")
glinks(27, ["Thriller", "Horror", "Drama"])

movie28 = Movie.create!(title: "Dragon Ball: The Path to Power", 
  yr: 1996, 
  director: "Yamauchi Shigeyasu", 
  rating: "NR", 
  runtime: 80, 
  score: 3.7,
  description: "Goku and Bulma go on an adventure to seek out the mystical Dragon Balls.")
glinks(28, ["Fantasy", "Action", "Adventure", "Comedy"])

movie29 = Movie.create!(title: "Mirai", 
  yr: 2018, 
  director: "Mamoru Hosoda", 
  rating: "PG", 
  runtime: 100, 
  score: 3.5,
  description: "A young boy named Kun feels forgotten by his family when his little sister Mirai arrives. Running away from home, Kun stumbles upon a magical garden that serves as a time-travelling gateway where he encounters his mother as a little girl and has a series of adventures with his baby sister all grown up.")
glinks(29, ["Fantasy", "Drama", "Adventure"])

movie30 = Movie.create!(title: "One Piece Film: Strong World", 
  yr: 2009, 
  director: "Munehisa Sakai", 
  rating: "NR", 
  runtime: 113, 
  score: 3.8,
  description: "Straw Hat Pirates must save their navigator and stop the legendary Pirate, Shiki the Golden Lion from conquering East Blue.")
glinks(30, ["Fantasy", "Action", "Adventure", "Comedy"])

movie31 = Movie.create!(title: "One Piece Film: Gold", 
  yr: 2017, 
  director: "Hiroaki Miyamoto", 
  rating: "NR", 
  runtime: 120, 
  score: 3.6,
  description: "The Straw Hat Pirates come to Gran Tesoro, the richest ship in the world.")
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






