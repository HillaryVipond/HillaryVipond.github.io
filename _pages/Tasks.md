---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---

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
      .sum(d => d.size || 0)
      .sort((a, b) => b.value - a.value);

    const treemapLayout = d3.treemap()
      .size([width, height])
      .paddingInner(2);

    treemapLayout(root);

    // Only show the first level of children (Orders)
    const nodes = svg.selectAll("g")
      .data(root.children)  // ✅ This is the change
      .enter().append("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    nodes.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => color(d.data.name));

    nodes.append("title")
      .text(d => `${d.data.name}\nSize: ${d.value}`);

    nodes.append("text")
      .attr("x", 4)
      .attr("y", 20)
      .text(d => d.data.name)
      .style("font-size", "14px")
      .style("fill", "white");
  }).catch(err => {
    console.error("Error loading JSON:", err);
  });
});
</script>

