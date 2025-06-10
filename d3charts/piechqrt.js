<!DOCTYPE html>
<meta charset="utf-8">

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- Create a div where the graph will take place -->
<div id="my_dataviz"></div>

<script>
// Set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the div
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${width/2 + margin.left},${height/2 + margin.top})`);

// Replace this with your actual data
var data = [
  {name: "Category A", value: 30},
  {name: "Category B", value: 20},
  {name: "Category C", value: 15},
  {name: "Category D", value: 10},
  {name: "Category E", value: 25}
];

// Create the color scale.
var color = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

// Create the pie layout and arc generator.
var pie = d3.pie()
    .sort(null)
    .value(d => d.value);

var radius = Math.min(width, height) / 2 - 10;

var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

var labelRadius = radius * 0.8;

// A separate arc generator for labels.
var arcLabel = d3.arc()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

var arcs = pie(data);

// Add a sector path for each value.
svg.append("g")
    .attr("stroke", "white")
  .selectAll()
  .data(arcs)
  .join("path")
    .attr("fill", d => color(d.data.name))
    .attr("d", arc)
  .append("title")
    .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

// Create a new arc generator to place a label close to the edge.
// The label shows the value if there is enough room.
svg.append("g")
    .attr("text-anchor", "middle")
  .selectAll()
  .data(arcs)
  .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => d.data.name))
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => d.data.value.toLocaleString("en-US")));
</script>