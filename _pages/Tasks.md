---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---

<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Interactive Treemap: Orders Over Time</h2>
<p>Click a year to view the treemap of Orders for that census year.</p>

<div style="margin-bottom: 1em;">
  <button onclick="loadYear(1851)">1851</button>
  <button onclick="loadYear(1861)">1861</button>
  <button onclick="loadYear(1881)">1881</button>
  <button onclick="loadYear(1891)">1891</button>
  <button onclick="loadYear(1901)">1901</button>
  <button onclick="loadYear(1911)">1911</button>
</div>

<div id="treemap-time"></div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  // Attach event listeners to buttons
  document.getElementById('button-1851').addEventListener('click', function() {
    loadYear(1851);
  });
  document.getElementById('button-1861').addEventListener('click', function() {
    loadYear(1861);
  });
  document.getElementById('button-1881').addEventListener('click', function() {
    loadYear(1881);
  });
  document.getElementById('button-1891').addEventListener('click', function() {
    loadYear(1891);
  });
  document.getElementById('button-1901').addEventListener('click', function() {
    loadYear(1901);
  });
  document.getElementById('button-1911').addEventListener('click', function() {
    loadYear(1911);
  });
});

function loadYear(year) {
  console.log(`Loading year: ${year}`);  // Debugging

  d3.json(`/assets/data/orders_${year}.json`).then(data => {
    const root = d3.hierarchy(data)
      .sum(d => d.size)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([960, 600])
      .paddingInner(2)(root);

    const svg = d3.select("#treemap-time");
    svg.selectAll("*").remove(); // Clear existing content

    const nodes = svg.selectAll("g")
      .data(root.children)
      .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    nodes.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => d3.scaleOrdinal(d3.schemeCategory10)(d.data.name));

    nodes.append("text")
      .attr("x", 4)
      .attr("y", 18)
      .text(d => d.data.name)
      .attr("fill", "white");
  }).catch(err => {
    console.error("Error loading JSON:", err);
  });
}
</script>

<h2>Interactive Treemap: Click to Drill into Orders → Industries → Tasks</h2>
<p>Click on an Order to explore its Industries. Then click on an Industry to see its Tasks.</p>

<div id="treemap-deep"></div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const width = 960;
  const height = 600;
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const svg = d3.select("#treemap-deep")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font-family", "sans-serif")
    .style("font-size", "14px");

  let group = svg.append("g");

  function draw(activeNode) {
    group.selectAll("*").remove();  // clear

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
      .attr("fill", d => d === activeNode ? color(d.data.name) : "#ddd")
      .attr("stroke", "#fff");

    boxes.append("text")
      .attr("x", 4)
      .attr("y", 18)
      .text(d => d.data.name)
      .attr("fill", "white")
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

  // Load default data (1891)
  d3.json("/assets/data/orders_1881.json").then(data => {
    const fullRoot = d3.hierarchy(data)
      .sum(d => d.size || 0)
      .sort((a, b) => b.value - a.value);

    d3.treemap().size([width, height]).paddingInner(2)(fullRoot);

    draw(fullRoot);
  });
});
</script>



<h2>Interactive Treemap: Old Version </h2>
<p>Click on an Order to explore its Industries. Then click on an Industry to see its Tasks.</p>


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

