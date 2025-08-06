---
layout: single
title: "Model"
permalink: /model/
nav_exclude: false
---

This project explores how uneven adoption of new technologies across space impacted on multiple domains of society. 
I model how a single process shaped mobility, migration, inequality, and regional divergence, 
as observed in British historical census microdata


<h2>Tech Adoption Model: Toy Simulation</h2>

<!-- UI controls -->
<div style="margin-bottom: 10px;">
  <label for="view-select">View:</label>
  <select id="view-select">
    <option value="adoption">Adoption</option>
    <option value="employment">Employment</option>
    <option value="wages">Wages</option>
    <option value="migration_out">Migration Out</option>
  </select>
  <button id="next-wave">Next Wave</button>
</div>

<!-- Map + Legend -->
<svg id="model-map" width="960" height="600"></svg>
<div id="tooltip" style="position:absolute; background:white; border:1px solid #aaa; padding:5px; visibility:hidden;"></div>

<script src="https://d3js.org/d3.v7.min.js"></script>

<script>
let geoData, modelState;
const svg = d3.select("#model-map");
const tooltip = d3.select("#tooltip");

Promise.all([
  d3.json("/assets/maps/Counties1851.geojson"),
  d3.json("/assets/data/model_state.json")
]).then(([geo, state]) => {
  geoData = geo;
  modelState = state;

  const projection = d3.geoMercator().fitSize([960, 600], geoData);
  const path = d3.geoPath().projection(projection);

  d3.select("#view-select").on("change", () => updateMap(path));
  d3.select("#next-wave").on("click", () => {
    runModelStep();
    updateMap(path);
  });

  updateMap(path);
});

function runModelStep() {
  for (const name in modelState.counties) {
    const c = modelState.counties[name];
    if (!c.adopted_wave1 && Math.random() < 0.3) {
      c.adopted_wave1 = true;
      c.employment += 150;
      c.wages *= 1.05;
      c.migration_out = Math.max(0, c.migration_out - 0.02);
    } else if (!c.adopted_wave1) {
      c.employment = Math.max(0, c.employment - 100);
      c.wages *= 0.98;
      c.migration_out = Math.min(1, c.migration_out + 0.03);
    }
  }
}

function getColorScale(view) {
  if (view === "employment") {
    return d3.scaleSequential(d3.interpolateBlues).domain([500, 2000]);
  } else if (view === "wages") {
    return d3.scaleSequential(d3.interpolateGreens).domain([0.8, 1.2]);
  } else if (view === "migration_out") {
    return d3.scaleSequential(d3.interpolateOranges).domain([0, 0.3]);
  } else {
    return d3.scaleOrdinal().domain([true, false]).range(["green", "red"]);
  }
}

function updateMap(path) {
  const view = d3.select("#view-select").property("value");
  const color = getColorScale(view);

  svg.selectAll("path")
    .data(geoData.features)
    .join("path")
    .attr("d", path)
    .attr("fill", d => {
      const name = d.properties.R_CTY;
      const c = modelState.counties[name];
      if (!c) return "#ccc";
      if (view === "adoption") return color(c.adopted_wave1);
      return color(c[view]);
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .on("mouseover", function (event, d) {
      const name = d.properties.R_CTY;
      const c = modelState.counties[name];
      if (!c) return;
      tooltip.style("visibility", "visible")
        .html(`<b>${name}</b><br>
               Jobs: ${c.employment}<br>
               Wages: £${c.wages.toFixed(2)}<br>
               Migration Out: ${(c.migration_out * 100).toFixed(1)}%`);
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
</script>
