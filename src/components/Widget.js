const { div, p, img, button } = require('elementx');
let CoindexPagescraper = require('./../scrapers/CoindexPagescraper');

function Widget(arg) {
  console.log(arg);
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

    //Add event listener for update button
    let updateBtn = node.querySelector('.updateBtn');
    updateBtn.addEventListener('click', () => {
      event.preventDefault();
      //When the user presses the update button, information is updated.
      updateButton(arg);
    });
    return node;
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
  let updateScraper = new CoindexPagescraper();
  let allWidgets = document.getElementsByClassName('parent');
  updateScraper
    .scrape(arg.coinUrl)
    .then(obj => {
      return obj;
    })
    .then(obj => {
      for (let i = 0; i < allWidgets.length; i++) {
        if (obj.coinName === allWidgets[i].childNodes[0].innerHTML) {
          allWidgets[i].childNodes[1].innerText = obj.coinPercentage;
          allWidgets[i].childNodes[2].innerText = obj.coinPrice;
          allWidgets[i].childNodes[3].innerHTML = obj.dayHigh;
          allWidgets[i].childNodes[4].innerHTML = obj.dayLow;
        }
      }
    });
}

module.exports = Widget;
