//LOGIN API//
const apiKey = "679f624274defa6e69181f26";
const dbUrl = "https://burntwater0-8144.restdb.io/rest/logins";
// Register function
async function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
  
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    // System-defined values
    const gems = 0; // Default role for new users
    const hp = 50; // Default status for new users
    const atk = 10;
    //Validate gems is integer
    if (isNaN(gems) || gems < 0) {
      alert("Gems must be a valid positive number or zero");
      return;
    }

    try {
      const response = await fetch(dbUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
        },
        body: JSON.stringify({
          username,
          password,
          gems,
          hp,
          atk,
        }),
      });
  
      if (response.ok) {
        alert("User registered successfully!");
        
        window.location.href = "home.html";
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  }
  // Function to update gems
async function updateGems(userId, newGems) {
  let user = JSON.parse(localStorage.getItem("user"));
  var jsondata = {"_id":user[4],"password":user[5],"gems":newGems,"username":user[0],"atk":user[3],"hp":user[2]};
  localStorage.setItem("user", JSON.stringify([user[0],newGems,user[2],user[3], user[4],user[5]]));
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://burntwater0-8144.restdb.io/rest/logins/"+userId,
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }
  console.log(settings);
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
  // Login function
  async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
  
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    try {
      const response = await fetch(`${dbUrl}?q={"username":"${username}"}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
        },
      });
  
      const users = await response.json();
  
      if (users.length > 0 && users[0].password === password) {
        user = users[0];
        localStorage.setItem("user", JSON.stringify([username,users[0].gems,users[0].hp,users[0].atk, users[0]._id,users[0].password]));
        alert("Login successful!");
        window.location.href = "home.html";
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  }
  
  // Update user values function (optional, for admin/system use)
  async function updateUser(userId, updatedFields,apiKey) {
    try {
      const response = await fetch(`${dbUrl}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": apiKey,
        },
        body: JSON.stringify(updatedFields),
      });
  
      if (response.ok) {
        alert("User updated successfully!");
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  }

function fadein(){
  setTimeout(function(){
    document.getElementById("overlay-black").outerHTML='';}, 1000);
  }

function clickanimation() {
    let logobox = document.getElementById("logobox");
    let dooranim = document.createElement('dotlottie-wc');
    let door = logobox.querySelector("#logo");  
    let script = logobox.querySelector("script");
    let doorscript = document.createElement('script');
    doorscript.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js";
    doorscript.type = "module";
    dooranim.src = "https://lottie.host/c05d975d-fc9b-4cfa-ba7f-2b0721d9b173/HTCBh5E1UZ.lottie";
    dooranim.setAttribute("autoplay", "");
    dooranim.id = "logo";
    logobox.replaceChild(doorscript, script);
    logobox.replaceChild(dooranim, door);
    setTimeout(() =>{
        logobox.id="dooranim";
        setTimeout(() =>{location.href = "login.html";}, 900);}
        
    , 800);
    
}
function switchanimation() {
    setTimeout(() =>{let logobox = document.getElementById("logobox");
        let door = document.createElement('img');
        let oldElement = logobox.querySelector("#logo");    
        door.src = "door.svg";
        door.alt = "door";
        door.classList.add("center");
        door.id = "logo";
        door.addEventListener('click', clickanimation);
        logobox.replaceChild(door, oldElement);
        setTimeout(() =>{window.location.href = home.html}, 800);
    }, 1500);
}

function game() {
    let enemyhealth = 100;
    let playerhealth = JSON.parse(localStorage.getItem("user"))[2];
    let playerhealthprogress = document.createElement('progress');
    let enemyhealthprogress = document.createElement('progress');
    playerhealthprogress.id = "user";
    enemyhealthprogress.id = "enemy";
    playerhealthprogress.value = playerhealth;
    playerhealthprogress.max = playerhealth;
    let userbox = document.getElementById("userbox");
    userbox.appendChild(playerhealthprogress);

    playerhealthprogress.value = playerhealth;
    playerhealthprogress.max = playerhealth;
    let oldquestion = 0;
    let questionbank=[];
    fetch('./questions.json')
        .then((response) => response.json())
        .then((json) => {questionjson = json;
        
        oldquestion=newquestion(questionbank);
        correctoption = oldquestion[1];
        questionbank.push(oldquestion[0]);
    })
    document.getElementById('enemy').innerHTML = enemyhealth;
    document.getElementById('user').innerHTML = playerhealth;
    let canclick=0;
    for (let i = 1; i <= 3; i++) {
        const buttn = document.querySelector(`#answers button:nth-child(${i})`);
        buttn.addEventListener('click', () => {
            
            if (canclick==0){

            if (playerhealth > 0 && enemyhealth > 0){
                if (i === correctoption) {
                    canclick+=1;
                    let health = document.getElementById("enemy")
                    health.value -= 10;
                    if (health.value === 0) {
                        gamewin();

                    }
                } else {
                    canclick+=1;
                    let health = document.getElementById("user")
                    health.value -= 10;
                    if (health.value === 0) {
                        document.getElementById('userstatus').innerHTML = 'You Lost!';
                    }
            
                }
            }
            answerdisplay();
            
            setTimeout(function(){oldquestion=newquestion(questionbank);
                if (oldquestion[0]==-1){
                    questionbank=[];
                    oldquestion=newquestion(questionbank);
                    correctoption = oldquestion[1];
                    
                    questionbank.push(oldquestion[0]);
                   
                }
                else{
                correctoption = oldquestion[1];
                questionbank.push(oldquestion[0]);}
                canclick=0;}
                , 1000);
                
            }
        });
        
    }

    ;
    function newquestion(oldquestion){
        if (oldquestion.length==questionjson.questionlist.length){
            return [-1, -1];
        }
        else{
            
        let randquestion = Math.floor(Math.random() * questionjson.questionlist.length);
        while (oldquestion.includes(randquestion)){
            randquestion = Math.floor(Math.random() * questionjson.questionlist.length);
        }
        questionchange = questionjson.questionlist[randquestion].question;
        document.getElementById('question').innerHTML = questionchange;
        let correctoption = questionjson.questionlist[randquestion].answer;
        for (let i = 1; i <= 3; i++) {
            const answer = document.querySelector(`#answers button:nth-child(${i})`);
            answer.innerHTML = questionjson.questionlist[randquestion].choices[i-1];
            if (i !== correctoption) {
                const wrong = document.querySelector(`#answers button:nth-child(${i})`);
                wrong.id = 'wrong';
            }

        }
        const correct = document.querySelector(`#answers button:nth-child(${correctoption})`);
        correct.id = 'correct';
        
        return [randquestion, correctoption];
    }
    };

    function answerdisplay(){
        correct=document.getElementById('correct');
        correct.id = 'correctdisplay';
        for (let i = 1; i <= 3; i++) {
            const wrong = document.querySelector(`#answers button:nth-child(${i})`);
            if (i !== correctoption) {
                wrong.id = 'wrongdisplay';
            }
        }

    }   
}

function gamewin(){
    let user = JSON.parse(localStorage.getItem("user"));
    let newgems = user[1]+10;
    let userId = user[4];
    updateGems(userId, newgems);
    gameoverlay();
    
}

function gameoverlay(){
  bossname = "Goober";
  reward = 10;
    let overlay = document.getElementById("gameoverlay")
    let overlaycontent = document.getElementsByClassName("overlaycontent")[0];
    overlay.style.display = "block";
    let header=document.createElement('h1');
    header.innerHTML = bossname+" defeated!"; 
    header.className = "bosstitle";
    let text=document.createElement('p');
    text.innerHTML = `You have gained ${reward} gems!`;
    let homebutton = document.createElement('button');
    homebutton.innerHTML = "Go Home";
    homebutton.onclick = function() {location.href = "home.html";};
    overlaycontent.appendChild(header);
    overlaycontent.appendChild(text);
    overlaycontent.appendChild(homebutton);
}
/* JS for Home Page */
function overlayonboss1() {
    document.getElementById("overlayboss1").style.display = "block";
  }
  
  function overlayoffboss1() {
    document.getElementById("overlayboss1").style.display = "none";
  }
  function overlayonboss2() {
    document.getElementById("overlayboss2").style.display = "block";
  }
  
  function overlayoffboss2() {
    document.getElementById("overlayboss2").style.display = "none";
  }