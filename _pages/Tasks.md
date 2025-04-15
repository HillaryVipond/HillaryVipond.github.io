---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---

<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Interactive Treemap: Context-Preserving Drill-In</h2>
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

    d3.treemap()
      .size([width, height])
      .paddingInner(2)(root);

    let group = svg.append("g");

    draw(root);

    function draw(currentNode) {
      group.selectAll("*").remove(); // clear

      const isRoot = !currentNode.parent;

      const nodes = group.selectAll("g")
        .data(currentNode.children)
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .style("cursor", d => d.children ? "pointer" : "default")
        .on("click", (event, d) => {
          if (d.children) draw(d);
          event.stopPropagation();
        });

      nodes.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => {
          if (!isRoot) return "#ddd"; // grey background for siblings
          return color(d.data.name);
        })
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);

      nodes.append("text")
        .attr("x", 4)
        .attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", d => isRoot ? "white" : "#666")
        .style("pointer-events", "none");

      if (!isRoot) {
        // draw child nodes within the selected box
        const childNodes = currentNode.children;

        const innerGroup = group.append("g")
          .attr("clip-path", `inset(${currentNode.y0}px ${width - currentNode.x1}px ${height - currentNode.y1}px ${currentNode.x0}px)`);

        innerGroup.selectAll("g")
          .data(childNodes)
          .join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
          .on("click", (event, d) => {
            if (d.children) draw(d);
            event.stopPropagation();
          })
          .call(g => {
            g.append("rect")
              .attr("width", d => d.x1 - d.x0)
              .attr("height", d => d.y1 - d.y0)
              .attr("fill", d => color(d.parent.data.name))
              .attr("stroke", "#fff");

            g.append("text")
              .attr("x", 4)
              .attr("y", 18)
              .text(d => d.data.name)
              .attr("fill", "white")
              .style("font-size", "12px")
              .style("pointer-events", "none");
          });
      }

      // Click anywhere else to zoom out
      svg.on("click", () => {
        if (currentNode.parent) draw(currentNode.parent);
      });
    }
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
