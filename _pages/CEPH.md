---
layout: single
title: "Mapping the Second Industrial Revolution"
permalink: /CEPH/
nav_exclude: false
---

<p style="font-size:1.05em;line-height:1.7;max-width:820px;margin-top:0.5rem;margin-bottom:2.5rem;">
  This project maps the changing occupational structure of Great Britain across the
  Second Industrial Revolution, tracking both job loss and job creation. We explore this
  transformation at three levels of granularity: changes at the <strong>Order</strong> level,
  at the <strong>Industry</strong> level, and at the <strong>Micro-Occupations</strong> level.
</p>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<!-- ================================================ -->
<!-- D3 — load once at the top                       -->
<!-- ================================================ -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- ================================================ -->
<!-- SECTION 1: Treemap — Orders Over Time            -->
<!-- ================================================ -->

<h2>1. Occupational Orders over Time</h2>
<p>Click a year to view the treemap of the different sectors of the British economy by census year.</p>

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
(function(){
  const width = 960;
  const height = 600;

  const color = d3.scaleOrdinal([
    "#5C6BC0", "#42A5F5", "#26A69A", "#9CCC65", "#FFCA28",
    "#EF5350", "#AB47BC", "#8D6E63", "#78909C", "#FF7043",
    "#66BB6A", "#D4E157", "#FFA726", "#29B6F6", "#BDBDBD"
  ]);

  const svg = d3.select("#treemap-time")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font-family", "sans-serif")
    .style("font-size", "14px");

  // Load a year's JSON and render the treemap
  window.loadYear = function(year) {
    d3.json(`/assets/data/orders_${year}.json`).then(data => {
      const root = d3.hierarchy(data)
        .sum(d => d.size || 0)
        .sort((a, b) => b.value - a.value);

      d3.treemap().size([width, height]).paddingInner(2)(root);

      svg.selectAll("*").remove();

      const nodes = svg.selectAll("g")
        .data(root.children)
        .join("g")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

      nodes.append("rect")
        .attr("width",  d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => color(d.data.name));

      nodes.append("text")
        .attr("x", 4).attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", "white");

    }).catch(err => console.error("Error loading JSON:", err));
  };

  // Default load on page ready
  document.addEventListener("DOMContentLoaded", () => loadYear(1851), { once: true });
})();
</script>

<!-- ================================================ -->
<!-- SECTION 2: Growth by Order (bar chart)           -->
<!-- ================================================ -->

<h3>Orders ranked by growth, 1851–1911</h3>
<p>Showing the growth in different sectors of the economy over the period. Sectors shown in blue are growing more rapidly than average population growth.</p>

<div id="growth-chart" style="margin-top: 2em;"></div>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function() {
    const width  = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 30, left: 150 };

    d3.csv("/assets/data/Orders.csv", d3.autoType).then(data => {
      const allOrders = data.sort((a, b) =>
        d3.descending(a.fold_growth_1851_1911, b.fold_growth_1851_1911));

      const svg = d3.select("#growth-chart").append("svg")
        .attr("width", width).attr("height", height)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      const innerW = width  - margin.left - margin.right;
      const innerH = height - margin.top  - margin.bottom;

      const x = d3.scaleLinear()
        .domain([0, d3.max(allOrders, d => d.fold_growth_1851_1911)]).nice()
        .range([0, innerW]);

      const y = d3.scaleBand()
        .domain(allOrders.map(d => d.order))
        .range([0, innerH]).padding(0.2);

      svg.append("g").call(d3.axisLeft(y).tickSize(0))
        .selectAll("text").style("font-size", "13px");

      svg.append("g").attr("transform", `translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(4))
        .selectAll("text").style("font-size", "12px");

      // Blue = above population growth threshold (2×), orange = below
      const colorFn = d => d.fold_growth_1851_1911 >= 2 ? "#6BAED6" : "#FD8D3C";

      const bars = svg.selectAll(".bar").data(allOrders).join("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.order)).attr("height", y.bandwidth())
        .attr("x", 0).attr("width", d => x(d.fold_growth_1851_1911))
        .attr("fill", colorFn);

      const tooltip = d3.select("body").append("div")
        .style("position", "absolute").style("background", "white")
        .style("border", "1px solid #ccc").style("padding", "8px 12px")
        .style("border-radius", "5px").style("pointer-events", "none")
        .style("font-size", "14px").style("visibility", "hidden")
        .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)");

      bars.on("mouseover", function(event, d) {
          tooltip.style("visibility", "visible")
            .text(`${d.order}: ${d.fold_growth_1851_1911.toFixed(2)}×`);
          d3.select(this).attr("fill", "#3182BD");
        })
        .on("mousemove", event => {
          tooltip.style("left", (event.pageX + 10) + "px")
                 .style("top",  (event.pageY - 20) + "px");
        })
        .on("mouseout", function(event, d) {
          tooltip.style("visibility", "hidden");
          d3.select(this).attr("fill", colorFn(d));
        });
    });
  }, { once: true });
})();
</script>

<!-- ================================================ -->
<!-- SECTION 3: Growth by Industry (scatter plot)     -->
<!-- ================================================ -->

<h2>2. Occupational Industries: Growth and Decline</h2>
<p>Showing growth by industry over the period. Note that the extreme outliers are primarily in industries which were very small or non-existent in 1851.</p>

<div id="scatterplot"></div>

<div style="display:flex;gap:24px;align-items:center;margin-top:12px;font-size:0.92em;">
  <span style="display:inline-flex;align-items:center;gap:7px;">
    <span style="width:13px;height:13px;border-radius:50%;background:#238B45;display:inline-block;"></span>
    New occupations (new to the 19th century)
  </span>
  <span style="display:inline-flex;align-items:center;gap:7px;">
    <span style="width:13px;height:13px;border-radius:50%;background:#fff;border:1.5px solid #6BAED6;display:inline-block;"></span>
    Established occupations
  </span>
</div>

<h4 style="margin-top: 1em;">
  Population doubled over the period: any industry growing more than 100% outpaced population growth, industries which grew less lagged.
</h4>

<div style="display:flex;gap:10px;margin-top:1em;">
  <button onclick="showThreshold()" style="padding:6px 12px;font-size:14px;">Show Population Threshold</button>
  <button onclick="toggleZoom()"    style="padding:6px 12px;font-size:14px;">Toggle Zoom to 0–10 Fold Growth</button>
</div>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function() {
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width  = 960 - margin.left - margin.right;
    const height = 500 - margin.top  - margin.bottom;

    const svg = d3.select("#scatterplot").append("svg")
      .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])
      .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select("body").append("div")
      .style("position", "absolute").style("background", "white")
      .style("border", "1px solid #ccc").style("padding", "8px 12px")
      .style("border-radius", "5px").style("pointer-events", "none")
      .style("font-size", "15px").style("font-weight", "bold")
      .style("visibility", "hidden")
      .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)");

    Promise.all([
      d3.csv("/assets/data/Industry.csv", d3.autoType),
      d3.csv("/assets/data/occode_names.csv?v=2")
    ]).then(([data, names]) => {
      // occode -> occupation (Level3) name lookup, for the hover tooltip
      const nameByOccode = new Map(names.map(n => [String(n.occode), n.occ_name]));

      // occodes flagged as new-to-the-19th-century: filled green; the rest hollow
      const newOccodes  = new Set(names.filter(n => +n.is_new === 1).map(n => String(n.occode)));
      const isNew       = d => newOccodes.has(String(d.occode));
      const NEW_FILL    = "#238B45";   // dark green from "Change in Number of New Tasks"
      const OLD_OUTLINE = "#6BAED6";   // blue outline for established occupations

      data = data.filter(d => d.fold_growth != null && !isNaN(d.fold_growth));

      const x = d3.scaleLog()
        .domain(d3.extent(data, d => d.final_size).map(d => d > 0 ? d : 1))
        .nice().range([0, width]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.fold_growth)).nice()
        .range([height, 0]);

      // Stash globally so zoom/threshold buttons can access them
      window._scatter_x    = x;
      window._scatter_y    = y;
      window._scatter_svg  = svg;
      window._scatter_data = data;

      svg.append("g").attr("transform", `translate(0,${height})`)
        .attr("class", "x-axis").call(d3.axisBottom(x).ticks(10, "~s"));

      svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

      svg.append("text").attr("x", width / 2).attr("y", height + 40)
        .attr("text-anchor", "middle").text("Log of Final Size of Industry");

      svg.append("text").attr("transform", "rotate(-90)")
        .attr("x", -height / 2).attr("y", -45)
        .attr("text-anchor", "middle").text("Fold Increase (1851–1911)");

      // Population-doubling reference line (hidden until button clicked)
      svg.append("line").attr("class", "threshold-line")
        .attr("x1", 0).attr("x2", width)
        .attr("y1", y(2)).attr("y2", y(2))
        .attr("stroke", "grey").attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "5,5").style("visibility", "hidden");

      svg.append("text").attr("class", "threshold-text")
        .attr("x", width - 10).attr("y", y(2) - 6)
        .attr("text-anchor", "end").style("fill", "grey")
        .style("font-size", "12px").style("visibility", "hidden")
        .text("Population doubled");

      svg.selectAll("circle").data(data).join("circle")
        .attr("cx", d => x(d.final_size))
        .attr("cy", d => y(d.fold_growth))
        .attr("r", 6)
        .attr("fill",         d => isNew(d) ? NEW_FILL : "none")
        .attr("stroke",       d => isNew(d) ? "none" : OLD_OUTLINE)
        .attr("stroke-width", 1.5)
        .attr("pointer-events", "all")   // make the whole disc hoverable, even when fill is none
        .on("mouseover", function(event, d) {
          // Show the occode (Level3 occupation) name on every dot
          const label = nameByOccode.get(String(d.occode)) || `Occ ${d.occode}`;
          tooltip.style("visibility", "visible").text(label);
          d3.select(this).attr("stroke", "black").attr("stroke-width", 1.5);
        })
        .on("mousemove", event => {
          tooltip.style("left", (event.pageX + 10) + "px")
                 .style("top",  (event.pageY - 20) + "px");
        })
        .on("mouseout", function(event, d) {
          tooltip.style("visibility", "hidden");
          d3.select(this)
            .attr("stroke", isNew(d) ? "none" : OLD_OUTLINE)
            .attr("stroke-width", 1.5);
        });
    });

    // Show population-doubling line
    window.showThreshold = function() {
      d3.selectAll(".threshold-line").style("visibility", "visible");
      d3.selectAll(".threshold-text").style("visibility", "visible");
    };

    // Toggle y-axis zoom between full range and 0–10×
    let zoomed = false;
    window.toggleZoom = function() {
      const y    = window._scatter_y;
      const svg  = window._scatter_svg;
      const data = window._scatter_data;

      y.domain(zoomed ? d3.extent(data, d => d.fold_growth) : [0, 10]);
      zoomed = !zoomed;

      svg.select(".y-axis").transition().duration(750).call(d3.axisLeft(y));
      svg.selectAll("circle").transition().duration(750).attr("cy", d => y(d.fold_growth));
      svg.selectAll(".threshold-line").transition().duration(750).attr("y1", y(2)).attr("y2", y(2));
      svg.selectAll(".threshold-text").transition().duration(750).attr("y", y(2) - 6);
    };

  }, { once: true });
})();
</script>

<!-- ================================================ -->
<!-- SECTION 4: Treemap drill-down — Orders → Industries → Tasks -->
<!-- ================================================ -->

<h2>3. Micro-Occupations: Growth and Decline</h2>

<p>Each industry is itself made up of many different jobs: micro-occupations. In moving one level deeper, we can see the distinct occupations within each industry. This makes it possible to track how they grew and declined over the 2nd Industrial Revolution.</p>

<p style="font-size:0.9em;color:#666;margin-top:-0.4em;">Click the <strong>Dress</strong> order to open it up, then click a highlighted occupation to see how its tasks changed over time. Click the background to step back out.</p>

<button id="treemap-back" style="display:none;margin:0 0 10px;padding:5px 12px;font-size:13px;cursor:pointer;">← Back to all orders</button>

<div id="treemap"></div>

<!-- Lightbox overlay for task charts -->
<div id="chart-lightbox" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.6);align-items:center;justify-content:center;padding:24px;">
  <div style="position:relative;background:#fff;border-radius:8px;padding:16px 16px 12px;max-width:92vw;max-height:90vh;box-shadow:0 8px 30px rgba(0,0,0,0.35);">
    <button id="chart-lightbox-close" aria-label="Close" style="position:absolute;top:4px;right:12px;border:none;background:none;font-size:28px;line-height:1;cursor:pointer;color:#888;">&times;</button>
    <h3 id="chart-lightbox-title" style="margin:0 28px 10px 0;font-size:1.05em;"></h3>
    <img id="chart-lightbox-img" src="" alt="" style="max-width:88vw;max-height:78vh;object-fit:contain;display:block;">
  </div>
</div>

<script>
(function(){
  document.addEventListener("DOMContentLoaded", function() {
    const W = 960, H = 600;
    const GREY = "#dcdcdc", HILITE = "#6BAED6";   // grey = inactive, blue = highlighted / clickable

    const svg = d3.select("#treemap").append("svg")
      .attr("viewBox", [0, 0, W, H])
      .style("font-family", "sans-serif").style("font-size", "13px");
    const g = svg.append("g");

    const backBtn   = document.getElementById("treemap-back");
    const lbox      = document.getElementById("chart-lightbox");
    const lboxImg   = document.getElementById("chart-lightbox-img");
    const lboxTitle = document.getElementById("chart-lightbox-title");

    function closeLightbox(){ lbox.style.display = "none"; lboxImg.removeAttribute("src"); }
    document.getElementById("chart-lightbox-close").onclick = closeLightbox;
    lbox.addEventListener("click", e => { if (e.target === lbox) closeLightbox(); });        // click backdrop
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); }); // Esc to close

    // Larger styled hover tooltip (replaces the tiny native browser tooltip)
    const tooltip = d3.select("body").append("div")
      .style("position","absolute").style("background","white")
      .style("border","1px solid #ccc").style("padding","8px 12px")
      .style("border-radius","5px").style("pointer-events","none")
      .style("font-size","15px").style("font-weight","bold")
      .style("max-width","340px").style("line-height","1.35")
      .style("visibility","hidden").style("box-shadow","0 2px 6px rgba(0,0,0,0.2)");

    d3.json("/assets/data/dress_micro.json").then(rootData => {
      // View A: all orders (Dress highlighted, sized by 1911)
      const ordersRoot = d3.hierarchy(rootData).sum(d => d.size || 0).sort((a,b)=>b.value-a.value);
      d3.treemap().size([W,H]).paddingInner(2)(ordersRoot);

      // View B: Dress expanded to fill the whole box
      const dressData = rootData.children.find(c => c.name === "Dress");
      const dressRoot = d3.hierarchy(dressData).sum(d => d.size || 0).sort((a,b)=>b.value-a.value);
      d3.treemap().size([W,H]).paddingInner(2)(dressRoot);

      backBtn.onclick = drawOrders;
      drawOrders();

      function clearImage(){ closeLightbox(); }

      // Word-wrap a string to a given character width; null if any word can't fit.
      function wrapText(str, maxChars){
        const words = String(str).split(/\s+/);
        if (words.some(w => w.length > maxChars)) return null;
        const lines = []; let line = "";
        for (const word of words){
          const test = line ? line + " " + word : word;
          if (test.length <= maxChars) line = test;
          else { lines.push(line); line = word; }
        }
        if (line) lines.push(line);
        return lines;
      }

      // Show getFull(d) word-wrapped if it fits the box; else show getShort(d)
      // (e.g. the occode) if that fits; else leave blank and rely on the tooltip.
      // Records d._full = true when the box shows its full name inline.
      function drawLabel(textSel, getFull, getShort){
        textSel.each(function(d){
          const self = d3.select(this); self.text(null);
          d._full = false;
          const w = d.x1 - d.x0, h = d.y1 - d.y0;
          const lineH = 13, padX = 5;
          const maxChars = Math.floor((w - padX*2) / 7.3);
          const maxLines = Math.floor((h - 4) / lineH);
          if (maxChars < 2 || maxLines < 1) return;                 // too small for any text
          const lines = wrapText(getFull(d), maxChars);
          if (lines && lines.length <= maxLines){
            lines.forEach((ln,i) => self.append("tspan").attr("x", padX).attr("y", 15 + i*lineH).text(ln));
            d._full = true;
            return;
          }
          const short = getShort ? getShort(d) : null;              // fallback: occode only
          if (short && short.length <= maxChars){
            self.append("tspan").attr("x", padX).attr("y", 15).text(short);
          }
        });
      }

      // Larger hover tooltip — only for boxes that aren't already showing their full name.
      function addTip(node, getText){
        node
          .on("mouseover", function(e,d){ if (d._full) return; tooltip.style("visibility","visible").text(getText(d)); d3.select(this).select("rect").attr("stroke","#333"); })
          .on("mousemove", function(e,d){ if (d._full) return; tooltip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"); })
          .on("mouseout", function(){ tooltip.style("visibility","hidden"); d3.select(this).select("rect").attr("stroke","#fff"); });
      }

      // --- View A: all orders ---
      function drawOrders(){
        clearImage(); backBtn.style.display="none"; svg.on("click", null);
        g.selectAll("*").remove();
        const node = g.selectAll("g").data(ordersRoot.children).join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
          .style("cursor", d => d.data.name==="Dress" ? "pointer" : "default")
          .on("click", (e,d) => { e.stopPropagation(); if (d.data.name==="Dress") expandToDress(); });
        node.append("rect")
          .attr("width", d=>d.x1-d.x0).attr("height", d=>d.y1-d.y0)
          .attr("fill", d => d.data.name==="Dress" ? HILITE : GREY).attr("stroke","#fff");
        node.append("text").style("pointer-events","none")
          .attr("fill", d => d.data.name==="Dress" ? "#fff" : "#8a8a8a")
          .call(s => drawLabel(s, d => d.data.name, null));
        addTip(node, d => d.data.name);
      }

      // --- Transition: Dress grows to fill, then show its occupations ---
      function expandToDress(){
        const sel = g.selectAll("g");
        sel.filter(d => d.data.name!=="Dress").transition().duration(450).style("opacity",0).remove();
        const dg = sel.filter(d => d.data.name==="Dress");
        dg.select("text").transition().duration(250).style("opacity",0);
        dg.transition().duration(600).attr("transform","translate(0,0)");
        dg.select("rect").transition().duration(600)
          .attr("width", W).attr("height", H)
          .on("end", drawDress);
      }

      // --- View B: Dress occupations (charted ones highlighted) ---
      function drawDress(){
        clearImage(); backBtn.style.display="inline-block";
        g.selectAll("*").remove();
        const node = g.selectAll("g").data(dressRoot.children).join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
          .style("cursor", d => d.data.chart ? "pointer" : "default")
          .on("click", (e,d) => { e.stopPropagation(); if (d.data.chart) showChart(d); });
        node.append("rect")
          .attr("width", d=>d.x1-d.x0).attr("height", d=>d.y1-d.y0)
          .attr("fill", d => d.data.chart ? HILITE : GREY).attr("stroke","#fff")
          .style("opacity",0).transition().duration(450).style("opacity",1);
        node.append("text").style("pointer-events","none")
          .attr("fill", d => d.data.chart ? "#fff" : "#6f6f6f")
          .call(s => drawLabel(s, d => d.data.occode + ": " + d.data.name, d => String(d.data.occode)));
        addTip(node, d => d.data.name);
        svg.on("click", () => drawOrders());   // background click → back to orders
      }

      function showChart(d){
        lboxTitle.textContent = d.data.occode + ": " + d.data.name;
        lboxImg.alt = d.data.name;
        lboxImg.onerror = () => { lboxImg.alt = "Chart not available"; };
        lboxImg.src = `/assets/task_charts/${d.data.chart}.png`;
        lbox.style.display = "flex";
      }
    });
  }, { once: true });
})();
</script>


<hr style="border:none;border-top:1px solid #ddd;margin:48px 0;">

<h2>4. Results</h2>

<h3 style="margin-top:1.4em;font-size:1.25em;color:#238B45;border-bottom:3px solid #238B45;padding-bottom:6px;letter-spacing:0.02em;">Growth</h3>

<!-- ===================== -->
<!-- Section 1: Technology -->
<!-- ===================== -->

<h3>4.1 Map of mechanization</h3>

<h4 style="margin-top: 1em;">
  An initial mapping of the emergence of new technologies in the UK, by county.
</h4>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="tech-year-slider">Select year: <span id="tech-year-label">1851</span></label>
  <input type="range" id="tech-year-slider" min="1851" max="1911" step="10" value="1851" style="width:300px;">
</div>

<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:40px;position:relative;">
  <svg id="tech-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
  <div style="margin-top:10px;">
    <svg id="tech-legend" width="480" height="50"></svg>
    <div style="font-size:12px;text-align:center;">Percentage share of male population</div>
  </div>
  <div id="tech-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
</div>

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  ready(async function initTechMap(){
    const svg = d3.select('#tech-map');
    const tooltip = d3.select('#tech-tooltip');
    const slider = d3.select('#tech-year-slider');
    const yearLabel = d3.select('#tech-year-label');
    if (svg.empty()) return;

    const GEO_URL  = '/assets/maps/Counties1851.geojson';
    const DATA_URL = '/assets/maps/share_machine_by_county3.json';

    let geoData;
    try { geoData = await d3.json(GEO_URL); } catch { return; }

    const projection = d3.geoMercator().fitSize([960, 600], geoData);
    const path = d3.geoPath().projection(projection);

    svg.selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', path)
      .attr('fill', '#eee')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5);

    let yearData = null;
    try { yearData = await d3.json(DATA_URL); } catch {}

    const thresholds = [2, 4, 6, 8];
    const color = d3.scaleThreshold().domain(thresholds).range(d3.schemeGreens[5]);
    const countyKey = f => f.properties?.R_CTY;
    const fmt = v => (v == null || isNaN(v)) ? 'N/A' : d3.format('.2f')(v) + '%';
    const getYearValues = y => yearData && (yearData[y] ?? yearData[String(y)] ?? yearData[+y] ?? null);

    function paint(year){
      const values = getYearValues(year);
      svg.selectAll('path')
        .attr('fill', d => {
          if (!values) return '#eee';
          const v = values[countyKey(d)];
          return v != null ? color(v) : '#ccc';
        })
        .on('mouseover', function(event, d){
          const name = countyKey(d) ?? 'Unknown';
          const v = getYearValues(year)?.[name];
          tooltip.style('visibility','visible').text(`${name}: ${fmt(v)}`);
          d3.select(this).attr('stroke-width', 2);
        })
        .on('mousemove', function(event){
          const bbox = this.ownerSVGElement.getBoundingClientRect();
          tooltip.style('top', (event.clientY - bbox.top + 10) + 'px')
                 .style('left', (event.clientX - bbox.left + 10) + 'px');
        })
        .on('mouseout', function(){
          tooltip.style('visibility','hidden');
          d3.select(this).attr('stroke-width', 0.5);
        });
    }

    (function legend(){
      const legendSvg = d3.select('#tech-legend');
      const colors = d3.schemeGreens[5];
      const binWidth = 480 / colors.length;
      legendSvg.selectAll('*').remove();
      const labels = ['0–2%', '2–4%', '4–6%', '6–8%', '8%+'];
      colors.forEach((c, i) => {
        legendSvg.append('rect').attr('x', i * binWidth).attr('y', 10)
          .attr('width', binWidth).attr('height', 10).attr('fill', c);
        legendSvg.append('text').attr('x', i * binWidth + binWidth / 2).attr('y', 35)
          .attr('text-anchor', 'middle').attr('font-size', '10px').text(labels[i]);
      });
    })();

    paint(1851);
    if (!slider.empty()) {
      slider.on('input', function(){
        const y = this.value;
        yearLabel.text(y);
        paint(y);
      });
    }
  });
})();
</script>
<!-- ================================================ -->
<!-- SECTION: SPECIFIC NEW JOBS (combined map)        -->
<!-- ================================================ -->

<h3>4.2 Map of specific new jobs</h3>

<p>
  Where did specific new occupations emerge across the country? Choose a trade and a census
  year to see the share of the male workforce it accounted for in each county.
</p>

<div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;margin-bottom:10px;">
  <label>Job:
    <select id="newjob-select" style="font-size:14px;padding:3px 6px;">
      <option value="bicycle" selected>Bicycle trades</option>
      <option value="electric">Electrical trades</option>
    </select>
  </label>
  <label>Select year: <span id="newjob-year-label">1851</span>
    <input type="range" id="newjob-year" min="1851" max="1911" step="10" value="1851" style="width:300px;vertical-align:middle;">
  </label>
</div>

<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:16px;position:relative;">
  <svg id="newjob-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
  <div style="margin-top:10px;">
    <svg id="newjob-legend" width="480" height="50"></svg>
    <div id="newjob-legend-caption" style="font-size:12px;text-align:center;"></div>
  </div>
  <div id="newjob-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
</div>

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  // Config for each selectable new job
  const JOBS = {
    bicycle: {
      dataUrl: '/assets/maps/share_bicycle_by_county.json',
      thresholds: [0.05, 0.1, 0.3, 0.6],
      colors: d3.schemePurples[5],
      labels: ['0–0.05%', '0.05–0.1%', '0.1–0.3%', '0.3–0.6%', '0.6%+'],
      caption: 'Share of male workforce in bicycle trades'
    },
    electric: {
      dataUrl: '/assets/maps/share_electric_by_county.json',
      thresholds: [0.1, 0.3, 0.6, 1.0],
      colors: d3.schemeOranges[5],
      labels: ['0–0.1%', '0.1–0.3%', '0.3–0.6%', '0.6–1%', '1%+'],
      caption: 'Share of male workforce in electrical trades'
    }
  };

  ready(async function(){
    const GEO_URL = '/assets/maps/Counties1851.geojson';
    let geoData;
    try { geoData = await d3.json(GEO_URL); } catch { return; }

    const projection = d3.geoMercator().fitSize([960, 600], geoData);
    const path = d3.geoPath().projection(projection);
    const countyKey = f => f.properties?.R_CTY;
    const fmt = v => (v == null || isNaN(v)) ? 'N/A' : d3.format('.2f')(v) + '%';
    const getYearValues = (data, y) => data && (data[y] ?? data[String(y)] ?? data[+y] ?? null);

    const svg       = d3.select('#newjob-map');
    const tooltip   = d3.select('#newjob-tooltip');
    const slider    = d3.select('#newjob-year');
    const label     = d3.select('#newjob-year-label');
    const legendSvg = d3.select('#newjob-legend');
    const caption   = d3.select('#newjob-legend-caption');
    const select    = d3.select('#newjob-select');

    svg.selectAll('path').data(geoData.features).join('path')
      .attr('d', path).attr('fill', '#eee').attr('stroke', '#fff').attr('stroke-width', 0.5);

    const dataCache = {};
    let current = null, color = null;

    function paint(year){
      const values = getYearValues(current, year);
      svg.selectAll('path')
        .attr('fill', d => {
          if (!values) return '#eee';
          const v = values[countyKey(d)];
          return v != null ? color(v) : '#ccc';
        })
        .on('mouseover', function(event, d){
          const name = countyKey(d) ?? 'Unknown';
          const v = getYearValues(current, year)?.[name];
          tooltip.style('visibility','visible').text(`${name}: ${fmt(v)}`);
          d3.select(this).attr('stroke-width', 2);
        })
        .on('mousemove', function(event){
          const bbox = this.ownerSVGElement.getBoundingClientRect();
          tooltip.style('top', (event.clientY - bbox.top + 10) + 'px')
                 .style('left', (event.clientX - bbox.left + 10) + 'px');
        })
        .on('mouseout', function(){
          tooltip.style('visibility','hidden');
          d3.select(this).attr('stroke-width', 0.5);
        });
    }

    function drawLegend(cfg){
      const binWidth = 480 / cfg.colors.length;
      legendSvg.selectAll('*').remove();
      cfg.colors.forEach((c, i) => {
        legendSvg.append('rect').attr('x', i * binWidth).attr('y', 10)
          .attr('width', binWidth).attr('height', 10).attr('fill', c);
        legendSvg.append('text').attr('x', i * binWidth + binWidth / 2).attr('y', 35)
          .attr('text-anchor', 'middle').attr('font-size', '10px').text(cfg.labels[i]);
      });
      caption.text(cfg.caption);
    }

    async function loadJob(key){
      const cfg = JOBS[key];
      color = d3.scaleThreshold().domain(cfg.thresholds).range(cfg.colors);
      if (!dataCache[key]) {
        try { dataCache[key] = await d3.json(cfg.dataUrl); } catch { dataCache[key] = null; }
      }
      current = dataCache[key];
      drawLegend(cfg);
      paint(+slider.property('value'));
    }

    slider.on('input', function(){ label.text(this.value); paint(this.value); });
    select.on('change', function(){ loadJob(this.value); });

    loadJob('bicycle');   // default selection
  });
})();
</script>

<hr style="margin:32px 0;">

<!-- ===================== -->
<!-- Section 2: Management -->
<!-- ===================== -->

<h3>4.3 Mapping of management jobs</h3>

<h4 style="margin-top: 1em;">
  An initial mapping of the rise of management jobs in the UK, by county.
</h4>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="mgmt-year-slider">Select year: <span id="mgmt-year-label">1851</span></label>
  <input type="range" id="mgmt-year-slider" min="1851" max="1911" step="10" value="1851" style="width:300px;">
</div>

<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:40px;position:relative;">
  <svg id="mgmt-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
  <div style="margin-top:10px;">
    <svg id="mgmt-legend" width="480" height="50"></svg>
    <div style="font-size:12px;text-align:center;">Percentage Share of the Working Male Population</div>
  </div>
  <div id="mgmt-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
</div>

<hr style="margin:32px 0;">

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  ready(async function initMgmtMap(){
    const svg = d3.select('#mgmt-map');
    const tooltip = d3.select('#mgmt-tooltip');
    const slider = d3.select('#mgmt-year-slider');
    const yearLabel = d3.select('#mgmt-year-label');
    if (svg.empty()) return;

    const GEO_URL  = '/assets/maps/Counties1851.geojson';
    const DATA_URL = '/assets/maps/share_management_by_county.json';

    let geoData;
    try { geoData = await d3.json(GEO_URL); } catch { return; }

    const projection = d3.geoMercator().fitSize([960, 600], geoData);
    const path = d3.geoPath().projection(projection);

    svg.selectAll('path')
      .data(geoData.features)
      .join('path')
      .attr('d', path)
      .attr('fill', '#eee')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5);

    let yearData = null;
    try { yearData = await d3.json(DATA_URL); } catch {}

    const thresholds = [1, 2, 3, 4];
    const color = d3.scaleThreshold().domain(thresholds).range(d3.schemePurples[5]);
    const countyKey = f => f.properties?.R_CTY;
    const fmt = v => (v == null || isNaN(v)) ? 'N/A' : d3.format('.2f')(v) + '%';
    const getYearValues = y => yearData && (yearData[y] ?? yearData[String(y)] ?? yearData[+y] ?? null);

    function paint(year){
      const values = getYearValues(year);
      svg.selectAll('path')
        .attr('fill', d => {
          if (!values) return '#eee';
          const v = values[countyKey(d)];
          return v != null ? color(v) : '#ccc';
        })
        .on('mouseover', function(event, d){
          const vals = getYearValues(year);
          const name = countyKey(d) ?? 'Unknown';
          const v = vals ? vals[name] : null;
          tooltip.style('visibility','visible').text(`${name}: ${fmt(v)}`);
          d3.select(this).attr('stroke-width', 2);
        })
        .on('mousemove', function(event){
          const bbox = this.ownerSVGElement.getBoundingClientRect();
          tooltip.style('top', (event.clientY - bbox.top + 10) + 'px')
                 .style('left', (event.clientX - bbox.left + 10) + 'px');
        })
        .on('mouseout', function(){
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
        legendSvg.append('text').attr('x', i * binWidth + binWidth / 2).attr('y', 35)
          .attr('text-anchor', 'middle').attr('font-size', '10px').text(label);
      });
    })();

    paint(1851);
    if (!slider.empty()) {
      slider.on('input', function(){
        const y = this.value;
        yearLabel.text(y);
        paint(y);
      });
    }
  });
})();
</script>


<h3 style="margin-top:1.6em;font-size:1.25em;color:#D94801;border-bottom:3px solid #D94801;padding-bottom:6px;letter-spacing:0.02em;">Decline</h3>

<!-- ========================= -->
<!-- Section 3: Apprenticeships -->
<!-- ========================= -->

<h3>4.4 Mapping of the apprenticeship system</h3>

<p>The apprenticeship system declines everywhere between 1851–1911. The decline is more rapid after 1881. Less urban areas seem to retain more of the system than elsewhere. What is somewhat surprising is how different the decline is by level of skill — apprenticeships decline only slightly over the period; it is Masters and Journeymen who disappear.</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:40px;">

  <!-- LEFT: Total participation -->
  <div>
    <h3 style="font-size:1em;margin-bottom:10px;">Total Participation</h3>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;">
      <label for="year-slider" style="font-size:13px;">Year: <span id="year-label">1851</span></label>
      <input type="range" id="year-slider" min="1851" max="1911" step="10" value="1851" style="width:180px;">
    </div>
    <div style="position:relative;">
      <svg id="total-map" style="width:100%;display:block;" viewBox="0 0 480 300"></svg>
      <div style="margin-top:6px;">
        <svg id="legend-svg" width="100%" height="50"></svg>
        <div style="font-size:11px;text-align:center;">% Share of Male Population</div>
      </div>
      <div id="tooltip" style="position:absolute;background:white;border:1px solid #aaa;padding:5px;visibility:hidden;font-size:12px;border-radius:4px;pointer-events:none;"></div>
    </div>
  </div>

  <!-- RIGHT: Role breakdown -->
  <div>
    <h3 style="font-size:1em;margin-bottom:10px;">Role Breakdown</h3>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;">
      <label for="role-select" style="font-size:13px;">Role:</label>
      <select id="role-select" style="font-size:13px;">
        <option value="master">Master</option>
        <option value="journeyman">Journeyman</option>
        <option value="apprentice">Apprentice</option>
      </select>
      <label for="role-slider" style="font-size:13px;">Year: <span id="role-year-label">1851</span></label>
      <input type="range" id="role-slider" min="1851" max="1911" step="10" value="1851" style="width:180px;">
    </div>
    <div style="position:relative;">
      <svg id="role-map" style="width:100%;display:block;" viewBox="0 0 480 300"></svg>
      <div style="margin-top:6px;">
        <svg id="role-legend-svg" width="100%" height="50"></svg>
        <div style="font-size:11px;text-align:center;">% Share of Male Population in Role</div>
      </div>
      <div id="role-tooltip" style="position:absolute;background:white;border:1px solid #aaa;padding:5px;visibility:hidden;font-size:12px;border-radius:4px;pointer-events:none;"></div>
    </div>
  </div>

</div>

<script>
const svg_total = d3.select("#total-map");
const tooltip_total = d3.select("#tooltip");

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/share_total_by_county.json")
]).then(([geoData, yearData]) => {
  const projection = d3.geoMercator().fitSize([480, 300], geoData);
  const path = d3.geoPath().projection(projection);
  const slider = d3.select("#year-slider");
  const yearLabel = d3.select("#year-label");

  function updateMap(year) {
    const values = yearData[year];
    const color = d3.scaleThreshold().domain([1, 2, 3, 4]).range(d3.schemePurples[5]);
    svg_total.selectAll("path").data(geoData.features).join("path")
      .attr("d", path)
      .attr("fill", d => { const v = values[d.properties.R_CTY]; return v != null ? color(v) : "#ccc"; })
      .attr("stroke", "#fff").attr("stroke-width", 0.5)
      .on("mouseover", function(event, d) {
        const value = values[d.properties.R_CTY];
        tooltip_total.style("visibility", "visible").text(`${d.properties.R_CTY}: ${value != null ? value.toFixed(2) : "N/A"}`);
        d3.select(this).attr("stroke-width", 2);
      })
      .on("mousemove", function(event) {
        const bbox = this.ownerSVGElement.getBoundingClientRect();
        tooltip_total.style("top", (event.clientY - bbox.top + 10) + "px").style("left", (event.clientX - bbox.left + 10) + "px");
      })
      .on("mouseout", function() { tooltip_total.style("visibility", "hidden"); d3.select(this).attr("stroke-width", 0.5); });
  }

  updateMap("1851");
  slider.on("input", function() { yearLabel.text(this.value); updateMap(this.value); });
});

{
  const legendSvg = d3.select("#legend-svg");
  const colors = d3.schemePurples[5];
  const binWidth = 100 / colors.length;
  colors.forEach((color, i) => {
    legendSvg.append("rect").attr("x", i * binWidth + "%").attr("y", 10).attr("width", binWidth + "%").attr("height", 10).attr("fill", color);
    legendSvg.append("text").attr("x", (i * binWidth + binWidth / 2) + "%").attr("y", 35).attr("text-anchor", "middle").attr("font-size", "10px")
      .text(i === colors.length - 1 ? "4+" : `${i}–${i+1}`);
  });
}
</script>

<script>
const roleSvg = d3.select("#role-map");
const roleTooltip = d3.select("#role-tooltip");
const roleSlider = d3.select("#role-slider");
const roleSelect = d3.select("#role-select");
const roleThresholds = [0.2, 0.4, 0.6, 0.8, 1.0, 1.5, 2.0];
const roleColors = d3.schemeBlues[8];
const roleColor = d3.scaleThreshold().domain(roleThresholds).range(roleColors);

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/share_granrole_by_county.json")
]).then(([geoData, roleData]) => {
  const projection = d3.geoMercator().fitSize([480, 300], geoData);
  const path = d3.geoPath().projection(projection);

  function updateRoleMap(year, role) {
    const values = roleData[year][role];
    roleSvg.selectAll("path").data(geoData.features).join("path")
      .attr("d", path)
      .attr("fill", d => { const v = values[d.properties.R_CTY]; return v != null ? roleColor(v) : "#ccc"; })
      .attr("stroke", "#fff").attr("stroke-width", 0.5)
      .on("mouseover", function(event, d) {
        const value = values[d.properties.R_CTY];
        roleTooltip.style("visibility", "visible").text(`${d.properties.R_CTY}: ${value != null ? value.toFixed(2) : "N/A"}`);
        d3.select(this).attr("stroke-width", 2);
      })
      .on("mousemove", function(event) {
        const bbox = this.ownerSVGElement.getBoundingClientRect();
        roleTooltip.style("top", (event.clientY - bbox.top + 10) + "px").style("left", (event.clientX - bbox.left + 10) + "px");
      })
      .on("mouseout", function() { roleTooltip.style("visibility", "hidden"); d3.select(this).attr("stroke-width", 0.5); });
  }

  updateRoleMap("1851", "master");
  const roleYearLabel = d3.select("#role-year-label");
  roleSlider.on("input", function() { roleYearLabel.text(this.value); updateRoleMap(this.value, roleSelect.node().value); });
  roleSelect.on("change", function() { updateRoleMap(roleSlider.node().value, this.value); });
});

{
  const roleLegendSvg = d3.select("#role-legend-svg");
  const binWidth = 100 / 8;
  const roleLabels = ["<0.2","0.2–0.4","0.4–0.6","0.6–0.8","0.8–1.0","1.0–1.5","1.5–2.0","2.0+"];
  roleColors.forEach((color, i) => {
    roleLegendSvg.append("rect").attr("x", i * binWidth + "%").attr("y", 10).attr("width", binWidth + "%").attr("height", 10).attr("fill", color);
  });
  roleLabels.forEach((label, i) => {
    roleLegendSvg.append("text").attr("x", (i * binWidth + binWidth / 2) + "%").attr("y", 35).attr("text-anchor", "middle").attr("font-size", "9px").text(label);
  });
}
</script>

<hr style="margin:32px 0;">


<!-- ================================= -->
<!-- Section 4: Occupational Inheritance -->
<!-- ================================= -->

<h2>5. Discussion</h2>

<style>
  .table-wrap { overflow-x:auto; margin: 0 0 12px; }
  .nice-table { border-collapse: collapse; width: 100%; font-size: 14px; }
  .nice-table caption { text-align:left; font-weight:600; margin-bottom:6px; }
  .nice-table th, .nice-table td { padding: 8px 10px; border-bottom: 1px solid #eee; }
  .nice-table thead th { position: sticky; top: 0; background: #fafbff; z-index: 1; }
  .nice-table tbody tr:hover { background: #fafafa; }
  .nice-table th { text-align: left; white-space: nowrap; }
  .nice-table td.num, .nice-table th.num { text-align: right; font-variant-numeric: tabular-nums; }
  .diff { --v: 0; background:
    linear-gradient(90deg, rgba(255,110,110,0.18) 0, rgba(255,110,110,0.18) calc(var(--v)*1%), transparent 0);
    border-radius: 4px; }
  .table-note { font-size: 12px; opacity: .8; margin-top: 6px; }
  .sortable { cursor: pointer; }
  .sortable::after { content: " ⬍"; color: #888; font-size: 12px; }
  .sortable.asc::after { content: " ▲"; }
  .sortable.desc::after { content: " ▼"; }
</style>

<div class="table-wrap">
  <table class="nice-table" id="sons-table">
    <caption>Share of sons taking up their fathers' occupation, by father's occupation</caption>
    <thead>
      <tr>
        <th class="sortable" data-key="occupation">Occupation</th>
        <th class="num sortable" data-key="y1851">1851</th>
        <th class="num sortable" data-key="y1861">1861</th>
        <th class="num sortable" data-key="y1881">1881</th>
        <th class="num sortable" data-key="diff">Difference</th>
        <th class="num sortable" data-key="occ">OccScore</th>
        <th class="num sortable" data-key="sons">SonsScore</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Coal Miners</td><td class="num" data-v="54.19"></td><td class="num" data-v="52.99"></td><td class="num" data-v="48.04"></td><td class="num diff" data-v="6.15"></td><td class="num" data-v="33.20"></td><td class="num" data-v="45.20"></td></tr>
      <tr><td>Farmer, Grazier</td><td class="num" data-v="40.63"></td><td class="num" data-v="37.65"></td><td class="num" data-v="37.21"></td><td class="num diff" data-v="3.42"></td><td class="num" data-v="51.61"></td><td class="num" data-v="46.93"></td></tr>
      <tr><td>Bricklayer</td><td class="num" data-v="39.92"></td><td class="num" data-v="36.85"></td><td class="num" data-v="26.79"></td><td class="num diff" data-v="13.13"></td><td class="num" data-v="44.15"></td><td class="num" data-v="48.18"></td></tr>
      <tr><td>Mason</td><td class="num" data-v="36.68"></td><td class="num" data-v="31.10"></td><td class="num" data-v="17.50"></td><td class="num diff" data-v="19.18"></td><td class="num" data-v="36.61"></td><td class="num" data-v="47.98"></td></tr>
      <tr><td>Carpenter, Joiner</td><td class="num" data-v="33.25"></td><td class="num" data-v="29.77"></td><td class="num" data-v="19.94"></td><td class="num diff" data-v="13.32"></td><td class="num" data-v="50.00"></td><td class="num" data-v="48.61"></td></tr>
      <tr><td>Agricultural Labour</td><td class="num" data-v="31.72"></td><td class="num" data-v="27.23"></td><td class="num" data-v="16.95"></td><td class="num diff" data-v="14.77"></td><td class="num" data-v="46.73"></td><td class="num" data-v="43.71"></td></tr>
      <tr><td>Blacksmiths</td><td class="num" data-v="31.46"></td><td class="num" data-v="28.50"></td><td class="num" data-v="20.34"></td><td class="num diff" data-v="11.12"></td><td class="num" data-v="46.09"></td><td class="num" data-v="46.76"></td></tr>
      <tr><td>Butchers</td><td class="num" data-v="27.40"></td><td class="num" data-v="28.34"></td><td class="num" data-v="26.10"></td><td class="num diff" data-v="1.30"></td><td class="num" data-v="51.30"></td><td class="num" data-v="48.56"></td></tr>
      <tr><td>Tailors</td><td class="num" data-v="20.68"></td><td class="num" data-v="18.65"></td><td class="num" data-v="16.07"></td><td class="num diff" data-v="4.61"></td><td class="num" data-v="51.56"></td><td class="num" data-v="49.22"></td></tr>
      <tr><td>General Labour</td><td class="num" data-v="12.50"></td><td class="num" data-v="12.93"></td><td class="num" data-v="10.95"></td><td class="num diff" data-v="1.55"></td><td class="num" data-v="34.52"></td><td class="num" data-v="45.96"></td></tr>
      <tr><td>Gardener</td><td class="num" data-v="10.46"></td><td class="num" data-v="10.53"></td><td class="num" data-v="5.70"></td><td class="num diff" data-v="4.76"></td><td class="num" data-v="53.54"></td><td class="num" data-v="47.33"></td></tr>
      <tr><td>Innkeepers</td><td class="num" data-v="7.87"></td><td class="num" data-v="7.29"></td><td class="num" data-v="7.57"></td><td class="num diff" data-v="0.30"></td><td class="num" data-v="47.35"></td><td class="num" data-v="49.72"></td></tr>
    </tbody>
  </table>
  <div class="table-note"><em>3 million linked father–son pairs. Sons linked forward 30 years (ICeM).</em></div>
</div>

<script>
  (function(){
    const tbl = document.getElementById('sons-table');
    const fmt = n => (n == null || isNaN(n)) ? '—' : Number(n).toFixed(2) + '%';

    const diffs = [];
    tbl.querySelectorAll('tbody td.num').forEach(td => {
      const v = parseFloat(td.dataset.v);
      if (!isNaN(v)) {
        td.textContent = fmt(v);
        if (td.classList.contains('diff')) diffs.push(v);
      } else {
        td.textContent = '—';
      }
    });

    const maxDiff = Math.max(5, ...diffs);
    tbl.querySelectorAll('tbody td.diff').forEach(td => {
      const v = parseFloat(td.dataset.v) || 0;
      td.style.setProperty('--v', (100 * v / maxDiff).toFixed(1));
      td.title = `Difference: ${fmt(v)}`;
    });

    let sortState = { key: null, dir: 1 };
    const rows = Array.from(tbl.tBodies[0].rows);

    function cmp(a, b, key) {
      if (key === 'occupation') return a.localeCompare(b, undefined, { sensitivity: 'base' });
      return (parseFloat(a) || 0) - (parseFloat(b) || 0);
    }

    function getVal(tr, key){
      switch(key){
        case 'occupation': return tr.cells[0].textContent.trim();
        case 'y1851': return tr.cells[1].dataset.v;
        case 'y1861': return tr.cells[2].dataset.v;
        case 'y1881': return tr.cells[3].dataset.v;
        case 'diff':  return tr.cells[4].dataset.v;
        case 'occ':   return tr.cells[5].dataset.v;
        case 'sons':  return tr.cells[6].dataset.v;
      }
    }

    tbl.querySelectorAll('thead th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const key = th.dataset.key;
        const same = sortState.key === key;
        sortState = { key, dir: same ? -sortState.dir : -1 };

        tbl.querySelectorAll('thead th.sortable').forEach(t => t.classList.remove('asc','desc'));
        th.classList.add(sortState.dir === 1 ? 'asc' : 'desc');

        const sorted = rows.slice().sort((r1, r2) => {
          const v1 = getVal(r1, key), v2 = getVal(r2, key);
          return sortState.dir * cmp(String(v1), String(v2), key);
        });

        const tb = tbl.tBodies[0];
        sorted.forEach(tr => tb.appendChild(tr));
      });
    });
  })();
</script>


