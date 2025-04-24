---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- 1. This section creates the heading and buttons for selecting the year -->
<h2>Interactive Treemap: Orders Over Time</h2>
<p>Click a year to view the treemap of Orders for that census year.</p>


<!-- 2. Year selection buttons - each one calls the loadYear(year) JavaScript function -->
<div style="margin-bottom: 1em;">
  <button onclick="loadYear(1851)">1851</button>
  <button onclick="loadYear(1861)">1861</button>
  <button onclick="loadYear(1881)">1881</button>
  <button onclick="loadYear(1891)">1891</button>
  <button onclick="loadYear(1901)">1901</button>
  <button onclick="loadYear(1911)">1911</button>
</div>


<!-- 3. This div is the container where the treemap SVG (scalable Vector Graphics) will be inserted -->
<div id="treemap-time"></div>

<!-- 4. This is the JavaScript code that creates and inserts the SVG treemap -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const width = 960;
    const height = 600;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // 5. Create the SVG container inside the #treemap-time div
    const svg = d3.select("#treemap-time")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("font-family", "sans-serif")
      .style("font-size", "14px");

    // 6. Function to load and render a treemap for a given year
    function loadYear(year) {
      console.log(`Loading year: ${year}`);  // Debugging

      d3.json(`/assets/data/orders_${year}.json`).then(data => {
        const root = d3.hierarchy(data)
          .sum(d => d.size || 0)
          .sort((a, b) => b.value - a.value);

        d3.treemap()
          .size([width, height])
          .paddingInner(2)(root);

        svg.selectAll("*").remove();  // Clear previous treemap

        const nodes = svg.selectAll("g")
          .data(root.children)
          .join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`);

        nodes.append("rect")
          .attr("width", d => d.x1 - d.x0)
          .attr("height", d => d.y1 - d.y0)
          .attr("fill", d => color(d.data.name));

        nodes.append("text")
          .attr("x", 4)
          .attr("y", 18)
          .text(d => d.data.name)
          .attr("fill", "white");
      }).catch(err => {
        console.error("Error loading JSON:", err);
      });
    }

    // 7. Load a default year (e.g., 1851) when the page first loads
    loadYear(1851);
  });
</script>



---
SECOND BLOCK
---
<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Interactive Treemap: Orders → Industries → Tasks (with Ghosting)</h2>
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

    draw(fullRoot);

    function draw(activeNode) {
      group.selectAll("*").remove();

      const level = activeNode.depth;
      const parent = activeNode.parent;
      const siblings = parent ? parent.children : fullRoot.children;

      // draw current siblings at this level
      const boxes = group.selectAll("g")
        .data(siblings)
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .style("cursor", d => d.children ? "pointer" : "default")
        .on("click", (event, d) => {
          event.stopPropagation();
          draw(d);
        });

      boxes.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => {
          if (d === activeNode) {
            const top = d.ancestors().slice(-2)[0]?.data.name || d.data.name;
            return color(top);
          }
          return level === 1 ? "#ddd" : "#aaa";
        })
        .attr("stroke", "#fff");

      boxes.append("text")
        .attr("x", 4)
        .attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", d => d === activeNode ? "white" : "#444")
        .style("pointer-events", "none");

      if (activeNode.children) {
        const inner = group.append("g");

        inner.selectAll("g")
          .data(activeNode.children)
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
              .attr("fill", () => color(activeNode.data.name))
              .attr("stroke", "#fff");

            g.append("text")
              .attr("x", 4)
              .attr("y", 18)
              .text(d => d.data.name)
              .attr("fill", "white")
              .style("font-size", "12px")
              .style("pointer-events", "none");
          });

        svg.on("click", () => {
          if (activeNode.parent) draw(activeNode.parent);
        });
      }
    }
  }).catch(err => {
    console.error("Error loading JSON:", err);
  });
});
</script>

