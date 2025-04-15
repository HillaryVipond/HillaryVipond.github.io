---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---


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

    const group = svg.append("g");

    draw(); // initial render with all Orders

    function draw(activeNode) {
      group.selectAll("*").remove();

      const topLevelNodes = root.children;

      const nodes = group.selectAll("g")
        .data(topLevelNodes)
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
        .attr("fill", d =>
          activeNode ? (d === activeNode ? color(d.data.name) : "#ddd") : color(d.data.name)
        )
        .attr("stroke", "#fff");

      nodes.append("text")
        .attr("x", 4)
        .attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", d =>
          activeNode ? (d === activeNode ? "white" : "#666") : "white"
        )
        .style("pointer-events", "none");

      if (activeNode && activeNode.children) {
        const innerGroup = group.append("g")
          .attr("clip-path", `inset(${activeNode.y0}px ${width - activeNode.x1}px ${height - activeNode.y1}px ${activeNode.x0}px)`);

        innerGroup.selectAll("g")
          .data(activeNode.children)
          .join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
          .on("click", (event, d) => {
            if (d.children) draw(d); // Optional: drill into Tasks
            event.stopPropagation();
          })
          .call(g => {
            g.append("rect")
              .attr("width", d => d.x1 - d.x0)
              .attr("height", d => d.y1 - d.y0)
              .attr("fill", d => color(activeNode.data.name))
              .attr("stroke", "#fff");

            g.append("text")
              .attr("x", 4)
              .attr("y", 18)
              .text(d => d.data.name)
              .attr("fill", "white")
              .style("font-size", "12px")
              .style("pointer-events", "none");
          });

        svg.on("click", () => draw());
      }
    }
  }).catch(err => {
    console.error("Error loading JSON:", err);
  });
});
</script>


