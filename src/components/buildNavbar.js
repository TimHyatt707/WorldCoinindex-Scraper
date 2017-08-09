const { div, span, nav } = require('elementx');

function buildNavbar() {
  const node = nav(
    div(
      { class: 'nav-wrapper grey darken-4' },
      span(
        { href: '#', class: 'brand-logo' },
        'Cryptocurrency Widget Generator'
      )
    )
  );
  document.body.appendChild(node);
}

module.exports = buildNavbar;
