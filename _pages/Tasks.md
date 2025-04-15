---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---

<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Basic Block Display: 21 Orders</h2>
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
    const orders = data.children;  // <-- 21 Orders

    const boxWidth = width / 7;
    const boxHeight = height / 3;

    const nodes = svg.selectAll("g")
      .data(orders)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        return `translate(${col * boxWidth}, ${row * boxHeight})`;
      });

    nodes.append("rect")
      .attr("width", boxWidth - 10)
      .attr("height", boxHeight - 10)
      .attr("fill", d => color(d.name));

    nodes.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .text(d => d.name)
      .style("font-size", "12px")
      .attr("fill", "white");
  });
});
</script>
