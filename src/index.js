let CoindexPageScraper = require('./scrapers/CoindexPagescraper');
let Widgets = require('./components/Widgets');
let Navbar = require('./components/Navbar');
let Form = require('./components/Form');
// let Navbar = require('./components/Navbar');
// let Form = require('./components/Form');

addEventListener('DOMContentLoaded', main);

function main() {
  let $root = document.getElementById('root');
  $root.appendChild(Navbar());
  $root.appendChild(Form());
  let submit = document.getElementById('submit');
  let formInput = document.getElementById('textarea1');
  submit.addEventListener('click', () => {
    event.preventDefault();
    let scraper = new CoindexPageScraper();
    scraper.scrape(formInput.value).then(data => {
      Widgets(data);
    });
  });
}
