// graph 2: (tooltip) showing the top genre in each region if you want to implement a map
let map2 = d3.select("#graph3")
    .append("svg")
    .attr("width", graph_3_width)
    .attr("height", graph_3_height-50)
    .attr("transform",`translate(${-20},${margin.top-margin.bottom})`);

// initialise projection, path, g
var projection = d3.geoMercator()
    .scale(graph_3_width / 2 / Math.PI)
    // graph_2_width / 2 / Math.PI
    .translate([graph_3_width / 2, graph_3_height / 2]);
var path = d3.geoPath().projection(projection);
var g = map2.append("g");

// create country names, publisher, id object
const countryNames = [];
d3.csv("../data/top_genre.csv").then(function(csvData) {
    csvData.forEach(function(d) {
        let element = {id: d.iso_n3, name: d.name, publisher: d.publisher, genre: d.genre};
        countryNames.push(element);
    });
})

// console.log(countryNames);

// load in map data, which has been joined with top_publishers data that was preprocessed
// with top publishers and top genre broken down by region
d3.json("../data/world-110m2.json").then(function(topology) {
    g.selectAll("path")
        .data(topojson.feature(topology,topology.objects.countries).features)
        .enter().append("path")
        .attr("class","country")
        .attr("d",path)
        .append("title")
            .text(function(d) {
                function checkID(elt) { return elt.id == d.id } // check if IDs are equal
                const countryObj = countryNames.find(checkID)
                // console.log(countryObj)
                return countryObj['name']+", Top Genre: "+countryObj['genre'];
            })
});

