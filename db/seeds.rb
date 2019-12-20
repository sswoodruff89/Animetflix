# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# User.destroy_all
# Movie.destroy_all
# Genre.destroy_all
# GenreLink.destroy_all
# Watchlist.destroy_all

# ApplicationRecord.connection.reset_pk_sequence!("users")
# ApplicationRecord.connection.reset_pk_sequence!("movies")
# ApplicationRecord.connection.reset_pk_sequence!("genres")
# ApplicationRecord.connection.reset_pk_sequence!("genre_links")
# ApplicationRecord.connection.reset_pk_sequence!("watchlists")

# User.create!(email: "demo@demo.com", password: "anything")
# User.create!(email: "otaku@demo.com", password: "anything")


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


movie1 = Movie.find(1);
# movie1 = Movie.create!(title: "The Boy and the Beast", 
#   yr: 2015, 
#   director: "Mamoru Hosoda", 
#   rating: "PG-13", 
#   runtime: 120,
#   score: 3.9,
#   description: "When Kyuta stumbles into a fantastic world of beasts, he's taken in by Kumatetsu, a gruff, rough-around-the-edges warrior beast who's been searching for the perfect apprentice.")
# #1 
# glinks(1, ["Fantasy", "Action", "Adventure"])
movie1.logo.attach(io: File.open('app/assets/images/movie_photos/boy-and-the-beast-bakemono-nlogo.png'), filename: 'boy-and-the-beast-bakemono-nlogo.png')
movie1.thumbnail.attach(io: File.open('app/assets/images/movie_photos/boy_and_beast_thumb.png'), filename: 'boy_and_beast_thumb.png')
movie1.background.attach(io: File.open('app/assets/images/movie_photos/boy_and_beast_back.jpg'), filename: 'boy_and_beast_back.jpg')

# movie2 = Movie.create!(title: "Akira", 
#   yr: 1988, 
#   director: "Katsuhiro Otomo", 
#   rating: "R", 
#   runtime: 125,
#   score: 4.1,
#   description: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath who can only be stopped by two teenagers and a group of psychics.")
# #2 
# glinks(2, ["Thriller", "Action", "Sci-Fi"])
movie2 = Movie.find(2);

movie2.logo.attach(io: File.open('app/assets/images/movie_photos/akira_logo.png'), filename: 'akira_logo.png')
movie2.thumbnail.attach(io: File.open('app/assets/images/movie_photos/akira_thumb.png'), filename: 'akira_thumb.png')
movie2.background.attach(io: File.open('app/assets/images/movie_photos/akira_back.jpg'), filename: 'akira_back.jpg')

movie2.clip.attach(io: File.open('app/assets/images/video/akira_clip.mp4'), filename: 'akira_clip.mp4')


#########################################
# movie3 = Movie.create!(title: "Grave of the Fireflies", 
#   yr: 1993, 
#   director: "Isao Takahata", 
#   rating: "PG-13", 
#   runtime: 90, 
#   score: 4.3,
#   description: "A devastating meditation on the human cost of war, this animated tale follows Seita, a teenager charged with the care of his younger sister, Setsuko, after an American firebombing during World War II separates the two children from their parents.")
# #3 Drama, War
# glinks(3, ["Drama", "War"])
movie3 = Movie.find(3);

####
movie3.logo.attach(io: File.open('app/assets/images/movie_photos/grave_flies_logo.png'), filename: 'grave_flies_logo.png')
movie3.thumbnail.attach(io: File.open('app/assets/images/movie_photos/grave_thumg.jpg'), filename: 'grave_thumg.jpg')
movie3.background.attach(io: File.open('app/assets/images/movie_photos/grave_flies_back.jpg'), filename: 'grave_flies_back.jpg')


# movie4 = Movie.create!(title: "Dragon Ball Super Broly", 
#   yr: 2018, 
#   director: "Tatsuya Nagamine", 
#   rating: "PG", 
#   runtime: 101, 
#   score: 3.9,
#   description: "One fateful day, a Saiyan appears before Goku and Vegeta who they have never seen before: Broly. With the return of Frieza from hell, a fierce battle awaits these three Saiyans who have followed completely different destinies.")
# #4 Action, Fantasy, Sci-fi
# glinks(4, ["Fantasy", "Action", "Sci-Fi"])
movie4 = Movie.find(4);

movie4.logo.attach(io: File.open('app/assets/images/movie_photos/dragonball_super_broly_logo.png'), filename: 'dragonball_super_broly_logo.png')
movie4.thumbnail.attach(io: File.open('app/assets/images/movie_photos/d5.jpg'), filename: 'd5.jpg')
movie4.background.attach(io: File.open('app/assets/images/movie_photos/dbs_broly_back.png'), filename: 'dbs_broly_back.png')

movie4.clip.attach(io: File.open('app/assets/images/video/dbz_broly.mp4'), filename: 'dbz_broly.mp4')

# movie5 = Movie.create!(title: "Summer Wars", 
#   yr: 2009, 
#   director: "Mamoru Hosoda", 
#   rating: "PG", 
#   runtime: 101, 
#   score: 3.8,
#   description: "A student tries to fix a problem he accidentally caused in OZ, a digital world, while pretending to be the fiancé of his friend at her grandmother's 90th birthday.")
# #5 Action, Adventure, Sci-Fi, Comedy
# glinks(5, ["Adventure", "Action", "Sci-Fi", "Comedy"])

movie5 = Movie.find(5);


movie5.logo.attach(io: File.open('app/assets/images/movie_photos/summer_wars_logo.png'), filename: 'summer_wars_logo.png')
movie5.thumbnail.attach(io: File.open('app/assets/images/movie_photos/summer_wars_thumb.png'), filename: 'summer_wars_thumb.png')
movie5.background.attach(io: File.open('app/assets/images/movie_photos/summer_wars_back.jpg'), filename: 'summer_wars_back.jpg')
movie5.clip.attach(io: File.open('app/assets/images/video/dbz_broly.mp4'), filename: 'dbz_broly.mp4')

# movie6 = Movie.create!(title: "The Wind Rises", 
#   yr: 2013, 
#   director: "Hayao Miyazaki", 
#   rating: "PG-13", 
#   runtime: 126, 
#   score: 3.9,
#   description: "A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi (Hideaki Anno), whose storied career includes the creation of the A6M World War II fighter plane.")
# #6 Drama, War, Romance, Period
# glinks(6, ["Drama", "War", "Romance", "Period"])

movie6 = Movie.find(6);

movie6.logo.attach(io: File.open('app/assets/images/movie_photos/the-wind-rises-logo.png'), filename: 'the-wind-rises-logo.png')
movie6.thumbnail.attach(io: File.open('app/assets/images/movie_photos/the_wind_rises_thumb.png'), filename: 'the_wind_rises_thumb.png')
movie6.background.attach(io: File.open('app/assets/images/movie_photos/thewindrises.jpg'), filename: 'thewindrises.jpg')

movie6.clip.attach(io: File.open('app/assets/images/video/wind_rise_clip.mp4'), filename: 'wind_rise_clip.mp4')


#####
# movie7 = Movie.create!(title: "Sword of the Stranger", 
#   yr: 2007, 
#   director: "Masahiro Andô", 
#   rating: "NR", 
#   runtime: 103, 
#   score: 3.9,
#   description: "A swordsman becomes caught up in a struggle between morality, righteousness and devotion after he agrees to take a raggedy boy and his dog to a Buddhist temple.")
# #7 Period, Action, Historical, Adventure
# glinks(7, ["Adventure", "Action", "Period"])

movie7 = Movie.find(7);

movie7.logo.attach(io: File.open('app/assets/images/movie_photos/sword_stranger_logo.png'), filename: 'sword_stranger_logo.png')
movie7.thumbnail.attach(io: File.open('app/assets/images/movie_photos/sword_stranger_thumb.jpg'), filename: 'sword_stranger_thumb.jpg')
movie7.background.attach(io: File.open('app/assets/images/movie_photos/sword_stranger_back.jpg'), filename: 'sword_stranger_back.jpg')
#######

# movie8 = Movie.create!(title: "Howl's Moving Castle", 
#   yr: 2004, 
#   director: "Hayao Miyazaki", 
#   rating: "PG", 
#   runtime: 119, 
#   score: 4.1,
#   description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.")
# #8 Romance, Fantasy, Drama
# glinks(8, ["Drama", "Fantasy", "Romance"])

movie8 = Movie.find(8);

movie8.logo.attach(io: File.open('app/assets/images/movie_photos/howls-moving-castle-logo.png'), filename: 'howls-moving-castle-logo.png')
movie8.thumbnail.attach(io: File.open('app/assets/images/movie_photos/howl_thumb.png'), filename: 'howl_thumb.png')
movie8.background.attach(io: File.open('app/assets/images/movie_photos/howl_back.jpg'), filename: 'howl_back.jpg')

movie8.clip.attach(io: File.open('app/assets/images/video/howl_clip.mp4'), filename: 'howl_clip.mp4')

# movie9 = Movie.create!(title: "Ghost in the Shell", 
#   yr: 1995, 
#   director: "Mamoru Oshii", 
#   rating: "R", 
#   runtime: 95,
#   score: 4.0,
#   description: 'Cyborg federal agent Maj. Motoko Kusanagi trails "The Puppet Master" , who illegally hacks into the computerized minds of cyborg-human hybrids.')
# #9 Action, Sci-Fi, Drama
# glinks(9, ["Action", "Sci-Fi", "Drama"])

movie9 = Movie.find(9);

movie9.logo.attach(io: File.open('app/assets/images/movie_photos/ghost-in-the-shell-logo.png'), filename: 'ghost-in-the-shell-logo.png')
movie9.thumbnail.attach(io: File.open('app/assets/images/movie_photos/ghostintheshell_thumb.png'), filename: 'ghostintheshell_thumb.png')
movie9.background.attach(io: File.open('app/assets/images/movie_photos/ghostintheshell_back.jpg'), filename: 'ghostintheshell_back.jpg')



# movie10 = Movie.create!(title: "Princess Mononoke", 
#   yr: 1997, 
#   director: "Hayao Miyazaki", 
#   rating: "PG-13", 
#   runtime: 134, 
#   score: 4.2,
#   description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between San and the forest gods and Tatara, a mining colony.")
# #10 Drama, Fantasy, Action, Adventure
# glinks(10, ["Adventure", "Action", "Drama", "Fantasy"])

movie10 = Movie.find(10);

movie10.logo.attach(io: File.open('app/assets/images/movie_photos/princess-mononoke-logo-png.png'), filename: 'princess-mononoke-logo-png.png')
movie10.thumbnail.attach(io: File.open('app/assets/images/movie_photos/princess_monoke_thumb.png'), filename: 'princess_monoke_thumb.png')
movie10.background.attach(io: File.open('app/assets/images/movie_photos/princess_monoke_back.jpg'), filename: 'princess_monoke_back.jpg')

movie10.clip.attach(io: File.open('app/assets/images/video/princess_monoke_clip.mp4'), filename: 'princess_monoke_clip.mp4')


# movie11 = Movie.create!(title: "My Neighbor Totoro", 
#   yr: 1988, 
#   director: "Hayao Miyazaki", 
#   rating: "G", 
#   runtime: 100,
#   score: 4.1,
#   description: "Satsuke and her younger sister, Mei, settle into an old country house with their father and wait for their mother to recover from an illness in an area hospital. As the sisters explore their new home, they encounter and befriend playful spirits in their house and the nearby forest, most notably the massive cuddly creature known as Totoro.")
# #11 Drama, Fantasy, Family
# glinks(11, ["Drama", "Fantasy", "Family", "Comedy"])

movie11 = Movie.find(11);

movie11.logo.attach(io: File.open('app/assets/images/movie_photos/totoro_logo.png'), filename: 'totoro_logo.png')
movie11.thumbnail.attach(io: File.open('app/assets/images/movie_photos/totoro_thumb.png'), filename: 'totoro_thumb.png')
movie11.background.attach(io: File.open('app/assets/images/movie_photos/totoro_back.jpg'), filename: 'totoro_back.jpg')

movie11.clip.attach(io: File.open('app/assets/images/video/totoro.mp4'), filename: 'totoro.mp4')



# movie12 = Movie.create!(title: "Spirited Away", 
#   yr: 2001, 
#   director: "Hayao Miyazaki", 
#   rating: "PG", 
#   runtime: 125, 
#   score: 4.3,
#   description: "10-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku, who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.")
# #12 Fantasy, Family, Drama
# glinks(12, ["Drama", "Fantasy", "Family"])

movie12 = Movie.find(12);

movie12.logo.attach(io: File.open('app/assets/images/movie_photos/spirited_away_logo.png'), filename: 'spirited_away_logo.png')
movie12.thumbnail.attach(io: File.open('app/assets/images/movie_photos/spiritedaway_thumb.png'), filename: 'spiritedaway_thumb.png')
movie12.background.attach(io: File.open('app/assets/images/movie_photos/spiritedaway_back.jpg'), filename: 'spiritedaway_back.jpg')




# movie13 = Movie.create!(title: "The Tale of Princess Kaguya", 
#   yr: 2013, 
#   director: "Isao Takahata", 
#   rating: "PG", 
#   runtime: 137, 
#   score: 4.0,
#   description: "A tiny nymph found inside a bamboo stalk grows into a beautiful and desirable young woman, who orders her suitors to prove their love by completing a series of near-impossible tasks.")
# #13 Drama, Fantasy, Period
# glinks(13, ["Drama", "Fantasy", "Period"])

movie13 = Movie.find(13);

movie13.logo.attach(io: File.open('app/assets/images/movie_photos/kaguya_logo.png'), filename: 'kaguya_logo.png')
movie13.thumbnail.attach(io: File.open('app/assets/images/movie_photos/kaguya_thumb.jpg'), filename: 'kaguya_thumb.jpg')
movie13.background.attach(io: File.open('app/assets/images/movie_photos/kaguya_back.jpg'), filename: 'kaguya_back.jpg')


# movie14 = Movie.create!(title: "Porco Ross", 
#   yr: 1992, 
#   director: "Hayao Miyazaki", 
#   rating: "PG", 
#   runtime: 102, 
#   score: 3.8,
#   description: "In Italy in the 1930s, sky pirates in biplanes terrorize wealthy cruise ships as they sail the Adriatic Sea. The only pilot brave enough to stop the scourge is the mysterious Porco Rosso, a former World War I flying ace who was somehow turned into a pig during the war.")
# #14 Drama, Fantasy, Period
# glinks(14, ["Drama", "Fantasy", "Period", "Action"])

movie14 = Movie.find(14);

movie14.logo.attach(io: File.open('app/assets/images/movie_photos/PorcoRosso_logo.png'), filename: 'PorcoRosso_logo.png')
movie14.thumbnail.attach(io: File.open('app/assets/images/movie_photos/porcorosso_thumb.png'), filename: 'porcorosso_thumb.png')
movie14.background.attach(io: File.open('app/assets/images/movie_photos/porcorosso_back.png'), filename: 'kaguya_back.jpg')


# movie15 = Movie.create!(title: "Whisper of the Heart", 
#   yr: 1995, 
#   director: "Yoshifumi Kondō", 
#   rating: "PG", 
#   runtime: 111, 
#   score: 4.0,
#   description: "Shizuku, an inquisitive young girl and a voracious reader, longs to be a writer when she grows up. One day she notices that all of her library books have previously been taken out by one Seiji Amasawa. Amid chasing after a large cat, befriending an eccentric antiques dealer and writing her first novel, Shizuku aims to find this mysterious boy who may well be her soul mate.")
# #15 Drama, Romance
# glinks(15, ["Drama", "Romance"])

movie15 = Movie.find(15);

movie15.logo.attach(io: File.open('app/assets/images/movie_photos/whisper-of-the-heart-logo.png'), filename: 'whisper-of-the-heart-logo.png')
movie15.thumbnail.attach(io: File.open('app/assets/images/movie_photos/whisper_of_heart_thumb.jpg'), filename: 'whisper_of_heart_thumb.jpg')
movie15.background.attach(io: File.open('app/assets/images/movie_photos/whisper_of_heart_back.jpg'), filename: '/whisper_of_heart_back.jpg')


# movie16 = Movie.create!(title: "The Girl Who Leapt Through Time", 
#   yr: 2008, 
#   director: "Mamoru Hosoda", 
#   rating: "NR", 
#   runtime: 98, 
#   score: 3.9,
#   description: "When a young high school girl discovers that she has the unique ability to traverse space and time, her efforts to use the power as a means of preserving the relationships she shares with her closest friends reveals the perpetually shifting nature of personal relationships.")
# #16 Drama, Adventure, Family, Sci-Fi
# glinks(16, ["Drama", "Adventure", "Family", "Sci-Fi"])

movie16 = Movie.find(16);

movie16.logo.attach(io: File.open('app/assets/images/movie_photos/the-girl-who-leapt-through-time-54be509e77dd8.png'), filename: 'the-girl-who-leapt-through-time-54be509e77dd8.png')
movie16.thumbnail.attach(io: File.open('app/assets/images/movie_photos/the-girl-who-leapt-through-time_thumb.png'), filename: 'the-girl-who-leapt-through-time_thumb.png')
movie16.background.attach(io: File.open('app/assets/images/movie_photos/the-girl-who-leapt-through-time.jpg'), filename: 'the-girl-who-leapt-through-time.jpg')


# movie17 = Movie.create!(title: "A Silent Voice", 
#   yr: 2016, 
#   director: "Naoko Yamada",
#   rating: "NR", 
#   runtime: 130, 
#   score: 4.1,
#   description: "When a grade school student with impaired hearing is bullied mercilessly, she transfers to another school. Years later, one of her former tormentors sets out to make amends.")
# #17 Drama, Romance 
# glinks(17, ["Drama", "Romance"])

movie17 = Movie.find(17);

movie17.logo.attach(io: File.open('app/assets/images/movie_photos/a_silent_voice_logo.png'), filename: 'a_silent_voice_logo.png')
movie17.thumbnail.attach(io: File.open('app/assets/images/movie_photos/a_silent_voice_back.png'), filename: 'a_silent_voice_back.png')
### movie17.background.attach(io: File.open('app/assets/images/movie_photos/a_silent_voice_back.png'), filename: 'a_silent_voice_back.png')


# movie18 = Movie.create!(title: "Kiki’s Delivery Service", 
#   yr: 1989, 
#   director: "Hayao Miyazaki", 
#   rating: "G", 
#   runtime: 103, 
#   score: 3.9,
#   description: "13-year-old witch Kiki moves to a seaside town with her talking cat, Jiji, where she sets up a flying courier service.")
# #18 Drama, Family, Fantasy
# glinks(18, ["Drama", "Fantasy", "Family"])

movie18 = Movie.find(18);

movie18.logo.attach(io: File.open('app/assets/images/movie_photos/kiki_logo.png'), filename: 'kiki_logo.png')
movie18.thumbnail.attach(io: File.open('app/assets/images/movie_photos/kiki_thumb.png'), filename: 'kiki_thumb.png')
movie18.background.attach(io: File.open('app/assets/images/movie_photos/kiki_back.jpg'), filename: 'kiki_back.jpg')

movie18.clip.attach(io: File.open('app/assets/images/video/kiki_clip.mp4'), filename: 'kiki_clip.mp4')


# movie19 = Movie.create!(title: "Samurai X: The Movie", 
#   yr: 1997, 
#   director: "Hatsuki Tsuji", 
#   rating: "NR", 
#   runtime: 90, 
#   score: 3.7,
#   description: "Himura Kenshin, the wandering samurai, was once known as Battousai, the \"Man Slayer,\" and used his unsurpassed prowess as a fighter to fight in the Japanese civil war and bring about the beginning of the Meiji period. That time is over now, however, and Kenshin has vowed to never kill again, and spend the rest of his life in atonement for all the lives that ended under his blade.")
# #19 Drama, Action, Period
# glinks(19, ["Drama", "Action", "Period"])

movie19 = Movie.find(19);

movie19.logo.attach(io: File.open('app/assets/images/movie_photos/samuraix_logo.png'), filename: 'samuraix_logo.png')
movie19.thumbnail.attach(io: File.open('app/assets/images/movie_photos/samuraix_thumb.png'), filename: 'samuraix_thumb.png')
movie19.background.attach(io: File.open('app/assets/images/movie_photos/samuraix_back.jpg'), filename: 'samuraix_back.jpg')




# movie20 = Movie.create!(title: "My Hero Academia: Two Heroes", 
#   yr: 2018, 
#   director: "Kenji Nagasaki", 
#   rating: "PG-13", 
#   runtime: 95, 
#   score: 3.5,
#   description: "Deku and All Might receive an invitation to I-Expo, The World's Leading Exhibition of Quirk Abilities and Hero Item Innovations. Suddenly, I-Expo's Top-Of-The-Line Security System gets hacked by villains and a sinister plan is set in motion.")
# #20 Action, Adventure, Fantasy, Sci-Fi
# glinks(20, ["Fantasy", "Adventure", "Action", "Family", "Sci-Fi"])

movie20 = Movie.find(20);

movie20.logo.attach(io: File.open('app/assets/images/movie_photos/my_hero_logo.png'), filename: 'my_hero_logo.png')
movie20.thumbnail.attach(io: File.open('app/assets/images/movie_photos/my_hero_thumb.jpg'), filename: 'my_hero_thumb.jpg')
movie20.background.attach(io: File.open('app/assets/images/movie_photos/my_hero_back.jpg'), filename: 'my_hero_back.jpg')


# movie21 = Movie.create!(title: "Patema Inverted", 
#   yr: 2013, 
#   director: "Yasuhiro Yoshiura", 
#   rating: "NR", 
#   runtime: 99, 
#   score: 3.7,
#   description: "A young girl, from a civilization that resides in deep underground tunnels, finds herself trapped in an inverted world and teams up with a resident to escape and return home.")
# #21 Fantasy, Sci-Fi, Adventure
# glinks(21, ["Fantasy", "Adventure", "Sci-Fi"])

movie21 = Movie.find(21);

movie21.logo.attach(io: File.open('app/assets/images/movie_photos/patema-inverted-logo.png'), filename: 'patema-inverted-logo.png')
movie21.thumbnail.attach(io: File.open('app/assets/images/movie_photos/patemainverted_thumb.jpg'), filename: 'patemainverted_thumb.jpg')
movie21.background.attach(io: File.open('app/assets/images/movie_photos/patema_inverted_back.jpg'), filename: 'patema_inverted_back.jpg')

movie21.clip.attach(io: File.open('app/assets/images/video/patema_clip.mp4'), filename: 'patema_clip.mp4')


# movie22 = Movie.create!(title: "Mary and the Witch's Flower", 
#   yr: 2017, 
#   director: "Hiromasa Yonebayashi", 
#   rating: "PG", 
#   runtime: 103, 
#   score: 3.4,
#   description: "Young Mary discovers an old broomstick and the strange Fly-by-Night flower, a rare plant that blossoms once every seven years. Together, the flower and the broomstick whisk Mary above the clouds, and far away to a school of magic run by headmistress Madam Mumblechook and the brilliant Doctor Dee.")
# #22 Fantasy, Adventure, Family
# glinks(22, ["Fantasy", "Adventure", "Family"])

movie22 = Movie.find(22);

movie22.logo.attach(io: File.open('app/assets/images/movie_photos/mary-and-the-witchs-flower-logo.png'), filename: 'mary-and-the-witchs-flower-logo.png')
movie22.thumbnail.attach(io: File.open('app/assets/images/movie_photos/mary_and_flower_thumb.png'), filename: 'mary_and_flower_thumb.png')
movie22.background.attach(io: File.open('app/assets/images/movie_photos/Mary2.jpg'), filename: 'Mary2.jpg')

movie22.clip.attach(io: File.open('app/assets/images/video/mary_witch.mp4'), filename: 'mary_witch.mp4')


# movie23 = Movie.create!(title: "Dragon Ball Z: Battle of Gods", 
#   yr: 2013, 
#   director: "Masahiro Hosoda", 
#   rating: "PG", 
#   runtime: 105, 
#   score: 3.6,
#   description: "The Z-Fighters must contend with Beerus, the God of Destruction. But it takes a god to fight a god, and none of them are gods... not even the Saiyans.")
# #Action, Fantasy, Sci-fi
# glinks(23, ["Fantasy", "Action", "Sci-Fi"])

movie23 = Movie.find(23);

movie23.logo.attach(io: File.open('app/assets/images/movie_photos/dbz_bog_logo.png'), filename: 'dbz_bog_logo.png')
movie23.thumbnail.attach(io: File.open('app/assets/images/movie_photos/dbz_bog_thumb.jpg'), filename: 'dbz_bog_thumb.jpg')
movie23.background.attach(io: File.open('app/assets/images/movie_photos/dbz_bog_back.jpg'), filename: 'dbz_bog_back.jpg')

movie23.clip.attach(io: File.open('app/assets/images/video/dbz_bog_clip.mp4'), filename: 'dbz_bog_clip.mp4')



# movie24 = Movie.create!(title: "Millennium Actress", 
#   yr: 2001, 
#   director: "Satoshi Kon", 
#   rating: "PG", 
#   runtime: 87, 
#   score: 3.9,
#   description: "Filmmaker Genya Tachibana begins work on a documentary about famed Japanese actress Chiyoko Fujiwara. As the decades pass, Chiyoko is transformed from a teen with big dreams into a full-blown celebrity, while her cinematic characters span various eras, from ancient Japan to the distant future.")
# glinks(24, ["Period", "Drama", "Fantasy"])

movie24 = Movie.find(24);

movie24.logo.attach(io: File.open('app/assets/images/movie_photos/millennium-actress-logo.png'), filename: 'millennium-actress-logo.png')
movie24.thumbnail.attach(io: File.open('app/assets/images/movie_photos/millennium-actress_thumb.png'), filename: 'millennium-actress_thumb.png')
movie24.background.attach(io: File.open('app/assets/images/movie_photos/millennium-actress2.jpg'), filename: 'millennium-actress2.jpg')



# movie25 = Movie.create!(title: "One Piece Film: Z", 
#   yr: 2012, 
#   director: "Tatsuya Nagamine", 
#   rating: "NR", 
#   runtime: 108, 
#   score: 3.9,
#   description: "When the Dyna Stones are stolen by the diabolical former marine admiral Zephyr, now known as `Z', it's up to the Straw Hat Pirates to save the new world.")
# glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])

movie25 = Movie.find(25);

movie25.logo.attach(io: File.open('app/assets/images/movie_photos/one_piece_z_logo.png'), filename: 'one_piece_z_logo.png')
movie25.thumbnail.attach(io: File.open('app/assets/images/movie_photos/one_piece_z_thumb.png'), filename: 'one_piece_z_thumb.png')
movie25.background.attach(io: File.open('app/assets/images/movie_photos/one_piece_z_back.png'), filename: 'one_piece_z_back.png')

movie25.clip.attach(io: File.open('app/assets/images/video/one_piece_z.mp4'), filename: 'one_piece_z.mp4')


# movie26 = Movie.create!(title: "Pokémon: The First Movie", 
#   yr: 1998, 
#   director: "Kunihiko Yuyama", 
#   rating: "G", 
#   runtime: 96, 
#   score: 3.1,
#   description: "Ash Ketchum and his friends Misty, Brock, and Pikachu, discover Mewtwo, a super-powered Pokemon created through biological engineering.")
# glinks(26, ["Fantasy", "Family", "Sci-Fi", "Action", "Adventure"])

movie26 = Movie.find(26);

movie26.logo.attach(io: File.open('app/assets/images/movie_photos/pokemon_logo.png'), filename: 'pokemon_logo.png')
movie26.thumbnail.attach(io: File.open('app/assets/images/movie_photos/pokemon_thumb.jpg'), filename: 'pokemon_thumb.jpg')
movie26.background.attach(io: File.open('app/assets/images/movie_photos/pokemon_back.jpg'), filename: 'pokemon_back.jpg')



# movie27 = Movie.create!(title: "Perfect Blue", 
#   yr: 1997, 
#   director: "Satoshi Kon", 
#   rating: "R", 
#   runtime: 90, 
#   score: 4.0,
#   description: "A retired pop singer turned actress' sense of reality is shaken when she is stalked by an obsessed fan and seemingly a ghost of her past.")
# glinks(27, ["Thriller", "Horror", "Drama"])

movie27 = Movie.find(27);

movie27.logo.attach(io: File.open('app/assets/images/movie_photos/perfect-blue-logo.png'), filename: 'perfect-blue-logo.png')
movie27.thumbnail.attach(io: File.open('app/assets/images/movie_photos/perfect_blue_thumbnail.png'), filename: 'perfect_blue_thumbnail.png')
movie27.background.attach(io: File.open('app/assets/images/movie_photos/perfect_blue_back.jpg'), filename: 'perfect_blue_back.jpg')


# movie28 = Movie.create!(title: "Dragon Ball: The Path to Power", 
#   yr: 1996, 
#   director: "Yamauchi Shigeyasu", 
#   rating: "NR", 
#   runtime: 80, 
#   score: 3.7,
#   description: "Goku and Bulma go on an adventure to seek out the mystical Dragon Balls.")
# glinks(28, ["Fantasy", "Action", "Adventure", "Comedy"])

movie28 = Movie.find(28);

movie28.logo.attach(io: File.open('app/assets/images/movie_photos/db_power_logo.png'), filename: 'db_power_logo.png')
movie28.thumbnail.attach(io: File.open('app/assets/images/movie_photos/db_power_thumb.jpg'), filename: 'db_power_thumb.jpg')
movie28.background.attach(io: File.open('app/assets/images/movie_photos/dragonball_path_power_back.png'), filename: 'dragonball_path_power_back.png')

movie28.clip.attach(io: File.open('app/assets/images/video/db_power_clip.mp4'), filename: 'db_power_clip.mp4')


# movie29 = Movie.create!(title: "Mirai", 
#   yr: 2018, 
#   director: "Mamoru Hosoda", 
#   rating: "PG", 
#   runtime: 100, 
#   score: 3.5,
#   description: "A young boy named Kun feels forgotten by his family when his little sister Mirai arrives. Running away from home, Kun stumbles upon a magical garden that serves as a time-travelling gateway where he encounters his mother as a little girl and has a series of adventures with his baby sister all grown up.")
# glinks(29, ["Fantasy", "Drama", "Adventure"])

movie29 = Movie.find(29);

movie29.logo.attach(io: File.open('app/assets/images/movie_photos/mirai_logo.png'), filename: 'mirai_logo.png')
movie29.thumbnail.attach(io: File.open('app/assets/images/movie_photos/mirai_thumb.png'), filename: 'mirai_thumb.png')
movie29.background.attach(io: File.open('app/assets/images/movie_photos/mirai-of-the-future.jpg'), filename: 'mirai-of-the-future.jpg')



# movie30 = Movie.create!(title: "One Piece Film: Strong World", 
#   yr: 2009, 
#   director: "Munehisa Sakai", 
#   rating: "NR", 
#   runtime: 113, 
#   score: 3.8,
#   description: "Straw Hat Pirates must save their navigator and stop the legendary Pirate, Shiki the Golden Lion from conquering East Blue.")
# glinks(30, ["Fantasy", "Action", "Adventure", "Comedy"])

movie30 = Movie.find(30);

movie30.logo.attach(io: File.open('app/assets/images/movie_photos/one-piece-movie-10-strong-world-logo.png'), filename: 'one-piece-movie-10-strong-world-logo.png')
movie30.thumbnail.attach(io: File.open('app/assets/images/movie_photos/op_strong_world_thumb.jpg'), filename: 'op_strong_world_thumb.jpg')
movie30.background.attach(io: File.open('app/assets/images/movie_photos/one-piece-strong-world.jpg'), filename: 'one-piece-strong-world.jpg')

movie30.clip.attach(io: File.open('app/assets/images/video/one_piece_strong-clip.mp4'), filename: 'one_piece_strong-clip.mp4')


# movie31 = Movie.create!(title: "One Piece Film: Gold", 
#   yr: 2017, 
#   director: "Hiroaki Miyamoto", 
#   rating: "NR", 
#   runtime: 120, 
#   score: 3.6,
#   description: "The Straw Hat Pirates come to Gran Tesoro, the richest ship in the world.")
# glinks(31, ["Fantasy", "Action", "Adventure", "Comedy"])

movie31 = Movie.find(31);

movie31.logo.attach(io: File.open('app/assets/images/movie_photos/onepiecegold_logo.png'), filename: 'onepiecegold_logo.png')
movie31.thumbnail.attach(io: File.open('app/assets/images/movie_photos/onepiecegold_thumb.jpg'), filename: 'onepiecegold_thumb.jpg')
movie31.background.attach(io: File.open('app/assets/images/movie_photos/onepiece_gold_back.jpeg'), filename: 'onepiece_gold_back.jpeg')

movie31.clip.attach(io: File.open('app/assets/images/video/one_piece_gold_opening_clip.mp4'), filename: 'one_piece_gold_opening_clip.mp4')


# Movie.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])


# Movie.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# #Drama, War



#WATCHLISTS

# movie_ids = Movie.select(:id).where("title ILIKE '%dr%' OR title ILIKE '%one%' OR director ILIKE '%hay%'")

# movie_ids.each {|movie| Watchlist.create!(user_id: 1, movie_id: movie.id)}


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






