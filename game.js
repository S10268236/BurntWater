let enemyhealth = 100;
let playerhealth = 100;
let correctoption = 1;
document.getElementById('enemy').innerHTML = enemyhealth;
document.getElementById('user').innerHTML = playerhealth;
const correct = document.querySelector(`#answers button:nth-child(${correctoption})`);
correct.id = 'correct';
for (let i = 1; i <= 3; i++) {
    const buttn = document.querySelector(`#answers button:nth-child(${i})`);
    buttn.addEventListener('click', () => {
        if (playerhealth > 0 && enemyhealth > 0){
            if (i === correctoption) {
                let health = document.getElementById("enemy")
                health.value -= 10;
                if (health.value === 0) {
                    document.getElementById('enemystatus').innerHTML = 'You Win!';
                }
            } else {
                let health = document.getElementById("user")
                health.value -= 10;
                if (health.value === 0) {
                    document.getElementById('userstatus').innerHTML = 'You Lost!';
                }
            }
        }
    });
    if (i !== correctoption) {
        const wrong = document.querySelector(`#answers button:nth-child(${i})`);
        wrong.id = 'wrong';
    }
}

;



