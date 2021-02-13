'user strict';

// Global Variables
let totalClicks = 0;
let clickAllowed = 25;
let allGoats = [];
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');

function Goat(name, fileExtension = '.jpg'){
  this.name = name; // change from name to title (in lab)
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
  allGoats.push(this);
}

new Goat('bunny-goat', 'png');
new Goat('cool-goat');
new Goat('crusin-goat');
new Goat('float-your-goat');
new Goat('kissing-goat');
new Goat('lucky-goat');
new Goat('sassy goat');
new Goat('smiling-goat');
new Goat('sweater-goat');

function getRandomIndex(){
  return Math.floor(Math.random() * allGoats.length);
}

function renderGoats(){
  let firstGoatIndex = getRandomIndex();
  let secondGoatIndex = getRandomIndex();
  // in lab today Ryan recommends using an array. 
  // maybe name it indexArray
  // check to see if the index is included in that array
  // pop those results from the array or shift? maybe?
  while (firstGoat === secondGoat){
    secondGoat = getRandomIndex();
  }

  imageOne.src = allGoats[firstGoatIndex].src;
  imageOne.title = allGoats[firstGoatIndex].name; // it will be assigned as image one title (change name in lab)
  allGoats[firstGoatIndex].views++

  imageTwo.src = allGoats[secondGoatIndex].src;
  imageTwo.title = allGoats[secondGoatIndex].name;
  allGoats[secondGoatIndex].views++;
}

function renderResults(){
// "bunny-goat was viewed 5 times and clicked 4 times"
  let myList = document.querySelector('ul');
  for (let i = 0; i<allGoats.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allGoat[i].name} had ${allGoats[i].views} votes, and was seen ${allGoat[i].clicks} times`;
    myList.appendChild(li);
  }

}
function handleClick(event){
  if (event.target === section){
    alert('Please click an image and FOLLOW INSTRUCTIONS');
    break;
  }
  totalClicks++;
  let goatClicked = event.target.title;

  for(let i = 0; i< allGoats.length; i++)
    if(goatClicked === allGoats[i].name) {
      allGoats[i].clicks++; 
    }
  }  

  renderGoats();
  if (totalClicks === clicksAllowed) {
    // REMOVE EVENT LISTENER
    myContainer.removeEventListener('click', handleClick);
    renderResults();
  }

}

function handleButtonClick(event){
  console.log('I was clicked');
  if(totalClicks === clicksAllowed){
    renderResults();
  }
}

renderGoats();


myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', handleButtonClick);