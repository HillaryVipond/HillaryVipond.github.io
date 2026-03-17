---
layout: single
title: "Mapping the Second Industrial Revolution"
permalink: /LSE/
nav_exclude: false
---
 
<p style="font-size:1.2em;font-style:italic;color:#666;margin-top:0.2rem;margin-bottom:2rem;">Inequalities Institute, March 2026</p>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

<!-- ===================== -->
<!-- Section 1: Technology -->
<!-- ===================== -->

<h2>Technology: Geographic Distribution</h2>

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

<hr style="margin:32px 0;">

<!-- ===================== -->
<!-- Section 2: Management -->
<!-- ===================== -->

<h2>Management: Geographic Distribution</h2>

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


<!-- ========================= -->
<!-- Section 3: Apprenticeships -->
<!-- ========================= -->

<h2>Apprenticeship System</h2>

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

<h2>Occupational Skills Inheritance</h2>

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
<!-- VISUAL BREAK + CHANNEL INTRO                    -->
<!-- ================================================ -->

<hr style="border:none;border-top:3px solid #333;margin:60px 0 40px;">

<h2>Two Channels: Technology, Transition, and the Next Generation</h2>

<p>
  Both settings — tailors and bootmakers — tell a story about the same underlying mechanism.
  When an industry transitions from artisanal to mechanised production, it creates winners and losers.
  How a family is positioned relative to that transition directly shapes what the next generation can access.
</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin:32px 0 48px;">

  <div style="border-left:4px solid #6BAED6;padding:16px 20px;background:#f7faff;">
    <h3 style="margin-top:0;font-size:1.1em;color:#2171B5;">The Parent Channel</h3>
    <p style="font-size:0.95em;margin-bottom:0;">
      If your father's trade is thriving — because it adopted the new technology successfully — you
      inherit a platform: access to the networks, capital, and organisational knowledge of a growing
      industry. If his trade is contracting, that constraint passes down too. This is the
      <strong>Kastis &amp; Vipond</strong> mechanism: in tailoring, Jewish immigrants adopted the
      sewing machine more rapidly, and their sons were embedded in the winning side of the transition.
    </p>
  </div>

  <div style="border-left:4px solid #FD8D3C;padding:16px 20px;background:#fff8f2;">
    <h3 style="margin-top:0;font-size:1.1em;color:#D94801;">The Local Labour Market Channel</h3>
    <p style="font-size:0.95em;margin-bottom:0;">
      Where you live when the technology arrives determines which opportunities are locally accessible.
      Sons growing up in counties where bootmaking mechanised successfully had a very different
      set of options than sons in the 38 counties where the trade contracted. The place is doing
      the work — not family transmission. This echoes the <strong>Abramitzky et al. (2021)</strong>
      finding that geography, not culture, drives much of the mobility advantage.
    </p>
  </div>

</div>

<hr style="border:none;border-top:1px solid #ddd;margin:0 0 48px;">

<!-- ================================================ -->
<!-- SECTION: THE PARENT CHANNEL                     -->
<!-- ================================================ -->

<h2>The Parent Channel</h2>

<p>
  Two very different industries — immigrant tailoring and domestic bootmaking — tell the same story.
  Where the father's trade is thriving, sons are protected from downward mobility and channelled into
  higher-status occupations when they leave. Where it is contracting, sons scatter across the full
  hierarchy, and a substantial share fall far below their fathers.
</p>


<!-- ---- TAILORS ---- -->

<!-- ╔═══════════════════════════════════════╗ -->
<!-- ║  SLIDE 1 — Title + image + bullets    ║ -->
<!-- ╚═══════════════════════════════════════╝ -->
<div id="tailor-slide-1" style="border:1px solid #e0e0e0;border-radius:6px;padding:40px 40px 64px;margin:24px 0;background:#fff;min-height:100vh;display:flex;flex-direction:column;justify-content:center;position:relative;">

  <h3 style="margin-top:0;">Tailors: Pale of Settlement Sons vs. English Sons</h3>
  <p style="color:#444;margin-bottom:24px;">
    Sons of Pale-born tailors (1891 census) linked forward to 1911. Every father is a tailor — the
    comparison is purely about what happens to the next generation, conditional on the same starting point.
    Tailors sit at the <strong>68th percentile</strong> of the 1911 workforce.
  </p>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;">
    <div style="border-radius:4px;overflow:hidden;">
      <img src="/assets/images/Tailors.jpg" alt="Tailors in Victorian England"
           style="width:100%;display:block;object-fit:cover;object-position:center 30%;height:380px;">
    </div>
    <ul style="font-size:0.95em;line-height:1.9;padding-left:1.2em;margin:0;color:#333;">
      <li>Pogroms and the May Laws triggered a large wave of Jewish emigration from the Russian Empire — more than 2 million Jewish people fled between 1881 and 1920.</li>
      <li>Jewish immigrants from the Pale of Settlement entered the tailoring trade from the 1880s onwards, concentrated in London's East End, Leeds, and Manchester.</li>
      <li>They brought organisational practices that accelerated sewing machine adoption in ready-to-wear production.</li>
      <li>Jewish tailors adopted the sewing machine more rapidly than their English counterparts.</li>
      <li>The ethnic economy provided both a <strong>floor</strong> (preventing falls into unskilled labour) and a <strong>ladder</strong> (channelling leavers into commercial and retail occupations).</li>
    </ul>
  </div>

  <button onclick="document.getElementById('tailor-slide-2').scrollIntoView({behavior:'smooth'})"
    style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:none;border:1px solid #ccc;border-radius:20px;padding:5px 20px;font-size:13px;color:#888;cursor:pointer;">↓ next</button>

</div>

<!-- ╔═══════════════════════════════════════╗ -->
<!-- ║  SLIDE 2 — Key finding + bar charts   ║ -->
<!-- ╚═══════════════════════════════════════╝ -->
<div id="tailor-slide-2" style="border:1px solid #e0e0e0;border-radius:6px;padding:40px 40px 64px;margin:24px 0;background:#fff;min-height:100vh;display:flex;flex-direction:column;justify-content:center;position:relative;">

  <div style="background:#f0f6ff;border-left:4px solid #6BAED6;padding:14px 18px;margin-bottom:28px;font-size:0.95em;">
    <strong>Key finding:</strong> The share moving <em>up</em> is similar across both groups (38% vs 35%).
    The entire gap is driven by the <strong>downward tail</strong> — 52% of English sons fall below their
    father's position, compared to only 39% of Pale sons. The ethnic economy provides a
    <strong>floor</strong> that prevents occupational collapse.
  </div>

  <div style="font-size:13px;font-weight:500;margin-bottom:10px;color:#333;">Top occupational destinations — 1911</div>
  <div style="display:flex;gap:16px;margin-bottom:14px;flex-wrap:wrap;">
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#555;">
      <div style="width:12px;height:12px;border-radius:2px;background:#1D9E75;flex-shrink:0;"></div>Above father (HISCAM &gt; 51.6)
    </div>
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#555;">
      <div style="width:12px;height:12px;border-radius:2px;background:#888780;flex-shrink:0;"></div>Same level
    </div>
    <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#555;">
      <div style="width:12px;height:12px;border-radius:2px;background:#D85A30;flex-shrink:0;"></div>Below father
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
    <div>
      <div style="font-size:12px;font-weight:500;margin-bottom:8px;color:#333;">Pale of Settlement sons</div>
      <svg id="pale-dest-chart" style="width:100%;display:block;"></svg>
    </div>
    <div>
      <div style="font-size:12px;font-weight:500;margin-bottom:8px;color:#333;">English sons</div>
      <svg id="english-dest-chart" style="width:100%;display:block;"></svg>
    </div>
  </div>
  <div style="font-size:11px;color:#888;margin-top:8px;">Bar width = number of sons. Hover for detail. Sorted by HISCAM score (high → low).</div>

  <button onclick="document.getElementById('tailor-slide-3').scrollIntoView({behavior:'smooth'})"
    style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:none;border:1px solid #ccc;border-radius:20px;padding:5px 20px;font-size:13px;color:#888;cursor:pointer;">↓ next</button>

</div>

<!-- ╔═══════════════════════════════════════╗ -->
<!-- ║  SLIDE 3 — Rank change + direction    ║ -->
<!-- ╚═══════════════════════════════════════╝ -->
<div id="tailor-slide-3" style="border:1px solid #e0e0e0;border-radius:6px;padding:40px 40px 64px;margin:24px 0;background:#fff;min-height:100vh;display:flex;flex-direction:column;justify-content:center;position:relative;">

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;">
    <div>
      <h4 style="margin:0 0 12px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Mean rank change (percentile points)</h4>
      <div id="tailor-rank-chart"></div>
    </div>
    <div>
      <h4 style="margin:0 0 12px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Direction of movement</h4>
      <div id="tailor-direction-chart"></div>
    </div>
  </div>

  <button onclick="document.getElementById('tailor-slide-4').scrollIntoView({behavior:'smooth'})"
    style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:none;border:1px solid #ccc;border-radius:20px;padding:5px 20px;font-size:13px;color:#888;cursor:pointer;">↓ next</button>

</div>

<!-- ╔═══════════════════════════════════════╗ -->
<!-- ║  SLIDE 4 — Sankey only                ║ -->
<!-- ╚═══════════════════════════════════════╝ -->
<div id="tailor-slide-4" style="border:1px solid #e0e0e0;border-radius:6px;padding:40px 40px;margin:24px 0;background:#fff;min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:13px;font-weight:500;text-align:center;margin-bottom:20px;color:#333;">
    Sons of tailors — occupational mobility, 1891 → 1911
  </div>
  <div style="margin-bottom:24px;"><svg id="sk-pale" style="width:100%;display:block;"></svg></div>
  <div><svg id="sk-eng" style="width:100%;display:block;"></svg></div>
</div>

<!-- Tooltip div for bar charts -->
<div id="dest-tooltip" style="position:fixed;background:#fff;border:1px solid #aaa;padding:7px 11px;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.12);pointer-events:none;font-size:12px;visibility:hidden;z-index:999;"></div>

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }
  ready(function(){

    const TAILOR_HISCAM = 51.56;
    const TOTAL_PALE = 621, TOTAL_ENG = 20093;
    const tooltip = d3.select("#dest-tooltip");

    const paleData = [
      { occ:"Clothiers & outfitters",   n:13,  hiscam:60.31 },
      { occ:"General shopkeepers",      n:11,  hiscam:60.31 },
      { occ:"Commercial travellers",    n:21,  hiscam:59.88 },
      { occ:"Furniture and fittings",   n:16,  hiscam:59.27 },
      { occ:"Commercial clerks",        n:18,  hiscam:58.68 },
      { occ:"Schoolmasters & teachers", n:7,   hiscam:58.13 },
      { occ:"Hairdressers",             n:8,   hiscam:54.13 },
      { occ:"Machinists",               n:8,   hiscam:53.76 },
      { occ:"Waterproof goods makers",  n:13,  hiscam:51.85 },
      { occ:"Tailors (default)",        n:139, hiscam:51.56 },
      { occ:"Tobacco manufacture",      n:6,   hiscam:50.81 },
      { occ:"Skinners & furriers",      n:7,   hiscam:50.53 },
      { occ:"Other clothing mfrs",      n:102, hiscam:50.31 },
      { occ:"Grocers & tea dealers",    n:7,   hiscam:50.04 },
      { occ:"Greengrocers",             n:6,   hiscam:50.04 },
      { occ:"Shoe & boot makers",       n:17,  hiscam:47.38 },
    ].sort((a,b) => b.hiscam - a.hiscam);

    const englishData = [
      { occ:"Railway officials/clerks", n:188,  hiscam:64.56 },
      { occ:"Clothiers & outfitters",   n:281,  hiscam:60.31 },
      { occ:"General shopkeepers",      n:182,  hiscam:60.31 },
      { occ:"Bakers (dealers)",         n:173,  hiscam:60.31 },
      { occ:"Commercial travellers",    n:274,  hiscam:59.88 },
      { occ:"Commercial clerks",        n:818,  hiscam:58.68 },
      { occ:"Schoolmasters & teachers", n:213,  hiscam:58.13 },
      { occ:"Tailors (default)",        n:2520, hiscam:51.56 },
      { occ:"Butchers",                 n:186,  hiscam:51.30 },
      { occ:"Other clothing mfrs",      n:758,  hiscam:50.31 },
      { occ:"Grocers & tea dealers",    n:318,  hiscam:50.04 },
      { occ:"Carpenter, joiner",        n:387,  hiscam:50.00 },
      { occ:"Messengers & porters",     n:167,  hiscam:49.99 },
      { occ:"Warehousemen",             n:176,  hiscam:47.15 },
      { occ:"Shoe & boot makers",       n:279,  hiscam:47.38 },
      { occ:"Postmen",                  n:212,  hiscam:45.47 },
      { occ:"Painters & decorators",    n:432,  hiscam:38.33 },
      { occ:"Carmen & carters",         n:275,  hiscam:35.20 },
      { occ:"General labourers",        n:665,  hiscam:34.52 },
      { occ:"Coal miners",              n:258,  hiscam:33.20 },
    ].sort((a,b) => b.hiscam - a.hiscam);

    function drawDestChart(containerId, data, total) {
      const margin = {top:4, right:16, bottom:28, left:172};
      const rowH = 22;
      const totalH = data.length * rowH + margin.top + margin.bottom;
      const totalW = 500;
      const innerW = totalW - margin.left - margin.right;
      const innerH = totalH - margin.top - margin.bottom;

      const svg = d3.select(`#${containerId}`)
        .attr("width", totalW).attr("height", totalH)
        .attr("viewBox", `0 0 ${totalW} ${totalH}`)
        .style("max-width","100%");

      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
      const maxN = d3.max(data, d => d.n);
      const x = d3.scaleLinear().domain([0, maxN]).range([0, innerW]);
      const y = d3.scaleBand().domain(data.map(d => d.occ)).range([0, innerH]).padding(0.18);

      const colorFn = d => d.hiscam > TAILOR_HISCAM + 0.5 ? "#1D9E75"
                         : d.hiscam < TAILOR_HISCAM - 0.5 ? "#D85A30"
                         : "#888780";

      g.selectAll(".bar").data(data).join("rect").attr("class","bar")
        .attr("y", d => y(d.occ)).attr("height", y.bandwidth())
        .attr("x", 0).attr("width", d => x(d.n)).attr("rx", 2)
        .attr("fill", colorFn)
        .on("mouseover", function(event, d) {
          const pct = ((d.n / total) * 100).toFixed(1);
          tooltip.style("visibility","visible")
            .html(`<strong>${d.occ}</strong><br>${d.n.toLocaleString()} sons (${pct}%)<br>HISCAM: ${d.hiscam}`);
          d3.select(this).attr("opacity", 0.75);
        })
        .on("mousemove", function(event) {
          tooltip.style("left", (event.clientX + 14) + "px").style("top", (event.clientY - 28) + "px");
        })
        .on("mouseout", function() {
          tooltip.style("visibility","hidden");
          d3.select(this).attr("opacity", 1);
        });

      g.selectAll(".n-label").data(data).join("text")
        .attr("y", d => y(d.occ) + y.bandwidth()/2 + 4)
        .attr("x", d => x(d.n) + 4)
        .attr("font-size","10px").attr("fill","#888")
        .text(d => d.n.toLocaleString());

      g.selectAll(".occ-label").data(data).join("text")
        .attr("y", d => y(d.occ) + y.bandwidth()/2 + 4)
        .attr("x", -6).attr("text-anchor","end")
        .attr("font-size","12px").attr("fill","#333")
        .text(d => d.occ);

      g.append("g").attr("transform",`translate(0,${innerH})`)
        .call(d3.axisBottom(x).ticks(4).tickSize(3))
        .selectAll("text").attr("font-size","10px").attr("fill","#888");

      g.select(".domain").attr("stroke","#ddd");
    }

    drawDestChart("pale-dest-chart", paleData, TOTAL_PALE);
    drawDestChart("english-dest-chart", englishData, TOTAL_ENG);

    // ── Rank change ──
    const rankData = [
      { group:"Pale sons",    value:1.3,  color:"#6BAED6" },
      { group:"English sons", value:-8.6, color:"#FD8D3C" }
    ];
    const rm = {top:20,right:20,bottom:40,left:100};
    const rw = 340-rm.left-rm.right, rh = 160-rm.top-rm.bottom;
    const rsvg = d3.select("#tailor-rank-chart").append("svg")
      .attr("viewBox",[0,0,rw+rm.left+rm.right,rh+rm.top+rm.bottom])
      .append("g").attr("transform",`translate(${rm.left},${rm.top})`);
    const rx = d3.scaleLinear().domain([-12,6]).nice().range([0,rw]);
    const ry = d3.scaleBand().domain(rankData.map(d=>d.group)).range([0,rh]).padding(0.35);
    rsvg.append("g").attr("transform",`translate(0,${rh})`).call(d3.axisBottom(rx).ticks(5));
    rsvg.append("g").call(d3.axisLeft(ry).tickSize(0)).select(".domain").remove();
    rsvg.append("line").attr("x1",rx(0)).attr("x2",rx(0)).attr("y1",0).attr("y2",rh)
      .attr("stroke","#999").attr("stroke-dasharray","4,3").attr("stroke-width",1);
    rsvg.selectAll(".rbar").data(rankData).join("rect").attr("class","rbar")
      .attr("y",d=>ry(d.group)).attr("height",ry.bandwidth())
      .attr("x",d=>d.value>=0?rx(0):rx(d.value)).attr("width",d=>Math.abs(rx(d.value)-rx(0))).attr("fill",d=>d.color);
    rsvg.selectAll(".rlabel").data(rankData).join("text").attr("class","rlabel")
      .attr("y",d=>ry(d.group)+ry.bandwidth()/2+4)
      .attr("x",d=>d.value>=0?rx(d.value)+4:rx(d.value)-4)
      .attr("text-anchor",d=>d.value>=0?"start":"end")
      .attr("font-size","12px").attr("font-weight","600")
      .text(d=>(d.value>=0?"+":"")+d.value);

    // ── Direction of movement ──
    const dirData = [
      { group:"Pale sons",    up:38.3, stay:22.4, down:39.3 },
      { group:"English sons", up:34.9, stay:12.9, down:52.2 }
    ];
    const dm = {top:20,right:120,bottom:40,left:100};
    const dw = 380-dm.left-dm.right, dh = 160-dm.top-dm.bottom;
    const dsvg = d3.select("#tailor-direction-chart").append("svg")
      .attr("viewBox",[0,0,dw+dm.left+dm.right,dh+dm.top+dm.bottom])
      .append("g").attr("transform",`translate(${dm.left},${dm.top})`);
    const dy = d3.scaleBand().domain(dirData.map(d=>d.group)).range([0,dh]).padding(0.35);
    const dx = d3.scaleLinear().domain([0,100]).range([0,dw]);
    dsvg.append("g").attr("transform",`translate(0,${dh})`).call(d3.axisBottom(dx).ticks(4).tickFormat(d=>d+"%"));
    dsvg.append("g").call(d3.axisLeft(dy).tickSize(0)).select(".domain").remove();
    const stackColors = {up:"#74C476",stay:"#bbb",down:"#FB6A4A"};
    d3.stack().keys(["up","stay","down"])(dirData).forEach(layer=>{
      dsvg.selectAll(`.bar-${layer.key}`).data(layer).join("rect")
        .attr("y",d=>dy(d.data.group)).attr("height",dy.bandwidth())
        .attr("x",d=>dx(d[0])).attr("width",d=>dx(d[1])-dx(d[0])).attr("fill",stackColors[layer.key]);
    });
    [{label:"Moved up",color:"#74C476"},{label:"Same",color:"#bbb"},{label:"Moved down",color:"#FB6A4A"}].forEach((item,i)=>{
      dsvg.append("rect").attr("x",dw+8).attr("y",i*18).attr("width",12).attr("height",12).attr("fill",item.color);
      dsvg.append("text").attr("x",dw+24).attr("y",i*18+10).attr("font-size","11px").text(item.label);
    });

    // ── Sankey ──
    const W=580,H=200,PAD_TOP=30,INNER=H-PAD_TOP-10;
    const SRC_X=80,SRC_W=14,BOX_X=W-120,BOX_W=108,BOX_GAP=10;
    const UP_C="#619CFF",SAME_C="#00BA38",DOWN_C="#F8766D",SRC_C="#C77CFF";
    [{id:"sk-pale",label:"Pale of Settlement sons",n:"621",up:38.3,same:22.4,down:39.3},
     {id:"sk-eng", label:"English sons",n:"20,093",up:34.9,same:12.9,down:52.2}
    ].forEach(d=>{
      const svg=d3.select(`#${d.id}`).attr("viewBox",`0 0 ${W} ${H}`).attr("height",H);
      const upH=INNER*d.up/100,sameH=INNER*d.same/100;
      const segs=[
        {color:UP_C,  pct:d.up,  label:"Moved up",  srcY1:PAD_TOP,             srcY2:PAD_TOP+upH},
        {color:SAME_C,pct:d.same,label:"Same level", srcY1:PAD_TOP+upH,         srcY2:PAD_TOP+upH+sameH},
        {color:DOWN_C,pct:d.down,label:"Moved down", srcY1:PAD_TOP+upH+sameH,   srcY2:PAD_TOP+INNER}
      ];
      const totBH=INNER-BOX_GAP*2;
      const bH=segs.map(s=>Math.max(28,totBH*s.pct/100));
      const bT=[]; let cur=PAD_TOP; bH.forEach(h=>{bT.push(cur);cur+=h+BOX_GAP;});
      segs.forEach((s,i)=>{
        const y1=bT[i],h=bH[i],mid=y1+h/2,cp=(SRC_X+SRC_W+BOX_X)/2;
        svg.append("path").attr("d",`M ${SRC_X+SRC_W} ${s.srcY1} C ${cp} ${s.srcY1},${cp} ${y1},${BOX_X} ${y1} L ${BOX_X} ${y1+h} C ${cp} ${y1+h},${cp} ${s.srcY2},${SRC_X+SRC_W} ${s.srcY2} Z`)
          .attr("fill",s.color).attr("opacity",0.22);
        svg.append("rect").attr("x",BOX_X).attr("y",y1).attr("width",BOX_W).attr("height",h)
          .attr("rx",5).attr("fill",s.color).attr("opacity",0.18).attr("stroke",s.color).attr("stroke-width",1.5);
        svg.append("text").attr("x",BOX_X+BOX_W/2).attr("y",mid-(h>32?4:-5)).attr("text-anchor","middle").attr("font-size","14px").attr("font-weight","500").attr("fill",s.color).text(`${s.pct}%`);
        if(h>28) svg.append("text").attr("x",BOX_X+BOX_W/2).attr("y",mid+13).attr("text-anchor","middle").attr("font-size","10px").attr("fill",s.color).text(s.label);
      });
      svg.append("rect").attr("x",SRC_X).attr("y",PAD_TOP).attr("width",SRC_W).attr("height",INNER).attr("fill",SRC_C).attr("opacity",0.5).attr("rx",2);
      svg.append("text").attr("x",SRC_X+SRC_W/2).attr("y",PAD_TOP-14).attr("text-anchor","middle").attr("font-size","12px").attr("font-weight","500").attr("fill",SRC_C).text("Father: Tailor");
      svg.append("text").attr("x",SRC_X+SRC_W/2).attr("y",PAD_TOP-2).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#666").text(`${d.label}  (n = ${d.n})`);
    });

  });
})();
</script>
</script>

<!-- ---- BOOTMAKERS ---- -->

<h3>Bootmakers: Growth vs. Decline Counties</h3>

<p>
  Sons of bootmaker-headed households linked forward 30 years (1851→1881 and 1861→1891).
  Counties classified by employment change in bootmaking: <strong>Growth</strong>
  (Northamptonshire, Leicestershire), <strong>Steady</strong>, and <strong>Decline</strong>
  (38 of 42 counties). Bootmakers sit at the <strong>54th percentile</strong> of the workforce.
</p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin:24px 0 16px;align-items:start;">
  <div>
    <h4 style="margin-bottom:8px;">Occupational Inheritance Rate</h4>
    <div id="boot-inherit-chart"></div>
  </div>
  <div>
    <h4 style="margin-bottom:8px;">Share Becoming General Labourers</h4>
    <div id="boot-labourer-chart"></div>
  </div>
</div>

<div style="background:#f7f7f7;border-left:4px solid #FD8D3C;padding:14px 18px;margin:0 0 40px;font-size:0.92em;">
  <strong>Key finding:</strong> Where the trade is thriving, sons stay and are protected — inheritance
  in Growth counties is more than double that in Decline counties, and sons in Growth counties are
  <strong>half as likely to become general labourers</strong>. The same floor-and-ladder mechanism
  as in the tailor case, driven by local industrial geography rather than ethnic community.
</div>

<script>
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  ready(function(){

    const cohortColors = { c1851: "#6BAED6", c1861: "#2171B5" };

    // ── Inheritance rates ──
    const inheritData = [
      { group: "Growth",  c1851: 54.4, c1861: 54.2 },
      { group: "Steady",  c1851: 21.9, c1861: 18.1 },
      { group: "Decline", c1851: 24.5, c1861: 19.6 }
    ];

    const im = {top:20, right:20, bottom:50, left:70};
    const iw = 340 - im.left - im.right;
    const ih = 200 - im.top - im.bottom;

    const isvg = d3.select("#boot-inherit-chart")
      .append("svg")
      .attr("viewBox", [0, 0, iw + im.left + im.right, ih + im.top + im.bottom])
      .append("g")
      .attr("transform", `translate(${im.left},${im.top})`);

    const ix = d3.scaleBand().domain(inheritData.map(d => d.group)).range([0, iw]).padding(0.25);
    const ix2 = d3.scaleBand().domain(["c1851","c1861"]).range([0, ix.bandwidth()]).padding(0.1);
    const iy = d3.scaleLinear().domain([0, 65]).range([ih, 0]);

    isvg.append("g").attr("transform",`translate(0,${ih})`).call(d3.axisBottom(ix).tickSize(0));
    isvg.append("g").call(d3.axisLeft(iy).ticks(5).tickFormat(d => d + "%"));

    inheritData.forEach(d => {
      ["c1851","c1861"].forEach(cohort => {
        isvg.append("rect")
          .attr("x", ix(d.group) + ix2(cohort))
          .attr("y", iy(d[cohort]))
          .attr("width", ix2.bandwidth())
          .attr("height", ih - iy(d[cohort]))
          .attr("fill", cohortColors[cohort]);
      });
    });

    [["#6BAED6","1851→1881"],["#2171B5","1861→1891"]].forEach(([c,l], i) => {
      isvg.append("rect").attr("x", 0).attr("y", ih + 10 + i * 14).attr("width",10).attr("height",10).attr("fill",c);
      isvg.append("text").attr("x",14).attr("y", ih + 19 + i * 14).attr("font-size","10px").text(l);
    });

    // ── General labourer rate ──
    const labData = [
      { group: "Growth",  c1851: 2.0, c1861: 2.4 },
      { group: "Steady",  c1851: 5.0, c1861: 3.8 },
      { group: "Decline", c1851: 4.5, c1861: 5.0 }
    ];

    const lm = {top:20, right:20, bottom:50, left:70};
    const lw = 340 - lm.left - lm.right;
    const lh = 200 - lm.top - lm.bottom;

    const lsvg = d3.select("#boot-labourer-chart")
      .append("svg")
      .attr("viewBox", [0, 0, lw + lm.left + lm.right, lh + lm.top + lm.bottom])
      .append("g")
      .attr("transform", `translate(${lm.left},${lm.top})`);

    const lx = d3.scaleBand().domain(labData.map(d => d.group)).range([0, lw]).padding(0.25);
    const lx2 = d3.scaleBand().domain(["c1851","c1861"]).range([0, lx.bandwidth()]).padding(0.1);
    const ly = d3.scaleLinear().domain([0, 7]).range([lh, 0]);

    lsvg.append("g").attr("transform",`translate(0,${lh})`).call(d3.axisBottom(lx).tickSize(0));
    lsvg.append("g").call(d3.axisLeft(ly).ticks(5).tickFormat(d => d + "%"));

    labData.forEach(d => {
      ["c1851","c1861"].forEach(cohort => {
        lsvg.append("rect")
          .attr("x", lx(d.group) + lx2(cohort))
          .attr("y", ly(d[cohort]))
          .attr("width", lx2.bandwidth())
          .attr("height", lh - ly(d[cohort]))
          .attr("fill", cohortColors[cohort]);
      });
    });

    [["#6BAED6","1851→1881"],["#2171B5","1861→1891"]].forEach(([c,l], i) => {
      lsvg.append("rect").attr("x", 0).attr("y", lh + 10 + i * 14).attr("width",10).attr("height",10).attr("fill",c);
      lsvg.append("text").attr("x",14).attr("y", lh + 19 + i * 14).attr("font-size","10px").text(l);
    });

  });
})();
</script>

<hr style="border:none;border-top:1px solid #ddd;margin:48px 0;">


<!-- ================================================ -->
<!-- SECTION: THE LOCAL LABOUR MARKET CHANNEL        -->
<!-- ================================================ -->

<h2>The Local Labour Market Channel</h2>

<p>
  Who fills the new jobs when an industry grows? The maps below show where new jobs emerged
  in three sectors — electrical trades, bicycles, and bootmaking — and who the fathers of
  those workers were. If geography is doing the work rather than family transmission, we expect
  to see the new workers drawn from a wide range of father occupations, not concentrated in the
  same trade as their fathers.
</p>

<!-- ---- ELECTRICAL MAP ---- -->

<h3>Electrical Trades: Where New Jobs Emerged</h3>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="elec-year">Select year: <span id="elec-year-label">1851</span></label>
  <input type="range" id="elec-year" min="1851" max="1911" step="10" value="1851" style="width:300px;">
</div>

<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:16px;position:relative;">
  <svg id="elec-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
  <div style="margin-top:10px;">
    <svg id="elec-legend" width="480" height="50"></svg>
    <div style="font-size:12px;text-align:center;">Share of male workforce in electrical trades</div>
  </div>
  <div id="elec-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
</div>

<div style="background:#f0f0f0;border-left:4px solid #bbb;padding:12px 16px;margin:0 0 48px;font-size:0.9em;color:#666;">
  Father occupation breakdown coming soon.
</div>

<!-- ---- BICYCLES MAP ---- -->

<h3>Bicycles: Where New Jobs Emerged</h3>

<div style="display:flex;align-items:center;gap:16px;margin-bottom:10px;">
  <label for="bike-year">Select year: <span id="bike-year-label">1851</span></label>
  <input type="range" id="bike-year" min="1851" max="1911" step="10" value="1851" style="width:300px;">
</div>

<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:16px;position:relative;">
  <svg id="bike-map" width="960" height="600" viewBox="0 0 960 600" style="max-width:100%;height:auto;"></svg>
  <div style="margin-top:10px;">
    <svg id="bike-legend" width="480" height="50"></svg>
    <div style="font-size:12px;text-align:center;">Share of male workforce in bicycle trades</div>
  </div>
  <div id="bike-tooltip" style="position:absolute;background:#fff;border:1px solid #aaa;padding:5px;visibility:hidden;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,.1);pointer-events:none;"></div>
</div>

<div style="background:#f0f0f0;border-left:4px solid #bbb;padding:12px 16px;margin:0 0 48px;font-size:0.9em;color:#666;">
  Father occupation breakdown coming soon.
</div>

<!-- ================================================ -->
<!-- DISCUSSION                                       -->
<!-- ================================================ -->

<div style="border:1px solid #e0e0e0;border-radius:6px;padding:48px 40px;margin:24px 0;background:#fff;min-height:100vh;display:flex;flex-direction:column;justify-content:center;">

  <h2 style="margin-top:0;">Discussion</h2>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:24px;">

    <div>
      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Victorian mobility</h4>
      <p style="font-size:0.92em;color:#333;line-height:1.7;margin-bottom:24px;">
        Long (2013), Zhu (2024), Clark, Cummins &amp; Curtis (2024) — how much mobility was there in Victorian Britain, and how do we measure it?
      </p>

      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Immigrant advantage</h4>
      <p style="font-size:0.92em;color:#333;line-height:1.7;margin-bottom:24px;">
        Abramitzky et al. (2021), Boustan (2017), Pérez (2019) — immigrant children do better, but why?
      </p>

      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Intergenerational gaps</h4>
      <p style="font-size:0.92em;color:#333;line-height:1.7;">
        Chetty et al. (2020), Collins &amp; Wanamaker (2022) — same starting point, different group, different outcomes.
      </p>
    </div>

    <div>
      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Geography of opportunity</h4>
      <p style="font-size:0.92em;color:#333;line-height:1.7;margin-bottom:24px;">
        Chetty et al. (2014) — where you grow up matters.
      </p>

      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Creative destruction</h4>
      <p style="font-size:0.92em;color:#333;line-height:1.7;margin-bottom:24px;">
        Kastis &amp; Vipond, <em>Organisational Practices and Technology Adoption</em>; Vipond, <em>Young Workers and Technological Unemployment</em>.
      </p>

      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">New work</h4>
      <p style="font-size:0.92em;color:#333;line-height:1.7;margin-bottom:24px;">
        Autor, Chin, Salomons &amp; Seegmiller (2024) — the origins and content of new work, 1940–2018.
        Connor, Kemeny &amp; Storper (2024) — frontier workers as seedbeds of inequality and prosperity.
      </p>

      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">Technology, tasks, and inequality</h4>
      <p style="font-size:0.92em;color:#333;line-height:1.7;">
        Ebert, Heldring, Robinson &amp; Vollmer (2024) — the Industrial Revolution breaks down the old order.
        Gray, O'Keefe, Quincy &amp; Ward (2025) — task-based inequality between groups over the long run.
      </p>
    </div>

  </div>

</div>

<!-- ================================================ -->
<!-- CONCLUSION                                       -->
<!-- ================================================ -->

<div style="border:1px solid #e0e0e0;border-radius:6px;padding:48px 40px;margin:24px 0;background:#fff;min-height:100vh;display:flex;flex-direction:column;justify-content:center;">

  <h2 style="margin-top:0;">Conclusion</h2>

  <div style="max-width:780px;margin-top:16px;">

    <div style="margin-bottom:32px;">
      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">1. The necessity of micro-occupations</h4>
      <p style="font-size:0.95em;color:#333;line-height:1.75;margin:0;">
        Sub-industry level occupation data is necessary to track the emergence of new jobs.
        I construct approximately 8,000 micro-occupations across 773 industries.
      </p>
    </div>

    <div style="margin-bottom:32px;">
      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">2. Three types of new jobs</h4>
      <div style="font-size:0.95em;color:#333;line-height:1.75;">
        <p style="margin:0 0 12px;"><strong>New jobs in brand new industries</strong> — approximately 500,000 workers in occupations that did not exist before.</p>
        <p style="margin:0 0 12px;"><strong>New jobs common across many industries</strong> — contractors, agents, supervisors, foremen, operators, managers, factory workers, manufacturing workers.</p>
        <p style="margin:0 0 12px;"><strong>New jobs that are industry-specific</strong> — ashphalter, sewing machinist, welter, motorcar driver, railway signalman, electric engineer, telephone operator.</p>
        <p style="margin:0;"><strong>New jobs by expansion of existing professions</strong> — teaching, dentistry, medicine.</p>
      </div>
    </div>

    <div style="margin-bottom:32px;">
      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">3. Stickiness of skills inheritance</h4>
      <p style="font-size:0.95em;color:#333;line-height:1.75;margin:0;">
        Despite the new opportunities created by technological transition, I observe substantial stickiness in occupational skills inheritance across many industries.
      </p>
    </div>

    <div>
      <h4 style="margin:0 0 8px;font-size:0.82em;color:#666;text-transform:uppercase;letter-spacing:0.05em;">4. Beneficiaries of transition</h4>
      <p style="font-size:0.95em;color:#333;line-height:1.75;margin:0;">
        The beneficiaries of technological transition are not random. Pale tailors' sons and growth county bootmakers' sons hold their positions or improve, while everyone else falls.
      </p>
    </div>

  </div>

</div>
