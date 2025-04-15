---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---

<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Interactive Treemap of Orders, Industries, and Tasks</h2>
<div id="treemap"></div>

<script>
const width = 960;
const height = 600;

const svg = d3.select("#treemap")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const color = d3.scaleOrdinal(d3.schemeCategory10);

// Load the JSON data
d3.json("/assets/data/tasks.json").then(data => {
  const root = d3.hierarchy(data).sum(d => d.size || 0);

  const treemapLayout = d3.treemap()
    .size([width, height])
    .paddingInner(1);

  treemapLayout(root);

  const nodes = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  nodes.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => color(d.parent.data.name));

  nodes.append("title")
    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join(" → ")}\nSize: ${d.data.size}`);

  nodes.append("text")
    .attr("x", 4)
    .attr("y", 14)
    .text(d => d.data.name)
    .style("font-size", "10px")
    .style("fill", "white");

}).catch(err => {
  console.error("Error loading JSON:", err);
});
</script>
