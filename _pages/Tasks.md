---
layout: single
title: "Tasks and Micro-Occupations"
permalink: /tasks/
nav_exclude: false
---

Welcome to the Tasks page. This will be a visualization of the changing occupational structure in Britain between 1851-1911, based on census data from the ICeM project. It is a work in progress. Please email me to discuss. 

<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- 1. This section creates the heading and buttons for selecting the year -->
<h2>Treemap: Orders Over Time</h2>
<p>Click a year to view the treemap of the different sectors of the British economy by census year.</p>

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



<!-- ===================== -->
<!-- Section 2: Growth by Order -->
<!-- ==================== -->

<!-- D3.js library -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<h2>Occupation: Orders Over Time (1851–1911)</h2>
<p> Showing the growth in different sectors of the economy over the period. Sectors shown in blue are growing more rapidly than average population growth</p>

<div id="growth-chart" style="margin-top: 2em;"></div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const width = 800;
  const height = 600;
  const margin = {top: 20, right: 20, bottom: 30, left: 150};

  d3.csv("/assets/data/Orders.csv", d3.autoType).then(data => {
    // Sort all orders by growth
    const allOrders = data.sort((a, b) => d3.descending(a.fold_growth_1851_1911, b.fold_growth_1851_1911));

    const svg = d3.select("#growth-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, d3.max(allOrders, d => d.fold_growth_1851_1911)]).nice()
      .range([0, width - margin.left - margin.right]);

    const y = d3.scaleBand()
      .domain(allOrders.map(d => d.order))
      .range([0, height - margin.top - margin.bottom])
      .padding(0.2);

    // Y Axis
    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll("text")
      .style("font-size", "13px")
      .style("font-family", "sans-serif");

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(4))
      .selectAll("text")
      .style("font-size", "12px")
      .style("font-family", "sans-serif");

    // Bars
    const bars = svg.selectAll(".bar")
      .data(allOrders)
      .join("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.order))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", d => x(d.fold_growth_1851_1911))
      .attr("fill", d => d.fold_growth_1851_1911 >= 2 ? "#6BAED6" : "#FD8D3C"); // blue if above pop growth, orange otherwise

    // Tooltip
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
      .on("mouseout", function (event, d) {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("fill", d => d.fold_growth_1851_1911 >= 2 ? "#6BAED6" : "#FD8D3C");
      });
  });
});
</script>

<!-- ===================== -->
<!-- Section 3: Growth by Industry -->
<!-- ===================== -->


<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- 1. Headings and explanation -->
<h2>Growth by Industry: 1851–1911</h2>
<p> Showing growth by industry over the period. Note that the extreme outliers are primarily in industries which were very small or non-existant in 1851 </p>

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
<h3 id="image-title" style="margin-top: 2em; text-align: center;"></h3>
<div id="task-image-container" style="margin-top: 30px; text-align: center;">
  <img id="task-image" src="" alt="" style="max-width: 100%; display: none; border: 1px solid #ccc;" />
</div>

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
    console.log("Calling draw() on fullRoot:", fullRoot);


    function draw(activeNode) {
      group.selectAll("*").remove();

      const level = activeNode.depth;
      const parent = activeNode.parent;
      const siblings = parent ? parent.children : fullRoot.children;
      console.log("Siblings at level", activeNode.depth, ":", siblings);


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
        .text(d => {
         const name = d.data.name;
         if (!name) return "";
         const parts = name.split("_");
         return parts.length > 1 ? parts[1] : name;
         })
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
            draw(d); // drill down if it's not a task yet
           } else {
             // Load PNG chart for task
             const taskCode = d.data.name;
             document.getElementById("image-title").textContent = `Chart for ${taskCode}`;
             const imagePath = `/assets/task_charts/${taskCode}.png`;

             const img = document.getElementById("task-image");
             img.src = imagePath;
             img.alt = `Chart for ${taskCode}`;
             img.style.display = "block";

             // Hide if image doesn't exist
             img.onerror = () => {
             img.style.display = "none";
             };
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
              .text(d => {
              const name = d.data.name;
              if (!name) return "";

              const width = d.x1 - d.x0;
              const height = d.y1 - d.y0;

              // Hide label if box is too small
              if (width < 20 || height < 12) return "";

              const parts = name.split("_");
              return parts.length > 1 ? parts[1] : name;
              })
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
});

</script>


<figure style="max-width:720px; margin:0 auto; text-align:center;">
  <img
    src="/assets/img/sons_by_industry.png"
    alt="Share of sons taking up their fathers’ occupation by industry"
    style="width:100%; height:auto; border:1px solid #ddd; border-radius:6px;"
    loading="lazy"
  >
  <figcaption style="font-size:13px; color:#555; margin-top:4px;">
    Share of sons taking up their fathers’ occupation by industry, 1851–1911.
  </figcaption>
</figure>



<h2>Management — Part I: Geographic distribution</h2>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="mgmt-year">Select year: <span id="mgmt-year-label">1851</span></label>
  <input type="range" id="mgmt-year" min="1851" max="1911" step="10" value="1851" style="width:300px;">
</div>

<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:40px;position:relative;">
  <svg id="mgmt-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>

  <div style="margin-top:10px;">
    <svg id="mgmt-legend" width="480" height="50"></svg>
    <div style="font-size:12px;text-align:center;">Percentage Share of Male Population</div>
  </div>

  <div id="mgmt-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
</div>

<hr style="margin:32px 0;">






<h2> Techn </h2>

<!-- Year control (map only) -->
<div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
  <label for="mgmt-year">Select year: <span id="mgmt-year-label">1851</span></label>
  <input type="range" id="mgmt-year" min="1851" max="1911" step="10" value="1851" style="width:300px;">
</div>

<!-- Two columns: LEFT = map, RIGHT = intentionally empty -->
<div style="display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap;">
  <!-- LEFT: Map + legend + debug -->
  <div style="flex:2 1 640px; min-width:520px;">
    <div style="display:flex;flex-direction:column;align-items:center;position:relative;">
      <svg id="mgmt-map" width="960" height="600" viewBox="0 0 960 600"
           style="max-width:100%;height:auto;border:1px solid #eee;"></svg>

      <div style="margin-top:10px;">
        <svg id="mgmt-legend" width="480" height="50"></svg>
        <div style="font-size:12px;text-align:center;">Percentage share of male population</div>
      </div>

      <div id="mgmt-tooltip"
           style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;
                  visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);
                  pointer-events:none;"></div>
    </div>

    <!-- DEBUG PANEL -->
    <pre id="mgmt-debug"
         style="background:#0b1220;color:#b4f1b4;padding:10px;margin-top:12px;font-size:12px;
                max-width:960px;white-space:pre-wrap;border-radius:6px;line-height:1.35"></pre>
  </div>

  <!-- RIGHT: intentionally left empty -->
  <div style="flex:1 1 420px; min-width:380px;">
    <!-- (empty on purpose for now) -->
  </div>
</div>

<!-- D3 -->
<script src="https://d3js.org/d3.v7.min.js" defer></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js" defer></script>

<script defer>
(function(){
  const dbgEl = () => document.getElementById('mgmt-debug');
  const log = (...args) => {
    const line = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
    console.log('[MGMT]', ...args);
    const el = dbgEl(); if (el) el.textContent += line + '\\n';
  };

  log('[BOOT] inline script executed');

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  ready(async function initMap(){
    log('[DOM] ready state:', document.readyState);

    // Basic DOM hooks
    const svg = d3.select('#mgmt-map');
    const tooltip = d3.select('#mgmt-tooltip');
    const slider = d3.select('#mgmt-year');
    const yearLabel = d3.select('#mgmt-year-label');

    // Check D3 presence & DOM
    log('[CHECK] d3 present:', !!window.d3, 'svg exists:', !svg.empty());
    if (svg.empty()) { log('[ERR] #mgmt-map not found'); return; }

    // URLs
    const GEO_URL  = '/assets/maps/Counties1851.geojson';
    const DATA_URL = '/assets/maps/share_management_by_county.json';
    log('[FETCH] will fetch:', location.origin + GEO_URL, location.origin + DATA_URL);

    // 1) Load GEO and draw OUTLINES immediately
    let geoData = null;
    try {
      geoData = await d3.json(GEO_URL);
      log('[FETCH] geo OK. features:', geoData?.features?.length ?? 0);
    } catch (e) {
      log('[ERR] geo fetch failed:', e && (e.message || e));
      return;
    }

    const projection = d3.geoMercator().fitSize([960, 600], geoData);
    const path = d3.geoPath().projection(projection);

    // Draw outlines (so you see the map even if data fails)
    svg.selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', path)
      .attr('fill', '#eee')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5);

    // 2) Try to load the values JSON (but don't block rendering)
    let yearData = null;
    try {
      yearData = await d3.json(DATA_URL);
      const yearKeys = Object.keys(yearData || {});
      log('[FETCH] data OK. years:', yearKeys.slice(0, 10).join(', '), '… total=', yearKeys.length);
    } catch (e) {
      log('[WARN] data fetch failed or missing. Showing outlines only. Reason:', e && (e.message || e));
    }

    // Color, bins, helpers
    const thresholds = [1, 2, 3, 4]; // if your values are fractions (0–1), use [0.01, 0.02, 0.03, 0.04]
    const color = d3.scaleThreshold().domain(thresholds).range(d3.schemePurples[5]);
    const countyKey = f => f.properties?.R_CTY;
    const fmt = v => (v==null || isNaN(v)) ? 'N/A' : d3.format('.2f')(v) + '%';
    const getYearValues = y => yearData && (yearData[y] ?? yearData[String(y)] ?? yearData[+y] ?? null);

    function auditYear(values) {
      if (!values) { log('[AUDIT] no values for selected year'); return; }
      const missing = [];
      for (const f of geoData.features) {
        const k = countyKey(f);
        if (!(k in values)) missing.push(k);
      }
      if (missing.length) {
        log('[AUDIT] counties with no data (first 12):', missing.slice(0,12).join(', '), '… total=', missing.length);
      } else {
        log('[AUDIT] data covers all counties for this year');
      }
    }

    function paint(year){
      const values = getYearValues(year);
      if (!values) {
        log('[INFO] painting outlines only for year:', year);
      } else {
        log('[INFO] painting choropleth for year:', year);
        auditYear(values);
      }

      svg.selectAll('path')
        .attr('fill', d => {
          if (!values) return '#eee';
          const name = countyKey(d);
          const v = name ? values[name] : null;
          return v != null ? color(v) : '#ccc';
        })
        .on('mouseover', function (event, d) {
          const current = getYearValues(year);
          const name = countyKey(d) ?? 'Unknown';
          const v = current ? current[name] : null;
          tooltip.style('visibility','visible').text(`${name}: ${fmt(v)}`);
          d3.select(this).attr('stroke-width', 2);
        })
        .on('mousemove', function (event) {
          const bbox = this.ownerSVGElement.getBoundingClientRect();
          tooltip.style('top', (event.clientY - bbox.top + 10) + 'px')
                 .style('left', (event.clientX - bbox.left + 10) + 'px');
        })
        .on('mouseout', function () {
          tooltip.style('visibility','hidden');
          d3.select(this).attr('stroke-width', 0.5);
        });
    }

    // Legend
    (function legend(){
      const legendSvg = d3.select('#mgmt-legend');
      const legendWidth = +legendSvg.attr('width');
      const colors = d3.schemePurples[5];
      const binWidth = legendWidth / colors.length;
      legendSvg.selectAll('*').remove();
      colors.forEach((c, i) => {
        legendSvg.append('rect').attr('x', i * binWidth).attr('y', 10)
          .attr('width', binWidth).attr('height', 10).attr('fill', c);
        const label = i === colors.length - 1 ? '4%+' : `${i}%–${i+1}%`;
        legendSvg.append('text').attr('x', i * binWidth + binWidth/2).attr('y', 35)
          .attr('text-anchor','middle').attr('font-size','10px').text(label);
      });
      log('[INIT] legend drawn');
    })();

    // Initial paint + slider
    paint(1851);
    if (!slider.empty()) {
      slider.on('input', function(){
        const y = this.value;
        yearLabel.text(y);
        paint(y);
      });
    } else {
      log('[INFO] no year slider found; fixed at 1851');
    }

    log('[DONE] map initialised');
  });
})();
</script>
