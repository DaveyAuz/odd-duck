'use strict';

// *************** GLOBALS
let alienArray = [];
let votingRounds = 25;

// *************** DOM WINDOWS
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('results-btn');
//let resultsList = document.getElementById('results-list');

// ******* CANVAS ELEMENT FOR CHART *****
//let ctx = document.getElementById('my-chart');

// **************** CONSTRUCTOR FUNCTION
function Alien(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
  alienArray.push(this);
}

// **************** EXECUTABLE CODE


// * REBUILD THE Alien ARRAY * //

// ? LOCAL STORAGE ADDITIONAL *
// ? Step 3: Get Information from Local Storage
let retrievedAlienArray = localStorage.getItem('alienArray');
console.log(retrievedAlienArray);

function saveToLocalStorage() {
  localStorage.setItem('alienArray', JSON.stringify(alienArray));
}
if (retrievedAlienArray) {
  //  ? Step 4: Convert back to usable code
  alienArray = JSON.parse(retrievedAlienArray);
  renderImg();
} else {
  new Alien('bag');
  new Alien('banana');
  new Alien('bathroom');
  new Alien('boots');
  new Alien('breakfast');
  new Alien('bubblegum');
  new Alien('chair');
  new Alien('cthulhu');
  new Alien('dog-duck');
  new Alien('dragon');
  new Alien('pen');
  new Alien('pet-sweep');
  new Alien('scissors');
  new Alien('shark');
  new Alien('sweep', 'png');
  new Alien('tauntaun');
  new Alien('unicorn');
  new Alien('water-can');
  new Alien('wine-glass');
  saveToLocalStorage()
  renderImg();

}
//let indexArray = [];


// ********** HELPER FUNCTIONS UTILITIES*********

function randomIndex() {
  return Math.floor(Math.random() * alienArray.length) + 1;
}
function renderImg() {
  // TODO: 3 images on the page
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  // TODO: Make sure the images are unique
  // ** COMPARE IMG 1 & IMG 2 while they are the same get a new randomIndex
  // ** could you use another form of storage for indexes to do your validation against that? **
  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgOneIndex = randomIndex();
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }

  imgOne.src = alienArray[imgOneIndex].image;
  imgOne.title = alienArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${alienArray[imgOneIndex].name}`;
  alienArray[imgOneIndex].views = alienArray[imgOneIndex].views + 1;

  imgTwo.src = alienArray[imgTwoIndex].image;
  imgTwo.title = alienArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${alienArray[imgTwoIndex].name}`;
  alienArray[imgTwoIndex].views = alienArray[imgTwoIndex].views + 1;

  imgThree.src = alienArray[imgThreeIndex].image;
  imgThree.title = alienArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${alienArray[imgThreeIndex].name}`;
  alienArray[imgThreeIndex].views = alienArray[imgThreeIndex].views + 1;

  // TODO: INCREASE VIEW ON IMAGE
  alienArray[imgOneIndex].views++;
  alienArray[imgTwoIndex].views++;
  alienArray[imgThreeIndex].views++;
}
// let chartObj = {
//   type: 'bar',
//   data: {
//     labels: alienNames,
//     datasets: [{
//       label: '# of Votes',
//       data: alienVotes,
//       borderWidth: 1
//     },
//     {
//       label: '# of times Shown',
//       data: alienShown,
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// };

// *** 2 args for the Chart Constructor - canvas element, config obj with goat data
//eslint-disable-line


// TODO: IDENTIFY IMAGE THAT WAS CLICKED
function handleImgClick(event) {
  let imgClicked = event.target.title;

  // TODO: INCREASE NUMBER OF VOTES ON THAT IMAGE
  for (let i = 0; i < alienArray.length; i++) {
    if (imgClicked === alienArray[i].name) {
      alienArray[i].votes++;
    }
  }
  // TODO: LIMIT VOTING ROUNDS TO 15
  votingRounds--;
  console.log(votingRounds);

  // TODO: Rerender of Imgs
  renderImg();

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
    alert('Voting is now over, please click the "Show Results" button under the images.');

    // * LOCAL STORAGE STARTS HERE *
    // ? Step 1: Convert data to a string for local storage

    let stringifiedAlienArray = JSON.stringify(alienArray);

    // ? Step 2: Set Stringified Alien Array to Local Storage
    localStorage.setItem('alienArray', stringifiedAlienArray);
  }
}
//renderImg();

// TODO: STOP THE ABILITY TO KEEP CLICKING AFTER VOTING ROUNDS ARE OVER AND GIVE RESULTS
function renderChart() {
  let votesArr = [];
  let nameArr = [];
  let viewsArr = [];
  for (let i = 0; i < alienArray.length; i++) {
    let alien = alienArray[i];
    votesArr.push(alien.votes);
    nameArr.push(alien.name);
    viewsArr.push(alien.views);
  }
  let chartObj = {
    type: 'horizontalBar',
    datasets: [
      {
        label: '# of Votes',
        data: votesArr,
        borderWidth: 1
      },
      {
        label: '# of Names',
        data: nameArr,
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: viewsArr,
        borderWidth: 1
      },
    ],
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            stepSize: 1,
          },
          gridLines: {
            display: false,
          }
        }]
      }
    }
  };

  let ctx = document.getElementById('my-chart').getContext('2d');
  let myChart = new Chart(ctx, chartObj);//eslint-disable-line

}

//renderImg();

console.log('ref1', alienArray);

imgContainer.addEventListener('click', handleImgClick);
resultsBtn.addEventListener('click', handleShowResults);


// if (votingRounds === 0) {
//   renderResults();
//   resultsBtn.removeEventListener('click', renderResults());
// };

// ? Get The Chat Working and Make Sure Images are not repeating. Tally Clicks.