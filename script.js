//LOGIN API Key and URL//
//Setup-Richard
const apiKey = "679f624274defa6e69181f26";
const dbUrl = "https://burntwater0-8144.restdb.io/rest/logins";
// Register function 
async function updatelocal() {
  let user = JSON.parse(localStorage.getItem("user"));
  let username = user[0];
  try {
    // Fetch user data from the database using the username
    const response = await fetch(`${dbUrl}?q={"username":"${username}"}`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
      },
    });

    const users = await response.json();
    user = users[0];
    localStorage.setItem("user", JSON.stringify([users[0].username,users[0].gems,users[0].hp,users[0].atk, users[0]._id,users[0].password,users[0].trophies, users[0].bosscounter]));
    console.log("info updated");
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred");
}
}
async function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
  
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    // New Users base values
    const gems = 0; 
    const hp = 50; 
    const atk = 10;
    const trophies = {bronzeTrophy: 0, silverTrophy: 0, goldTrophy: 0};
    const bosscounter = 0;
    //Validate gems is integer
    if (isNaN(gems) || gems < 0) {
      alert("Gems must be a valid positive number or zero");
      return;
    }
    //Create new user and trackables
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
          trophies,
          bosscounter
        }),
      });
      
      if (response.ok) {
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
            localStorage.setItem("user", JSON.stringify([username,users[0].gems,users[0].hp,users[0].atk, users[0]._id,users[0].password,users[0].trophies, users[0].bosscounter]));
            alert("User registered successfully!");
            window.location.href = "home.html";
          } else {
            alert("Invalid username or password");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred");
        }
        
      } else {
        alert("Username already exists!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  }
  // Function to update gems
async function updateGameEnd(userId, newGems) {
  
  let user = JSON.parse(localStorage.getItem("user"));
  gemupdate=user[1]+newGems;
  bosscounter=user[7]+1;
  var jsondata = {"_id":user[4],"password":user[5],"gems":gemupdate,"username":user[0],"atk":user[3],"hp":user[2],"trophies":user[6],"bosscounter":bosscounter};
  localStorage.setItem("user", JSON.stringify([user[0],gemupdate,user[2],user[3], user[4],user[5],user[6],bosscounter]));
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
        localStorage.setItem("user", JSON.stringify([username,users[0].gems,users[0].hp,users[0].atk, users[0]._id,users[0].password,users[0].trophies, users[0].bosscounter]));
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
  //Login and Register button selector
  //Register selector
  
  function revRegister() {
    if (document.getElementById("register").style.display == 'none') {
      document.getElementById("register").style.display ='block';
      document.getElementById("login").style.display = 'none';
      }
    else {
      document.getElementById('register').style.display = 'none'
      document.getElementById("login").style.display = 'block'
      }}
      

  //LOGIN END
  

//LOTTIE START
function fadein(){
  setTimeout(function(){
    document.getElementById("overlay-black").outerHTML='';}, 1000);
  }
//Door animation
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
        setTimeout(() =>{ 
        if(localStorage.getItem("user") != null){location.href = "home.html";}
        else{location.href = "login.html";}}, 900);}
        
    , 800);
    
}
function switchanimation() {
    setTimeout(() =>{let logobox = document.getElementById("logobox");
        let door = document.createElement('img');
        let oldElement = logobox.querySelector("#logo");    
        door.src = "assets/door.svg";
        door.alt = "door";
        door.classList.add("center");
        door.id = "logo";
        door.addEventListener('click', clickanimation);
        logobox.replaceChild(door, oldElement);
        
    }, 1500);
}

//LOTTIE END
//GAME START

//Initialize our countdown variable
let timerInterval;

function game() {
    bossimg = document.getElementById("bossimage");
    bossname = localStorage.getItem("bossname");
    bossimg.src = `assets/bosses/${bossname}.png`;
    bossnamevisual=document.getElementById("enemystatus");
    bossname = bossname.replace(/([A-Z])/g, ' $1').trim()
    console.log(bossname);
    bossnamevisual.innerHTML = bossname+" HP:";
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
    startTimer();
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
    //Disable excess clicking of options
    let canclick=0;
    for (let i = 1; i <= 3; i++) {
        const buttn = document.querySelector(`#answers button:nth-child(${i})`);
        buttn.addEventListener('click', () => {
            if (canclick==0){

            if (playerhealth > 0 && enemyhealth > 0){
                clearInterval(timerInterval);
                startTimer();
                if (i === correctoption) {
                    canclick+=1;
                    let health = document.getElementById("enemy")
                    health.value -= JSON.parse(localStorage.getItem("user"))[3];
                    console.log(health.value);
                    dmgvisual=document.getElementsByClassName("slashanimation")[0]
                    dmgvisual.style.display="block";
                    dmgvisual.id="slashanimationanim"
                    setTimeout(function(){dmgvisual.id="";dmgvisual.style.display="none";}, 150);
                    
                    
                } else {
                    canclick+=1;
                    let health = document.getElementById("user")
                    health.value -= 10;
                    dmgvisual=document.getElementById("dmgindicator")
                    dmgvisual.id="dmgindicatoranim";
                    dmgcolor=document.getElementById("dmgindicatorcolor");
                    dmgcolor.style.display="block";
                    setTimeout(function(){dmgcolor.style.display="none";
                      dmgvisual.id="dmgindicator";
                    }, 200);
            
                }
            }
            answerdisplay();
            
            setTimeout(function(){
              
              oldquestion=newquestion(questionbank);
              let enemyhealth = document.getElementById("enemy")
                if (enemyhealth.value === 0) {
                  gamewin();
  
              }
              let playerhealth = document.getElementById("user")
              if (playerhealth.value === 0) {
                gamelose();
            }
                if (oldquestion[0]==-1){
                  
                    questionbank=[];
                    oldquestion=newquestion(questionbank);
                    correctoption = oldquestion[1];
                    
                    questionbank.push(oldquestion[0]);
                }
                else{
                correctoption = oldquestion[1];
                questionbank.push(oldquestion[0]);}
                canclick=0;
                }
                , 1000);
                
            }
        });
        buttn.addEventListener("click", startTimer);
     
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
  clearInterval(timerInterval);
  bossname = localStorage.getItem("bossname");
  reward = Number(localStorage.getItem("reward"));
  bossname = bossname.replace(/([A-Z])/g, ' $1').trim()
    let user = JSON.parse(localStorage.getItem("user"));
    let newgems = reward;
    let userId = user[4];
    updateGameEnd(userId, newgems);
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
function gamelose(){
  clearInterval(timerInterval);
  bossname = localStorage.getItem("bossname");
  bossname = bossname.replace(/([A-Z])/g, ' $1').trim()
    let overlay = document.getElementById("gameoverlay")
    let overlaycontent = document.getElementsByClassName("overlaycontent")[0];
    overlay.style.display = "block";
    let header=document.createElement('h1');
    header.innerHTML = "You were defeated by "+bossname+"!"; 
    header.className = "bosstitle";
    let text=document.createElement('p');
    text.innerHTML = `Better luck next time!`;
    let homebutton = document.createElement('button');
    homebutton.innerHTML = "Go Home";
    homebutton.onclick = function() {location.href = "home.html";};
    overlaycontent.appendChild(header);
    overlaycontent.appendChild(text);
    overlaycontent.appendChild(homebutton);
}
//Timer countdown
function startTimer() {
  clearInterval(timerInterval);
  const timeSpan = document.querySelector(".time");
  const progressBar = document.getElementById("timer");
  let interval = 11;
  timerInterval = setInterval(() => {
    interval--;
    const progressWidth = (interval / 10) * 100;
      if (interval >= 0) {
          progressBar.value = progressWidth;
          timeSpan.innerHTML = interval + "s";
          checkColors(progressWidth);
      if (interval==0){
            document.getElementById("wrong").click();
          }
      } else {
          clearInterval(timerInterval);
          progressBar.style.width = "0%";
      }
  }, 1000);
}
//Healthiness of timer
function checkColors(progressWidth) {
  if (progressWidth > 50) {
      document.documentElement.style.setProperty('--progress-color', 'green');
  } else if (progressWidth > 10) {
      document.documentElement.style.setProperty('--progress-color', 'orange');
  } else {
      document.documentElement.style.setProperty('--progress-color', 'red');
  }
}

//GAME END
//HOME START
//Bounty Pop up overlay on
function overlayonboss1() {
  console.log(localStorage.getItem("user"));
    document.getElementById("overlayboss1").style.display = "block";
    localStorage.setItem("bossname", "JWhink");
    localStorage.setItem("reward", 11);
  }
  //Bounty popup overlay off
  function overlayoffboss1() {
    document.getElementById("overlayboss1").style.display = "none";
  }
function overlayonboss2() {
  console.log(localStorage.getItem("user"));
  document.getElementById("overlayboss2").style.display = "block";
  localStorage.setItem("bossname", "Sekigoo");
  localStorage.setItem("reward", 13);
}

function overlayoffboss2() {
  document.getElementById("overlayboss2").style.display = "none";
}
//Simplify large numbers of gems, ease of viewing
  function updategemsvisuals(){
    updatelocal();
    let gems = JSON.parse(localStorage.getItem("user"))[1];
    console.log(gems);
    if (gems > 1000000000) {
      gems = (gems / 1000000000).toFixed(1) + "B";
    }
    else if (gems > 1000000) {
      gems = (gems / 1000000).toFixed(1) + "M";
    } else if (gems > 1000) {
      gems = (gems / 1000).toFixed(1) + "K";
    } 
    document.getElementById("gemCount").innerHTML = "Gems: " + gems;
    
  }
//HOME END
//SHOP START
function shopupdate(){ 
    updatelocal();
    updategemsvisuals();
    let user = JSON.parse(localStorage.getItem("user"));
    let gems = user[1];
    let hp = user[2];
    let atk = user[3];
    let shop = document.getElementById("shop");
    let hpbox = document.getElementsByClassName("description")[0];
    let atkbox = document.getElementsByClassName("description")[1];
    let costboxes = document.getElementsByClassName("cost");
    let hpprice = costboxes[0];
    let atkprice = costboxes[1];
    document.querySelectorAll("button.cost").forEach(button => {
      button.addEventListener("click", function(){
        item = this.id;
        price = this.innerHTML.replace(/\D/g,'');
        console.log("item:"+item);
        console.log("price:"+price);
        if (item.length<4){
          document.getElementById("shopitem").innerHTML = `Purchase ${item} upgrade for ${price} gems?`;
        }
        else
        {
          
          document.getElementById("shopitem").innerHTML = `Purchase ${`${item.charAt(0).toUpperCase()+item.slice(1).replace("Trophy", " Trophy")}`} for ${price} gems?`;
        }
        document.getElementById("confirmpurchase").style.display = "block";});
    });
    currenthp=document.getElementById("currenthp");
    currentatk=document.getElementById("currentatk");
    currenthp.innerHTML = `Current HP: ${hp}`;
    currentatk.innerHTML = `Current ATK: ${atk}`;
    hpprice.innerHTML = `${hp/10+5} Gems`;
    atkprice.innerHTML = `${atk/5+8} Gems`;
    console.log(localStorage);

}

function buyhp(){
    let user = JSON.parse(localStorage.getItem("user"));
    let gems = user[1];
    let hp = user[2];
    let cost = hp/10+5;
    if (gems>=cost){
        let newgems = gems-cost;
        let userId = user[4];
        let newhp = hp+10;
        let jsondata = {"_id":user[4],"password":user[5],"gems":newgems,"username":user[0],"atk":user[3],"hp":newhp,"trophies":user[6],"bosscounter":user[7]};
        localStorage.setItem("user", JSON.stringify([user[0],newgems,newhp,user[3], user[4],user[5],user[6],user[7]]));
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
          shopupdate();
    }
    else{
        alert("Not enough gems!");
    }
}
function buyatk(){
  let user = JSON.parse(localStorage.getItem("user"));
  let gems = user[1];
  let atk = user[3];
  let cost = atk/5+8;
  if (gems>=cost){
      let newgems = gems-cost;
      let userId = user[4];
      let newatk = atk+5;
      let jsondata = {"_id":user[4],"password":user[5],"gems":newgems,"username":user[0],"atk":newatk,"hp":user[2],"trophies":user[6],"bosscounter":user[7]};
      localStorage.setItem("user", JSON.stringify([user[0],newgems,user[2],newatk, user[4],user[5],user[6],user[7]]));
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
        shopupdate();
  }
  else{
      alert("Not enough gems!");
  }
}

function buytrophy(trophytype, price) {
  let user = JSON.parse(localStorage.getItem("user"));
  let gems = user[1];
  let trophies = user[6];
  console.log("trophies=" + JSON.stringify(trophies));
  if (gems >= price) {
    let newgems = gems - price;
    let userId = user[4];
    let newtrophies = trophies;
    if (newtrophies[`${trophytype}`] == null) {
      newtrophies[`${trophytype}`] = 1;
    } 
    else {
      newtrophies[`${trophytype}`] = newtrophies[`${trophytype}`] + 1;
    }
    let jsondata = {
      _id: user[4],
      password: user[5],
      gems: newgems,
      username: user[0],
      atk: user[3],
      hp: user[2],
      trophies: newtrophies,
      bosscounter: user[7],
    };
    console.log("data:" + JSON.stringify(jsondata));
    localStorage.setItem(
      "user",
      JSON.stringify([
        user[0],
        newgems,
        user[2],
        user[3],
        user[4],
        user[5],
        newtrophies,
        user[7],
      ])
    );
    var settings = {
      async: true,
      crossDomain: true,
      url: "https://burntwater0-8144.restdb.io/rest/logins/" + userId,
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "x-apikey": apiKey,
        "cache-control": "no-cache",
      },
      processData: false,
      data: JSON.stringify(jsondata),
    };
    console.log(settings);
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    localStorage.setItem("user", JSON.stringify([user[0], newgems, user[2], user[3], user[4], user[5], newtrophies, user[7]]));
    setTimeout(function () {
    window.location.href = "account.html";}, 1000);
  } else {
    alert("Not enough gems!");
  }
}
//SHOP END

//ACCOUNT START
function accountupdate(){
let user = JSON.parse(localStorage.getItem("user"));
usernamefield=document.getElementById("usernamefield");
passwordfield=document.getElementById("passwordfield");
trophiesfield=document.getElementsByClassName("trophiesbox")[0];
gemfield=document.getElementById("gemfield");
hpfield=document.getElementById("hpfield");
atkfield=document.getElementById("atkfield");
usernamefield.innerHTML = user[0];
passwordhide=user[5].replace(/./g, '*');
passwordfield.innerHTML = passwordhide;
gemfield.innerHTML = "Gems: "+user[1];
hpfield.innerHTML = "HP: "+user[2];
atkfield.innerHTML = "ATK: "+user[3];
trophies = user[6];
let trophylist = Object.keys(trophies);
let trophycount = Object.values(trophies);
for (let i=0; i<trophylist.length; i++){
  let trophy = document.createElement('img');
  trophy.src = `assets/trophies/${trophylist[i]}.svg`;
  trophy.alt = trophylist[i];
  trophy.className = "trophy";
  let trophycountdisplay = document.createElement('p'); 
  let trophybox = document.createElement('div');
  trophybox.className = "trophybox";
  trophycountdisplay.innerHTML = `${trophylist[i].charAt(0).toUpperCase()+trophylist[i].slice(1).replace("Trophy", " Trophy")}: ${trophycount[i]}`;
  trophiesfield.appendChild(trophybox);
  trophybox.appendChild(trophy);
  trophybox.appendChild(trophycountdisplay);
}
}

function showpassword(){
  let user = JSON.parse(localStorage.getItem("user"));
  passwordfield=document.getElementById("passwordfield");
  passwordfield.innerHTML = user[5];
  button=document.getElementById("showbutton");
  button.innerHTML = "Hide Password";
  button.onclick = hidepassword;
}
function hidepassword(){
  let user = JSON.parse(localStorage.getItem("user"));
  passwordfield=document.getElementById("passwordfield");
  passwordhide=user[5].replace(/./g, '*');
  passwordfield.innerHTML = passwordhide;
  button=document.getElementById("showbutton");
  button.innerHTML = "Show Password";
  button.onclick = showpassword;
}
function logoutoverlay(){
  document.getElementById("overlaylogout").style.display = "block";
  console.log("logout overlay");
}
function logoutoff(){
  document.getElementById("overlaylogout").style.display = "none";
  console.log("logout overlay off");
}
function logout(){
  localStorage.clear();
  window.location.href = "login.html";
}


function purchaseoverlayoff(){
  document.getElementById("confirmpurchase").style.display = "none";
}

function confirmpurchase(){
  item=document.getElementById("shopitem").innerHTML;
  var item = item.split(" ")[1];
  console.log("test:"+item);
  if (item=="HP"){
    buyhp();
  }
  else if (item=="ATK"){
    buyatk();
  }
  else if (item=="Bronze"){
    buytrophy("bronzeTrophy", 100);
  }
  else if (item=="Silver"){
    buytrophy("silverTrophy", 500);
  }
  else if (item=="Gold"){
    buytrophy("goldTrophy", 1000);
  }
}
function mobilecheck(){
document.querySelector('a.icon').addEventListener('click',showmenu);
}

function showmenu(){
  console.log("menu");
  nav=document.getElementsByClassName("nav")[0];
  menu=document.createElement("ul");
  menu.className = "menu";
  homebutton=document.createElement("li");
  homebutton.innerHTML = '<a href="home.html">Home</a>';
  shopbutton=document.createElement("li");
  shopbutton.innerHTML = '<a href="shop.html">Shop</a>';
  accountbutton=document.createElement("li");
  accountbutton.innerHTML = '<a href="account.html">Account</a>';
  menu.appendChild(homebutton);
  menu.appendChild(shopbutton);
  menu.appendChild(accountbutton);
  nav.appendChild(menu);
  document.querySelector('a.icon').removeEventListener('click', showmenu);
  document.querySelector('a.icon').addEventListener('click', hidemenu);
}

function hidemenu(){
  console.log("menuoff");
  nav=document.getElementsByClassName("nav")[0];
  nav.removeChild(nav.getElementsByClassName("menu")[0]);
  document.querySelector('a.icon').removeEventListener('click', hidemenu);
  document.querySelector('a.icon').addEventListener('click', showmenu);
}