const { div, p, img, button } = require('elementx');
let CoindexScraper = require('./../scrapers/CoindexPagescraper');

function Widgets(arg) {
  //Displays an alert if a user inputs a widget that already exists
  if (cardCheck(arg)) {
    return alert('That widget is already displayed!');
  } else {
    const node = div(
      { class: 'container widget' },
      div(
        { class: 'col s12 m4' },
        div(
          { class: 'card horizontal' },
          div(
            { class: 'card-image center ' },
            img({ src: arg.coinLogoUrl, alt: 'Image Missing' })
          ),
          div(
            { class: 'card-content parent' },
            p({ class: 'row coinName' }, arg.coinName),
            p({ class: 'row percentColor' }, arg.coinPercentage),
            p({ class: 'row' }, arg.coinPrice),
            p({ class: 'row' }, arg.dayHigh),
            p({ class: 'row' }, arg.dayLow),
            button(
              {
                class: 'updateBtn btn waves-effect waves-light green darken-2'
              },
              'Update'
            )
          )
        )
      )
    );
    let bottomRow = document.getElementById('bottomRow');
    bottomRow.appendChild(node);
    let percentColor = document.getElementsByClassName('percentColor');
    //Add event listener for update button
    let updateBtn = document.getElementsByClassName('updateBtn');
    for (let i = 0; i < updateBtn.length; i++) {
      updateBtn[i].addEventListener('click', () => {
        event.preventDefault();
        //When the user presses the update button, information is updated.
        updateButton(arg);
      });
    }
    let cardCounter = 0;
    for (let i = cardCounter; i < cardCounter + 1; i++) {
      if (percentColor[i].innerHTML.includes('+')) {
        percentColor[i].style.color = 'green';
        cardCounter++;
      } else {
        percentColor[i].style.color = 'red';
        cardCounter++;
      }
    }
  }
}
//check if the card is already displayed
function cardCheck(arg) {
  let arrayOfCoinNames = document.querySelectorAll('p.coinName');
  for (let i = 0; i < arrayOfCoinNames.length; i++) {
    if (arrayOfCoinNames[i].innerHTML === arg.coinName) {
      return true;
    }
  }
  return false;
}

function updateButton(arg) {
  let updateScraper = new CoindexScraper();
  let allWidgets = document.getElementsByClassName('parent');
  updateScraper
    .scrape(arg.coinUrl)
    .then(obj => {
      return obj;
    })
    .then(obj => {
      for (let i = 0; i < allWidgets.length; i++) {
        console.log(allWidgets);
        console.log('hi', allWidgets[i].childNodes[0].innerHTML);
        if (obj.coinName === allWidgets[i].childNodes[0].innerHTML) {
          allWidgets[i].childNodes[1].innerText = obj.coinPercentage;
          allWidgets[i].childNodes[2].innerText = obj.coinPrice;
          allWidgets[i].childNodes[3].innerHTML = obj.dayHigh;
          allWidgets[i].childNodes[4].innerHTML = obj.dayLow;
        }
      }
    });
}
module.exports = Widgets;
