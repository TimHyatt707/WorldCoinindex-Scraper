class CoindexPageScraper {
  // fetchURL(url) {
  scrape(url) {
    return fetch(`http://cors-anywhere.herokuapp.com/${url}`)
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
    let coinPrice;
    let dayHigh;
    let dayLow;
    let coinName =
      doc.querySelector('.bitcoinName').querySelector('h1').innerHTML ||
      'Empty';
    let coinPercentage =
      doc.querySelector('.coin-percentage').querySelector('span').innerHTML ||
      'Empty';
    let coinUrl = `https://www.worldcoinindex.com/coin/` + coinName || 'Empty';
    let coinLogoUrl =
      `https://www.worldcoinindex.com/Content/img/coins/v-636096405508202311/` +
        coinName +
        '.png' || 'Empty';
    let coinPriceBitcoin =
      doc.querySelector('.span-coinprice').innerHTML || 'Empty';
    //If statement that fixes a bug with the currency displayed
    if (coinPriceBitcoin.includes('$') !== true) {
      coinPrice = 'Ƀ' + coinPriceBitcoin;
      dayHigh = doc
        .querySelector('.coin-high')
        .querySelector('span')
        .innerHTML.trim();
      dayHigh = ' Ƀ' + dayHigh || 'Empty';
      dayLow = doc
        .querySelector('.coin-low')
        .querySelector('span')
        .innerHTML.trim();
      dayLow = ' Ƀ' + dayLow || 'Empty';
    } else {
      let coinPriceInDollars = arg => {
        arg = arg.slice(3);
        let result = parseFloat(arg);
        if (result < 0.01) {
          result = '$' + result.toFixed(8);
        } else {
          result = '$' + result.toFixed(2);
        }
        return result;
      };
      coinPrice = coinPriceInDollars(coinPriceBitcoin.trim()) || 'Empty';
      dayHigh = doc
        .querySelector('.coin-high')
        .querySelector('span')
        .innerHTML.trim();
      dayHigh = this.trimCoinHighLow(dayHigh) || 'Empty';
      dayLow = doc
        .querySelector('.coin-low')
        .querySelector('span')
        .innerHTML.trim();
      dayLow = this.trimCoinHighLow(dayLow) || 'Empty';
    }
    return {
      coinName, // ES6 shortcut coinName: coinName
      coinPercentage: `24Hr Change: ` + coinPercentage,
      coinLogoUrl,
      coinPrice: `Price: ` + coinPrice,
      dayHigh: `24Hr High: ` + dayHigh,
      dayLow: `24Hr Low: ` + dayLow,
      coinUrl
    };
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
