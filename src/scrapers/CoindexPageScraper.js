class CoindexPageScraper {
  // fetchURL(url) {
  scrape(url) {
    const myInit = { header: { origin: null } };
    return fetch(url, myInit)
      .then(result => {
        return result.text();
      })
      .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        return this.scraper(doc);
      })
      .catch(err => {
        return console.log('Something went wrong', err);
      });
  }
  scraper(doc) {
    let marketTable = doc.getElementById('market-table');
    let tBody = marketTable.childNodes[3];
    let tRow = tBody.childNodes[1];
    let coinName = tRow.childNodes[3].childNodes[1].innerHTML;
    let coinPercentage = tRow.childNodes[9].childNodes[0].innerHTML;
    let foo = tRow.childNodes[1].childNodes[1].src;
    if (foo.startsWith('http://local')) {
      foo = foo.slice(22);
    }
    let coinLogoUrl = 'https://www.worldcoinindex.com/' + foo;
    let coinPriceDollars = tRow.childNodes[7].innerText.trim();
    let coinPrice = this.trimCoinPrice(coinPriceDollars);
    let dayHigh = tRow.childNodes[11].childNodes[1].innerHTML.trim();
    dayHigh = this.trimCoinHighLow(dayHigh);
    let dayLow = tRow.childNodes[13].childNodes[1].innerHTML.trim();
    dayLow = this.trimCoinHighLow(dayLow);
    return {
      coinName, // ES6 shortcut coinName: coinName
      coinPercentage: `24Hr Change: ` + coinPercentage,
      coinLogoUrl,
      coinPrice: `Price: ` + coinPrice,
      dayHigh: `24Hr High: ` + dayHigh,
      dayLow: `24Hr Low: ` + dayLow
    };
  }
  //helper method to fix coin price bug
  trimCoinPrice(arg) {
    arg = arg.slice(3);
    let result = parseFloat(arg);
    if (result < 0.01) {
      result = '$' + result.toFixed(8) + ` It's worth less than a penny!`;
    } else {
      result = '$' + result.toFixed(2);
    }
    return result;
  }
  trimCoinHighLow(arg) {
    arg = arg.slice(0);
    let result = parseFloat(arg);
    if (result < 1) {
      result = '$' + result.toFixed(8);
    } else {
      result = '$' + result.toFixed(2);
    }
    return result;
  }
}

module.exports = CoindexPageScraper;
