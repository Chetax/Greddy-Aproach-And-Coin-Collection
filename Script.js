const coins = [];
let count = 1;
let RemoveEle = 12;
const winner = document.getElementById('wineer'); // Fixed typo 'wineer' to 'winner'

// Coin Generation
for (let i = 1; i <= 12; i++) {
  coins[i] = document.getElementById(`div${i}`);
}

const randomArray = [];
for (let j = 0; j < 12; j++) {
  const randomValue = Math.ceil(Math.random() * 50);
  randomArray[j] = randomValue;
}

for (let j = 1; j <= 12; j++) {
  if (randomArray[j - 1] === randomArray[12 - j - 1]) {
    randomArray[12 - j - 1] = Math.ceil(Math.random() * 50);
  }
}

for (let j = 0; j < 12; j++) {
  const ptag = coins[j + 1].querySelector('p');
  ptag.innerHTML = randomArray[j];
}

// User interaction

let user = [0, 0];
let flag = 1;
let size = 13;

async function playGame(i) {
  if (i <= 6) {

    
    for (let j =(i-1); j < 13-i; j++) {
      const randomValue = Math.ceil(Math.random() * 50);
      randomArray[j] = randomValue;
    }
    //for i==2 
    for (let j =(i-1); j < 13-i; j++) {
      if (randomArray[j - 1] === randomArray[12 - j - 1]) {
        randomArray[12 - j - 1] = Math.ceil(Math.random() * 50);
      }
    }
    
    for(let j =(i-1); j < 13-i; j++) {
      const ptag = coins[j + 1].querySelector('p');
      ptag.innerHTML = randomArray[j];
    }
  
    if(i==2){
      for (let j =(i-1); j < 13-i; j++) {
        const randomValue = Math.ceil(Math.random() * 50);
        randomArray[j] = randomValue;
      }
      //for i==2 
      for (let j =(i-1); j < 13-i; j++) {
        if (randomArray[j - 1] === randomArray[12 - j - 1]) {
          randomArray[12 - j - 1] = Math.ceil(Math.random() * 50);
        }
      }
      
      for(let j =(i-1); j < 13-i; j++) {
        const ptag = coins[j + 1].querySelector('p');
        ptag.innerHTML = randomArray[j];
      }
    }
    
    if (i > 1) {
      await Player(i);
    } else {
      Player(i);
    }
    count++;
    playGame(i + 1);
  }
}

async function Player(i) {

  let coinClickedPromise;
  const waitForCoinClick = new Promise((resolve) => {
    coinClickedPromise = resolve;
  });

  if (i >= 1 && i <= 6) {
    // Add click event listener for coins when i is from 2 to 6
    coins[i].addEventListener('click', () => {
      user[flag - 1] += randomArray[i - 1];
      coinClickedPromise();
    });
  }

  coins[size - (i)].addEventListener('click', () => {
    user[flag - 1] += randomArray[size - i - 1];
    coinClickedPromise();
  });

  await waitForCoinClick;

  const ptag = coins[i].querySelector('p');
  const img = coins[i].querySelector('img');
  coins[i].removeChild(ptag);
  coins[i].removeChild(img);
  RemoveEle--;
  const ptag1 = coins[size - i].querySelector('p');
  const img1 = coins[size - i].querySelector('img');
  coins[size - i].removeChild(ptag1);
  coins[size - i].removeChild(img1);
  RemoveEle--;
  if (RemoveEle === 0) {
if(user[0]>user[1])
{
  const Winnerp1 = document.createElement('p');
  const Winnerp2 = document.createElement('p');
  Winnerp1.textContent =` 🎉 User 1 Win With Score  ${user[0]}🎉`;
  Winnerp1.style.fontSize="40px";
  Winnerp1.style.textAlign = "center";
  Winnerp2.textContent =` User 2 Score :  ${user[1]}🎉`;
  Winnerp2.style.fontSize="20px";
  Winnerp2.style.textAlign = "center";

  const imgp = document.createElement('img');
  imgp.setAttribute('src', './replay.jpg');
  imgp.style.textAlign="center";
imgp.style.width = "20px"; // Set the width with the "px" unit
imgp.style.height = "20px"; // Set the height with the "px" unit
  winner.appendChild(Winnerp1);
  winner.appendChild(Winnerp2);
  winner.appendChild(imgp);
}
else if(user[0]<user[1]){
  const Winnerp1 = document.createElement('p');
  const Winnerp2 = document.createElement('p');

  Winnerp1.textContent =` 🎉 User 2 Win With Score  ${user[1]}🎉`;
  Winnerp1.style.fontSize="40px";
  Winnerp1.style.textAlign = "center";
  Winnerp2.textContent =` User 1 Score :  ${user[0]}🎉`;
  Winnerp2.style.fontSize="20px";
  Winnerp2.style.textAlign = "center";
  const imgp = document.createElement('img');
  imgp.setAttribute('src', './replay.jpg');
 imgp.style.textAlign="center";
 imgp.style.width = "20px"; // Set the width with the "px" unit
 imgp.style.height = "20px"; // Set the height with the "px" unit
winner.appendChild(Winnerp1);
  winner.appendChild(Winnerp2);
  winner.appendChild(imgp);
}
else
{
  const Winnerp = document.createElement('p');
  Winnerp.textContent =` Tie `;
  winner.style.fontSize="40px";
  winner.appendChild(Winnerp);
  const Winnerp1 = document.createElement('p');
  const Winnerp2 = document.createElement('p');
  Winnerp1.textContent =`  User 1 Score :  ${user[0]}🎉`;
  Winnerp1.style.textAlign = "center";
  Winnerp2.textContent =` User 2 Score :  ${user[1]}🎉`;
  Winnerp2.style.textAlign = "center";
  imgp.style.size="20px";

  const imgp = document.createElement('img');
  imgp.setAttribute('src', './replay.jpg');
 imgp.style.textAlign="center";
 imgp.style.width = "20px"; // Set the width with the "px" unit
 imgp.style.height = "20px"; // Set the height with the "px" unit
  winner.appendChild(Winnerp1);
  winner.appendChild(Winnerp2);
  winner.appendChild(imgp);
}

  }


  if (flag === 1) {
    flag = 2;
  } else {
    flag = 1;
  }
}

// Start the game with i=1

playGame(1);

function DisplayWinner() {
  if (count > 6) {
    winner.style.display = "none";
    console.log("user 1", user[0]);
    console.log("user 2", user[1]);
  }
}


