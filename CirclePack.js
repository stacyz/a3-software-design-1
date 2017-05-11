function CirclePack() {
    // default properties
    var width = 800,
        height = 800,
        margin = {
                top: 40,
                right: 10,
                bottom: 10,
                left: 10
        },
        padding = 0,
        circleScale = 5,
        title = 'My CirclePack',
        colors = d3.schemeCategory10;

    // generate chart
    function myChart(selection) {
        // pack function that will compute layout given the data structure
        var pack = d3.pack()
            .size([width - margin.left, height - margin.top])
            .padding(padding);

        var root = d3.hierarchy(data)
            .eachBefore(function(d) {
                d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
            })
            .sum(function(d) {
                return +d.size;
            })
            .sort(function(a, b) {
                return b.value - a.value;
            });

        var colorScale = d3.scaleOrdinal().domain([-1, 0, 1]).range(colors);

        // iterate through selections
        selection.each(function(data) {
            var svg = d3.select(this)
                .selectAll('svg')
                .data([root]);

            var svgEnter = svg.enter()
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            svgEnter.append('text')
                .attr('x', width / 2)
                .attr('y', margin.top)
                .style('text-anchor', 'middle')
                .text(title);

            svgEnter.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .attr('class', 'chart');
            
            // build circle pack data structure
            pack(root);

            var circles = d3.select(this).select('.chart')
                .selectAll('circle')
                .data(root.leaves());

            circles.enter().append('circle')
                .merge(circles)
                .attr('class', 'circle')
                .transition().duration(2000)
                .attr('r', function(d) { return d.r * circleScale; })
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('fill', function(d) {
                    console.log(d.data.name)
                    return colorScale(d.data.name);
                });

            circles.exit().remove();

        });
    }


    // function to get or set width property
    myChart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return myChart;
    }

    // function to get or set height property
    myChart.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return myChart;
    }

    // function to get or set padding property
    myChart.padding = function(value) {
        if (!arguments.length) return padding;
        padding = value;
        return myChart;
    }

    // function to get or set circleScale property
    myChart.circleScale = function(value) {
        if (!arguments.length) return circleScale;
        circleScale = value;
        return myChart;
    }

    // function to get or set color property
    myChart.colors = function(value) {
        if (!arguments) return colors;
        colorScale = value;
        return myChart;
    }

    // function to get or set chart title
    myChart.title = function(value) {
        if (!arguments) return title;
        title = value;
        return myChart;
    }

    return myChart;
}