const { div, span, nav } = require('elementx');

function Navbar() {
  const node = nav(
    div(
      { class: 'nav-wrapper grey darken-4' },
      span(
        { href: '#', class: 'brand-logo' },
        'Cryptocurrency Widget Generator'
      )
    )
  );
  return node;
}

module.exports = Navbar;
