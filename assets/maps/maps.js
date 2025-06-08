const width = 960, height = 600;
const svg = d3.select("svg");

const projection = d3.geoMercator()
  .scale(3000)
  .center([-1.5, 54.5])
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const tooltip = d3.select("#region-tooltip");

d3.json("/assets/maps/merged_with_values.geojson").then(geoData => {
  const values = geoData.features.map(d => d.properties.value);
  const color = d3.scaleSequential(d3.interpolatePurples)
    .domain([d3.min(values), d3.max(values)]);

  svg.selectAll("path")
    .data(geoData.features)
    .join("path")
    .attr("d", path)
    .attr("fill", d => {
      const v = d.properties.value;
      return v != null ? color(v) : "#ccc";
    })
    .attr("stroke", "white")
    .attr("stroke-width", 0.5)
    .on("mouseover", function (event, d) {
      tooltip.style("visibility", "visible")
             .text(`${d.properties.R_CTY}: ${d.properties.value.toFixed(2)}`);
      d3.select(this).attr("stroke-width", 1.5);
    })
    .on("mousemove", function (event) {
      tooltip.style("top", (event.pageY + 15) + "px")
             .style("left", (event.pageX + 15) + "px");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("stroke-width", 0.5);
    });
});
