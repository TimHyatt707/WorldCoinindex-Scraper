function PercentColor() {
  let arrayOfWidgets = document.querySelectorAll('.percentColor');
  for (let i = 0; i < arrayOfWidgets.length; i++) {
    if (arrayOfWidgets[i].innerHTML.includes('+')) {
      arrayOfWidgets[i].style.color = 'green';
    } else {
      arrayOfWidgets[i].style.color = 'red';
    }
  }
}
module.exports = PercentColor;
