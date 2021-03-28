// graph 1: bar plot of top 10 video games of a year all time
const NUM_EXAMPLES = 10;


// Set up SVG object with width, height and margin
let barplot = d3.select("#graph1")
    .append("svg")
    .attr("width", graph_1_width)
    .attr("height", graph_1_height)
    .append("g")
    .attr("transform", `translate(${margin.left+50}, ${margin.top})`);

// Parse the data
d3.csv("../data/video_games.csv").then(function(d) {
    data = d;
});

// Create a linear scale for x axis
let x_axis = d3.scaleLinear()
    .range([0, graph_1_width - margin.left - margin.right]);

// Create a scale band for the y axis (artist / song)
let y_axis = d3.scaleBand()
    .range([0, graph_1_height - margin.top - margin.bottom])
    .padding(0.1);  // Improves readability

// create global references to update domain of axis in the setData function based on data

// reference to count SVG group
let countRef = barplot.append("g");
// set up reference to y-axis label so we can update text in setData
let y_axis_label = barplot.append("g");

// add x-axis label - BOTTOM MIDDLE
barplot.append("text")
    .attr("transform", `translate(${(graph_1_width - margin.left-margin.right)/2+10},
            ${(graph_1_height-margin.top-margin.bottom-175)})`)
    .style("text-anchor","middle")
    .text("Millions of units sold");

// add y-axis label - CENTER LEFT
y_axis_text = barplot.append("text")
    .attr("transform",`translate(${-40},${-10})`)
    .style("text-anchor", "middle")
    .text("Game Name")
    .style("font-size","10px");

// add chart title
let title = barplot.append("text")
    .attr("transform",`translate(${(graph_1_width - margin.left - margin.right)/2},${graph_1_height-margin.top-3})`)
    .style("text-anchor","middle")
    .style("font-size",15);

// setData function sets which data to use on the bar plot depending on data sources + attribute
function setData(index,attr) {

    // choosing which dataset to use
    if (index == 0)
        d3.csv("./data/video_games.csv").then(function(data) {
                // color
        let color = d3.scaleOrdinal()
            .domain(data.map(function(d) { return d.Name }))
            .range(d3.quantize(d3.interpolateHcl("#994636","#ECB7AC"), 16));

            // clean and strip desired amount of data
            data = cleanData(data,function(a,b) {
                return parseInt(b.Global_Sales)-parseInt(a.Global_Sales)
            }, NUM_EXAMPLES);
            // updating x-axis domain with max count of provided data
            x_axis.domain([0,d3.max(data,function(d){ return parseInt(d.Global_Sales); })]);
            // update y-axis domain with attribute
            y_axis.domain(data.map(function(d){ return d.Name }));
            // render y-axis label
            y_axis_label.call(d3.axisLeft(y_axis).tickSize(0).tickPadding(10));

    
            // select bars in the DOM, count+parse, create new elements for each value
            let bars = barplot.selectAll("rect").data(data);
            // render bar elements on the DOM
            bars.enter()
                .append("rect")
                .merge(bars)
                .transition()
                .duration(1000)
                .attr("fill",function(d) {return color(d[attr])})
                .attr("x", x_axis(0))
                .attr("y", function(d) { return y_axis(d.Name); }) 
                .attr("width", function(d) { return x_axis(parseInt(d.Global_Sales)); })
                .attr("height",  y_axis.bandwidth())
                .attr("fill", function(d) { return color(d.Global_Sales) });

            // displaying counts of global sales on bar plots (instead of axis)
            let counts = countRef.selectAll("text").data(data);
    
            // render text elements on the DOM
            counts.enter()
                .append("text")
                .merge(counts)
                .transition()
                .duration(1000)
                .attr("x", function(d) { return x_axis(d.Global_Sales) + 3})
                .attr("y", function(d) { return y_axis(d.Name) + 12 })
                .style("text-anchor", "start")
                .text(function(d) { return d.Global_Sales });

             // Remove elements not in use if fewer groups in new dataset
            bars.exit().remove();
            counts.exit().remove();
        });
    else if (index == 1)
            // filter data
        d3.csv("./data/video_games.csv").then(function(data) {

            let color = d3.scaleOrdinal()
                .domain(data.map(function(d) { return d.Name }))
                .range(d3.quantize(d3.interpolateHcl("#994636","#ECB7AC"), 16));

            data = data.filter(function(row) { return (row['Year'] >= 2000) && (row['Year'] <= 2009); })       
            data = cleanData(data,function(a,b) {
                return parseInt(b.Global_Sales)-parseInt(a.Global_Sales)
            }, NUM_EXAMPLES);
            // updating x-axis domain with max count of provided data
            x_axis.domain([0,d3.max(data,function(d){ return parseInt(d.Global_Sales); })]);
            // update y-axis domain with attribute
            y_axis.domain(data.map(function(d){ return d.Name }));
            // render y-axis label
            y_axis_label.call(d3.axisLeft(y_axis).tickSize(0).tickPadding(10));
            
    
            // select bars in the DOM, count+parse, create new elements for each value
            let bars = barplot.selectAll("rect").data(data);
            // render bar elements on the DOM
            bars.enter()
                .append("rect")
                .merge(bars)
                .transition()
                .duration(1000)
                .attr("x", x_axis(0))
                .attr("y", function(d) { return y_axis(d.Name); }) 
                .attr("width", function(d) { return x_axis(parseInt(d.Global_Sales)); })
                .attr("height",  y_axis.bandwidth())
                .attr("fill", function(d) { return color(d.Global_Sales) });
            // displaying counts of global sales on bar plots (instead of axis)
            let counts = countRef.selectAll("text").data(data);
    
            // render text elements on the DOM
            counts.enter()
            .append("text")
            .merge(counts)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return x_axis(d.Global_Sales)+3 })
            .attr("y", function(d) { return y_axis(d.Name) + 12 })
            .style("text-anchor", "start")
            .text(function(d) { return d.Global_Sales });  // get the rank
    
        });
    else if (index == 2)
    // filter data
    d3.csv("./data/video_games.csv").then(function(data) {
        // color
        let color = d3.scaleOrdinal()
            .domain(data.map(function(d) { return d.Name }))
            .range(d3.quantize(d3.interpolateHcl("#994636","#ECB7AC"), 16));

        data = data.filter(function(row) { return (row['Year'] >= 1990) && (row['Year'] <= 1999); })       
        data = cleanData(data,function(a,b) {
            return parseInt(b.Global_Sales)-parseInt(a.Global_Sales)
        }, NUM_EXAMPLES);
        // updating x-axis domain with max count of provided data
        x_axis.domain([0,d3.max(data,function(d){ return parseInt(d.Global_Sales); })]);
        // update y-axis domain with attribute
        y_axis.domain(data.map(function(d){ return d.Name }));
        // render y-axis label
        y_axis_label.call(d3.axisLeft(y_axis).tickSize(0).tickPadding(10));

        // select bars in the DOM, count+parse, create new elements for each value
        let bars = barplot.selectAll("rect").data(data);
        // render bar elements on the DOM
        bars.enter()
            .append("rect")
            .merge(bars)
            .transition()
            .duration(1000)
            .attr("x", x_axis(0))
            .attr("y", function(d) { return y_axis( d.Name); }) 
            .attr("width", function(d) { return x_axis(parseInt(d.Global_Sales)); })
            .attr("height",  y_axis.bandwidth())
            .attr("fill", function(d) { return color(d.Global_Sales)});
        // displaying counts of global sales on bar plots (instead of axis)
        let counts = countRef.selectAll("text").data(data);

        // render text elements on the DOM
        counts.enter()
            .append("text")
            .merge(counts)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return x_axis(d.Global_Sales) + 2})
            .attr("y", function(d) { return y_axis(d.Name) +12 })
            .style("text-anchor", "start")
            .text(function(d) { return d.Global_Sales }); 

    });
}

// clean data function
function cleanData(data, comparator, numExamples) {
    return data.sort(comparator).slice(0, numExamples);
}
  

// on page load, render bar plot with all-time data
setData(0,"Name"); 