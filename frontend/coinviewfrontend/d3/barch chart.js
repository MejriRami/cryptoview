import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 10, right: 30, bottom: 20, left: 50 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Assume data is an array of objects like:
    // [{ group: "A", subgroup1: 10, subgroup2: 20, subgroup3: 15 }, ...]

    // Extract subgroup keys (all keys except 'group')
    const subgroups = Object.keys(data[0]).filter((k) => k !== "group");

    // Extract group names
    const groups = data.map((d) => d.group);

    // X scale
    const x = d3
      .scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Y scale — compute max sum of stacked groups for dynamic domain
    const maxGroupSum = d3.max(data, (d) =>
      subgroups.reduce((sum, key) => sum + +d[key], 0)
    );

    const y = d3.scaleLinear().domain([0, maxGroupSum]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Color scale
    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#e41a1c", "#377eb8", "#4daf4a"]); // You can customize colors or pass as props

    // Stack data
    const stackedData = d3.stack().keys(subgroups)(data);

    // Draw bars
    svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.data.group))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());
  }, [data]);

  return (
    <div>
      <h3>Stacked Bar Chart</h3>
      <div ref={chartRef}></div>
    </div>
  );
};

export default StackedBarChart;
