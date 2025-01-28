function game() {

    let enemyhealth = 100;
    let playerhealth = 100;
    let oldquestion = 0;
    let questionbank=[];
    fetch('./questions.json')
        .then((response) => response.json())
        .then((json) => {questionjson = json;
        console.log(questionjson);
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
                        document.getElementById('enemystatus').innerHTML = 'You Win!';

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
                    console.log("correct:" +correctoption);
                    questionbank.push(oldquestion[0]);
                    console.log("new question?");
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
            console.log("reset");
            return [-1, -1];
        }
        else{
            console.log("log:"+oldquestion);
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