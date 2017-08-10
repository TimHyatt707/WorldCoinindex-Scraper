function PercentColor() {
  let arrayOfWidgets = document.querySelectorAll('.percentColor');
  console.log(arrayOfWidgets[0].innerHTML);
  for (let i = 0; i < arrayOfWidgets.length; i++) {
    if (arrayOfWidgets[i].innerHTML.includes('+')) {
      arrayOfWidgets[i].style.color = 'green';
    } else {
      arrayOfWidgets[i].style.color = 'red';
    }
  }
}
module.exports = PercentColor;
