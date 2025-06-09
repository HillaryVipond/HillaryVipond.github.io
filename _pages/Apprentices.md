---
layout: single
title: "Apprenticeship System Map"
permalink: /apprentices/
nav_exclude: false
---

Welcome to the Apprentices page. This map shows the spatial distribution of the apprenticeship system in 1851 by county.




<h2>Apprenticeship System: Total Participation</h2>

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
    <div style="font-size: 12px; text-align: center;">Share of adult male population</div>
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
  d3.json("/assets/maps/share_total_by_county.json")
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



<h2>Apprenticeship System: Role Breakdown</h2>

<!-- 🎛️ Role + Year Controls: side-by-side -->
<div style="display: flex; align-items: center; gap: 16px; margin-bottom: 10px;">
  <label for="role-select">Select role:</label>
  <select id="role-select">
    <option value="master">Master</option>
    <option value="journeyman">Journeyman</option>
    <option value="apprentice">Apprentice</option>
  </select>

  <label for="role-slider">Select year: <span id="role-year-label">1851</span></label>
  <input type="range" id="role-slider" min="1851" max="1911" step="10" value="1851" style="width: 300px;">
</div>

<!-- 🗱️ Flex container for map + legend -->
<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 40px;">
  <svg id="role-map" width="960" height="600"></svg>

  <div style="margin-top: 10px;">
    <svg id="role-legend-svg" width="480" height="50"></svg>
    <div style="font-size: 12px; text-align: center;">Share of adult male population in this role</div>
  </div>
</div>

<div id="role-tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<script>
const roleSvg = d3.select("#role-map");
const roleTooltip = d3.select("#role-tooltip");
const roleSlider = d3.select("#role-slider");
const roleSelect = d3.select("#role-select");

const roleThresholds = [0.2, 0.4, 0.6, 0.8, 1.0, 1.5, 2.0];
const roleColors = d3.schemeBlues[8];
const color = d3.scaleThreshold().domain(roleThresholds).range(roleColors);

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/share_granrole_by_county.json")
]).then(([geoData, roleData]) => {
  const projection = d3.geoMercator().fitSize([960, 600], geoData);
  const path = d3.geoPath().projection(projection);

  function updateRoleMap(year, role) {
    const values = roleData[year][role];

    roleSvg.selectAll("path")
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
      .on("mouseover", function(event, d) {
        const name = d.properties.R_CTY;
        const value = values[name];
        roleTooltip.style("visibility", "visible")
          .text(`${name}: ${value != null ? value.toFixed(2) : "N/A"}`);
        d3.select(this).attr("stroke-width", 2);
      })
      .on("mousemove", function(event) {
        roleTooltip.style("top", (event.pageY + 10) + "px")
                   .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function () {
        roleTooltip.style("visibility", "hidden");
        d3.select(this).attr("stroke-width", 0.5);
      });
  }

  updateRoleMap("1851", "master");

  const roleYearLabel = d3.select("#role-year-label");

  roleSlider.on("input", function () {
    const year = this.value;
    roleYearLabel.text(year);
    updateRoleMap(year, roleSelect.node().value);
  });

  roleSelect.on("change", function () {
    const year = roleSlider.node().value;
    updateRoleMap(year, this.value);
  });
});

// Legend rendering
{
  const roleLegendSvg = d3.select("#role-legend-svg");
  const legendWidth = +roleLegendSvg.attr("width");
  const binCount = 8;
  const binWidth = legendWidth / binCount;

  const roleLabels = [
    "<0.2", "0.2–0.4", "0.4–0.6", "0.6–0.8",
    "0.8–1.0", "1.0–1.5", "1.5–2.0", "2.0+"
  ];

  roleColors.forEach((color, i) => {
    roleLegendSvg.append("rect")
      .attr("x", i * binWidth)
      .attr("y", 10)
      .attr("width", binWidth)
      .attr("height", 10)
      .attr("fill", color);
  });

  roleLabels.forEach((label, i) => {
    roleLegendSvg.append("text")
      .attr("x", i * binWidth + binWidth / 2)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(label);
  });
}
</script>

