# Brain Game!

![Explanation Animation](client/public/images/classroom_animation.gif?raw=true "How it Works")

### Split the class into teams and let the competition unfold!

[(What it took to make this project a reality)](client/public/images/braingame_brainstorm.gif?raw=true)

---

### [Project Notes](project-notes.txt?raw=true)

*"If I had to do it over again, what would I do differently?"*
* Keep answer validation strictly on server
* Move single source of gameStateObject onto the server, instead of having a federated model in which clients each keep/modify/broadcast a copy of their own
* Expand the scope of socket.io from two-user system to many-user system (players could all be on their own phones)
* Make the MongoDB queries more efficient
* Create this app before COVID-19 disallowed teachers and students to be together in a physical classroom
* Have more fun with the project and create more interesting and various questions!
  * (Including a better math problem generator)

*Credits/Attributions:*
* Questions
  * Jeopardy Productions, Inc.
  * https://www.triviaquestionss.com
  * https://www.kaggle.com/theriley106/hq-trivia-question-database
* Images
  * Background created in part with tools from SVGBackgrounds.com
  * Trophy SVG from remmachenasreddine, DZ
  * Promotional vector art from freepik, macrovector
* All the awesome, encouraging people in my life
