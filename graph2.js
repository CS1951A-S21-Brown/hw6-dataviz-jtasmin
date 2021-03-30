// graph 2: Scatter plot of sales of top publisher given a region
// (interactive) tooltip with top publisher data

// list of genres
var genreList = ["Action","Adventure","Fighting","Misc","Platform","Puzzle","Racing","Role-Playing",
                "Shooter","Simulation","Sports","Strategy"]

// create svg object
let scatter = d3.select("#graph2")
    .append("svg")
    .attr("width", graph_2_width+100)
    .attr("height",graph_2_height)
    .append("g")
    .attr("transform",
        `translate(${margin.left-80},${20})`)

// reading the data in
d3.csv("./data/top_publishers.csv").then(function(data) {

    // y-axis
    var y = d3.scaleLinear()
        .domain([0,620])
        .range([graph_2_height-margin.bottom,1])
    scatter.append("g")
        .call(d3.axisLeft(y)) // create x-axis

    // x-axis
    var x = d3.scaleBand()
        .range([1,graph_2_width])
        .domain(genreList)
        .paddingInner(1)
        .paddingOuter(.7)
    scatter.append("g")
        .attr("transform",`translate(0,${graph_2_height-margin.bottom})`)
        .call(d3.axisBottom(x)) // create y-axis

    // x-axis text

    // y-axis text
    y_axis_text = scatter.append("text")
        .attr("transform",`translate(${0},${-10})`)
        .style("text-anchor", "middle")
        .text("Units sold (mil)")
        .style("font-size","10px");

    // tooltip stuff
    var tooltip = d3.select("#graph2")
        .append("div")
        .style("opacity",0)
        .attr("class","tooltip")
        .style("background-color","#fff")
        .style("border","solid")
        .style("border-width","1px")
        .style("padding","10px")

    // changes tooltip when hovering over a point
    var mouseOver = function(d) {
        d3.select(this) 
            .style("stroke","#ECB7AC")
            .style("stroke-width","8px")
        tooltip.style("opacity",1)
    }

    var mouseMove = function(d) {
        tooltip
        .html("Genre: "+d.Genre+
        "<br>Top Publisher: "+d.Top_Publisher+
        "<br>Global Sales: "+d.Global_Sales+"mil")
        .style("left", (d3.mouse(this)[0])+"px")
        .style("top", (d3.mouse(this)[1]+350)+"px")
    }

    var mouseLeave = function(d) {
        d3.select(this) 
            .style("stroke","transparent")
            .style("stroke-width","0px")
        tooltip
            .style("opacity",0)
    }

    // adding the points on the plot
    scatter.append("g")
        .selectAll("dot")
        .data(data)
        .enter().append("circle")
            .attr("cx",function(d) { return x(d.Genre) })
            .attr("cy",function(d) { return y(d.Global_Sales) })
            .attr("r",6) // size
            .style("fill", function(d) { if(d.Top_Publisher == "Activision")
                                            return "#C56B59" 
                                        else if(d.Top_Publisher == "Nintendo")
                                            return "#E08C7B"
                                        else if(d.Top_Publisher == "THQ")
                                            return "#994636" 
                                        else
                                            return "#ECB7AC" })
                                        
            .style("opacity",1) // opacity of dot
        .on("mouseover",mouseOver)
        .on("mousemove",mouseMove)
        .on("mouseleave",mouseLeave)
    
})

// legend
scatter.append("circle")
    .attr("cx",20)
    .attr("cy",20)
    .attr("r", 6)
    .style("fill", "#ECB7AC")
scatter.append("text")
    .attr("x", 30)
    .attr("y", 20)
    .text("Electronic Arts")
    .style("font-size", "9px")
    .attr("alignment-baseline","middle")


scatter.append("circle")
    .attr("cx",20)
    .attr("cy",40)
    .attr("r", 6)
    .style("fill", "#E08C7B")
scatter.append("text")
    .attr("x", 30)
    .attr("y", 40)
    .text("Nintendo")
    .style("font-size", "9px")
    .attr("alignment-baseline","middle")

scatter.append("circle")
    .attr("cx",20)
    .attr("cy",60)
    .attr("r", 6)
    .style("fill", "#C56B59")
scatter.append("text")
    .attr("x", 30)
    .attr("y", 60)
    .text("Activision")
    .style("font-size", "9px")
    .attr("alignment-baseline","middle")

scatter.append("circle")
    .attr("cx",20)
    .attr("cy",80)
    .attr("r", 6)
    .style("fill", "#994636")
scatter.append("text")
    .attr("x", 30)
    .attr("y", 80)
    .text("THQ")
    .style("font-size", "9px")
    .attr("alignment-baseline","middle")


