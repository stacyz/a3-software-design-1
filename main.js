$(function() {
	d3.csv('prepped_data.csv', function(error, data) {
		// var prepData = d3.nest()
		// 	.key(function(d) { return d.CRIME_TYPE; })
		// 	.rollup(function(d) {
		// 		return d3.sum(d, function(g) { return g.STAT_VALUE; });
		// 	}).entries(data);

		var nestedData = d3.nest()
			.key(function(d) {
				return d.region;
			}).entries(data);

		console.log(nestedData);
		var circlePack = CirclePack();

		var chart = d3.select('#vis')
			.data([nestedData])
			.call(circlePack);
	});
});