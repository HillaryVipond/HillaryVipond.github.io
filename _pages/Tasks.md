---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---

<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Interactive Treemap: Orders Only (Top Level)</h2>
<div id="treemap"></div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const width = 960;
  const height = 600;

  const svg = d3.select("#treemap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  d3.json("/assets/data/tasks.json").then(data => {
    const root = d3.hierarchy(data)
      .sum(d => d.children ? 0 : d.size || 0)  // only sum at leaves
      .sort((a, b) => b.value - a.value);

    const treemapLayout = d3.treemap()
      .size([width, height])
      .paddingInner(2);

    treemapLayout(root);

    const orders = root.children;  // These are your 21 top-level nodes

    const node = svg.selectAll("g")
      .data(orders)
      .enter().append("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    node.append("rect")
      .attr("id", d => d.data.name.replace(/\s+/g, "-"))
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => color(d.data.name));

    node.append("text")
      .attr("x", 4)
      .attr("y", 18)
      .text(d => d.data.name)
      .attr("fill", "white")
      .style("font-size", "14px");

    node.append("title")
      .text(d => `${d.data.name}\nTotal size: ${d.value}`);
  }).catch(err => {
    console.error("Error loading JSON:", err);
  });
});
</script>
