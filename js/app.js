'user strict';

// Global Variables
let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
let indexArray = [];
let uniqueImageCount = 6;

let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myContainer = document.querySelector('section');


// Constructor
function Product(name, fileExtension = 'jpg'){
  this.name = name; // change from name to title (in lab)
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

// Local Storage
let retrieveProduct = localStorage.getItem('product');
if (retrieveProduct) {
  let parsedProduct = JSON.parse(retrieveProduct);
  allProducts = parsedProduct;
} else {
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
}

// This is the function for the product randomization process.
function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  while (indexArray.length < uniqueImageCount) {
    let randomIndex = getRandomIndex();
    while (!indexArray.includes(randomIndex)) {
      indexArray.unshift(randomIndex);
    }
  }

  let firstProductIndex = indexArray.pop();
  let secondProductIndex = indexArray.pop();
  let thirdProductIndex = indexArray.pop();

  imageOne.src = allProducts[firstProductIndex].src;
  imageOne.title = allProducts[firstProductIndex].name;
  allProducts[firstProductIndex].views++;

  imageTwo.src = allProducts[secondProductIndex].src;
  imageTwo.title = allProducts[secondProductIndex].name;
  allProducts[secondProductIndex].views++;

  imageThree.src = allProducts[thirdProductIndex].src;
  imageThree.title = allProducts[thirdProductIndex].name;
  allProducts[thirdProductIndex].views++;
}
renderProducts();

function handleButtonClick(event){
  totalClicks++;
  let clickedItem = event.target.title;
  console.log(clickedItem);
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedItem === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderProducts();

  if(totalClicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleButtonClick);
    let stringifyAllProducts = JSON.stringify(allProducts);
    localStorage.setItem('catalog-items',stringifyAllProducts);
    renderChart();
  }
}

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }
  let chartObject = {
    type: 'bar', // chart type
    // Data
    data: {
      labels: productNames,
      datasets: [{
        label: 'Total Number of Views',
        data: productViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Total Number of Clicks',
        data: productClicks,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
      }]
    },
    responsive: true,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart (ctx, chartObject);
}
myContainer.addEventListener('click', handleButtonClick);
