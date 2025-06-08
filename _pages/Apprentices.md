---
layout: single
title: "Apprenticeship System Map"
permalink: /apprentices/
nav_exclude: false
---

Welcome to the Apprentices page. This map shows the spatial distribution of the apprenticeship system in 1851 by county.

<h2>Apprenticeship System: Total Participation</h2>

<!-- Dropdown or slider for selecting year -->
<label for="year-select">Select year: </label>
<select id="year-select">
  <option value="1851">1851</option>
  <option value="1861">1861</option>
  <option value="1881">1881</option>
  <option value="1891">1891</option>
  <option value="1901">1901</option>
  <option value="1911">1911</option>
</select>

<div id="map-container">
  <svg width="960" height="600"></svg>
</div>

<div id="tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>

<script>
const width = 960, height = 600;
const svg = d3.select("svg");
const tooltip = d3.select("#tooltip");

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/maps/total_by_year.json")
]).then(([geoData, yearData]) => {

  // Fit the map projection dynamically to the geometry
  const pathTemp = d3.geoPath().projection(d3.geoMercator());
  const bounds = pathTemp.bounds(geoData);
  const dx = bounds[1][0] - bounds[0][0];
  const dy = bounds[1][1] - bounds[0][1];
  const x = (bounds[0][0] + bounds[1][0]) / 2;
  const y = (bounds[0][1] + bounds[1][1]) / 2;

  const scale = 0.95 / Math.max(dx / width, dy / height);
  const translate = [width / 2 - scale * x, height / 2 - scale * y];

  const projection = d3.geoTransform({
    point: function (lon, lat) {
      const projected = d3.geoMercator()
        .scale(scale)
        .translate([0, 0])
        ([lon, lat]);
      this.stream.point(projected[0] + translate[0], projected[1] + translate[1]);
    }
  });

  const path = d3.geoPath().projection(projection);

  const yearSelect = d3.select("#year-select");

  function updateMap(year) {
    const values = yearData[year];
    const color = d3.scaleSequential(d3.interpolatePurples)
      .domain([0.1, 0.9]); // Adjust to your actual data range

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

  // Initial map load
  updateMap("1851");

  // Update map when dropdown changes
  yearSelect.on("change", function() {
    updateMap(this.value);
  });

});
</script>
