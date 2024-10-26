export function createLineChart(lineChartId, lineChartData) {
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 70, left: 80 },
    width = 560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(lineChartId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add X axis --> it is a date (YEAR) format
  var x = d3
    .scaleTime()
    .domain(
      d3.extent(lineChartData, function (d) {
        return new Date(parseInt(d.Season), 0);
      }),
    )
    .range([0, width]);

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(lineChartData, function (d) {
        return d.total_run + 500;
      }),
    ])
    .range([height, 0]);

  // d3's line generator
  var line = d3
    .line()
    .x(function (d) {
      return x(new Date(parseInt(d.Season), 0));
    })
    .y(function (d) {
      return y(new Intl.NumberFormat().format(d.total_run));
    })
    .curve(d3.curveMonotoneX);

  var tool_tip_line = d3
    .tip()
    .attr("class", "tool-tip" + " mt-0 p-2 bg-info")
    .offset([-10, 0])
    .html(function (d) {
      let chartWise = "Player";
      if (lineChartId == "#lineChartTeamWise") {
        chartWise = "Team";
      }
      var output =
        '<div class="px-3"> \
        <div class="row fs-14 text-white"> \
        <span> Season: ' +
        d.Season +
        '</span></div> \
        <div class="row fs-14 text-white"> \
        <span>' +
        chartWise +
        ": " +
        d[chartWise] +
        '</span> </div>\
        <div class="row fs-14 text-white"> \
        <span> Total Run: ' +
        d.total_run +
        "</span> \
        </div></div>";
      return output;
    });

  // Call the x axis in a group tag
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    // Add label to x axis
    .append("text")
    .attr("class", "axis-label")
    .text("Seasons")
    .style("fill", "blueviolet")
    .attr("font-weight", 700)
    .attr("x", margin.left + (width - margin.left - margin.right) / 2)
    .attr("y", 50); // Relative to the x axis.

  // Call the y axis in a group tag
  svg
    .append("g")
    .call(d3.axisLeft(y))
    // Add label to y axis
    .append("text")
    .attr("class", "axis-label")
    .text("Runs")
    .style("fill", "blueviolet")
    .attr("font-weight", 700)
    .attr("transform", "rotate(-90)")
    .attr("x", -(margin.top + (height - margin.top - margin.bottom) / 2))
    .attr("y", -50); // Relative to the y axis.

  // Append the path, bind the data, and call the line generator
  svg
    .append("path")
    .datum(lineChartData)
    .style("fill", "none")
    .style("stroke", "#ffab00")
    .style("stroke-width", 3)
    .attr("d", line);

  // Appends a circle for each data points
  svg
    .selectAll(".dot")
    .data(lineChartData)
    .enter()
    .append("circle")
    .style("fill", "blue")
    .style("stroke", "white")
    .attr("r", 3.5)
    .attr("cx", function (d) {
      return x(new Date(parseInt(d.Season), 0));
    })
    .attr("cy", function (d) {
      return y(d.total_run);
    })
    // Call tooltip for each circle
    .call(tool_tip_line)
    .on("mouseover", function (d) {
      tool_tip_line
        .style("top", d3.event.pageY + 100 + "px")
        .style("left", d3.event.pageX - 90 + "px")
        .show(d, this);
    })
    .on("mouseout", tool_tip_line.hide);
}
