---
layout: single
title: "Mapping the Second Industrial Revolution"
permalink: /CEPH/
nav_exclude: false
---

<p style="font-size:1.05em;line-height:1.7;max-width:820px;margin-top:0.5rem;margin-bottom:2.5rem;">
  This project maps the changing occupational structure of Great Britain across the
  Second Industrial Revolution, tracking both job loss and job creation. I explore this
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

  // Calm, professional palette: an even hue spread (so Orders stay distinguishable),
  // but desaturated and lightened to a soft pastel — and dark labels rather than white.
  const ORDERS = ["Agriculture","Brick","Building","Chemicals","Commerce","Conveyancing","Defence","Domestic","Dress","Fishing","Food","Gas and Electric","General","Government","Leather","Machines","Mining","Paper","Precious Metals","Professions","Textiles","Wood"];
  const color = d3.scaleOrdinal(ORDERS, ORDERS.map((_, i) => {
    const c = d3.hsl(d3.interpolateRainbow((i / ORDERS.length) * 0.92 + 0.02));
    c.s *= 0.42;   // mute saturation
    c.l = 0.74;    // soft, pastel lightness
    return c.formatHex();
  }));

  const svg = d3.select("#treemap-time")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("font-family", "sans-serif")
    .style("font-size", "14px");

  const fmt = d3.format(",");
  const tip = d3.select("body").append("div")
    .style("position","absolute").style("pointer-events","none").style("visibility","hidden")
    .style("background","#fff").style("border","1px solid #ccc").style("padding","6px 10px")
    .style("border-radius","5px").style("font-size","13px").style("box-shadow","0 2px 6px rgba(0,0,0,.2)");

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
        .attr("fill", d => color(d.data.name))
        .on("mouseover", function(event, d){ tip.style("visibility","visible").html(`<strong>${d.data.name}</strong><br>${fmt(d.value)} workers`); })
        .on("mousemove", event => tip.style("left",(event.pageX+12)+"px").style("top",(event.pageY-10)+"px"))
        .on("mouseout", () => tip.style("visibility","hidden"));

      // label only where it fits; otherwise it's available on hover
      nodes.append("text")
        .attr("x", 5).attr("y", 18)
        .text(d => d.data.name)
        .attr("fill", "#333").style("font-weight", "600").style("pointer-events", "none")
        .each(function(d){
          const pad = 6;
          if ((d.y1 - d.y0) < 18 || this.getComputedTextLength() > (d.x1 - d.x0) - pad) d3.select(this).remove();
        });

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
    const margin = { top: 20, right: 20, bottom: 50, left: 150 };

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
        .call(d3.axisBottom(x).tickValues([2, 4, 6, 8, 10]))
        .selectAll("text").style("font-size", "12px");

      svg.append("text")
        .attr("x", innerW / 2).attr("y", innerH + 40)
        .attr("text-anchor", "middle").style("font-size", "12px").style("fill", "#333")
        .text("Fold growth");

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
<button id="treemap-mech" style="display:none;margin:0 0 10px 6px;padding:5px 12px;font-size:13px;cursor:pointer;">Shade by mechanization</button>
<div id="mech-legend" style="display:none;margin:0 0 8px;"></div>

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

    d3.json("/assets/data/dress_micro.json?v=2").then(rootData => {
      // View A: all orders (Dress highlighted, sized by 1911)
      const ordersRoot = d3.hierarchy(rootData).sum(d => d.size || 0).sort((a,b)=>b.value-a.value);
      d3.treemap().size([W,H]).paddingInner(2)(ordersRoot);

      // View B: Dress expanded to fill the whole box
      const dressData = rootData.children.find(c => c.name === "Dress");
      const dressRoot = d3.hierarchy(dressData).sum(d => d.size || 0).sort((a,b)=>b.value-a.value);
      d3.treemap().size([W,H]).paddingInner(2)(dressRoot);

      // --- mechanization shading (toggle, only in the Dress view) ---
      const mechBtn = document.getElementById("treemap-mech");
      const mechMax = d3.max(dressRoot.children, d => d.data.mech || 0) || 1;
      const mechColor = d3.scaleSequential(d3.interpolateOranges).domain([0, mechMax]);
      let mechMode = false;
      mechBtn.onclick = () => { mechMode = !mechMode; drawDress(); };
      function drawMechLegend(){
        const el = document.getElementById("mech-legend");
        if (!mechMode){ el.style.display = "none"; el.innerHTML = ""; return; }
        const n = 28, w = 240, h = 12; let bars = "";
        for (let i = 0; i < n; i++) bars += `<rect x="${(i*w/n).toFixed(1)}" y="0" width="${(w/n+0.6).toFixed(1)}" height="${h}" fill="${mechColor(i/(n-1)*mechMax)}"/>`;
        el.style.display = "block";
        el.innerHTML = `<span style="font-size:12px;color:#444;margin-right:8px;">Share of workers doing machine work</span><svg width="${w}" height="${h}" style="vertical-align:middle;border:1px solid #ddd;">${bars}</svg> <span style="font-size:11px;color:#666;margin-left:6px;">0% &ndash; ${Math.round(mechMax*100)}%</span>`;
      }

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
          .on("mouseover", function(e,d){ if (d._full && !mechMode) return; tooltip.style("visibility","visible").text(getText(d)); d3.select(this).select("rect").attr("stroke","#333"); })
          .on("mousemove", function(e,d){ if (d._full && !mechMode) return; tooltip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"); })
          .on("mouseout", function(){ tooltip.style("visibility","hidden"); d3.select(this).select("rect").attr("stroke","#fff"); });
      }

      // --- View A: all orders ---
      function drawOrders(){
        clearImage(); backBtn.style.display="none"; svg.on("click", null);
        mechMode = false; mechBtn.style.display="none"; drawMechLegend();
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
        mechBtn.style.display="inline-block";
        mechBtn.textContent = mechMode ? "Back to normal view" : "Shade by mechanization";
        drawMechLegend();
        g.selectAll("*").remove();
        const node = g.selectAll("g").data(dressRoot.children).join("g")
          .attr("transform", d => `translate(${d.x0},${d.y0})`)
          .style("cursor", d => d.data.chart ? "pointer" : "default")
          .on("click", (e,d) => { e.stopPropagation(); if (d.data.chart) showChart(d); });
        node.append("rect")
          .attr("width", d=>d.x1-d.x0).attr("height", d=>d.y1-d.y0)
          .attr("fill", d => mechMode ? mechColor(d.data.mech || 0) : (d.data.chart ? HILITE : GREY)).attr("stroke","#fff")
          .style("opacity",0).transition().duration(450).style("opacity",1);
        node.append("text").style("pointer-events","none")
          .attr("fill", d => mechMode ? ((d.data.mech || 0) > mechMax*0.5 ? "#fff" : "#333") : (d.data.chart ? "#fff" : "#6f6f6f"))
          .call(s => drawLabel(s, d => d.data.occode + ": " + d.data.name, d => String(d.data.occode)));
        addTip(node, d => d.data.name + (mechMode ? " — " + Math.round((d.data.mech||0)*100) + "% machine work" : ""));
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

<!-- ================================================ -->
<!-- SECTION: SPECIFIC NEW JOBS (combined map)        -->
<!-- ================================================ -->

<h3>4.1 Map of specific new jobs</h3>

<p>
  Where did specific new occupations emerge across the country? Choose a trade and a census
  year to see the share of the workforce it accounted for in each county.
</p>

<div style="display:flex;gap:28px;flex-wrap:wrap;align-items:flex-start;">

  <!-- LEFT: controls + map -->
  <div style="flex:2 1 520px;min-width:320px;">
    <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;margin-bottom:10px;">
      <label>Job:
        <select id="newjob-select" style="font-size:14px;padding:3px 6px;">
          <option value="electrician" selected>Electrician</option>
          <option value="motor_driver">Motor driver</option>
          <option value="typist">Typist</option>
          <option value="bicycle_maker">Bicycle maker</option>
          <option value="telegraph">Telegraph</option>
          <option value="telephonist">Telephonist</option>
          <option value="photographer">Photographer</option>
        </select>
      </label>
      <label>Select year: <span id="newjob-year-label">1911</span>
        <input type="range" id="newjob-year" min="0" max="5" step="1" value="5" style="width:240px;vertical-align:middle;">
      </label>
    </div>

    <div style="display:flex;flex-direction:column;align-items:center;margin-bottom:16px;position:relative;">
      <svg id="newjob-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
      <div style="margin-top:10px;">
        <svg id="newjob-legend" width="480" height="50" style="max-width:100%;height:auto;"></svg>
        <div id="newjob-legend-caption" style="font-size:12px;text-align:center;"></div>
      </div>
      <div id="newjob-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
    </div>
  </div>

  <!-- RIGHT: biggest new jobs table -->
  <div style="flex:1 1 300px;min-width:280px;">
    <h4 style="margin:0 0 4px;">New jobs of the 19th century</h4>
    <style>
      .xray-cell { position:relative; cursor:help; border-bottom:1px dotted #999; }
      .xray-pop { position:absolute; bottom:135%; left:0; z-index:60; display:none; width:230px;
        background:#fff; border:1px solid #ccc; border-radius:6px; padding:8px 10px; font-size:0.8rem;
        font-weight:400; color:#333; line-height:1.5; text-align:left; white-space:normal;
        box-shadow:0 3px 12px rgba(0,0,0,.18); }
      .xray-cell:hover .xray-pop { display:block; }
    </style>
    <p style="font-size:0.82em;color:#888;margin:0 0 12px;">Ranked by number of workers, 1911.</p>
    <table style="border-collapse:collapse;width:100%;font-size:0.9em;">
      <thead>
        <tr style="text-align:left;border-bottom:2px solid #238B45;">
          <th style="padding:7px 8px;font-weight:600;">Occupation</th>
          <th style="padding:7px 8px;font-weight:600;text-align:right;">Workers, 1911</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Electrician</td><td style="padding:7px 8px;text-align:right;">55,447</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;">Motor driver</td><td style="padding:7px 8px;text-align:right;">44,947</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Typist</td><td style="padding:7px 8px;text-align:right;">41,927</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;">Bicycle maker</td><td style="padding:7px 8px;text-align:right;">33,461</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Telegraph</td><td style="padding:7px 8px;text-align:right;">33,129</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;">Telephonist</td><td style="padding:7px 8px;text-align:right;">19,230</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Photographer</td><td style="padding:7px 8px;text-align:right;">17,134</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;">Asphalter</td><td style="padding:7px 8px;text-align:right;">1,612</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:7px 8px;">Anaesthetist</td><td style="padding:7px 8px;text-align:right;">353</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#fafefb;"><td style="padding:7px 8px;"><span class="xray-cell">X-ray operator<span class="xray-pop"><strong>Also known as&hellip;</strong><br>radiographer &middot; skiagraphist &middot; roentgenologist &middot; x-rayist &middot; x-ray man (even <em>railway xrayman</em>) &middot; x-ray attendant &middot; x-ray photographer</span></span></td><td style="padding:7px 8px;text-align:right;">77</td></tr>
      </tbody>
    </table>
  </div>

</div>

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  // One consistent colour ramp; thresholds are auto-computed per job from its own data.
  const RAMP = d3.schemeGreens[5];
  const JOBS = {
    electrician:   { dataUrl: '/assets/maps/share_electrician_by_county.json',   caption: 'Share of workforce: electricians' },
    motor_driver:  { dataUrl: '/assets/maps/share_motor_driver_by_county.json',  caption: 'Share of workforce: motor drivers' },
    typist:        { dataUrl: '/assets/maps/share_typist_by_county.json',        caption: 'Share of workforce: typists' },
    bicycle_maker: { dataUrl: '/assets/maps/share_bicycle_maker_by_county.json', caption: 'Share of workforce: bicycle makers' },
    telegraph:     { dataUrl: '/assets/maps/share_telegraph_by_county.json',     caption: 'Share of workforce: telegraph workers' },
    telephonist:   { dataUrl: '/assets/maps/share_telephonist_by_county.json',   caption: 'Share of workforce: telephonists' },
    photographer:  { dataUrl: '/assets/maps/share_photographer_by_county.json',  caption: 'Share of workforce: photographers' }
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
    const YEARS     = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)

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

    const pct = d3.format('~r');
    function drawLegend(thr, ramp, captionText){
      const binWidth = 480 / ramp.length;
      legendSvg.selectAll('*').remove();
      ramp.forEach((c, i) => {
        const lab = (i === 0) ? '0–' + pct(thr[0]) + '%'
                  : (i === ramp.length - 1) ? pct(thr[thr.length-1]) + '%+'
                  : pct(thr[i-1]) + '–' + pct(thr[i]) + '%';
        legendSvg.append('rect').attr('x', i * binWidth).attr('y', 10)
          .attr('width', binWidth).attr('height', 10).attr('fill', c);
        legendSvg.append('text').attr('x', i * binWidth + binWidth / 2).attr('y', 35)
          .attr('text-anchor', 'middle').attr('font-size', '9px').text(lab);
      });
      caption.text(captionText);
    }

    // round up to a "nice" 1 / 2 / 5 x 10^k value
    function niceNum(x){
      if (x <= 0) return 0;
      const b = Math.pow(10, Math.floor(Math.log10(x))), f = x / b;
      const n = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
      return +(n * b).toPrecision(2);
    }
    async function loadJob(key){
      const cfg = JOBS[key];
      if (!dataCache[key]) {
        try { dataCache[key] = await d3.json(cfg.dataUrl); } catch { dataCache[key] = null; }
      }
      current = dataCache[key];
      // quintiles of the positive values, rounded to nice round bands
      const vals = [];
      if (current) for (const y in current) for (const c in current[y]) { const v = current[y][c]; if (v > 0) vals.push(v); }
      vals.sort(d3.ascending);
      const hi = d3.max(vals) || 1;
      const raw = [hi/16, hi/8, hi/4, hi/2];   // step down from the peak so standout counties pop
      let thr = Array.from(new Set(raw.map(niceNum))).filter(v => v > 0 && v < hi).sort(d3.ascending);
      if (!thr.length) thr = [niceNum(hi / 2) || 0.1];
      const ramp = d3.schemeGreens[Math.min(9, Math.max(3, thr.length + 1))];
      color = d3.scaleThreshold().domain(thr).range(ramp);
      drawLegend(thr, ramp, cfg.caption);
      paint(YEARS[+slider.property('value')]);
    }

    slider.on('input', function(){ const yr = YEARS[+this.value]; label.text(yr); paint(yr); });
    select.on('change', function(){ loadJob(this.value); });

    loadJob('electrician');   // default selection
  });
})();
</script>

<hr style="margin:32px 0;">

<!-- ===================== -->
<!-- Section 2: Management -->
<!-- ===================== -->

<h3>4.2 Mapping of management jobs</h3>

<h4 style="margin-top: 1em;">
  An initial mapping of the rise of management jobs in the UK, by county.
</h4>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="mgmt-year-slider">Select year: <span id="mgmt-year-label">1851</span></label>
  <input type="range" id="mgmt-year-slider" min="0" max="5" step="1" value="0" style="width:300px;">
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
    const YEARS = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)
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

    paint(YEARS[0]);
    if (!slider.empty()) {
      slider.on('input', function(){
        const y = YEARS[+this.value];
        yearLabel.text(y);
        paint(y);
      });
    }
  });
})();
</script>
<!-- ===================== -->
<!-- Section 1: Technology -->
<!-- ===================== -->

<h3>4.3 Map of mechanization</h3>

<h4 style="margin-top: 1em;">
  An initial mapping of the emergence of new technologies in the UK, by county.
</h4>

<p>Unlike the apprenticeship system, mechanization rises on <em>both</em> measures &mdash; in share <em>and</em> in absolute numbers: by 1911 there are at least about 1.5 million more people working with machines.</p>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="tech-year-slider">Select year: <span id="tech-year-label">1851</span></label>
  <input type="range" id="tech-year-slider" min="0" max="5" step="1" value="0" style="width:300px;">
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
    const YEARS = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)
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

    paint(YEARS[0]);
    if (!slider.empty()) {
      slider.on('input', function(){
        const y = YEARS[+this.value];
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

<p>The apprenticeship system declines everywhere between 1851–1911. The decline is more rapid after 1881. Less urban areas seem to retain more of the system than elsewhere.</p>

<p>But this is a decline in <em>share</em>, not in absolute numbers. Summed across the three roles, the system actually grows slightly — from about 252,000 in 1851 to about 261,000 in 1911, a net rise of roughly 9,000. Apprentices themselves increase substantially, by almost 90,000; the real decline is among journeymen (down about 65,000) and masters.</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:40px;">

  <!-- LEFT: Total participation -->
  <div>
    <h3 style="font-size:1em;margin-bottom:10px;">Total Participation</h3>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap;">
      <label for="year-slider" style="font-size:13px;">Year: <span id="year-label">1851</span></label>
      <input type="range" id="year-slider" min="0" max="5" step="1" value="0" style="width:180px;">
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
      <input type="range" id="role-slider" min="0" max="5" step="1" value="0" style="width:180px;">
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
  d3.json("/assets/maps/share_total_by_county.json?v=2")
]).then(([geoData, yearData]) => {
  const projection = d3.geoMercator().fitSize([480, 300], geoData);
  const path = d3.geoPath().projection(projection);
  const slider = d3.select("#year-slider");
  const yearLabel = d3.select("#year-label");
  const YEARS = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)

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

  updateMap(YEARS[0]);
  slider.on("input", function() { const yr = YEARS[+this.value]; yearLabel.text(yr); updateMap(yr); });
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
  d3.json("/assets/maps/share_granrole_by_county.json?v=2")
]).then(([geoData, roleData]) => {
  const projection = d3.geoMercator().fitSize([480, 300], geoData);
  const path = d3.geoPath().projection(projection);
  const YEARS = [1851, 1861, 1881, 1891, 1901, 1911];   // 1871 skipped (no census snapshot)

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

  const roleYearLabel = d3.select("#role-year-label");
  updateRoleMap(YEARS[0], "master");
  roleSlider.on("input", function() { const yr = YEARS[+this.value]; roleYearLabel.text(yr); updateRoleMap(yr, roleSelect.node().value); });
  roleSelect.on("change", function() { updateRoleMap(YEARS[+roleSlider.node().value], this.value); });
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
<h3>5.1 Occupational Skills Inheritance</h3>

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

<!-- ================================================ -->
<!-- Circle packing: Order -> sub-Order -> occupation -->
<!-- ================================================ -->

<h3>5.2 The shape of the workforce: Orders, sub-Orders, and occupations</h3>

<p>Every occupation nests inside a sub-Order, and every sub-Order inside one of the 22 Orders. The circles below pack that whole structure, with each circle's area proportional to its 1911 workforce. Click any bubble to zoom in; click the background to zoom back out.</p>

<div id="circlepack" style="max-width:760px;margin:8px auto 0;"></div>
<p style="font-size:0.85em;color:#888;text-align:center;margin-top:4px;">Circle area ∝ workers in 1911 · click to zoom in · click outside to zoom out · hover for counts</p>

<script>
(function(){
  function ready(fn){ if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true}); else fn(); }
  ready(function(){
    const W = 760, H = 760;
    d3.json("/assets/data/occ_hierarchy.json").then(data => {
      const root = d3.pack().size([W, H]).padding(3)(
        d3.hierarchy(data).sum(d => d.value).sort((a, b) => b.value - a.value)
      );

      const orders  = root.children.map(d => d.data.name);
      const color   = d3.scaleOrdinal(orders, d3.quantize(t => d3.interpolateRainbow(t * 0.92 + 0.02), orders.length));
      const orderOf = d => { let n = d; while (n.depth > 1) n = n.parent; return n.data.name; };
      const fmt = d3.format(",");

      const svg = d3.select("#circlepack").append("svg")
        .attr("viewBox", `-${W/2} -${H/2} ${W} ${H}`)
        .attr("width", "100%").style("height", "auto").style("display", "block")
        .style("cursor", "pointer").style("font", "11px sans-serif").style("background", "#fff");

      const tip = d3.select("body").append("div")
        .style("position","absolute").style("pointer-events","none").style("visibility","hidden")
        .style("background","#fff").style("border","1px solid #ccc").style("padding","6px 10px")
        .style("border-radius","5px").style("font-size","13px").style("max-width","260px")
        .style("box-shadow","0 2px 6px rgba(0,0,0,.2)");

      let focus = root, view;

      const node = svg.append("g").selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
          .attr("fill", d => color(orderOf(d)))
          .attr("fill-opacity", d => d.children ? 0.3 : 0.85)
          .attr("stroke", d => d.children ? "#fff" : "none")
          .attr("stroke-width", d => d.children ? 1 : 0)
          .attr("pointer-events", "all")
          .on("mouseover", function(event, d){
            tip.style("visibility","visible").html(
              d.children
                ? `<strong>${d.data.name}</strong><br>${fmt(d.value)} workers`
                : `<strong>${d.data.name}</strong><br>${fmt(d.value)} workers<br><span style="color:#888">${orderOf(d)}</span>`
            );
            d3.select(this).attr("stroke","#333").attr("stroke-width",1.5);
          })
          .on("mousemove", e => tip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"))
          .on("mouseout", function(event, d){
            tip.style("visibility","hidden");
            d3.select(this).attr("stroke", d.children ? "#fff" : "none").attr("stroke-width", d.children ? 1 : 0);
          })
          .on("click", (event, d) => { if (focus !== d) { zoom(event, d); event.stopPropagation(); } });

      const label = svg.append("g")
          .style("pointer-events","none").attr("text-anchor","middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
          .style("fill-opacity", d => d.parent === root ? 1 : 0)
          .style("display", d => d.parent === root ? "inline" : "none")
          .style("font-weight", d => d.depth === 1 ? "600" : "400")
          .text(d => d.data.name);

      svg.on("click", (event) => zoom(event, root));
      zoomTo([root.x, root.y, root.r * 2]);

      function zoomTo(v){
        const k = W / v[2]; view = v;
        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
      }

      function zoom(event, d){
        focus = d;
        const transition = svg.transition().duration(700)
          .tween("zoom", () => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          });
        label.filter(function(d){ return d.parent === focus || this.style.display === "inline"; })
          .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d){ if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d){ if (d.parent !== focus) this.style.display = "none"; });
      }
    });
  });
})();
</script>

<!-- ================================================================ -->
<!-- Diff from 1911: grey 1911 treemap holding-space + census overlay  -->
<!-- ================================================================ -->

<h3>Changing Taxonomies: Census Waves 1851–1911</h3>

<p>The grey treemap is the <strong>1911 classification</strong> — Orders, their sub-Orders, and the occupations within them: the structure everything eventually settled into. Pick an earlier census and <strong>hover any occupation</strong> to light up the others it was lumped with <em>that</em> year — wherever they ended up on the 1911 map. The more scattered the highlight, the more that early census cut across the modern Orders.</p>

<div style="display:flex;align-items:center;gap:10px;margin:8px 0;flex-wrap:wrap;">
  <span>Census year:</span>
  <span id="tm-buttons" style="display:inline-flex;gap:6px;flex-wrap:wrap;"></span>
  <span id="tm-info" style="font-size:0.85em;color:#888;margin-left:6px;">hover an occupation</span>
</div>
<style>
  .tm-yrbtn { padding:5px 14px; font-size:14px; cursor:pointer; border:1px solid #bbb; background:#fff; border-radius:4px; }
  .tm-yrbtn.active { background:#333; color:#fff; border-color:#333; }
</style>

<div id="tm-pack" style="max-width:920px;margin:0 auto;"></div>

<script>
(function(){
  function ready(fn){ if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true}); else fn(); }
  ready(function(){
    const W = 920, H = 620, HI = '#E6550D';
    Promise.all([
      d3.json("/assets/data/occ_hierarchy.json"),
      d3.json("/assets/data/occ_census_codes.json")
    ]).then(([hier, census]) => {
      const byOcc = new Map(census.nodes.map(n => [n.occode, n]));
      function gby(yr){ const m = new Map(); census.nodes.forEach(n => { const c = n.codes[yr] || '(none)'; if (!m.has(c)) m.set(c, []); m.get(c).push(n.occode); }); return m; }
      const YEARS = census.years.map(String).filter(y => y !== '1911');
      const groups = {}; YEARS.forEach(y => groups[y] = gby(y));
      let curYear = YEARS[0];

      const root = d3.hierarchy(hier).sum(d => d.value || 0).sort((a,b)=>b.value-a.value);
      d3.treemap().size([W,H]).paddingInner(1).paddingTop(d => d.depth === 1 ? 14 : 1).round(true)(root);

      const svg = d3.select("#tm-pack").append("svg")
        .attr("viewBox", `0 0 ${W} ${H}`).attr("width","100%").style("height","auto")
        .style("display","block").style("font","10px sans-serif");

      // Order rectangles (depth 1): grey frame + label
      const og = svg.append("g");
      og.selectAll("rect").data(root.children).join("rect")
        .attr("x",d=>d.x0).attr("y",d=>d.y0).attr("width",d=>Math.max(0,d.x1-d.x0)).attr("height",d=>Math.max(0,d.y1-d.y0))
        .attr("fill","#f4f4f4").attr("stroke","#c8c8c8").attr("stroke-width",1);
      og.selectAll("text").data(root.children).join("text")
        .attr("x",d=>d.x0+4).attr("y",d=>d.y0+11).style("font-size","10px").style("font-weight","600")
        .style("fill","#999").style("pointer-events","none").text(d=>d.data.name);

      const tip = d3.select("body").append("div")
        .style("position","absolute").style("pointer-events","none").style("visibility","hidden")
        .style("background","#fff").style("border","1px solid #ccc").style("padding","6px 10px")
        .style("border-radius","5px").style("font-size","13px").style("max-width","280px")
        .style("box-shadow","0 2px 6px rgba(0,0,0,.2)");
      const info = d3.select("#tm-info");

      // occupation cells (leaves) — the grey holding space
      let pinned = null;
      const cell = svg.append("g").selectAll("rect").data(root.leaves()).join("rect")
        .attr("x",d=>d.x0).attr("y",d=>d.y0).attr("width",d=>Math.max(0,d.x1-d.x0)).attr("height",d=>Math.max(0,d.y1-d.y0))
        .attr("fill","#e0e0e0").attr("stroke","#fff").attr("stroke-width",0.5)
        .on("mouseover", function(e,d){ if (pinned === null) paintCategory(d, false); showTip(d); })
        .on("mousemove", e => tip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"))
        .on("mouseout", function(){ tip.style("visibility","hidden"); if (pinned === null) { resetCells(); resetInfo(); } })
        .on("click", function(e,d){
          e.stopPropagation();
          if (pinned === d.data.occode) { clear(); }
          else { pinned = d.data.occode; paintCategory(d, true); }
        });

      function membersOf(d){
        const n = byOcc.get(d.data.occode), code = n ? n.codes[curYear] : null;
        return new Set(code ? (groups[curYear].get(code) || [d.data.occode]) : [d.data.occode]);
      }
      function paintCategory(d, isPin){
        const set = membersOf(d);
        cell.attr("fill", c => set.has(c.data.occode) ? HI : "#e8e8e8")
            .attr("fill-opacity", c => set.has(c.data.occode) ? 0.95 : 0.45)
            .attr("stroke", c => c.data.occode === d.data.occode ? "#000" : "#fff")
            .attr("stroke-width", c => c.data.occode === d.data.occode ? 1.6 : 0.5);
        info.html(`<strong style="color:${HI}">${set.size}</strong> shared this census category in ${curYear}` + (isPin ? ` &nbsp;·&nbsp; <em>pinned — hover the others to read them; click it again to release</em>` : ``));
      }
      function showTip(d){
        const n = byOcc.get(d.data.occode), code = n ? n.codes[curYear] : null;
        tip.style("visibility","visible").html(`<strong>${d.data.name}</strong>` + (n ? `<br>${n.order}<br><span style="color:#888">${curYear} census code ${code}</span>` : ''));
      }
      function resetInfo(){ info.html("hover an occupation · click to pin it"); }
      function resetCells(){ cell.attr("fill","#e0e0e0").attr("fill-opacity",1).attr("stroke","#fff").attr("stroke-width",0.5); }
      function clear(){ pinned = null; resetCells(); tip.style("visibility","hidden"); resetInfo(); }

      svg.on("click", () => { if (pinned !== null) clear(); });

      const btnSel = d3.select("#tm-buttons").selectAll("button").data(YEARS).join("button")
        .attr("class","tm-yrbtn").text(y => y).on("click", (e, y) => setYear(y));
      function setYear(yr){ curYear = yr; btnSel.classed("active", y => y === yr); clear(); }
      setYear(YEARS[0]);
    });
  });
})();
</script>


<!-- ================================================================ -->
<!-- ================================================================ -->
<!-- 1851->1861 structural transition: movers within fixed Orders      -->
<!-- ================================================================ -->

<h3>Migration within Orders, 1851 &rarr; 1861</h3>

<p>Zoom in one level. Even <em>within</em> a single Order, the census kept reorganising. Here the 22 Orders stay fixed as the outer bubbles, and inside each one the occupations are grouped by their <em>real census category</em> for the chosen year. Flip between 1851 and 1861 to watch occupations <strong style="color:#E6550D;">split</strong> apart, <strong style="color:#3182BD;">merge</strong> together, or <strong style="color:#756BB1;">reshuffle</strong> within their Order. Unchanged occupations stay grey.</p>

<div style="display:flex;align-items:center;gap:10px;margin:8px 0;flex-wrap:wrap;">
  <span>Census year:</span>
  <button id="cc-btn-1851" class="cc-yrbtn">1851</button>
  <button id="cc-btn-1861" class="cc-yrbtn">1861</button>
  <span id="cc-count" style="font-size:0.85em;color:#888;margin-left:6px;"></span>
</div>
<style>
  .cc-yrbtn { padding:5px 14px; font-size:14px; cursor:pointer; border:1px solid #bbb; background:#fff; border-radius:4px; }
  .cc-yrbtn.active { background:#333; color:#fff; border-color:#333; }
</style>

<div id="cc-legend" style="font-size:0.85em;margin:2px 0 8px;line-height:1.8;">
  <span style="margin-right:14px;white-space:nowrap;"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:#E6550D;margin-right:4px;"></span>Split apart</span>
  <span style="margin-right:14px;white-space:nowrap;"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:#3182BD;margin-right:4px;"></span>Merged together</span>
  <span style="margin-right:14px;white-space:nowrap;"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:#756BB1;margin-right:4px;"></span>Reshuffled</span>
  <span style="white-space:nowrap;"><span style="display:inline-block;width:11px;height:11px;border-radius:50%;background:#dcdcdc;margin-right:4px;"></span>Unchanged</span>
</div>

<div id="cc-pack" style="max-width:820px;margin:0 auto;"></div>

<script>
(function(){
  function ready(fn){ if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true}); else fn(); }
  ready(function(){
    const W = 820, H = 820;
    d3.json("/assets/data/occ_census_codes.json").then(D => {
      const nodes = D.nodes;
      const codeOf = (n, yr) => n.codes[yr] || '(none)';

      // classify each occupation's move 1851 -> 1861 by the change in its category companions
      function groupsByYear(yr){ const m = new Map(); nodes.forEach(n => { const c = codeOf(n, yr); if (!m.has(c)) m.set(c, []); m.get(c).push(n.occode); }); return m; }
      const g51 = groupsByYear('1851'), g61 = groupsByYear('1861');
      const MCOL = { stable:'#dcdcdc', merge:'#3182BD', split:'#E6550D', reshuffle:'#756BB1' };
      const moveType = {};
      nodes.forEach(n => {
        const c51 = new Set(g51.get(codeOf(n,'1851')).filter(o => o !== n.occode));
        const c61 = new Set(g61.get(codeOf(n,'1861')).filter(o => o !== n.occode));
        let lost = 0, gained = 0;
        c51.forEach(o => { if (!c61.has(o)) lost++; });
        c61.forEach(o => { if (!c51.has(o)) gained++; });
        moveType[n.occode] = (lost===0 && gained===0) ? 'stable' : (gained>0 && lost===0) ? 'merge' : (lost>0 && gained===0) ? 'split' : 'reshuffle';
      });

      // fixed Order layout (sized by total 1911 workforce), computed once
      const orderTotals = d3.rollups(nodes, v => d3.sum(v, d => Math.max(d.size,1)), d => d.order);
      const orderRoot = d3.hierarchy({ children: orderTotals.map(([o,t]) => ({ order:o, value:t })) }).sum(d => d.value || 0).sort((a,b)=>b.value-a.value);
      d3.pack().size([W,H]).padding(6)(orderRoot);

      // For a year: occode positions + the census-category bubbles (>=2 members),
      // each packed INSIDE its fixed Order circle.
      function layoutFor(yr){
        const occ = {}, cats = [];
        orderRoot.children.forEach(oc => {
          const members = nodes.filter(n => n.order === oc.data.order);
          const groups = d3.groups(members, n => codeOf(n, yr));
          const sub = d3.hierarchy({ children: groups.map(([c, ms]) => ({ code:c, children: ms.map(m => ({ leaf:m })) })) })
            .sum(d => d.leaf ? Math.max(d.leaf.size,1) : 0).sort((a,b)=>b.value-a.value);
          const R = Math.max(oc.r - 2, 1);
          d3.pack().size([2*R, 2*R]).padding(1.5)(sub);
          (sub.children || []).forEach(c => {
            if ((c.children ? c.children.length : 0) >= 2)
              cats.push({ key: oc.data.order + '|' + c.data.code, x: oc.x - R + c.x, y: oc.y - R + c.y, r: c.r });
          });
          sub.leaves().forEach(lf => { occ[lf.data.leaf.occode] = { x: oc.x - R + lf.x, y: oc.y - R + lf.y, r: lf.r }; });
        });
        return { occ, cats };
      }

      const svg = d3.select("#cc-pack").append("svg")
        .attr("viewBox", `0 0 ${W} ${H}`).attr("width","100%").style("height","auto")
        .style("display","block").style("font","10px sans-serif").style("background","#fcfcfc");

      // fixed Order outlines + labels (never move)
      svg.append("g").selectAll("circle").data(orderRoot.children).join("circle")
        .attr("cx",d=>d.x).attr("cy",d=>d.y).attr("r",d=>d.r)
        .attr("fill","none").attr("stroke","#d0d0d0").attr("stroke-width",1.2);
      svg.append("g").attr("text-anchor","middle").style("pointer-events","none").style("fill","#999")
        .selectAll("text").data(orderRoot.children).join("text")
        .attr("x",d=>d.x).attr("y",d=>d.y-d.r+12).style("font-size","11px").style("font-weight","600").text(d=>d.data.order);

      const tip = d3.select("body").append("div")
        .style("position","absolute").style("pointer-events","none").style("visibility","hidden")
        .style("background","#fff").style("border","1px solid #ccc").style("padding","6px 10px")
        .style("border-radius","5px").style("font-size","13px").style("max-width","280px")
        .style("box-shadow","0 2px 6px rgba(0,0,0,.2)");

      const catG  = svg.append("g");
      const leafG = svg.append("g");
      const layoutByYear = { '1851': layoutFor('1851'), '1861': layoutFor('1861') };

      const sel = leafG.selectAll("circle").data(nodes, d => d.occode)
        .join("circle")
          .attr("cx", d => layoutByYear['1851'].occ[d.occode].x)
          .attr("cy", d => layoutByYear['1851'].occ[d.occode].y)
          .attr("r",  d => layoutByYear['1851'].occ[d.occode].r)
          .attr("fill", d => MCOL[moveType[d.occode]])
          .attr("fill-opacity", d => moveType[d.occode]==='stable' ? 0.5 : 0.9)
          .attr("stroke","#fff").attr("stroke-width",0.4)
          .on("mouseover", function(e,d){
            tip.style("visibility","visible").html(`<strong>${d.name}</strong><br>${d.order}<br><span style="color:#888">1851 code ${codeOf(d,'1851')} &rarr; 1861 code ${codeOf(d,'1861')}</span><br><em>${moveType[d.occode]}</em>`);
            d3.select(this).attr("stroke","#222").attr("stroke-width",1.2);
          })
          .on("mousemove", e => tip.style("left",(e.pageX+12)+"px").style("top",(e.pageY-10)+"px"))
          .on("mouseout", function(){ tip.style("visibility","hidden"); d3.select(this).attr("stroke","#fff").attr("stroke-width",0.4); });

      function show(yr){
        const L = layoutByYear[yr];
        // census-category bubbles (the lumps) grow / shrink / move so splits & merges are visible
        const cs = catG.selectAll("circle").data(L.cats, d => d.key);
        cs.exit().transition().duration(2000).ease(d3.easeCubicInOut).attr("r",0).style("opacity",0).remove();
        cs.enter().append("circle")
            .attr("fill","#000").attr("fill-opacity",0.045).attr("stroke","#aaa").attr("stroke-width",0.8)
            .attr("cx",d=>d.x).attr("cy",d=>d.y).attr("r",0).style("opacity",0)
          .merge(cs).transition().duration(2000).ease(d3.easeCubicInOut)
            .attr("cx",d=>d.x).attr("cy",d=>d.y).attr("r",d=>d.r).style("opacity",1);
        // occupations glide into their new groups
        sel.transition().duration(2000).ease(d3.easeCubicInOut)
          .attr("cx", d => L.occ[d.occode].x).attr("cy", d => L.occ[d.occode].y).attr("r", d => L.occ[d.occode].r);
        d3.select("#cc-btn-1851").classed("active", yr==='1851');
        d3.select("#cc-btn-1861").classed("active", yr==='1861');
        d3.select("#cc-count").text(`${(yr==='1851'?g51:g61).size} census categories in ${yr}`);
      }
      d3.select("#cc-btn-1851").on("click", () => show('1851'));
      d3.select("#cc-btn-1861").on("click", () => show('1861'));
      show('1851');
    });
  });
})();
</script>




<!-- ================================================ -->
<!-- SECTION 6: Conclusion                            -->
<!-- ================================================ -->

<h2 style="margin-top:2em;">6. Conclusion</h2>

<ul style="max-width:820px;line-height:1.8;padding-left:1.2em;">
  <li>From roughly 800 industries to about 10,000 micro-occupations.</li>
  <li>Micro-occupations are necessary to track the emergence of new work and the decline of older jobs.</li>
  <li>Rise of management jobs and factory work.</li>
  <li>Decline of the apprenticeship system, in terms of shares. In absolute numbers, it increases by about 9,000.</li>
  <li><strong>Implications:</strong> how society absorbs technological shocks; who gets the new jobs.</li>
  <li><strong>Next steps:</strong> finalise boundaries and definitions of new jobs.</li>
</ul>
