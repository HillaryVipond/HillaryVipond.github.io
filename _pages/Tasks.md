---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---
<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Interactive Treemap: Click to Drill into Industries</h2>
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
    const root = d3.hierarchy(data)
      .sum(d => d.size || 0)
      .sort((a, b) => b.value - a.value);

    d3.treemap().size([width, height]).padding(1)(root);

    let group = svg.append("g");

    draw(root);

    function draw(node) {
      group.selectAll("*").remove(); // Clear old content

      const children = node.children;

      const cell = group.selectAll("g")
        .data(children)
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .on("click", (event, d) => {
          if (d.children) draw(d);
          event.stopPropagation();
        });

      cell.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.ancestors().map(d => d.data.name).reverse().join("/")));

      cell.append("text")
        .attr("x", 4)
        .attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", "white");

      svg.on("click", () => {
        if (node.parent) draw(node.parent);
      });
    }
  }).catch(err => {
    console.error("Error loading JSON:", err);
  });
});
</script>






















<!--
OLD: basic 21 Orders block layout
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
-->
