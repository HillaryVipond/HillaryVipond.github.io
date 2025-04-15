---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---

<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Interactive Treemap: Orders → Industries → Tasks</h2>
<div id="treemap"></div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const width = 960;
  const height = 600;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3.select("#treemap")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font-family", "sans-serif")
    .style("font-size", "14px");

  d3.json("/assets/data/Tasks.json").then(data => {
    const fullRoot = d3.hierarchy(data)
      .sum(d => d.size || 0)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .paddingInner(2)(fullRoot);

    const group = svg.append("g");

    draw(fullRoot); // show all Orders initially

    function draw(node) {
      group.selectAll("*").remove();

      // Set up new layout for this node's children
      const hierarchyData = d3.hierarchy(node.data || node)
        .sum(d => d.size || 0)
        .sort((a, b) => b.value - a.value);

      d3.treemap()
        .size([width, height])
        .paddingInner(2)(hierarchyData);

      const children = hierarchyData.children || [];

      // Render all children of this node
      const nodes = group.selectAll("g")
        .data(children)
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .style("cursor", d => d.children ? "pointer" : "default")
        .on("click", (event, d) => {
          event.stopPropagation();
          draw(d);
        });

      nodes.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => {
          const top = d.ancestors().slice(-2)[0]; // the Order
          return color(top?.data.name || d.data.name);
        })
        .attr("stroke", "#fff");

      nodes.append("text")
        .attr("x", 4)
        .attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", "white")
        .style("font-size", "12px")
        .style("pointer-events", "none");

      // Click background to go up
      svg.on("click", () => {
        if (node.parent) draw(node.parent);
      });
    }
  }).catch(err => {
    console.error("Error loading JSON:", err);
  });
});
</script>
