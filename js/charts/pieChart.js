export function createPieChart(pieChartId, pieChartData, teamNameShort) {
  // set the dimensions and margins of the graph
  var width = 560,
    height = 560,
    margin = 60,
    labelOffset = (width / 4) * 1.4;

  // Calculate the radius of the pie Plotting
  var radius = Math.min(width, height) / 2 - margin;

  // Calculate the total Winning
  var totalCount = pieChartData.reduce(
    (foo, team) => foo + team.winningCount,
    0,
  );

  // append the svg object to the pieChartId
  var svg = d3
    .select(pieChartId)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // set the color scale for pie chart
  const color = d3
    .scaleOrdinal()
    .domain([
      _.each(pieChartData, function (d) {
        return d.Team;
      }),
    ])
    .range(d3.schemeDark2);

  // Compute the position of each group on the pie:
  var pie = d3
    .pie()
    .value(function (d) {
      return d[1].winningCount;
    })
    .sort(function (a, b) {
      return d3.ascending(a[1].winningCount, b[1].winningCount);
    });

  // This make sure that group order remains the same in the pie chart
  var data_ready = pie(Object.entries(pieChartData));

  var tool_tip = d3
    .tip()
    .attr("class", "tool-tip" + " mt-0 p-2 bg-white")
    .offset([-10, 0])
    .html(function (d) {
      var winningPercentage = Math.round((d.winningCount / totalCount) * 100);
      var output =
        '<div class="px-3"> \
        <div class="row fs-14 text-dark font-weight-bold"> \
        <span> Team: ' +
        d.Team +
        '</span> </div>\
        <div class="row fs-14 text-dark font-weight-bold">\
        <span> Total IPL Trophy Won: ' +
        d.winningCount +
        " (" +
        winningPercentage +
        "%)" +
        "</span></div>";
      return output;
    });

  // Arcs for showing the labels
  var arcLabel = d3.arc().innerRadius(labelOffset).outerRadius(labelOffset);

  // Building arcs
  var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  // Building arcs for hover
  var arcHover = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius + 10);

  // Building the pie chart
  svg
    .selectAll("slices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .attr("stroke", "#fff")
    .attr("fill", function (d) {
      return color(d.data[1].Team);
    })
    // Adding Tooltip
    .call(tool_tip)
    // Adding hover effect
    .on("mouseover", function (event) {
      d3.select(this).transition().attr("d", arcHover).duration(200);

      // Showing tooltip
      tool_tip
        .style("top", event.pageY + "px")
        .style("left", event.pageX + "px")
        .show(event.data[1], this);
    })

    //Handling mouse out
    .on("mouseout", function () {
      d3.select(this).transition().attr("d", arcGenerator).duration(500);
      // Hiding tooltip
      tool_tip.hide();
    });

  // Adding titles to pie slices
  svg
    .selectAll("slices")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function (d) {
      return teamNameShort[d.data[1].Team];
    })
    .attr("transform", function (d) {
      return "translate(" + arcLabel.centroid(d) + ")";
    })
    .style("text-anchor", "middle")
    .style("fill", "#fff")
    .style("font-size", 16);
}
