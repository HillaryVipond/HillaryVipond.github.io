---
layout: single
title: "Tasks"
permalink: /tasks/
nav_exclude: false
---

<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- 1. This section creates the heading and buttons for selecting the year -->
<h2>Interactive Treemap V2: Orders Over Time</h2>
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
  // 4a. Basic settings and setup
  const width = 960;
  const height = 600;
  const color = d3.scaleOrdinal([
  "#5C6BC0", "#42A5F5", "#26A69A", "#9CCC65", "#FFCA28",
  "#EF5350", "#AB47BC", "#8D6E63", "#78909C", "#FF7043",
  "#66BB6A", "#D4E157", "#FFA726", "#29B6F6", "#BDBDBD"
]);
  // Create and append the SVG canvas to the container div
  const svg = d3.select("#treemap-time")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font-family", "sans-serif")
    .style("font-size", "14px");

  // 4b. Function to load a given year's data and render the treemap
  function loadYear(year) {
    console.log(`Loading year: ${year}`);

    // Load the relevant JSON file
    d3.json(`/assets/data/orders_${year}.json`).then(data => {
      // Create a hierarchy from the data
      const root = d3.hierarchy(data)
        .sum(d => d.size || 0)
        .sort((a, b) => b.value - a.value);

      // Compute the treemap layout
      d3.treemap()
        .size([width, height])
        .paddingInner(2)(root);

      // Clear previous nodes
      svg.selectAll("*").remove();

      // Create groups for each top-level node (Orders)
      const nodes = svg.selectAll("g")
        .data(root.children)
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

      // Draw rectangles
      nodes.append("rect")
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.data.name));

      // Add labels
      nodes.append("text")
        .attr("x", 4)
        .attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", "white");
    }).catch(err => {
      console.error("Error loading JSON:", err);
    });
  }

  // 4c. Initial load when the page first loads
  document.addEventListener("DOMContentLoaded", function () {
    loadYear(1851); // Show 1851 data by default
  });
</script>

 

---
SECOND BLOCK
---
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- 1. Headings and explanation -->
<h2>Scatterplot: Industry Growth (1851–1911)</h2>


<!-- 2. Container for the scatterplot -->
<div id="scatterplot"></div>

<!-- 3. Text Below Graph and Toggle Button -->
<h4 style="margin-top: 1em;">
  Population doubled over the period: any industry growing more than 100% outpaced population growth, industries which grew less lagged.
</h4>

<button onclick="showThreshold()" style="margin-top: 1em; padding: 6px 12px; font-size: 14px;">
  Show Population Threshold
</button>

<!-- 4. Scatterplot Script -->
<script>
document.addEventListener("DOMContentLoaded", function () {
  const margin = {top: 20, right: 30, bottom: 50, left: 60};
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 4a. Tooltip configuration
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid #ccc")
    .style("padding", "8px 12px")
    .style("border-radius", "5px")
    .style("pointer-events", "none")
    .style("font-size", "15px")
    .style("font-weight", "bold")
    .style("visibility", "hidden")
    .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)");

  // 4b. Load CSV and plot data
  d3.csv("/assets/data/industry_growth.csv", d3.autoType).then(data => {
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.initial_size)).nice()
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.growth_pct)).nice()
      .range([height, 0]);

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    // Axis Labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .text("Initial Size of Industry");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .text("Growth Percentage (1851–1911)");

    // 4c. Hidden threshold line
    svg.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y(100))
      .attr("y2", y(100))
      .attr("stroke", "grey")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "5,5")
      .style("visibility", "hidden");

    svg.append("text")
      .attr("x", width - 10)
      .attr("y", y(100) - 6)
      .attr("text-anchor", "end")
      .style("fill", "grey")
      .style("font-size", "12px")
      .style("visibility", "hidden")
      .text("Population doubled");

    // 4d. Plot the data points
    svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.initial_size))
      .attr("cy", d => y(d.growth_pct))
      .attr("r", 6)
      .attr("fill", "#6BAED6") // semi-light blue
      .on("mouseover", function (event, d) {
        tooltip.style("visibility", "visible").text(d.industry);
        d3.select(this).attr("stroke", "black").attr("stroke-width", 1.5);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("stroke", null);
      });
  });
});
</script>

<!-- 5. Function to reveal the threshold line on click -->
<script>
function showThreshold() {
  d3.selectAll("line").filter(function() {
    return d3.select(this).attr("y1") === d3.select(this).attr("y2");
  }).style("visibility", "visible");

  d3.selectAll("text").filter(function() {
    return d3.select(this).text() === "Population doubled";
  }).style("visibility", "visible");
}
</script>


--------------------------------------------------------------------------------
THIRD BLOCK
-------------------------------------------------------------------------------

<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Interactive Treemap: Orders → Industries → Tasks</h2>

<!-- 1. Treemap container -->
<div id="treemap"></div>

<!-- 2. Line chart title and container (initially empty) -->
<h3 id="line-title" style="margin-top: 2em;"></h3>
<div id="linechart"></div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  // Basic setup
  const width = 960;
  const height = 600;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Append SVG for treemap
  const svg = d3.select("#treemap")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font-family", "sans-serif")
    .style("font-size", "14px");

  const group = svg.append("g");

  // Load treemap data
  d3.json("/assets/data/Tasks.json").then(data => {
    const fullRoot = d3.hierarchy(data)
      .sum(d => d.size || 0)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .paddingInner(2)(fullRoot);

    draw(fullRoot);

    // Treemap draw function
    function draw(activeNode) {
      group.selectAll("*").remove();  // clear the view

      const level = activeNode.depth;
      const parent = activeNode.parent;
      const siblings = parent ? parent.children : fullRoot.children;

      const boxes = group.selectAll("g")
        .data(siblings)
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`)
        .style("cursor", d => d.children ? "pointer" : "default")
        .on("click", (event, d) => {
          event.stopPropagation();

          if (d.children) {
            draw(d); // zoom in if it's not a leaf
          } else if (d.depth === 3) {
            drawLineChart(d.data.name); // only show line chart if it's a Task
          }
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
            event.stopPropagation();

            if (d.children) {
              draw(d); // keep zooming in
            } else if (d.depth === 3) {
              drawLineChart(d.data.name); // show line chart if it's a Task
            }
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

        // Clicking outside goes up one level
        svg.on("click", () => {
          if (activeNode.parent) draw(activeNode.parent);
        });
      }
    }
  });
});
</script>

<!-- 3. Line chart rendering script (called when a Task is clicked) -->
<script>
function drawLineChart(taskName) {
  // Clear previous chart
  d3.select("#linechart").selectAll("*").remove();

  // Update chart title
  d3.select("#line-title").text(`Task: ${taskName}`);

  // Dimensions
  const margin = {top: 20, right: 30, bottom: 40, left: 60};
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // Create SVG for the line chart
  const svg = d3.select("#linechart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Load the CSV
  d3.csv("/assets/data/task_timeseries_toy.csv", d3.autoType).then(data => {
    // Filter to just the selected task
    const taskData = data.filter(d => d.task === taskName);

    // Set up scales
    const x = d3.scaleLinear()
      .domain(d3.extent(taskData, d => d.year))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(taskData, d => d.count)]).nice()
      .range([height, 0]);

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")));

    svg.append("g")
      .call(d3.axisLeft(y));

    // Line generator
    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.count));

    // Add the line path
    svg.append("path")
      .datum(taskData)
      .attr("fill", "none")
      .attr("stroke", "#007ACC")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Optional: add dots on each point
    svg.selectAll("circle")
      .data(taskData)
      .join("circle")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.count))
      .attr("r", 4)
      .attr("fill", "#007ACC");
  });
}
</script>



--------------------------------------------------------------------------------
FOOTER
-------------------------------------------------------------------------------

<!-- Footer credit -->
<p style="text-align: center; margin-top: 4em; font-size: 0.9em; color: #aaa; font-style: italic;">
  Data Visualizations Coauthored with Daedalus GPT
</p>

