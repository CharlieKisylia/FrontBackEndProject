**Link**: Not Yet Available. View images below  <br/><br/><br/>

**TO RUN ON GITHUB CODESPACES YOU CAN FOLLOW THE STEPS BELOW**:  <br/><br/>

1* ***Go to Code on Homepage and under Codespaces you should see "cautious couscous" - click the name to be directed to the code***  <br/>
2* ***It may need to install npm for you, I am not sure. Either way you will open two terminals down below(If terminal is not showing, look at image below. You will click the 2nd box to the left to open a terminal. These boxes are in the upper right corner of the page.)***  <br/>
<img width="256" alt="Screenshot 2024-08-28 at 3 38 57 PM" src="https://github.com/user-attachments/assets/e72f7181-1857-4a06-92c1-e60afc9e993e"> <br/>
3* ***Once you have the terminal showing below, click the "+" button so that there are two terminals.***  <br/>
4* ***In one of them type "cd server" to enter the server directory. And in the other terminal, type "cd client" to enter the client directory***  <br/>
5* ***In the terminal that is located in the client folder, type "npm start" and make sure to click "make public" in the bottom right of the terminal when the popup comes up(This is essential or else you will not be able to login or create an account. I will fix soon.(08/28)***  <br/>
&emsp;&emsp;* ***If "npm start" doesn't run, type "npm install" then run "npm start" again***  <br/>
6* ***In the terminal that is located in the server folder, type "mvn exec:java" to get the server running. Again, make sure to click "make public" in the bottom right of the terminal when the popup comes up(This is essential or else you will not be able to login or create an account. I will fix soon.(08/28)*** <br/>
&emsp;&emsp;* ***If "mvn exec:java" doesn't run, type "mvn compile" then run ""mvn exec:java" again***  <br/>
&emsp;&emsp;* ***If both seem to be running but you can not create an account or login, check the ports tab next to the terminal tab to make sure both visibility's are set to public If they aren't, double click on the port to change visibility to public.***  <br/>


**To run the code locally(May be more difficult to set up so maybe just use Github Codespaces or look at the pictures!)**  <br/>
Run backend in the server/ directory : First run "mvn compile" to compile then "mvn exec:java" to run in terminal  <br/>
&emsp; The Backend uses: JDK, Maven, and SQLite  <br>
&emsp;&emsp; I am using Apache Maven 3.9.9, Java version: 17.0.4.1, sqlite3: 3.39.5(Check pom.xml in server for other dependencies)  <br>
Run frontend in the client/ directory: "npm start"  <br>
&emsp; The frontend uses: Node.js and npm
&emsp;&emsp; I am using Node.js version v20.17.0, npm version: 10.8.2  <br>


**Why this project?**  <br/>
The purpose of this project is to show I am capable of working on both/either the Frontend and Backend, have knowledge in working with databases, react, and Java in a Software Engineering setting.


**Completed**  <br/>
* ***Create Account works to add user to the database then direct to welcome page***  <br/>
![Image 8-27-24 at 9 00 AM](https://github.com/user-attachments/assets/18d2661e-02f3-4668-b0d3-c2855f779c4c)

* ***Login works to check whether user is in database then direct user to welcome page***  <br/>
![Image 8-27-24 at 9 17 AM](https://github.com/user-attachments/assets/1a9b30dc-af94-4451-8cb8-d886b3623f16)

* ***Database is successfully implemented using SQLite***  </br>


* ***Rock Paper Scissors implemented on Frontend. Still need to connect to Database to keep track of all time record vs the computer.***  <br/>
<img width="1345" alt="Screenshot 2024-08-28 at 8 31 18 AM" src="https://github.com/user-attachments/assets/bb52fd1c-5f8a-4e01-9351-d8a2d7342945">

