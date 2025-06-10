<!DOCTYPE html>
<meta charset="utf-8">

<!-- Load d3.js -->
<script src="https://d3js.org/d3.v4.js"></script>

<!-- Create a div where the graph will take place -->
<div id="my_dataviz"></div>

<script>
// Set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the div
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define time parser
var parseDate = d3.timeParse("%Y-%m-%d");

// Replace this URL with your actual API endpoint
var apiUrl = "https://example.com/api/bitcoin_prices";

fetch(apiUrl)
  .then(response => response.json())
  .then(rawData => {
    // Format data
    var data = rawData.map(d => ({
      date: parseDate(d.date),
      value: +d.value
    }));

    // X axis
    var x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Area
    svg.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(d => x(d.date))
        .y0(y(0))
        .y1(d => y(d.value))
      );
  });
</script>
ljktk

