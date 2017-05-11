# a3-software-design
INFO 474 a3-software-design

## Circle Packing Chart

Circle packing charts are useful for desplaying hierarchical sets of data. 

<br />


### Data Prep
You will need to load your data into your project and nest it using the d3.nest() function if it is not nested already.
Specify the key as the property you want the data to be grouped by. For example:
```
    var nestedData = d3.nest()
        .key(function(d) {
            return d.region;
        })
        .entries(data);
```
This will group the data by region.

<br />


### Using the chart
1. Import CirclePack.js into your project
2. Call CirclePack() to get the function for building the charts
```
    var myChart = CirclePack()
```

3. Select the div where you want to place the chart and bind the data to it, then call the chart function.
Note: your data must be passed as a one-element array.
```
    var chartWrapper = d3.select('#vis').datum([data]).call(myChart);
```

4. Call methods on CirclePack() to customize the chart. For example:
```
    myChart.height(750)
    myChart.width(750)
```

5. To change the data you want to display, bind the new data to you chart wrapper element and call the chart function on it.
```
    chartWrapper.datum([newDataSet]).call(myChart);
```
<br />


### CirclePack functions

CirclePack()
> Constructs a Circle Packing Chart and returns itself.

CirclePack.width(value)
> If no argument is given, returns the current width of the chart.
If a value is given, it sets the chart width to that value and returns the chart.
The default value is 800.

CirclePack.height(value)
> If no argument is given, returns the current height of the chart.
If a value is given, it sets the chart height to that value and returns the chart.
The default value is 800.

CirclePack.padding(value)
> If no argument is given, returns the current padding between the circles in the chart.
If a value is given, it sets the padding between the circles in the chart to that value and returns the chart.
The default value is 0.

CirclePack.circleScale(value)
> If no argument is given, returns the current factor for sizing the circles in the chart.
If a value is given, it sets the factor for sizing the circles to that value and returns the chart. 
The default value is 5.

CirclePack.colors(value)
> If no argument is given, returns the color scale of the chart.
If a value is given, it sets the color scale to that value and returns the chart.
The default value is d3.schemeCategory10.

CirclePack.title(value)
> If no argument is given, returns the title of the chart.
If a value is given, it sets the title of the chart to that value and returns the chart.
The default value is 'My CirclePack'.