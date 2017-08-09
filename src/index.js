let CoindexScraper = require('./scrapers/CoindexPagescraper.js');
const {
  div,
  img,
  p,
  nav,
  a,
  textarea,
  label,
  i,
  button,
  form
} = require('elementx');

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

function widgetFactory(arg) {
  const node = div(
    { class: 'container' },
    div(
      { class: 'card horizontal' },
      div(
        { class: 'card-image center' },
        img({ src: arg.coinLogoUrl, alt: 'Image Missing' })
      ),
      div(
        { class: 'card-content' },
        p({ class: 'row' }, arg.coinName),
        p({ class: 'row' }, arg.coinPercentage),
        p({ class: 'row' }, arg.coinPrice),
        p({ class: 'row' }, arg.dayHigh),
        p({ class: 'row' }, arg.dayLow)
      )
    )
  );
  document.body.appendChild(node);
}

function buildNavbar() {
  const node = nav(
    div(
      { class: 'nav-wrapper grey darken-4' },
      a(
        { href: '#', class: 'brand-logo text-white' },
        'Cryptocurrency Widget Generator'
      )
    )
  );
  document.body.appendChild(node);
}

function buildForm() {
  const node = div(
    { class: 'row' },
    form(
      { class: 'col s12' },
      div(
        { class: 'row' },
        div(
          { class: 'input-field col s12' },
          textarea({ id: 'textarea1', class: 'materialize-textarea' }),
          label({ for: 'textarea' }, 'Input a URL to make a widget!')
        )
      ),
      div(
        { class: 'container row' },
        button(
          { id: 'submit', class: 'btn waves-effect waves-light red darken-3' },
          'Submit'
        )
      )
    )
  );
  document.body.appendChild(node);
}
