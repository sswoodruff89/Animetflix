# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.destroy_all
Profile.destroy_all
Program.destroy_all
Genre.destroy_all
GenreLink.destroy_all
Watchlist.destroy_all

ApplicationRecord.connection.reset_pk_sequence!("users")
ApplicationRecord.connection.reset_pk_sequence!("profiles")
ApplicationRecord.connection.reset_pk_sequence!("programs")
ApplicationRecord.connection.reset_pk_sequence!("genres")
ApplicationRecord.connection.reset_pk_sequence!("genre_links")
ApplicationRecord.connection.reset_pk_sequence!("watchlists")

User.create!(email: "demo@demo.com", password: "anything")
User.create!(email: "otaku@demo.com", password: "anything")

####Profile
Profile.create!(user_id: 1, name: "demo", profile_num: 1);
Profile.create!(user_id: 1, name: "demo2", profile_num: 2);
Profile.create!(user_id: 1, name: "demo3", profile_num: 3);

Profile.create!(user_id: 2, name: "Otaku", profile_num: 1);
Profile.create!(user_id: 2, name: "Otaku2", profile_num: 2);
Profile.create!(user_id: 2, name: "Otaku3", profile_num: 3);

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
  "Horror", #12,
  "Crime",
  "Mystery",
  "Supernatural"
]

GENRES.each do |genre|
  Genre.create!(name: genre)
end

def glinks(program_id, genreArr)
  genreArr.each do |genre|
     GenreLink.create!(program_id: program_id, genre_id: Genre.find_by(name: genre).id)
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


# movie1 = Movie.find(1);
program1 = Program.create!(title: "The Boy and the Beast", 
  yr: 2015, 
  director: "Mamoru Hosoda", 
  rating: "PG-13", 
  runtime: 120,
  score: 3.9,
  production_company: "Studio Chizu",
  program_type: "Movie",
  description: "When Kyuta stumbles into a fantastic world of beasts, he's taken in by Kumatetsu, a gruff, rough-around-the-edges warrior beast who's been searching for the perfect apprentice.")
#1 
glinks(1, ["Fantasy", "Action", "Adventure"])


program1.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/boy-and-the-beast-bakemono-nlogo.png'), filename: 'boy-and-the-beast-bakemono-nlogo.png')
program1.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/boy_and_beast_thumb.png'), filename: 'boy_and_beast_thumb.png')
program1.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/boy_and_beast_back.jpg'), filename: 'boy_and_beast_back.jpg')


program2 = Program.create!(title: "Akira", 
  yr: 1988, 
  director: "Katsuhiro Otomo", 
  rating: "R", 
  runtime: 125,
  score: 4.1,
  production_company: "Tokyo Movie Shinsha",
  program_type: "Movie",
  description: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath who can only be stopped by two teenagers and a group of psychics.")
2 
glinks(2, ["Thriller", "Action", "Sci-Fi"])


# program2 = Program.find(2);

program2.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/akira_logo.png'), filename: 'akira_logo.png')
program2.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/akira_thumb.png'), filename: 'akira_thumb.png')
program2.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/akira_back.jpg'), filename: 'akira_back.jpg')

program2.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/akira_clip.mp4'), filename: 'akira_clip.mp4')


#########################################
program3 = Program.create!(title: "Grave of the Fireflies", 
  yr: 1993, 
  director: "Isao Takahata", 
  rating: "PG-13", 
  runtime: 90, 
  score: 4.3,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "A seedsastating meditation on the human cost of war, this animated tale follows Seita, a teenager charged with the care of his younger sister, Setsuko, after an American firebombing during World War II separates the two children from their parents.")
#3 Drama, War
glinks(3, ["Drama", "War"])




# program3 = Program.find(3);

####
program3.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/grave_flies_logo.png'), filename: 'grave_flies_logo.png')
program3.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/grave_thumg.jpg'), filename: 'grave_thumg.jpg')
program3.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/grave_flies_back.jpg'), filename: 'grave_flies_back.jpg')


program4 = Program.create!(title: "Dragon Ball Super Broly", 
  yr: 2018, 
  director: "Tatsuya Nagamine", 
  rating: "PG", 
  runtime: 101, 
  score: 3.9,
  production_company: "Toei Animation",
  program_type: "Movie",
  description: "One fateful day, a Saiyan appears before Goku and Vegeta who they have never seen before: Broly. With the return of Frieza from hell, a fierce battle awaits these three Saiyans who have followed completely different destinies.")
# 4 Action, Fantasy, Sci-fi
glinks(4, ["Fantasy", "Action", "Sci-Fi"])
# program4 = Program.find(4);

program4.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/dragonball_super_broly_logo.png'), filename: 'dragonball_super_broly_logo.png')
program4.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/d5.jpg'), filename: 'd5.jpg')
program4.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/dbs_broly_back.png'), filename: 'dbs_broly_back.png')

program4.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/dbz_broly.mp4'), filename: 'dbz_broly.mp4')



program5 = Program.create!(title: "Summer Wars", 
  yr: 2009, 
  director: "Mamoru Hosoda", 
  rating: "PG", 
  runtime: 101, 
  score: 3.8,
  production_company: "Madhouse",
  program_type: "Movie",
  description: "A student tries to fix a problem he accidentally caused in OZ, a digital world, while pretending to be the fiancé of his friend at her grandmother's 90th birthday.")
#5 Action, Adventure, Sci-Fi, Comedy
glinks(5, ["Adventure", "Action", "Sci-Fi", "Comedy"])

# program5 = Program.find(5);


program5.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/summer_wars_logo.png'), filename: 'summer_wars_logo.png')
program5.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/summer_wars_thumb.png'), filename: 'summer_wars_thumb.png')
program5.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/summer_wars_back.jpg'), filename: 'summer_wars_back.jpg')
# program5.clip.attach(io: open('app/assets/images/video/dbz_broly.mp4'), filename: 'dbz_broly.mp4')

program6 = Program.create!(title: "The Wind Rises", 
  yr: 2013, 
  director: "Hayao Miyazaki", 
  rating: "PG-13", 
  runtime: 126, 
  score: 3.9,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi (Hideaki Anno), whose storied career includes the creation of the A6M World War II fighter plane.")
#6 Drama, War, Romance, Period
glinks(6, ["Drama", "War", "Romance", "Period"])

# program6 = Program.find(6);

program6.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/the-wind-rises-logo.png'), filename: 'the-wind-rises-logo.png')
program6.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/the_wind_rises_thumb.png'), filename: 'the_wind_rises_thumb.png')
program6.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/thewindrises.jpg'), filename: 'thewindrises.jpg')

program6.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/wind_rise_clip.mp4'), filename: 'wind_rise_clip.mp4')


#####
program7 = Program.create!(title: "Sword of the Stranger", 
  yr: 2007, 
  director: "Masahiro Andô", 
  rating: "NR", 
  runtime: 103, 
  score: 3.9,
  production_company: "Bones",
  program_type: "Movie",
  description: "A swordsman becomes caught up in a struggle between morality, righteousness and seedsotion after he agrees to take a raggedy boy and his dog to a Buddhist temple.")
#7 Period, Action, Historical, Adventure
glinks(7, ["Adventure", "Action", "Period"])

# program7 = Program.find(7);

program7.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/sword_stranger_logo.png'), filename: 'sword_stranger_logo.png')
program7.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/sword_stranger_thumb.jpg'), filename: 'sword_stranger_thumb.jpg')
program7.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/sword_stranger_back.jpg'), filename: 'sword_stranger_back.jpg')
#######

program8 = Program.create!(title: "Howl's Moving Castle", 
  yr: 2004, 
  director: "Hayao Miyazaki", 
  rating: "PG", 
  runtime: 119, 
  score: 4.1,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.")
#8 Romance, Fantasy, Drama
glinks(8, ["Drama", "Fantasy", "Romance"])

# program8 = Program.find(8);

program8.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/howls-moving-castle-logo.png'), filename: 'howls-moving-castle-logo.png')
program8.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/howl_thumb.png'), filename: 'howl_thumb.png')
program8.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/howl_back.jpg'), filename: 'howl_back.jpg')

program8.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/howl_clip.mp4'), filename: 'howl_clip.mp4')

program9 = Program.create!(title: "Ghost in the Shell", 
  yr: 1995, 
  director: "Mamoru Oshii", 
  rating: "R", 
  runtime: 95,
  score: 4.0,
  production_company: "Production I.G.",
  program_type: "Movie",
  description: 'Cyborg federal agent Maj. Motoko Kusanagi trails "The Puppet Master" , who illegally hacks into the computerized minds of cyborg-human hybrids.')
#9 Action, Sci-Fi, Drama
glinks(9, ["Action", "Sci-Fi", "Drama"])

# program9 = Program.find(9);

program9.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/ghost-in-the-shell-logo.png'), filename: 'ghost-in-the-shell-logo.png')
program9.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/ghostintheshell_thumb.png'), filename: 'ghostintheshell_thumb.png')
program9.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/ghostintheshell_back.jpg'), filename: 'ghostintheshell_back.jpg')



program10 = Program.create!(title: "Princess Mononoke", 
  yr: 1997, 
  director: "Hayao Miyazaki", 
  rating: "PG-13", 
  runtime: 134, 
  score: 4.2,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between San and the forest gods and Tatara, a mining colony.")
#10 Drama, Fantasy, Action, Adventure
glinks(10, ["Adventure", "Action", "Drama", "Fantasy"])

# program10 = Program.find(10);

program10.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/princess-mononoke-logo-png.png'), filename: 'princess-mononoke-logo-png.png')
program10.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/princess_monoke_thumb.png'), filename: 'princess_monoke_thumb.png')
program10.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/princess_monoke_back.jpg'), filename: 'princess_monoke_back.jpg')

program10.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/princess_monoke_clip.mp4'), filename: 'princess_monoke_clip.mp4')


program11 = Program.create!(title: "My Neighbor Totoro", 
  yr: 1988, 
  director: "Hayao Miyazaki", 
  rating: "G", 
  runtime: 100,
  score: 4.1,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "Satsuke and her younger sister, Mei, settle into an old country house with their father and wait for their mother to recover from an illness in an area hospital. As the sisters explore their new home, they encounter and befriend playful spirits in their house and the nearby forest, most notably the massive cuddly creature known as Totoro.")
#11 Drama, Fantasy, Family
glinks(11, ["Drama", "Fantasy", "Family", "Comedy"])

# program11 = Program.find(11);

program11.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/totoro_logo.png'), filename: 'totoro_logo.png')
program11.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/totoro_thumb.png'), filename: 'totoro_thumb.png')
program11.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/totoro_back.jpg'), filename: 'totoro_back.jpg')

program11.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/totoro.mp4'), filename: 'totoro.mp4')



program12 = Program.create!(title: "Spirited Away", 
  yr: 2001, 
  director: "Hayao Miyazaki", 
  rating: "PG", 
  runtime: 125, 
  score: 4.3,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "10-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku, who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.")
#12 Fantasy, Family, Drama
glinks(12, ["Drama", "Fantasy", "Family"])

# program12 = Program.find(12);

program12.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/spirited_away_logo.png'), filename: 'spirited_away_logo.png')
program12.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/spiritedaway_thumb.png'), filename: 'spiritedaway_thumb.png')
program12.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/spiritedaway_back.jpg'), filename: 'spiritedaway_back.jpg')




program13 = Program.create!(title: "The Tale of Princess Kaguya", 
  yr: 2013, 
  director: "Isao Takahata", 
  rating: "PG", 
  runtime: 137, 
  score: 4.0,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "A tiny nymph found inside a bamboo stalk grows into a beautiful and desirable young woman, who orders her suitors to prove their love by completing a series of near-impossible tasks.")
#13 Drama, Fantasy, Period
glinks(13, ["Drama", "Fantasy", "Period"])

# program13 = Program.find(13);

program13.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/kaguya_logo.png'), filename: 'kaguya_logo.png')
program13.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/kaguya_thumb.jpg'), filename: 'kaguya_thumb.jpg')
program13.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/kaguya_back.jpg'), filename: 'kaguya_back.jpg')


program14 = Program.create!(title: "Porco Ross", 
  yr: 1992, 
  director: "Hayao Miyazaki", 
  rating: "PG", 
  runtime: 102, 
  score: 3.8,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "In Italy in the 1930s, sky pirates in biplanes terrorize wealthy cruise ships as they sail the Adriatic Sea. The only pilot brave enough to stop the scourge is the mysterious Porco Rosso, a former World War I flying ace who was somehow turned into a pig during the war.")
#14 Drama, Fantasy, Period
glinks(14, ["Drama", "Fantasy", "Period", "Action"])

# program14 = Program.find(14);

program14.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/PorcoRosso_logo.png'), filename: 'PorcoRosso_logo.png')
program14.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/porcorosso_thumb.png'), filename: 'porcorosso_thumb.png')
program14.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/porcorosso_back.png'), filename: 'kaguya_back.jpg')


program15 = Program.create!(title: "Whisper of the Heart", 
  yr: 1995, 
  director: "Yoshifumi Kondō", 
  rating: "PG", 
  runtime: 111, 
  score: 4.0,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "Shizuku longs to be a writer when she grows up. Amid chasing after a large cat, befriending an eccentric antiques dealer and writing her first novel, Shizuku aims to find this mysterious boy who may well be her soul mate.")
#15 Drama, Romance
glinks(15, ["Drama", "Romance"])

# program15 = Program.find(15);

program15.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/whisper-of-the-heart-logo.png'), filename: 'whisper-of-the-heart-logo.png')
program15.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/whisper_of_heart_thumb.jpg'), filename: 'whisper_of_heart_thumb.jpg')
program15.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/whisper_of_heart_back.jpg'), filename: '/whisper_of_heart_back.jpg')


program16 = Program.create!(title: "The Girl Who Leapt Through Time", 
  yr: 2008, 
  director: "Mamoru Hosoda", 
  rating: "NR", 
  runtime: 98, 
  score: 3.9,
  production_company: "Madhouse",
  program_type: "Movie",
  description: "When a young high school girl discovers that she has the unique ability to traverse space and time, her efforts to use the power as a means of preserving the relationships she shares with her closest friends reveals the perpetually shifting nature of personal relationships.")
#16 Drama, Adventure, Family, Sci-Fi
glinks(16, ["Drama", "Adventure", "Family", "Sci-Fi"])

# program16 = Program.find(16);

program16.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/the-girl-who-leapt-through-time-54be509e77dd8.png'), filename: 'the-girl-who-leapt-through-time-54be509e77dd8.png')
program16.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/the-girl-who-leapt-through-time_thumb.png'), filename: 'the-girl-who-leapt-through-time_thumb.png')
program16.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/the-girl-who-leapt-through-time.jpg'), filename: 'the-girl-who-leapt-through-time.jpg')


program17 = Program.create!(title: "A Silent Voice", 
  yr: 2016, 
  director: "Naoko Yamada",
  rating: "NR", 
  runtime: 130, 
  score: 4.1,
  production_company: "Kyoto Animation",
  program_type: "Movie",
  description: "When a grade school student with impaired hearing is bullied mercilessly, she transfers to another school. Years later, one of her former tormentors sets out to make amends.")
#17 Drama, Romance 
glinks(17, ["Drama", "Romance"])

# program17 = Program.find(17);

program17.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/a_silent_voice_logo.png'), filename: 'a_silent_voice_logo.png')
program17.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/a_silent_voice_back.png'), filename: 'a_silent_voice_back.png')
program17.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/a_silent_voice_back.png'), filename: 'a_silent_voice_back.png')


program18 = Program.create!(title: "Kiki’s Delivery Service", 
  yr: 1989, 
  director: "Hayao Miyazaki", 
  rating: "G", 
  runtime: 103, 
  score: 3.9,
  production_company: "Studio Ghibli",
  program_type: "Movie",
  description: "13-year-old witch Kiki moves to a seaside town with her talking cat, Jiji, where she sets up a flying courier service.")
#18 Drama, Family, Fantasy
glinks(18, ["Drama", "Fantasy", "Family"])

# program18 = Program.find(18);

program18.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/kiki_logo.png'), filename: 'kiki_logo.png')
program18.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/kiki_thumb.png'), filename: 'kiki_thumb.png')
program18.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/kiki_back.jpg'), filename: 'kiki_back.jpg')

program18.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/kiki_clip.mp4'), filename: 'kiki_clip.mp4')


program19 = Program.create!(title: "Samurai X: The Movie", 
  yr: 1997, 
  director: "Hatsuki Tsuji", 
  rating: "NR", 
  runtime: 90, 
  score: 3.7,
  production_company: "Studio Gallop",
  program_type: "Movie",
  description: "Himura Kenshin, the wandering samurai, was once known as Battousai, the \"Man Slayer,\" has vowed to never kill again, and spend the rest of his life in atonement for all the lives that ended under his blade.")
#19 Drama, Action, Period
glinks(19, ["Drama", "Action", "Period"])

# program19 = Program.find(19);

program19.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/samuraix_logo.png'), filename: 'samuraix_logo.png')
program19.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/samuraix_thumb.png'), filename: 'samuraix_thumb.png')
program19.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/samuraix_back.jpg'), filename: 'samuraix_back.jpg')




program20 = Program.create!(title: "My Hero Academia: Two Heroes", 
  yr: 2018, 
  director: "Kenji Nagasaki", 
  rating: "PG-13", 
  runtime: 95, 
  score: 3.5,
  production_company: "Bones",
  program_type: "Movie",
  description: "Deku and All Might receive an invitation to I-Expo, The World's Leading Exhibition of Quirk Abilities and Hero Item Innovations. Suddenly, I-Expo's Top-Of-The-Line Security System gets hacked by villains and a sinister plan is set in motion.")
#20 Action, Adventure, Fantasy, Sci-Fi
glinks(20, ["Fantasy", "Adventure", "Action", "Family", "Sci-Fi"])

# program20 = Program.find(20);

program20.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/my_hero_logo.png'), filename: 'my_hero_logo.png')
program20.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/my_hero_thumb.jpg'), filename: 'my_hero_thumb.jpg')
program20.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/my_hero_back.jpg'), filename: 'my_hero_back.jpg')


program21 = Program.create!(title: "Patema Inverted", 
  yr: 2013, 
  director: "Yasuhiro Yoshiura", 
  rating: "NR", 
  runtime: 99, 
  score: 3.7,
  production_company: "Asmik Ace Entertainment",
  program_type: "Movie",
  description: "A young girl, from a civilization that resides in deep underground tunnels, finds herself trapped in an inverted world and teams up with a resident to escape and return home.")
#21 Fantasy, Sci-Fi, Adventure
glinks(21, ["Fantasy", "Adventure", "Sci-Fi"])

# program21 = Program.find(21);

program21.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/patema-inverted-logo.png'), filename: 'patema-inverted-logo.png')
program21.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/patemainverted_thumb.jpg'), filename: 'patemainverted_thumb.jpg')
program21.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/patema_inverted_back.jpg'), filename: 'patema_inverted_back.jpg')

program21.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/patema_clip.mp4'), filename: 'patema_clip.mp4')


program22 = Program.create!(title: "Mary and the Witch's Flower", 
  yr: 2017, 
  director: "Hiromasa Yonebayashi", 
  rating: "PG", 
  runtime: 103, 
  score: 3.4,
  production_company: "Amuse",
  program_type: "Movie",
  description: "Young Mary discovers an old broomstick and the strange Fly-by-Night flower, a rare plant that blossoms once every seven years. Together, the flower and the broomstick whisk Mary above the clouds, and far away to a school of magic run by headmistress Madam Mumblechook and the brilliant Doctor Dee.")
#22 Fantasy, Adventure, Family
glinks(22, ["Fantasy", "Adventure", "Family"])

# program22 = Program.find(22);

program22.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/mary-and-the-witchs-flower-logo.png'), filename: 'mary-and-the-witchs-flower-logo.png')
program22.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/mary_and_flower_thumb.png'), filename: 'mary_and_flower_thumb.png')
program22.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/Mary2.jpg'), filename: 'Mary2.jpg')

program22.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/mary_witch.mp4'), filename: 'mary_witch.mp4')


program23 = Program.create!(title: "Dragon Ball Z: Battle of Gods", 
  yr: 2013, 
  director: "Masahiro Hosoda", 
  rating: "PG", 
  runtime: 105, 
  score: 3.6,
  production_company: "Toei Animation",
  program_type: "Movie",
  description: "The Z-Fighters must contend with Beerus, the God of Destruction. But it takes a god to fight a god, and none of them are gods... not even the Saiyans.")
#Action, Fantasy, Sci-fi
glinks(23, ["Fantasy", "Action", "Sci-Fi"])

# program23 = Program.find(23);

program23.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/dbz_bog_logo.png'), filename: 'dbz_bog_logo.png')
program23.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/dbz_bog_thumb.jpg'), filename: 'dbz_bog_thumb.jpg')
program23.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/dbz_bog_back.jpg'), filename: 'dbz_bog_back.jpg')

program23.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/dbz_bog_clip.mp4'), filename: 'dbz_bog_clip.mp4')



program24 = Program.create!(title: "Millennium Actress", 
  yr: 2001, 
  director: "Satoshi Kon", 
  rating: "PG", 
  runtime: 87, 
  score: 3.9,
  production_company: "Madhouse",
  program_type: "Movie",
  description: "Filmmaker Genya Tachibana begins work on a documentary about famed Japanese actress Chiyoko Fujiwara. As the decades pass, Chiyoko is transformed from a teen with big dreams into a full-blown celebrity, while her cinematic characters span various eras, from ancient Japan to the distant future.")
glinks(24, ["Period", "Drama", "Fantasy"])

# program24 = Program.find(24);

program24.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/millennium-actress-logo.png'), filename: 'millennium-actress-logo.png')
program24.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/millennium-actress_thumb.png'), filename: 'millennium-actress_thumb.png')
program24.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/millennium-actress2.jpg'), filename: 'millennium-actress2.jpg')



program25 = Program.create!(title: "One Piece Film: Z", 
  yr: 2012, 
  director: "Tatsuya Nagamine", 
  rating: "NR", 
  runtime: 108, 
  score: 3.9,
  production_company: "Toei Animation",
  program_type: "Movie",
  description: "When the Dyna Stones are stolen by the diabolical former marine admiral Zephyr, now known as `Z', it's up to the Straw Hat Pirates to save the new world.")
glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])

# program25 = Program.find(25);

program25.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_z_logo.png'), filename: 'one_piece_z_logo.png')
program25.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_z_thumb.png'), filename: 'one_piece_z_thumb.png')
program25.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_z_back.png'), filename: 'one_piece_z_back.png')

program25.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_z.mp4'), filename: 'one_piece_z.mp4')


program26 = Program.create!(title: "Pokémon: The First Movie", 
  yr: 1998, 
  director: "Kunihiko Yuyama", 
  rating: "G", 
  runtime: 96, 
  score: 3.1,
  production_company: "Shogakukan Production, Oriental Light and Magic (OLM)",
  program_type: "Movie",
  description: "Ash Ketchum and his friends Misty, Brock, and Pikachu, discover Mewtwo, a super-powered Pokemon created through biological engineering.")
glinks(26, ["Fantasy", "Family", "Sci-Fi", "Action", "Adventure"])

# program26 = Program.find(26);

program26.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/pokemon_logo.png'), filename: 'pokemon_logo.png')
program26.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/pokemon_thumb.jpg'), filename: 'pokemon_thumb.jpg')
program26.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/pokemon_back.jpg'), filename: 'pokemon_back.jpg')



program27 = Program.create!(title: "Perfect Blue", 
  yr: 1997, 
  director: "Satoshi Kon", 
  rating: "R", 
  runtime: 90, 
  score: 4.0,
  production_company: "Madhouse",
  program_type: "Movie",
  description: "A retired pop singer turned actress' sense of reality is shaken when she is stalked by an obsessed fan and seemingly a ghost of her past.")
glinks(27, ["Thriller", "Horror", "Drama"])

# program27 = Program.find(27);

program27.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/perfect-blue-logo.png'), filename: 'perfect-blue-logo.png')
program27.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/perfect_blue_thumbnail.png'), filename: 'perfect_blue_thumbnail.png')
program27.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/perfect_blue_back.jpg'), filename: 'perfect_blue_back.jpg')


program28 = Program.create!(title: "Dragon Ball: The Path to Power", 
  yr: 1996, 
  director: "Yamauchi Shigeyasu", 
  rating: "NR", 
  runtime: 80, 
  score: 3.7,
  production_company: "Toei Animation",
  program_type: "Movie",
  description: "Goku and Bulma go on an adventure to seek out the mystical Dragon Balls.")
glinks(28, ["Fantasy", "Action", "Adventure", "Comedy"])

# program28 = Program.find(28);

program28.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/db_power_logo.png'), filename: 'db_power_logo.png')
program28.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/db_power_thumb.jpg'), filename: 'db_power_thumb.jpg')
program28.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/dragonball_path_power_back.png'), filename: 'dragonball_path_power_back.png')

program28.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/db_power_clip.mp4'), filename: 'db_power_clip.mp4')


program29 = Program.create!(title: "Mirai", 
  yr: 2018, 
  director: "Mamoru Hosoda", 
  rating: "PG", 
  runtime: 100, 
  score: 3.5,
  production_company: "Studio Chizu, Madhouse",
  program_type: "Movie",
  description: "A young boy named Kun feels forgotten by his family when his little sister Mirai arrives. Running away from home, Kun stumbles upon a magical garden that serves as a time-travelling gateway where he encounters his mother as a little girl and has a series of adventures with his baby sister all grown up.")
glinks(29, ["Fantasy", "Drama", "Adventure"])

# program29 = Program.find(29);

program29.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/mirai_logo.png'), filename: 'mirai_logo.png')
program29.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/mirai_thumb.png'), filename: 'mirai_thumb.png')
program29.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/mirai-of-the-future.jpg'), filename: 'mirai-of-the-future.jpg')



program30 = Program.create!(title: "One Piece Film: Strong World", 
  yr: 2009, 
  director: "Munehisa Sakai", 
  rating: "NR", 
  runtime: 113, 
  score: 3.8,
  production_company: "Toei Animation",
  program_type: "Movie",
  description: "Straw Hat Pirates must save their navigator and stop the legendary Pirate, Shiki the Golden Lion from conquering East Blue.")
glinks(30, ["Fantasy", "Action", "Adventure", "Comedy"])

# program30 = Program.find(30);

program30.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one-piece-movie-10-strong-world-logo.png'), filename: 'one-piece-movie-10-strong-world-logo.png')
program30.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/op_strong_world_thumb.jpg'), filename: 'op_strong_world_thumb.jpg')
program30.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one-piece-strong-world.jpg'), filename: 'one-piece-strong-world.jpg')

program30.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_strong-clip.mp4'), filename: 'one_piece_strong-clip.mp4')


program31 = Program.create!(title: "One Piece Film: Gold", 
  yr: 2017, 
  director: "Hiroaki Miyamoto", 
  rating: "NR", 
  runtime: 120, 
  score: 3.6,
  production_company: "Toei Animation",
  program_type: "Movie",
  description: "The Straw Hat Pirates come to Gran Tesoro, the richest ship in the world.")
glinks(31, ["Fantasy", "Action", "Adventure", "Comedy"])

# program31 = Program.find(31);

program31.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/onepiecegold_logo.png'), filename: 'onepiecegold_logo.png')
program31.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/onepiecegold_thumb.jpg'), filename: 'onepiecegold_thumb.jpg')
program31.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/onepiece_gold_back.jpeg'), filename: 'onepiece_gold_back.jpeg')

program31.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_gold_opening_clip.mp4'), filename: 'one_piece_gold_opening_clip.mp4')


#############
# program32 = Program.find(32);

program32 = Program.create!(title: "Demon Slayer", 
  yr: 2019, 
  director: "Haruo Sotozaki", 
  rating: "TV-MA", 
  seasons: 1, 
  score: 4.4,
  production_company: "Aniplex, Shueisha",
  program_type: "TV Show",
  description: "A family is attacked by demons and only Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.")
glinks(32, ["Fantasy", "Action", "Horror", "Adventure", "Thriller"])

program32.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/demon_slayer_logo.png'), filename: 'demon_slayer_logo.png')
program32.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/demon_slayer_thumb.jpg'), filename: 'demon_slayer_thumb.jpg')
program32.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/demon_slayer_back.jpg'), filename: 'demon_slayer_back.jpg')

program32.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/demon_slayer_clip.mp4'), filename: 'demon_slayer_clip.mp4')
program32.thumbclip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/demon_slayer_thumbclip.mp4'), filename: 'demon_slayer_thumbclip.mp4')


# program33 = Program.find(33);

program33 = Program.create!(title: "Keep Your Hands Off Eizouken!", 
  yr: 2020, 
  director: "Masaaki Yuasa", 
  rating: "NR", 
  seasons: 1, 
  score: 4.3,
  production_company: "Science Saru",
  program_type: "TV Show",
  description: 'Three students who are fans of anime decide to come together and make the "greatest anime ever!"')
glinks(33, ["Comedy", "Drama"])

program33.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/keep_hands_logo.png'), filename: 'keep_hands_logo.png')
program33.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/keep_hands_thumb.png'), filename: 'keep_hands_thumb.png')
program33.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/keep_hands_back.jpg'), filename: 'keep_hands_back.jpg')

program33.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/keep_hands_clip.mp4'), filename: 'keep_hands_clip.mp4')
program33.thumbclip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/keep_hands_thumbclip.mp4'), filename: 'keep_hands_thumbclip.mp4')


# program34 = Program.find(34);

program34 = Program.create!(title: "One Piece", 
  yr: 1999, 
  director: "Eiichiro Oda", 
  rating: "TV-14", 
  seasons: 21, 
  score: 4.3,
  production_company: "Toei Animation",
  program_type: "TV Show",
  description: 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named "One Piece".')
glinks(34, ["Comedy", "Action", "Adventure", "Fantasy"])

program34.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_logo.png'), filename: 'one_piece_logo.png')
program34.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_thumbnail.jpg'), filename: 'one_piece_thumbnail.jpg')
program34.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_back.png'), filename: 'one_piece_back.png')

program34.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_clip.mp4'), filename: 'one_piece_clip.mp4')
program34.thumbclip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/one_piece_thumbclip.mp4'), filename: 'one_piece_thumbclip.mp4')


# program35 = Program.find(35);

program35 = Program.create!(title: "Yu Yu Hakusho: Ghost Files", 
  yr: 1992, 
  director: "Yoshihiro Togashi", 
  rating: "TV-14", 
  seasons: 4, 
  score: 4.2,
  production_company: "Pierrot, Shueisha, Fuji Television",
  program_type: "TV Show",
  description: "Resurrected from the dead, 14-year-old Yusuke Urameshi becomes a Spirit Detective and, along with his comrades, hunt down demons causing terror in the world.")
glinks(35, ["Horror", "Action", "Adventure", "Fantasy"])


program35.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/yu_yu_logo.png'), filename: 'yu_yu_logo.png')
program35.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/yu_yu_thumb.jpg'), filename: 'yu_yu_thumb.jpg')
program35.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/yu_yu_back.jpg'), filename: 'yu_yu_back.jpg')



# program36 = Program.find(36);

program36 = Program.create!(title: "Attack on Titan", 
  yr: 2013, 
  director: "Tetsurô Araki", 
  rating: "TV-MA", 
  seasons: 4, 
  score: 4.4,
  production_company: "Wit Studio, Production I.G.",
  program_type: "TV Show",
  description: "After his hometown is destroyed and his mother is killed, young Eren Yeager vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.")
glinks(36, ["Thriller", "Action", "Adventure", "Fantasy"])

program36.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/attack_titan_logo.png'), filename: 'attack_titan_logo.png')
program36.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/attack_titan_thumb.jpg'), filename: 'attack_titan_thumb.jpg')
program36.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/attack_titan_back.jpg'), filename: 'attack_titan_back.jpg')


# program37 = Program.find(37);

program37 = Program.create!(title: "Death Note", 
  yr: 2006, 
  director: "Tetsuro Araki", 
  rating: "TV-MA", 
  seasons: 1, 
  score: 4.5,
  production_company: "Madhouse",
  program_type: "TV Show",
  description: "An intelligent yet cynical high school student begins to cleanse the world from evil with the help of a magical notebook that can kill anyone whose name is written on it.")
glinks(37, ["Thriller", "Action", "Drama", "Crime", "Mystery"])

program37.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/deathnote_logo.png'), filename: 'deathnote_logo.png')
program37.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/deathnote_thumb.jpg'), filename: 'deathnote_thumb.jpg')
program37.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/deathnote_back.jpg'), filename: 'deathnote_back.jpg')


# program38 = Program.find(38);

program38 = Program.create!(title: "Cowboy Bebop", 
  yr: 1998, 
  director: "Shin'ichirô Watanabe", 
  rating: "TV-14", 
  seasons: 1, 
  score: 4.4,
  production_company: "Bandai Visual Company, Sunrise",
  program_type: "TV Show",
  description: "The futuristic misadventures and tragedies of an easygoing bounty hunter and his partners.")
glinks(38, ["Thriller", "Sci-Fi", "Action", "Crime", "Adventure"])

program38.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/cowboy_logo.png'), filename: 'cowboy_logo.png')
program38.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/cowboy_thumb.png'), filename: 'cowboy_thumb.png')
program38.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/cowboy_back.jpg'), filename: 'cowboy_back.jpg')

program38.thumbclip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/cowboy_thumbclip.mp4'), filename: 'cowboy_thumbclip.mp4')


# program39 = Program.find(39);

program39 = Program.create!(title: "Food Wars", 
  yr: 2016, 
  director: "Yoshitomo Yonetani", 
  rating: "TV-14", 
  seasons: 4, 
  score: 4.1,
  production_company: "J.C. Staff",
  program_type: "TV Show",
  description: "To improve his cooking skills and to save the restaurant, Souma begins studying in Engetsu Teahouse Culinary Academy, which is regarded as Japan's top culinary academy.")
glinks(39, ["Drama", "Comedy"])

program39.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/food_wars_logo.png'), filename: 'food_wars_logo.png')
program39.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/food_wars_thumb.jpg'), filename: 'food_wars_thumb.jpg')
program39.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/food_wars_back.png'), filename: 'food_wars_back.png')

program39.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/food_wars_clip.mp4'), filename: 'food_wars_clip.mp4')
program39.thumbclip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/food_wars_thumbclip.mp4'), filename: 'food_wars_thumbclip.mp4')


# program40 = Program.find(40);

program40 = Program.create!(title: "Samurai Champloo", 
  yr: 2016, 
  director: "Mamoru Hosoda", 
  rating: "TV-MA", 
  seasons: 1, 
  score: 4.2,
  production_company: "Fuji Television Network, Barnum Studio, Madhouse",
  program_type: "TV Show",
  description: 'Fuu, a waitress who works in a teahouse, rescues two master swordsmen, Mugen and Jin, from their execution to help her find the "samurai who smells of sunflowers."')
glinks(40, ["Period", "Comedy", "Action", "Adventure"])

program40.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/champloo_logo.png'), filename: 'champloo_logo.png')
program40.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/champloo_thumb.jpg'), filename: 'champloo_thumb.jpg')
program40.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/champloo_back.jpg'), filename: 'champloo_back.jpg')

# program40.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/food_wars_clip.mp4'), filename: 'food_wars_clip.mp4')
program40.thumbclip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/champloo_thumbclip.mp4'), filename: 'champloo_thumbclip.mp4')


# program41 = Program.find(41);

program41 = Program.create!(title: "Clannad", 
  yr: 2007, 
  director: "Tatsuya Ishihara", 
  rating: "TV-PG", 
  seasons: 1, 
  score: 3.9,
  production_company: "Kyoto Animation",
  program_type: "TV Show",
  description: "A high school student who cares little about school or others meets a lonely girl who had to repeat a year while all her friends finished high school. He decides to hang out with her and soon meets more friendly students.")
glinks(41, ["Drama", "Romance", "Comedy"])

program41.logo.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/clannad_logo.png'), filename: 'clannad_logo.png')
program41.thumbnail.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/clannad_thumb.jpg'), filename: 'clannad_thumb.jpg')
program41.background.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/clannad_back.jpg'), filename: 'clannad_back.jpg')

# program41.clip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/food_wars_clip.mp4'), filename: 'food_wars_clip.mp4')
# program41.thumbclip.attach(io: open('https://animetflix-seeds.s3.amazonaws.com/champloo_thumbclip.mp4'), filename: 'champloo_thumbclip.mp4')


# program42 = Program.find(42);

program42 = Program.create!(title: "Dragon Ball", 
  yr: 1986, 
  director: "Akira Toriyama", 
  rating: "TV-PG", 
  seasons: 1, 
  score: 4.2,
  production_company: "Toei Animation",
  program_type: "TV Show",
  description: "Son Goku, a fighter with a monkey tail, goes on a quest with an assortment of odd characters in search of the Dragon Balls, a set of crystals that can give its bearer anything they desire.")
glinks(42, ["Action", "Adventure", "Comedy", "Fantasy"])


# program43 = Program.find(43);

program43 = Program.create!(title: "Jojo's Bizarre Adventure", 
  yr: 2012, 
  director: "Akira Toriyama", 
  rating: "TV-MA", 
  seasons: 4, 
  score: 4.2,
  production_company: "David Production",
  program_type: "TV Show",
  description: "The story of the Joestar family, who are possessed with intense psychic strength, and the adventures each member encounters throughout their lives.")
glinks(43, ["Action", "Adventure", "Sci-Fi", "Fantasy"])


# program44 = Program.find(44);

program44 = Program.create!(title: "One Punch Man", 
  yr: 2015, 
  director: "Shingo Natsume", 
  rating: "TV-PG", 
  seasons: 2, 
  score: 4.4,
  production_company: "J.C. Staff, Bandai Visual Company",
  program_type: "TV Show",
  description: "The story of Saitama, a hero that does it just for fun & can defeat his enemies with a single punch.")
glinks(44, ["Action", "Comedy", "Sci-Fi", "Fantasy"])


# program45 = Program.find(45);

program45 = Program.create!(title: "Tokyo Ghoul", 
  yr: 2014, 
  director: "Shuhei Morita", 
  rating: "TV-MA", 
  seasons: 1, 
  score: 3.9,
  production_company: "Pierrot",
  program_type: "TV Show",
  description: "A Tokyo college student is attacked by a ghoul, a superpowered human who feeds on human flesh. He survives, but has become part ghoul and becomes a fugitive on the run.")
glinks(45, ["Action", "Horror", "Thriller", "Fantasy"])


# program46 = Program.find(46);

program46 = Program.create!(title: "Sword Art Online", 
  yr: 2012, 
  director: "Tomohiko Itô", 
  rating: "TV-14", 
  seasons: 4, 
  score: 3.8,
  production_company: "A-1 Pictures, ASCII Mediaworks",
  program_type: "TV Show",
  description: "In the year 2022, thousands of people get trapped in a new virtual MMORPG and the lone wolf player, Kirito, works to escape.")
glinks(46, ["Action", "Sci-Fi", "Adventure", "Fantasy"])


# program47 = Program.find(47);

program47 = Program.create!(title: "Naruto", 
  yr: 2002, 
  director: "Masashi Kishimoto", 
  rating: "TV-Y7", 
  seasons: 5, 
  score: 4.1,
  production_company: "Pierrot",
  program_type: "TV Show",
  description: "Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village's leader and strongest ninja.")
glinks(47, ["Action", "Comedy", "Adventure", "Fantasy"])


# program48 = Program.find(48);

program48 = Program.create!(title: "Fullmetal Alchemist: Brotherhood", 
  yr: 2009, 
  director: "Hiromu Arakawa", 
  rating: "TV-14", 
  seasons: 2, 
  score: 4.5,
  production_company: "Bones",
  program_type: "TV Show",
  description: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms.")
glinks(48, ["Action", "Sci-Fi", "Adventure", "Fantasy"])


# program49 = Program.find(49);

program49 = Program.create!(title: "Future Diary", 
  yr: 2011, 
  director: "Naoto Hosoda", 
  rating: "TV-MA", 
  seasons: 1, 
  score: 3.8,
  production_company: "Kadokawa Pictures",
  program_type: "TV Show",
  description: "A young man competes with people around the world for a chance to become the succesor of God, with a diary that is able to tell the future.")
glinks(49, ["Action", "Drama", "Adventure", "Thriller", "Fantasy"])


# program50 = Program.find(50);

program50 = Program.create!(title: "Hellsing Ultimate", 
  yr: 2006, 
  director: "Tomokazu Tokoro", 
  rating: "TV-MA", 
  seasons: 1, 
  score: 4.1,
  production_company: "Madhouse, Graphinica, Satelight",
  program_type: "TV Show",
  description: "The vampire Alucard, his master Sir Integra Hellsing, and his ward Seras Victoria, try to protect England from a war-crazed SS-Major and his vampire army.")
glinks(50, ["Action", "Horror", "Thriller", "Supernatural"])


# program51 = Program.find(51);

program51 = Program.create!(title: "Junji Ito Collection", 
  yr: 2018, 
  director: "Shinobu Tagashira", 
  rating: "TV-MA", 
  seasons: 1, 
  score: 3.2,
  production_company: "Studio DEEN",
  program_type: "TV Show",
  description: "A collection of animated horror stories based on the works of Japanese artist Junji Ito.")
glinks(51, ["Horror", "Thriller", "Supernatural"])


# program52 = Program.find(52);

program52 = Program.create!(title: "The Promised Neverland", 
  yr: 2019, 
  director: "Mamoru Kanbe", 
  rating: "TV-14", 
  seasons: 2, 
  score: 4.4,
  production_company: "Aniplex, CloverWorks, Fuji Television Network",
  program_type: "TV Show",
  description: "A group kids at a seemingly perfect orphanage uncover its dark truth when they break a rule to never leave the orphanage grounds. Once the truth is discovered, they begin to plan an escape to save all of the children.")
glinks(52, ["Horror", "Thriller", "Fantasy", "Mystery"])


# program53 = Program.find(53);

program53 = Program.create!(title: "School-Live!", 
  yr: 2015, 
  director: "Masaomi Ando", 
  rating: "TV-14", 
  seasons: 1, 
  score: 3.6,
  production_company: "Houbunsha",
  program_type: "TV Show",
  description: "A young girl pretends to live a normal school life with her friends, unable to perceive what is truly happening around her.")
glinks(53, ["Horror", "Thriller", "Drama", "Mystery"])

# Program.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])


# Program.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# #Drama, War

#####LIKES######

Like.create!(
  profile_id: 1,
  program_id: 21)
Like.create!(
  profile_id: 1,
  program_id: 12)
Like.create!(
  profile_id: 1,
  program_id: 10)
Like.create!(
  profile_id: 1,
  program_id: 4)
Like.create!(
  profile_id: 1,
  program_id: 35)
Like.create!(
  profile_id: 1,
  program_id: 38)
Like.create!(
  profile_id: 1,
  program_id: 42)
Like.create!(
  profile_id: 1,
  program_id: 9)
Like.create!(
  profile_id: 1,
  program_id: 5)
Like.create!(
  profile_id: 1,
  program_id: 44)
Like.create!(
  profile_id: 1,
  program_id: 2)
Like.create!(
  profile_id: 1,
  program_id: 32)
Like.create!(
  profile_id: 2,
  program_id: 12)
Like.create!(
  profile_id: 2,
  program_id: 18)
Like.create!(
  profile_id: 2,
  program_id: 33)
Like.create!(
  profile_id: 2,
  program_id: 3)
Like.create!(
  profile_id: 2,
  program_id: 9)
Like.create!(
  profile_id: 2,
  program_id: 25)
Like.create!(
  profile_id: 2,
  program_id: 16)
Like.create!(
  profile_id: 2,
  program_id: 32)
Like.create!(
  profile_id: 2,
  program_id: 45)
Like.create!(
  profile_id: 2,
  program_id: 35)
Like.create!(
  profile_id: 2,
  program_id: 27)
Like.create!(
  profile_id: 1,
  program_id: 33)
Like.create!(
  profile_id: 3,
  program_id: 10)
Like.create!(
  profile_id: 3,
  program_id: 16)
Like.create!(
  profile_id: 3,
  program_id: 14)
Like.create!(
  profile_id: 3,
  program_id: 6)
Like.create!(
  profile_id: 3,
  program_id: 19)
Like.create!(
  profile_id: 3,
  program_id: 10)
Like.create!(
  profile_id: 3,
  program_id: 16)
Like.create!(
  profile_id: 3,
  program_id: 24)
Like.create!(
  profile_id: 3,
  program_id: 13)
Like.create!(
  profile_id: 3,
  program_id: 35)
Like.create!(
  profile_id: 3,
  program_id: 40)
Like.create!(
  profile_id: 3,
  program_id: 12)
Like.create!(
  profile_id: 3,
  program_id: 8)
Like.create!(
  profile_id: 3,
  program_id: 37)




Disike.create!(
  profile_id: 1,
  program_id: 43)
Disike.create!(
  profile_id: 1,
  program_id: 30)
Disike.create!(
  profile_id: 1,
  program_id: 7)
Disike.create!(
  profile_id: 1,
  program_id: 22)
Disike.create!(
 profile_id: 1,
  program_id: 46)
Disike.create!(
  profile_id: 2,
  program_id: 41)
Disike.create!(
  profile_id: 2,
  program_id: 39)
Disike.create!(
  profile_id: 2,
  program_id: 36)
Disike.create!(
  profile_id: 3,
  program_id: 21)
Disike.create!(
  profile_id: 3,
  program_id: 20)
Disike.create!(
  profile_id: 3,
  program_id: 44)
Disike.create!(
  profile_id: 3,
  program_id: 48)
Disike.create!(
  profile_id: 3,
  program_id: 46)
Disike.create!(
  profile_id: 1,
  program_id: 13)
Disike.create!(
  profile_id: 1,
  program_id: 11)
Disike.create!(
  profile_id: 1,
  program_id: 14)












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









# # User.destroy_all
# # Movie.destroy_all
# # Genre.destroy_all
# # GenreLink.destroy_all
# # Watchlist.destroy_all

# # ApplicationRecord.connection.reset_pk_sequence!("users")
# # ApplicationRecord.connection.reset_pk_sequence!("movies")
# # ApplicationRecord.connection.reset_pk_sequence!("genres")
# # ApplicationRecord.connection.reset_pk_sequence!("genre_links")
# # ApplicationRecord.connection.reset_pk_sequence!("watchlists")

# # User.create!(email: "demo@demo.com", password: "anything")
# # User.create!(email: "otaku@demo.com", password: "anything")


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

# GENRES.each do |genre|
#   Genre.create!(name: genre)
# end

# def glinks(movie_id, genreArr)
#   genreArr.each do |genre|
#      GenreLink.create!(movie_id: movie_id, genre_id: Genre.find_by(name: genre).id)
#   end
# end

# #  id          :bigint           not null, primary key
# #  title       :string           not null
# #  yr          :integer          not null
# #  description :text             not null
# #  rating      :string           not null
# #  runtime     :integer          not null
# #  created_at  :datetime         not null
# #  updated_at  :datetime         not null


# movie1 = Movie.find(1);
# # movie1 = Movie.create!(title: "The Boy and the Beast", 
# #   yr: 2015, 
# #   director: "Mamoru Hosoda", 
# #   rating: "PG-13", 
# #   runtime: 120,
# #   score: 3.9,
# #   description: "When Kyuta stumbles into a fantastic world of beasts, he's taken in by Kumatetsu, a gruff, rough-around-the-edges warrior beast who's been searching for the perfect apprentice.")
# # #1 
# # glinks(1, ["Fantasy", "Action", "Adventure"])
# movie1.logo.attach(io: File.open('app/assets/images/movie_photos/boy-and-the-beast-bakemono-nlogo.png'), filename: 'boy-and-the-beast-bakemono-nlogo.png')
# movie1.thumbnail.attach(io: File.open('app/assets/images/movie_photos/boy_and_beast_thumb.png'), filename: 'boy_and_beast_thumb.png')
# movie1.background.attach(io: File.open('app/assets/images/movie_photos/boy_and_beast_back.jpg'), filename: 'boy_and_beast_back.jpg')

# # movie2 = Movie.create!(title: "Akira", 
# #   yr: 1988, 
# #   director: "Katsuhiro Otomo", 
# #   rating: "R", 
# #   runtime: 125,
# #   score: 4.1,
# #   description: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath who can only be stopped by two teenagers and a group of psychics.")
# # #2 
# # glinks(2, ["Thriller", "Action", "Sci-Fi"])
# movie2 = Movie.find(2);

# movie2.logo.attach(io: File.open('app/assets/images/movie_photos/akira_logo.png'), filename: 'akira_logo.png')
# movie2.thumbnail.attach(io: File.open('app/assets/images/movie_photos/akira_thumb.png'), filename: 'akira_thumb.png')
# movie2.background.attach(io: File.open('app/assets/images/movie_photos/akira_back.jpg'), filename: 'akira_back.jpg')

# movie2.clip.attach(io: File.open('app/assets/images/video/akira_clip.mp4'), filename: 'akira_clip.mp4')


# #########################################
# # movie3 = Movie.create!(title: "Grave of the Fireflies", 
# #   yr: 1993, 
# #   director: "Isao Takahata", 
# #   rating: "PG-13", 
# #   runtime: 90, 
# #   score: 4.3,
# #   description: "A devastating meditation on the human cost of war, this animated tale follows Seita, a teenager charged with the care of his younger sister, Setsuko, after an American firebombing during World War II separates the two children from their parents.")
# # #3 Drama, War
# # glinks(3, ["Drama", "War"])
# movie3 = Movie.find(3);

# ####
# movie3.logo.attach(io: File.open('app/assets/images/movie_photos/grave_flies_logo.png'), filename: 'grave_flies_logo.png')
# movie3.thumbnail.attach(io: File.open('app/assets/images/movie_photos/grave_thumg.jpg'), filename: 'grave_thumg.jpg')
# movie3.background.attach(io: File.open('app/assets/images/movie_photos/grave_flies_back.jpg'), filename: 'grave_flies_back.jpg')


# # movie4 = Movie.create!(title: "Dragon Ball Super Broly", 
# #   yr: 2018, 
# #   director: "Tatsuya Nagamine", 
# #   rating: "PG", 
# #   runtime: 101, 
# #   score: 3.9,
# #   description: "One fateful day, a Saiyan appears before Goku and Vegeta who they have never seen before: Broly. With the return of Frieza from hell, a fierce battle awaits these three Saiyans who have followed completely different destinies.")
# # #4 Action, Fantasy, Sci-fi
# # glinks(4, ["Fantasy", "Action", "Sci-Fi"])
# movie4 = Movie.find(4);

# movie4.logo.attach(io: File.open('app/assets/images/movie_photos/dragonball_super_broly_logo.png'), filename: 'dragonball_super_broly_logo.png')
# movie4.thumbnail.attach(io: File.open('app/assets/images/movie_photos/d5.jpg'), filename: 'd5.jpg')
# movie4.background.attach(io: File.open('app/assets/images/movie_photos/dbs_broly_back.png'), filename: 'dbs_broly_back.png')

# movie4.clip.attach(io: File.open('app/assets/images/video/dbz_broly.mp4'), filename: 'dbz_broly.mp4')

# # movie5 = Movie.create!(title: "Summer Wars", 
# #   yr: 2009, 
# #   director: "Mamoru Hosoda", 
# #   rating: "PG", 
# #   runtime: 101, 
# #   score: 3.8,
# #   description: "A student tries to fix a problem he accidentally caused in OZ, a digital world, while pretending to be the fiancé of his friend at her grandmother's 90th birthday.")
# # #5 Action, Adventure, Sci-Fi, Comedy
# # glinks(5, ["Adventure", "Action", "Sci-Fi", "Comedy"])

# movie5 = Movie.find(5);


# movie5.logo.attach(io: File.open('app/assets/images/movie_photos/summer_wars_logo.png'), filename: 'summer_wars_logo.png')
# movie5.thumbnail.attach(io: File.open('app/assets/images/movie_photos/summer_wars_thumb.png'), filename: 'summer_wars_thumb.png')
# movie5.background.attach(io: File.open('app/assets/images/movie_photos/summer_wars_back.jpg'), filename: 'summer_wars_back.jpg')
# movie5.clip.attach(io: File.open('app/assets/images/video/dbz_broly.mp4'), filename: 'dbz_broly.mp4')

# # movie6 = Movie.create!(title: "The Wind Rises", 
# #   yr: 2013, 
# #   director: "Hayao Miyazaki", 
# #   rating: "PG-13", 
# #   runtime: 126, 
# #   score: 3.9,
# #   description: "A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi (Hideaki Anno), whose storied career includes the creation of the A6M World War II fighter plane.")
# # #6 Drama, War, Romance, Period
# # glinks(6, ["Drama", "War", "Romance", "Period"])

# movie6 = Movie.find(6);

# movie6.logo.attach(io: File.open('app/assets/images/movie_photos/the-wind-rises-logo.png'), filename: 'the-wind-rises-logo.png')
# movie6.thumbnail.attach(io: File.open('app/assets/images/movie_photos/the_wind_rises_thumb.png'), filename: 'the_wind_rises_thumb.png')
# movie6.background.attach(io: File.open('app/assets/images/movie_photos/thewindrises.jpg'), filename: 'thewindrises.jpg')

# movie6.clip.attach(io: File.open('app/assets/images/video/wind_rise_clip.mp4'), filename: 'wind_rise_clip.mp4')


# #####
# # movie7 = Movie.create!(title: "Sword of the Stranger", 
# #   yr: 2007, 
# #   director: "Masahiro Andô", 
# #   rating: "NR", 
# #   runtime: 103, 
# #   score: 3.9,
# #   description: "A swordsman becomes caught up in a struggle between morality, righteousness and devotion after he agrees to take a raggedy boy and his dog to a Buddhist temple.")
# # #7 Period, Action, Historical, Adventure
# # glinks(7, ["Adventure", "Action", "Period"])

# movie7 = Movie.find(7);

# movie7.logo.attach(io: File.open('app/assets/images/movie_photos/sword_stranger_logo.png'), filename: 'sword_stranger_logo.png')
# movie7.thumbnail.attach(io: File.open('app/assets/images/movie_photos/sword_stranger_thumb.jpg'), filename: 'sword_stranger_thumb.jpg')
# movie7.background.attach(io: File.open('app/assets/images/movie_photos/sword_stranger_back.jpg'), filename: 'sword_stranger_back.jpg')
# #######

# # movie8 = Movie.create!(title: "Howl's Moving Castle", 
# #   yr: 2004, 
# #   director: "Hayao Miyazaki", 
# #   rating: "PG", 
# #   runtime: 119, 
# #   score: 4.1,
# #   description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.")
# # #8 Romance, Fantasy, Drama
# # glinks(8, ["Drama", "Fantasy", "Romance"])

# movie8 = Movie.find(8);

# movie8.logo.attach(io: File.open('app/assets/images/movie_photos/howls-moving-castle-logo.png'), filename: 'howls-moving-castle-logo.png')
# movie8.thumbnail.attach(io: File.open('app/assets/images/movie_photos/howl_thumb.png'), filename: 'howl_thumb.png')
# movie8.background.attach(io: File.open('app/assets/images/movie_photos/howl_back.jpg'), filename: 'howl_back.jpg')

# movie8.clip.attach(io: File.open('app/assets/images/video/howl_clip.mp4'), filename: 'howl_clip.mp4')

# # movie9 = Movie.create!(title: "Ghost in the Shell", 
# #   yr: 1995, 
# #   director: "Mamoru Oshii", 
# #   rating: "R", 
# #   runtime: 95,
# #   score: 4.0,
# #   description: 'Cyborg federal agent Maj. Motoko Kusanagi trails "The Puppet Master" , who illegally hacks into the computerized minds of cyborg-human hybrids.')
# # #9 Action, Sci-Fi, Drama
# # glinks(9, ["Action", "Sci-Fi", "Drama"])

# movie9 = Movie.find(9);

# movie9.logo.attach(io: File.open('app/assets/images/movie_photos/ghost-in-the-shell-logo.png'), filename: 'ghost-in-the-shell-logo.png')
# movie9.thumbnail.attach(io: File.open('app/assets/images/movie_photos/ghostintheshell_thumb.png'), filename: 'ghostintheshell_thumb.png')
# movie9.background.attach(io: File.open('app/assets/images/movie_photos/ghostintheshell_back.jpg'), filename: 'ghostintheshell_back.jpg')



# # movie10 = Movie.create!(title: "Princess Mononoke", 
# #   yr: 1997, 
# #   director: "Hayao Miyazaki", 
# #   rating: "PG-13", 
# #   runtime: 134, 
# #   score: 4.2,
# #   description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between San and the forest gods and Tatara, a mining colony.")
# # #10 Drama, Fantasy, Action, Adventure
# # glinks(10, ["Adventure", "Action", "Drama", "Fantasy"])

# movie10 = Movie.find(10);

# movie10.logo.attach(io: File.open('app/assets/images/movie_photos/princess-mononoke-logo-png.png'), filename: 'princess-mononoke-logo-png.png')
# movie10.thumbnail.attach(io: File.open('app/assets/images/movie_photos/princess_monoke_thumb.png'), filename: 'princess_monoke_thumb.png')
# movie10.background.attach(io: File.open('app/assets/images/movie_photos/princess_monoke_back.jpg'), filename: 'princess_monoke_back.jpg')

# movie10.clip.attach(io: File.open('app/assets/images/video/princess_monoke_clip.mp4'), filename: 'princess_monoke_clip.mp4')


# # movie11 = Movie.create!(title: "My Neighbor Totoro", 
# #   yr: 1988, 
# #   director: "Hayao Miyazaki", 
# #   rating: "G", 
# #   runtime: 100,
# #   score: 4.1,
# #   description: "Satsuke and her younger sister, Mei, settle into an old country house with their father and wait for their mother to recover from an illness in an area hospital. As the sisters explore their new home, they encounter and befriend playful spirits in their house and the nearby forest, most notably the massive cuddly creature known as Totoro.")
# # #11 Drama, Fantasy, Family
# # glinks(11, ["Drama", "Fantasy", "Family", "Comedy"])

# movie11 = Movie.find(11);

# movie11.logo.attach(io: File.open('app/assets/images/movie_photos/totoro_logo.png'), filename: 'totoro_logo.png')
# movie11.thumbnail.attach(io: File.open('app/assets/images/movie_photos/totoro_thumb.png'), filename: 'totoro_thumb.png')
# movie11.background.attach(io: File.open('app/assets/images/movie_photos/totoro_back.jpg'), filename: 'totoro_back.jpg')

# movie11.clip.attach(io: File.open('app/assets/images/video/totoro.mp4'), filename: 'totoro.mp4')



# # movie12 = Movie.create!(title: "Spirited Away", 
# #   yr: 2001, 
# #   director: "Hayao Miyazaki", 
# #   rating: "PG", 
# #   runtime: 125, 
# #   score: 4.3,
# #   description: "10-year-old Chihiro and her parents stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku, who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.")
# # #12 Fantasy, Family, Drama
# # glinks(12, ["Drama", "Fantasy", "Family"])

# movie12 = Movie.find(12);

# movie12.logo.attach(io: File.open('app/assets/images/movie_photos/spirited_away_logo.png'), filename: 'spirited_away_logo.png')
# movie12.thumbnail.attach(io: File.open('app/assets/images/movie_photos/spiritedaway_thumb.png'), filename: 'spiritedaway_thumb.png')
# movie12.background.attach(io: File.open('app/assets/images/movie_photos/spiritedaway_back.jpg'), filename: 'spiritedaway_back.jpg')




# # movie13 = Movie.create!(title: "The Tale of Princess Kaguya", 
# #   yr: 2013, 
# #   director: "Isao Takahata", 
# #   rating: "PG", 
# #   runtime: 137, 
# #   score: 4.0,
# #   description: "A tiny nymph found inside a bamboo stalk grows into a beautiful and desirable young woman, who orders her suitors to prove their love by completing a series of near-impossible tasks.")
# # #13 Drama, Fantasy, Period
# # glinks(13, ["Drama", "Fantasy", "Period"])

# movie13 = Movie.find(13);

# movie13.logo.attach(io: File.open('app/assets/images/movie_photos/kaguya_logo.png'), filename: 'kaguya_logo.png')
# movie13.thumbnail.attach(io: File.open('app/assets/images/movie_photos/kaguya_thumb.jpg'), filename: 'kaguya_thumb.jpg')
# movie13.background.attach(io: File.open('app/assets/images/movie_photos/kaguya_back.jpg'), filename: 'kaguya_back.jpg')


# # movie14 = Movie.create!(title: "Porco Ross", 
# #   yr: 1992, 
# #   director: "Hayao Miyazaki", 
# #   rating: "PG", 
# #   runtime: 102, 
# #   score: 3.8,
# #   description: "In Italy in the 1930s, sky pirates in biplanes terrorize wealthy cruise ships as they sail the Adriatic Sea. The only pilot brave enough to stop the scourge is the mysterious Porco Rosso, a former World War I flying ace who was somehow turned into a pig during the war.")
# # #14 Drama, Fantasy, Period
# # glinks(14, ["Drama", "Fantasy", "Period", "Action"])

# movie14 = Movie.find(14);

# movie14.logo.attach(io: File.open('app/assets/images/movie_photos/PorcoRosso_logo.png'), filename: 'PorcoRosso_logo.png')
# movie14.thumbnail.attach(io: File.open('app/assets/images/movie_photos/porcorosso_thumb.png'), filename: 'porcorosso_thumb.png')
# movie14.background.attach(io: File.open('app/assets/images/movie_photos/porcorosso_back.png'), filename: 'kaguya_back.jpg')


# # movie15 = Movie.create!(title: "Whisper of the Heart", 
# #   yr: 1995, 
# #   director: "Yoshifumi Kondō", 
# #   rating: "PG", 
# #   runtime: 111, 
# #   score: 4.0,
# #   description: "Shizuku, an inquisitive young girl and a voracious reader, longs to be a writer when she grows up. One day she notices that all of her library books have previously been taken out by one Seiji Amasawa. Amid chasing after a large cat, befriending an eccentric antiques dealer and writing her first novel, Shizuku aims to find this mysterious boy who may well be her soul mate.")
# # #15 Drama, Romance
# # glinks(15, ["Drama", "Romance"])

# movie15 = Movie.find(15);

# movie15.logo.attach(io: File.open('app/assets/images/movie_photos/whisper-of-the-heart-logo.png'), filename: 'whisper-of-the-heart-logo.png')
# movie15.thumbnail.attach(io: File.open('app/assets/images/movie_photos/whisper_of_heart_thumb.jpg'), filename: 'whisper_of_heart_thumb.jpg')
# movie15.background.attach(io: File.open('app/assets/images/movie_photos/whisper_of_heart_back.jpg'), filename: '/whisper_of_heart_back.jpg')


# # movie16 = Movie.create!(title: "The Girl Who Leapt Through Time", 
# #   yr: 2008, 
# #   director: "Mamoru Hosoda", 
# #   rating: "NR", 
# #   runtime: 98, 
# #   score: 3.9,
# #   description: "When a young high school girl discovers that she has the unique ability to traverse space and time, her efforts to use the power as a means of preserving the relationships she shares with her closest friends reveals the perpetually shifting nature of personal relationships.")
# # #16 Drama, Adventure, Family, Sci-Fi
# # glinks(16, ["Drama", "Adventure", "Family", "Sci-Fi"])

# movie16 = Movie.find(16);

# movie16.logo.attach(io: File.open('app/assets/images/movie_photos/the-girl-who-leapt-through-time-54be509e77dd8.png'), filename: 'the-girl-who-leapt-through-time-54be509e77dd8.png')
# movie16.thumbnail.attach(io: File.open('app/assets/images/movie_photos/the-girl-who-leapt-through-time_thumb.png'), filename: 'the-girl-who-leapt-through-time_thumb.png')
# movie16.background.attach(io: File.open('app/assets/images/movie_photos/the-girl-who-leapt-through-time.jpg'), filename: 'the-girl-who-leapt-through-time.jpg')


# # movie17 = Movie.create!(title: "A Silent Voice", 
# #   yr: 2016, 
# #   director: "Naoko Yamada",
# #   rating: "NR", 
# #   runtime: 130, 
# #   score: 4.1,
# #   description: "When a grade school student with impaired hearing is bullied mercilessly, she transfers to another school. Years later, one of her former tormentors sets out to make amends.")
# # #17 Drama, Romance 
# # glinks(17, ["Drama", "Romance"])

# movie17 = Movie.find(17);

# movie17.logo.attach(io: File.open('app/assets/images/movie_photos/a_silent_voice_logo.png'), filename: 'a_silent_voice_logo.png')
# movie17.thumbnail.attach(io: File.open('app/assets/images/movie_photos/a_silent_voice_back.png'), filename: 'a_silent_voice_back.png')
# ### movie17.background.attach(io: File.open('app/assets/images/movie_photos/a_silent_voice_back.png'), filename: 'a_silent_voice_back.png')


# # movie18 = Movie.create!(title: "Kiki’s Delivery Service", 
# #   yr: 1989, 
# #   director: "Hayao Miyazaki", 
# #   rating: "G", 
# #   runtime: 103, 
# #   score: 3.9,
# #   description: "13-year-old witch Kiki moves to a seaside town with her talking cat, Jiji, where she sets up a flying courier service.")
# # #18 Drama, Family, Fantasy
# # glinks(18, ["Drama", "Fantasy", "Family"])

# movie18 = Movie.find(18);

# movie18.logo.attach(io: File.open('app/assets/images/movie_photos/kiki_logo.png'), filename: 'kiki_logo.png')
# movie18.thumbnail.attach(io: File.open('app/assets/images/movie_photos/kiki_thumb.png'), filename: 'kiki_thumb.png')
# movie18.background.attach(io: File.open('app/assets/images/movie_photos/kiki_back.jpg'), filename: 'kiki_back.jpg')

# movie18.clip.attach(io: File.open('app/assets/images/video/kiki_clip.mp4'), filename: 'kiki_clip.mp4')


# # movie19 = Movie.create!(title: "Samurai X: The Movie", 
# #   yr: 1997, 
# #   director: "Hatsuki Tsuji", 
# #   rating: "NR", 
# #   runtime: 90, 
# #   score: 3.7,
# #   description: "Himura Kenshin, the wandering samurai, was once known as Battousai, the \"Man Slayer,\" and used his unsurpassed prowess as a fighter to fight in the Japanese civil war and bring about the beginning of the Meiji period. That time is over now, however, and Kenshin has vowed to never kill again, and spend the rest of his life in atonement for all the lives that ended under his blade.")
# # #19 Drama, Action, Period
# # glinks(19, ["Drama", "Action", "Period"])

# movie19 = Movie.find(19);

# movie19.logo.attach(io: File.open('app/assets/images/movie_photos/samuraix_logo.png'), filename: 'samuraix_logo.png')
# movie19.thumbnail.attach(io: File.open('app/assets/images/movie_photos/samuraix_thumb.png'), filename: 'samuraix_thumb.png')
# movie19.background.attach(io: File.open('app/assets/images/movie_photos/samuraix_back.jpg'), filename: 'samuraix_back.jpg')




# # movie20 = Movie.create!(title: "My Hero Academia: Two Heroes", 
# #   yr: 2018, 
# #   director: "Kenji Nagasaki", 
# #   rating: "PG-13", 
# #   runtime: 95, 
# #   score: 3.5,
# #   description: "Deku and All Might receive an invitation to I-Expo, The World's Leading Exhibition of Quirk Abilities and Hero Item Innovations. Suddenly, I-Expo's Top-Of-The-Line Security System gets hacked by villains and a sinister plan is set in motion.")
# # #20 Action, Adventure, Fantasy, Sci-Fi
# # glinks(20, ["Fantasy", "Adventure", "Action", "Family", "Sci-Fi"])

# movie20 = Movie.find(20);

# movie20.logo.attach(io: File.open('app/assets/images/movie_photos/my_hero_logo.png'), filename: 'my_hero_logo.png')
# movie20.thumbnail.attach(io: File.open('app/assets/images/movie_photos/my_hero_thumb.jpg'), filename: 'my_hero_thumb.jpg')
# movie20.background.attach(io: File.open('app/assets/images/movie_photos/my_hero_back.jpg'), filename: 'my_hero_back.jpg')


# # movie21 = Movie.create!(title: "Patema Inverted", 
# #   yr: 2013, 
# #   director: "Yasuhiro Yoshiura", 
# #   rating: "NR", 
# #   runtime: 99, 
# #   score: 3.7,
# #   description: "A young girl, from a civilization that resides in deep underground tunnels, finds herself trapped in an inverted world and teams up with a resident to escape and return home.")
# # #21 Fantasy, Sci-Fi, Adventure
# # glinks(21, ["Fantasy", "Adventure", "Sci-Fi"])

# movie21 = Movie.find(21);

# movie21.logo.attach(io: File.open('app/assets/images/movie_photos/patema-inverted-logo.png'), filename: 'patema-inverted-logo.png')
# movie21.thumbnail.attach(io: File.open('app/assets/images/movie_photos/patemainverted_thumb.jpg'), filename: 'patemainverted_thumb.jpg')
# movie21.background.attach(io: File.open('app/assets/images/movie_photos/patema_inverted_back.jpg'), filename: 'patema_inverted_back.jpg')

# movie21.clip.attach(io: File.open('app/assets/images/video/patema_clip.mp4'), filename: 'patema_clip.mp4')


# # movie22 = Movie.create!(title: "Mary and the Witch's Flower", 
# #   yr: 2017, 
# #   director: "Hiromasa Yonebayashi", 
# #   rating: "PG", 
# #   runtime: 103, 
# #   score: 3.4,
# #   description: "Young Mary discovers an old broomstick and the strange Fly-by-Night flower, a rare plant that blossoms once every seven years. Together, the flower and the broomstick whisk Mary above the clouds, and far away to a school of magic run by headmistress Madam Mumblechook and the brilliant Doctor Dee.")
# # #22 Fantasy, Adventure, Family
# # glinks(22, ["Fantasy", "Adventure", "Family"])

# movie22 = Movie.find(22);

# movie22.logo.attach(io: File.open('app/assets/images/movie_photos/mary-and-the-witchs-flower-logo.png'), filename: 'mary-and-the-witchs-flower-logo.png')
# movie22.thumbnail.attach(io: File.open('app/assets/images/movie_photos/mary_and_flower_thumb.png'), filename: 'mary_and_flower_thumb.png')
# movie22.background.attach(io: File.open('app/assets/images/movie_photos/Mary2.jpg'), filename: 'Mary2.jpg')

# movie22.clip.attach(io: File.open('app/assets/images/video/mary_witch.mp4'), filename: 'mary_witch.mp4')


# # movie23 = Movie.create!(title: "Dragon Ball Z: Battle of Gods", 
# #   yr: 2013, 
# #   director: "Masahiro Hosoda", 
# #   rating: "PG", 
# #   runtime: 105, 
# #   score: 3.6,
# #   description: "The Z-Fighters must contend with Beerus, the God of Destruction. But it takes a god to fight a god, and none of them are gods... not even the Saiyans.")
# # #Action, Fantasy, Sci-fi
# # glinks(23, ["Fantasy", "Action", "Sci-Fi"])

# movie23 = Movie.find(23);

# movie23.logo.attach(io: File.open('app/assets/images/movie_photos/dbz_bog_logo.png'), filename: 'dbz_bog_logo.png')
# movie23.thumbnail.attach(io: File.open('app/assets/images/movie_photos/dbz_bog_thumb.jpg'), filename: 'dbz_bog_thumb.jpg')
# movie23.background.attach(io: File.open('app/assets/images/movie_photos/dbz_bog_back.jpg'), filename: 'dbz_bog_back.jpg')

# movie23.clip.attach(io: File.open('app/assets/images/video/dbz_bog_clip.mp4'), filename: 'dbz_bog_clip.mp4')



# # movie24 = Movie.create!(title: "Millennium Actress", 
# #   yr: 2001, 
# #   director: "Satoshi Kon", 
# #   rating: "PG", 
# #   runtime: 87, 
# #   score: 3.9,
# #   description: "Filmmaker Genya Tachibana begins work on a documentary about famed Japanese actress Chiyoko Fujiwara. As the decades pass, Chiyoko is transformed from a teen with big dreams into a full-blown celebrity, while her cinematic characters span various eras, from ancient Japan to the distant future.")
# # glinks(24, ["Period", "Drama", "Fantasy"])

# movie24 = Movie.find(24);

# movie24.logo.attach(io: File.open('app/assets/images/movie_photos/millennium-actress-logo.png'), filename: 'millennium-actress-logo.png')
# movie24.thumbnail.attach(io: File.open('app/assets/images/movie_photos/millennium-actress_thumb.png'), filename: 'millennium-actress_thumb.png')
# movie24.background.attach(io: File.open('app/assets/images/movie_photos/millennium-actress2.jpg'), filename: 'millennium-actress2.jpg')



# # movie25 = Movie.create!(title: "One Piece Film: Z", 
# #   yr: 2012, 
# #   director: "Tatsuya Nagamine", 
# #   rating: "NR", 
# #   runtime: 108, 
# #   score: 3.9,
# #   description: "When the Dyna Stones are stolen by the diabolical former marine admiral Zephyr, now known as `Z', it's up to the Straw Hat Pirates to save the new world.")
# # glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])

# movie25 = Movie.find(25);

# movie25.logo.attach(io: File.open('app/assets/images/movie_photos/one_piece_z_logo.png'), filename: 'one_piece_z_logo.png')
# movie25.thumbnail.attach(io: File.open('app/assets/images/movie_photos/one_piece_z_thumb.png'), filename: 'one_piece_z_thumb.png')
# movie25.background.attach(io: File.open('app/assets/images/movie_photos/one_piece_z_back.png'), filename: 'one_piece_z_back.png')

# movie25.clip.attach(io: File.open('app/assets/images/video/one_piece_z.mp4'), filename: 'one_piece_z.mp4')


# # movie26 = Movie.create!(title: "Pokémon: The First Movie", 
# #   yr: 1998, 
# #   director: "Kunihiko Yuyama", 
# #   rating: "G", 
# #   runtime: 96, 
# #   score: 3.1,
# #   description: "Ash Ketchum and his friends Misty, Brock, and Pikachu, discover Mewtwo, a super-powered Pokemon created through biological engineering.")
# # glinks(26, ["Fantasy", "Family", "Sci-Fi", "Action", "Adventure"])

# movie26 = Movie.find(26);

# movie26.logo.attach(io: File.open('app/assets/images/movie_photos/pokemon_logo.png'), filename: 'pokemon_logo.png')
# movie26.thumbnail.attach(io: File.open('app/assets/images/movie_photos/pokemon_thumb.jpg'), filename: 'pokemon_thumb.jpg')
# movie26.background.attach(io: File.open('app/assets/images/movie_photos/pokemon_back.jpg'), filename: 'pokemon_back.jpg')



# # movie27 = Movie.create!(title: "Perfect Blue", 
# #   yr: 1997, 
# #   director: "Satoshi Kon", 
# #   rating: "R", 
# #   runtime: 90, 
# #   score: 4.0,
# #   description: "A retired pop singer turned actress' sense of reality is shaken when she is stalked by an obsessed fan and seemingly a ghost of her past.")
# # glinks(27, ["Thriller", "Horror", "Drama"])

# movie27 = Movie.find(27);

# movie27.logo.attach(io: File.open('app/assets/images/movie_photos/perfect-blue-logo.png'), filename: 'perfect-blue-logo.png')
# movie27.thumbnail.attach(io: File.open('app/assets/images/movie_photos/perfect_blue_thumbnail.png'), filename: 'perfect_blue_thumbnail.png')
# movie27.background.attach(io: File.open('app/assets/images/movie_photos/perfect_blue_back.jpg'), filename: 'perfect_blue_back.jpg')


# # movie28 = Movie.create!(title: "Dragon Ball: The Path to Power", 
# #   yr: 1996, 
# #   director: "Yamauchi Shigeyasu", 
# #   rating: "NR", 
# #   runtime: 80, 
# #   score: 3.7,
# #   description: "Goku and Bulma go on an adventure to seek out the mystical Dragon Balls.")
# # glinks(28, ["Fantasy", "Action", "Adventure", "Comedy"])

# movie28 = Movie.find(28);

# movie28.logo.attach(io: File.open('app/assets/images/movie_photos/db_power_logo.png'), filename: 'db_power_logo.png')
# movie28.thumbnail.attach(io: File.open('app/assets/images/movie_photos/db_power_thumb.jpg'), filename: 'db_power_thumb.jpg')
# movie28.background.attach(io: File.open('app/assets/images/movie_photos/dragonball_path_power_back.png'), filename: 'dragonball_path_power_back.png')

# movie28.clip.attach(io: File.open('app/assets/images/video/db_power_clip.mp4'), filename: 'db_power_clip.mp4')


# # movie29 = Movie.create!(title: "Mirai", 
# #   yr: 2018, 
# #   director: "Mamoru Hosoda", 
# #   rating: "PG", 
# #   runtime: 100, 
# #   score: 3.5,
# #   description: "A young boy named Kun feels forgotten by his family when his little sister Mirai arrives. Running away from home, Kun stumbles upon a magical garden that serves as a time-travelling gateway where he encounters his mother as a little girl and has a series of adventures with his baby sister all grown up.")
# # glinks(29, ["Fantasy", "Drama", "Adventure"])

# movie29 = Movie.find(29);

# movie29.logo.attach(io: File.open('app/assets/images/movie_photos/mirai_logo.png'), filename: 'mirai_logo.png')
# movie29.thumbnail.attach(io: File.open('app/assets/images/movie_photos/mirai_thumb.png'), filename: 'mirai_thumb.png')
# movie29.background.attach(io: File.open('app/assets/images/movie_photos/mirai-of-the-future.jpg'), filename: 'mirai-of-the-future.jpg')



# # movie30 = Movie.create!(title: "One Piece Film: Strong World", 
# #   yr: 2009, 
# #   director: "Munehisa Sakai", 
# #   rating: "NR", 
# #   runtime: 113, 
# #   score: 3.8,
# #   description: "Straw Hat Pirates must save their navigator and stop the legendary Pirate, Shiki the Golden Lion from conquering East Blue.")
# # glinks(30, ["Fantasy", "Action", "Adventure", "Comedy"])

# movie30 = Movie.find(30);

# movie30.logo.attach(io: File.open('app/assets/images/movie_photos/one-piece-movie-10-strong-world-logo.png'), filename: 'one-piece-movie-10-strong-world-logo.png')
# movie30.thumbnail.attach(io: File.open('app/assets/images/movie_photos/op_strong_world_thumb.jpg'), filename: 'op_strong_world_thumb.jpg')
# movie30.background.attach(io: File.open('app/assets/images/movie_photos/one-piece-strong-world.jpg'), filename: 'one-piece-strong-world.jpg')

# movie30.clip.attach(io: File.open('app/assets/images/video/one_piece_strong-clip.mp4'), filename: 'one_piece_strong-clip.mp4')


# # movie31 = Movie.create!(title: "One Piece Film: Gold", 
# #   yr: 2017, 
# #   director: "Hiroaki Miyamoto", 
# #   rating: "NR", 
# #   runtime: 120, 
# #   score: 3.6,
# #   description: "The Straw Hat Pirates come to Gran Tesoro, the richest ship in the world.")
# # glinks(31, ["Fantasy", "Action", "Adventure", "Comedy"])

# movie31 = Movie.find(31);

# movie31.logo.attach(io: File.open('app/assets/images/movie_photos/onepiecegold_logo.png'), filename: 'onepiecegold_logo.png')
# movie31.thumbnail.attach(io: File.open('app/assets/images/movie_photos/onepiecegold_thumb.jpg'), filename: 'onepiecegold_thumb.jpg')
# movie31.background.attach(io: File.open('app/assets/images/movie_photos/onepiece_gold_back.jpeg'), filename: 'onepiece_gold_back.jpeg')

# movie31.clip.attach(io: File.open('app/assets/images/video/one_piece_gold_opening_clip.mp4'), filename: 'one_piece_gold_opening_clip.mp4')


# # Movie.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# # glinks(25, ["Fantasy", "Action", "Adventure", "Comedy"])


# # Movie.create!(title: "", yr: , director: "", rating: "", runtime: , description: "")
# # #Drama, War



# #WATCHLISTS

# # movie_ids = Movie.select(:id).where("title ILIKE '%dr%' OR title ILIKE '%one%' OR director ILIKE '%hay%'")

# # movie_ids.each {|movie| Watchlist.create!(user_id: 1, movie_id: movie.id)}


# # # GENRES = [
# #   "Family", #1
# #   "Fantasy", #2
# #   "Sci-Fi", #3
# #   "Adventure", #4 
# #   "Romance", #5
# #   "Period", #6
# #   "War", #7
# #   "Drama", #8
# #   "Action", #9
# #   "Comedy", #10
# #   "Thriller", #11
# #   "Horror" #12
# # ]






