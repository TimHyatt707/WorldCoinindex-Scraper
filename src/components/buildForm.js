const { div, form, button, textarea, label } = require('elementx');

function buildForm() {
  const node = div(
    { class: 'container' },
    div(
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
            {
              id: 'submit',
              class: 'btn waves-effect waves-light red darken-3'
            },
            'Submit'
          )
        )
      )
    )
  );
  document.body.appendChild(node);
}

module.exports = buildForm;
