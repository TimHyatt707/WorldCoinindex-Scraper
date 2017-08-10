let CoindexPageScraper = require('./scrapers/CoindexPagescraper');
let Widgets = require('./components/Widgets');
let Navbar = require('./components/Navbar');
let Form = require('./components/Form');
let Row = require('./components/Row');
let PercentColor = require('./components/PercentColor');
// let Navbar = require('./components/Navbar');
// let Form = require('./components/Form');

addEventListener('DOMContentLoaded', main);

function main() {
  let $root = document.getElementById('root');
  $root.appendChild(Navbar());
  $root.appendChild(Form());
  $root.appendChild(Row());
  let submit = document.getElementById('submit');
  let formInput = document.getElementById('textarea1');
  let row = document.getElementById('row');
  submit.addEventListener('click', () => {
    event.preventDefault();
    let scraper = new CoindexPageScraper();
    scraper.scrape(formInput.value).then(data => {
      row.appendChild(Widgets(data));
      PercentColor();
    });
  });
}
