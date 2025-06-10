---
layout: single
title: "Tasks and Micro-Occupations"
permalink: /tasks/
nav_exclude: false
---

Welcome to the Tasks page. This will be a visualization of the changing occupational structure in Britain between 1851-1911, based on census data from the ICeM project. It is a work in progress. Please get in touch if you want to chat.


<script src="https://d3js.org/d3.v7.min.js"></script>


<!-- 1. This section creates the heading and buttons for selecting the year -->
<h2>Treemap: Orders Over Time</h2>
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











<!-- D3.js library -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<h2> Occupation: Orders Over Time (1851-1911) </h2>

<div style="display: flex; gap: 2em; justify-content: center;">
  <div>
    <h3 style="text-align: center;">Below Population Growth</h3>
    <div id="below-growth"></div>
  </div>
  <div>
    <h3 style="text-align: center;">Above Population Growth</h3>
    <div id="above-growth"></div>
  </div>
</div>


<script>
document.addEventListener("DOMContentLoaded", function () {
  const width = 400;
  const height = 500;
  const margin = {top: 20, right: 20, bottom: 30, left: 150};

  d3.csv("/assets/data/Orders.csv", d3.autoType).then(data => {
    const belowGrowth = data
      .filter(d => d.fold_growth_1851_1911 < 2)
      .sort((a, b) => d3.descending(a.fold_growth_1851_1911, b.fold_growth_1851_1911));
    const aboveGrowth = data
      .filter(d => d.fold_growth_1851_1911 >= 2)
      .sort((a, b) => d3.descending(a.fold_growth_1851_1911, b.fold_growth_1851_1911));


    function drawBarChart(containerId, dataset) {
      const svg = d3.select(containerId)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d.fold_growth_1851_1911)]).nice()
        .range([0, width - margin.left - margin.right]);

      const y = d3.scaleBand()
        .domain(dataset.map(d => d.order))
        .range([0, height - margin.top - margin.bottom])
        .padding(0.2);

      svg.append("g")
        .call(d3.axisLeft(y).tickSize(0))
        .selectAll("text")
        .style("font-size", "13px")
        .style("font-family", "sans-serif");

      svg.append("g")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(4))
        .selectAll("text")
        .style("font-size", "12px")
        .style("font-family", "sans-serif");

      const bars = svg.selectAll(".bar")
        .data(dataset)
        .join("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.order))
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", d => x(d.fold_growth_1851_1911))
        .attr("fill", "#6BAED6");

      const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("background", "white")
        .style("border", "1px solid #ccc")
        .style("padding", "8px 12px")
        .style("border-radius", "5px")
        .style("pointer-events", "none")
        .style("font-size", "14px")
        .style("visibility", "hidden")
        .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)");

      bars.on("mouseover", function (event, d) {
          tooltip.style("visibility", "visible").text(`${d.order}: ${d.fold_growth_1851_1911.toFixed(2)}×`);
          d3.select(this).attr("fill", "#3182BD");
        })
        .on("mousemove", function (event) {
          tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
          tooltip.style("visibility", "hidden");
          d3.select(this).attr("fill", "#6BAED6");
        });
    }

    drawBarChart("#below-growth", belowGrowth);
    drawBarChart("#above-growth", aboveGrowth);
  });
});
</script>














<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- 1. Headings and explanation -->
<h2>Growth by Industry: 1851–1911</h2>

<!-- 2. Container for the scatterplot -->
<div id="scatterplot"></div>

<!-- 3. Buttons below graph, side by side -->
<h4 style="margin-top: 1em;">
  Population doubled over the period: any industry growing more than 100% outpaced population growth, industries which grew less lagged.
</h4>

<div style="display: flex; gap: 10px; margin-top: 1em;">
  <button onclick="showThreshold()" style="padding: 6px 12px; font-size: 14px;">
    Show Population Threshold
  </button>

  <button onclick="toggleZoom()" style="padding: 6px 12px; font-size: 14px;">
    Toggle Zoom to 0–10 Fold Growth
  </button>
</div>

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

  d3.csv("/assets/data/Industry.csv", d3.autoType).then(data => {
    // Clean data: remove rows with missing or invalid fold_growth
    data = data.filter(d => d.fold_growth != null && !isNaN(d.fold_growth));
   
    const x = d3.scaleLog()
      .domain(d3.extent(data, d => d.final_size).map(d => d > 0 ? d : 1)) // avoid log(0)
      .nice()
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.fold_growth)).nice()
      .range([height, 0]);

    // Save variables globally
    window._scatter_x = x;
    window._scatter_y = y;
    window._scatter_svg = svg;
    window._scatter_data = data;
    window._scatter_margin = margin;
    window._scatter_width = width;
    window._scatter_height = height;

    // Axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .attr("class", "x-axis")
      .call(d3.axisBottom(x).ticks(10, "~s"));

    svg.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));

    // Axis Labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .text("Log of Final Size of Industry");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .text("Fold Increase (1851–1911)");

    // Hidden threshold line
    svg.append("line")
      .attr("class", "threshold-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", y(2))
      .attr("y2", y(2))
      .attr("stroke", "grey")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "5,5")
      .style("visibility", "hidden");

    svg.append("text")
      .attr("class", "threshold-text")
      .attr("x", width - 10)
      .attr("y", y(2) - 6)
      .attr("text-anchor", "end")
      .style("fill", "grey")
      .style("font-size", "12px")
      .style("visibility", "hidden")
      .text("Population doubled");

    // Data Points
    svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x(d.final_size))
      .attr("cy", d => y(d.fold_growth))
      .attr("r", 6)
      .attr("fill", "#6BAED6")
      .on("mouseover", function (event, d) {
        const label = (d.industry && d.industry !== "NaN") ? d.industry : `Occ ${d.occode}`;
        tooltip.style("visibility", "visible").text(label);
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

  // Buttons
  window.showThreshold = function() {
    d3.selectAll(".threshold-line").style("visibility", "visible");
    d3.selectAll(".threshold-text").style("visibility", "visible");
  }

  let zoomed = false;
  window.toggleZoom = function() {
    const svg = window._scatter_svg;
    const y = window._scatter_y;
    const data = window._scatter_data;

    if (!zoomed) {
      y.domain([0, 10]);
      zoomed = true;
    } else {
      y.domain(d3.extent(data, d => d.fold_growth)).nice();
      zoomed = false;
    }

    svg.select(".y-axis")
      .transition()
      .duration(750)
      .call(d3.axisLeft(y));

    svg.selectAll("circle")
      .transition()
      .duration(750)
      .attr("cy", d => y(d.fold_growth));

    // 🛠️ Fix threshold line position too
    svg.selectAll(".threshold-line")
      .transition()
      .duration(750)
      .attr("y1", y(2))
      .attr("y2", y(2));

    svg.selectAll(".threshold-text")
      .transition()
      .duration(750)
      .attr("y", y(2) - 6);
  }

});
</script>









<h2>Treemap to Tasks Level: Orders → Industries → Tasks </h2>

<!-- Treemap container -->
<div id="treemap"></div>

<!-- Line chart title and container -->
<h3 id="line-title" style="margin-top: 2em;"></h3>
<div id="linechart"></div>

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

  const group = svg.append("g");

  Promise.all([
    d3.json("/assets/data/Tasks.json") // ✅ Load treemap data
  ]).then(([treemapData]) => {

    const fullRoot = d3.hierarchy(treemapData)
      .sum(d => d.size || 0)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .paddingInner(2)(fullRoot);

    draw(fullRoot);

    function draw(activeNode) {
      group.selectAll("*").remove();

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
            draw(d); // ✅ Drill deeper
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
          .style("cursor", d => d.children ? "pointer" : "default")
          .on("click", (event, d) => {
            event.stopPropagation();
            if (d.children) {
              draw(d);
            } else {
              let industryCode = d.parent.data.name;
              industryCode = industryCode.replace(/\s+/g, '_'); // 🛠 replace spaces with underscores
              drawLineChartForIndustry(industryCode); // ✅ Now loads correct CSV
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

        svg.on("click", () => {
          if (activeNode.parent) draw(activeNode.parent);
        });
      }
    }
  });

  function drawLineChartForIndustry(industryCode) {
    d3.select("#linechart").selectAll("*").remove();
    d3.select("#line-title").text(`Task Trends for Industry ${industryCode}`);

    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const chartWidth = 600 - margin.left - margin.right;
    const chartHeight = 300 - margin.top - margin.bottom;

    const svg = d3.select("#linechart")
      .append("svg")
      .attr("width", chartWidth + margin.left + margin.right)
      .attr("height", chartHeight + margin.top + margin.bottom)
      .style("font-family", "sans-serif")
      .style("font-size", "12px")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv(`/assets/data/${industryCode}.csv`, d3.autoType).then(data => {
      const tasks = Array.from(d3.group(data, d => d.task), ([key, values]) => ({ task: key, values }));

      const allYears = d3.extent(data, d => d.year);
      const maxCount = d3.max(data, d => d.count);

      const x = d3.scaleLinear()
        .domain(allYears)
        .range([0, chartWidth]);

      const y = d3.scaleLinear()
        .domain([0, maxCount]).nice()
        .range([chartHeight, 0]);

      const color = d3.scaleOrdinal(d3.schemeCategory10)
        .domain(tasks.map(d => d.task));

      svg.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      svg.append("g")
        .call(d3.axisLeft(y));

      const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.count));

      svg.selectAll(".line")
        .data(tasks)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", d => color(d.task))
        .attr("stroke-width", 2)
        .attr("d", d => line(d.values));

      // ✅ Add Legend
      const legend = d3.select("#linechart svg")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top - 10})`);
      const legendSpacing = 100;

      legend.selectAll("legend-item")
        .data(tasks)
        .join("g")
        .attr("transform", (d, i) => `translate(${i * legendSpacing}, 0)`)
        .call(g => {
          g.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", d => color(d.task));

          g.append("text")
            .attr("x", 18)
            .attr("y", 10)
            .text(d => d.task)
            .style("font-size", "12px")
            .attr("alignment-baseline", "middle");
            });


      tasks.forEach(task => {
        svg.selectAll(`.dot-${task.task.replace(/\s+/g, '-')}`)
          .data(task.values)
          .join("circle")
          .attr("cx", d => x(d.year))
          .attr("cy", d => y(d.count))
          .attr("r", 3)
          .attr("fill", color(task.task));
      });

    }).catch(error => {
      console.error("Failed to load CSV:", error);
      svg.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight / 2)
        .attr("text-anchor", "middle")
        .text("Failed to load data");
    });
  }
});
</script>


<h2>Bootmaking: New Jobs</h2>

<!-- 🎛️ Year control for total map -->
<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 10px;">
  <label for="year-slider">Select year: <span id="year-label">1851</span></label>
  <input type="range" id="year-slider" min="1851" max="1911" step="10" value="1851" style="width: 300px;">
</div>

<!-- 🗺️ Total map and legend container -->
<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 40px;">
  <svg id="total-map" width="960" height="600"></svg>

  <div style="margin-top: 10px;">
    <svg id="legend-svg" width="480" height="50"></svg>
    <div style="font-size: 12px; text-align: center;"> Percentage Share of Male Population</div>
  </div>
</div>

<div id="tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<script>
const svg = d3.select("#total-map");
const tooltip = d3.select("#tooltip");

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/county_counts_by_year.json")
]).then(([geoData, yearData]) => {
  const projection = d3.geoMercator().fitSize([960, 600], geoData);
  const path = d3.geoPath().projection(projection);
  const slider = d3.select("#year-slider");
  const yearLabel = d3.select("#year-label");

  function updateMap(year) {
    const values = yearData[year];
    const color = d3.scaleThreshold()
      .domain([1, 2, 3, 4])
      .range(d3.schemePurples[5]);

    svg.selectAll("path")
      .data(geoData.features)
      .join("path")
      .attr("d", path)
      .attr("fill", d => {
        const name = d.properties.R_CTY;
        const v = values[name];
        return v != null ? color(v) : "#ccc";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (event, d) {
        const name = d.properties.R_CTY;
        const value = values[name];
        tooltip.style("visibility", "visible")
          .text(`${name}: ${value != null ? value.toFixed(2) : "N/A"}`);
        d3.select(this).attr("stroke-width", 2);
      })
      .on("mousemove", function(event) {
        tooltip.style("top", (event.pageY + 10) + "px")
               .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("stroke-width", 0.5);
      });
  }

  updateMap("1851");

  slider.on("input", function() {
    const year = this.value;
    yearLabel.text(year);
    updateMap(year);
  });
});

{
  const legendSvg = d3.select("#legend-svg");
  const legendWidth = +legendSvg.attr("width");
  const colors = d3.schemePurples[5];
  const binWidth = legendWidth / colors.length;

  colors.forEach((color, i) => {
    legendSvg.append("rect")
      .attr("x", i * binWidth)
      .attr("y", 10)
      .attr("width", binWidth)
      .attr("height", 10)
      .attr("fill", color);

    const label = i === colors.length - 1 ? "4+" : `${i}–${i + 1}`;
    legendSvg.append("text")
      .attr("x", i * binWidth + binWidth / 2)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(label);
  });
}
</script>




<!-- Footer credit -->
<p style="text-align: center; margin-top: 4em; font-size: 0.9em; color: #aaa; font-style: italic;">
  Data Visualizations Coauthored with Daedalus GPT
</p>

