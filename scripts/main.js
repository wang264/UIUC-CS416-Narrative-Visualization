// initialise fullpage.js
new fullpage('#fullpage', {
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  anchors: ['charts'],
  sectionsColor: ['#ebfaf7'],
  autoScrolling: true,
  fitToSection: true,
  slidesNavigation: true,
  slidesNavPosition: 'bottom',

  scrollOverflow: true,

  // events
  afterSlideLoad: function(section, origin, destination, direction) {

    var numberOfIntroduction = 2;
    var numberOfCharts=6
    if (destination.index < numberOfIntroduction || destination.index > numberOfIntroduction + numberOfCharts) {
      return;
    }
    console.log(destination.index - numberOfIntroduction+1)

    var chartFunc = charts['chart' + (destination.index - numberOfIntroduction + 1)];
    chartFunc();
  },
  onSlideLeave: function(section, origin, destination, direction) {
    if (destination.index === 9) {
    }
  }
});
// use local object to cache json response
charts.storage = {};
// @param callback: a function that works on k, i.e. of the form function(k) {}
d3.cachedJson = function(url, key, callback) {
	if (charts.storage[key]) {
		// data is in the storage
		callback(JSON.parse(charts.storage[key]));
	} else {
		// not cached, fetch the data from url
		d3.json(url, function(json) {
      charts.storage[key] = JSON.stringify(json);
      callback(json);
    });
	}
}