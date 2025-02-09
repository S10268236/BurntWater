# ScipoQuest
A trivia RPG game, aimed at teaching primary-secondary school students science in a fun way. By learning and answering questions, players can slay bosses and earn rewards.

## Design process
This website was designed for children at a primary or secondary school level. The aim is to make learning science more fun for the students so they are more willing and active in their learning. The website gamifies the learning with gamification concepts, similar to other education apps like Duolingo, so that they can achieve the knowledge they want while playing a fun game at the same time :)

* As a student, I want a more fun way to learn my subjects
* As a student, I want to receive hints or explanations for incorrect answers so that I can learn from my mistakes.
* As a student, I want to unlock new areas and quests by mastering specific science topics so that I stay motivated to keep playing.

Keeping these points in mind, we made certain design choices such as the "boss of the day" and the game's correct and wrong indicators, which will be explained in the next session

In terms of wireframe, we only had the mobile view wireframe, which included more features and a lot of design elements that did not make it to the final product:
https://www.figma.com/proto/caeXNbC5GrKt1TLarXcP8r/BurntWater-AD?node-id=167-6241&t=iym85ckoIvcyxWPv-1

## Features
### Current Features
- **Login and Register page** - By filling in the fields, allows players to register for an account or log into their existing one
- **Home page** - Landing page with the logo, and availible bosses to fight for the day
- **Boss of the day** -Two 3D viewable boss previews, along with lore descriptions and reward indications
- **Trivia Gameplay** -A game where answering the question correctly damages the boss, and answering incorrectly or taking too long to answer damages you.
- **Rewards** - When the boss is defeated, you earn gems to spend
- **Shop** - Allows players to spend their earned gems on stats such as attack and health points, as well as trophies to show off on their profile
- **Accounts page** -Allows players to see their account details, trophies earned and stats. Also allows players to log out

### Features Left to Implement
- **Guilds and guild chat** -Allow for multiplayer support, fight bosses together. Was not implemented due to realtime multiplayer being too challenging as of yet
- **Achievments** -Achievements that can be unlocked after beating certain bosses. Was not implemented due to time constraints
- **More questions** -As of now there are only 20 questions. In the future, increase the question pool
- **Change boss of the day** -As there are only 2 bosses now, the bosses of the day stay the same. In the future implement daily changes in what bosses appear there.

## Technologies used
- [RestDB](https://restdb.io/)
  *Database that held our login, register and account data
- [JQuery](https://jquery.com/)
  * Helped to access the RestDB API
- [Webkit](https://webkit.org/)
  * Used to add animation to progress bar elements
- [FontAwesome](https://fontawesome.com/v4/get-started/)
  *Was used for certain icons like the hamburger menu in mobile mode
- [LottieFiles](https://lottiefiles.com/)
  *Used to do icons on the index page

## Assistive AI
1. Tracking of extra variables: ChatGPT was used to help implement the tracking of extra variables on the API.
![alt text](<AI Track variables.png>)
2. Bug Fixing of the Countdown Timer: ChatGPT was used to help understand failures in the implementation of the countdown bar.
![alt text](<AI Countdown.png>)

## Testing
1. **Login form**
i. Filled in only one field, and no fields. Relevant error message recieved.
ii.Attempt register with existing username. Relevant error message recieved.
iii. Invalid username/password. Relevant error message recieved.
2. **Shop**
i. Attempt to buy more than can afford. Insufficient gems message.
3. **Gameplay**
i. Attempt to click multiple options. Clicks past the first do not register until next question is displayed.
4. **Media Responsiveness** - Website is aesthetically designed for max-width of 600px which will cover phones. Menu is reduced to a hamburger menu and the Gems display.
5. **Browsers** - Tested in Chrome, Internet Explorer and Firefox. All versions look similar.

## Credits
**Content**
Idea of trivia rpg taken from Quiz RPG, Mystic World of Wiz
**Media**
i. Social icons on footer were take from fontawesome.com
**Acknowledgements**
i. Inspiration of J.Whink naming and lore- John Wick
ii. Inspiration of SekiGoo naming and lore- Sekiro, Shadows Die Twice
