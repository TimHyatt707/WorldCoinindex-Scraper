const { div, p, img } = require('elementx');

function widgetFactory(arg) {
  const node = div(
    { class: 'container row col s12 m6' },
    div(
      { class: 'col s12 m6' },
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
    )
  );
  document.body.appendChild(node);
}
module.exports = widgetFactory;
