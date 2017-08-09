let CoindexScraper = require('./scrapers/CoindexPagescraper');
let widgetFactory = require('./components/widgetFactory');
let buildNavbar = require('./components/buildNavbar');
let buildForm = require('./components/buildForm');

addEventListener('DOMContentLoaded', main);

function main() {
  buildNavbar();
  buildForm();
  let submit = document.getElementById('submit');
  let formInput = document.getElementById('textarea1');
  submit.addEventListener('click', () => {
    event.preventDefault();
    let scraper = new CoindexScraper();
    // let result = scraper.fetchURL(
    //   'http://cors-bypass-proxy.axiomlogic.com/' + formInput.value
    // );
    // console.log(result);
    scraper.scrape(formInput.value).then(data => {
      widgetFactory(data);
    });
  });
}
