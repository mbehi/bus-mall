'user strict';

console.log('Hello, this is Mohsin!');

// Global Variables
let totalClicks = 0;
let clicksAllowed = 2;
let allProducts = [];

let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');

// let myContainer = document.querySelector('main > section')
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');


function Product(name, fileExtension = 'jpg'){
  this.name = name; // change from name to title (in lab)
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

// This is the function for the product randomization process.

function getRandomIndex(){
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts(){
  let productIndexArray = [];
  let firstProductIndex = getRandomIndex();
  let secondProductIndex = getRandomIndex();
  let thirdProductIndex = getRandomIndex();
  // in lab today Ryan recommends using an array.
  // maybe name it indexArray
  // check to see if the index is included in that array
  // pop those results from the array or shift? maybe?
  while (firstProductIndex === secondProductIndex){
    firstProductIndex = getRandomIndex();
  }
  while (firstProductIndex === thirdProductIndex){
    thirdProductIndex = getRandomIndex();
  }
  while (secondProductIndex === thirdProductIndex){
    secondProductIndex = getRandomIndex();
  }

 // example = [1, 2, 3]
  // function renderProducts(){
  //   while (productIndexArray.length < 3) {
  //     let randomNumber = getRandomIndex();
  //   while (!productIndexArray.includes(randomNumber)){
  //     productIndexArray.push(randomNumber);
  //   }
  // }

  // let firstProductIndex = productIndexArray.pop(); // assign 3 to variable. last number in array, 2 numbers left
  // let secondProductIndex = productIndexArray.pop(); // assign 2 to variable, 1 thing left in array
  // let thirdProductIndex = productIndexArray.pop(); // assign 1 to variable, array is now empty

  
  // you can turn this into a functon to meet the DRY method. by refactoring
  imageOne.src = allProducts[firstProductIndex].src;
  imageOne.title = allProducts[firstProductIndex].name; // it will be assigned as image one title (change name in lab)
  allProducts[firstProductIndex].views++;

  imageTwo.src = allProducts[secondProductIndex].src;
  imageTwo.title = allProducts[secondProductIndex].name;
  allProducts[secondProductIndex].views++;

  imageThree.src = allProducts[thirdProductIndex].src;
  imageThree.title = allProducts[thirdProductIndex].name;
  allProducts[thirdProductIndex].views++;
}

function renderResults(){
// "bunny-goat was viewed 5 times and clicked 4 times"
  let myList = document.querySelector('ul');
  for (let i = 0; i<allProducts.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} votes, and was seen ${allProducts[i].clicks} times`;
    myList.appendChild(li);
  }
}

function handleClick(event){
  // if (event.target === myContainer){
  //   alert('Please click an image and FOLLOW INSTRUCTIONS');
  // }
  totalClicks++;
  let productsClicked = event.target.title;

  for(let i = 0; i< allProducts.length; i++)
    if(productsClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
}

renderProducts();
if (totalClicks === clicksAllowed) {
// // REMOVE EVENT LISTENER
  myContainer.removeEventListener('click', handleClick);
  // renderResults();
}


// function handleButtonClick(event){
//   // console.log('I was clicked');
//   if(totalClicks === clicksAllowed){
//     renderResults();
//   }
}

renderProducts();


myContainer.addEventListener('click', handleClick);
myButton.addEventListener('click', function (event){
  if (totalClicks === clicksAllowed! {
    renderResults();
  }
}
