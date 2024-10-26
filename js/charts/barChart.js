export function createBarChart(barChartId, barChartData) {
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 30, bottom: 70, left: 80 },
    width = 560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(barChartId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScaleDomain = [];
  _.each(barChartData, function (data) {
    xScaleDomain.push(data.Season);
  });

  // Add X axis --> it is a date (YEAR) format
  var x = d3
    .scaleBand()
    .domain(xScaleDomain)
    .rangeRound([0, width])
    .paddingInner(0.31)
    .paddingOuter(0.12)
    .align(0.36);

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(barChartData, function (d) {
        return d.six_count + 20;
      }),
    ])
    .range([height, 0]);

  var tool_tip_line = d3
    .tip()
    .attr("class", "tool-tip" + " mt-0 p-2 bg-info")
    .offset([-10, 0])
    .html(function (d) {
      var output =
        '<div class="px-3"> \
        <div class="row fs-14 text-white"> \
        <span> Season: ' +
        d.Season +
        '</span></div> \
        <div class="row fs-14 text-white"> \
        <span> Player: ' +
        d.Player +
        '</span> </div>\
        <div class="row fs-14 text-white"> \
        <span> Total Sixes: ' +
        d.six_count +
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
    .text("Sixes")
    .style("fill", "blueviolet")
    .attr("font-weight", 700)
    .attr("transform", "rotate(-90)")
    .attr("x", -(margin.top + (height - margin.top - margin.bottom) / 2))
    .attr("y", -50); // Relative to the y axis.

  // Appends a bar for each data points
  svg
    .selectAll("rect")
    .data(barChartData)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.Season);
    })
    .attr("width", x.bandwidth() + 3)
    .style("fill", "#ffab00")
    // Setting bar height to 0 initialy
    .attr("y", function () {
      return height;
    })
    .attr("height", 0)
    // Call tooltip for each bar
    .call(tool_tip_line)
    .on("mouseover", function (d) {
      tool_tip_line
        .style("top", d3.event.pageY + 100 + "px")
        .style("left", d3.event.pageX - 90 + "px")
        .show(d, this);
    })
    .on("mouseout", tool_tip_line.hide)
    // Adding methods which will do the animated transition of a bar
    // from 0 value, to its current value
    // Also durattion of transition is set to 800 ms
    .transition()
    .duration(800)
    //Here the value of bar is set
    //Besides that we can set delay to make bar to load one by one
    .attr("y", function (d) {
      return y(d.six_count);
    })
    .attr("height", function (d) {
      return height - y(d.six_count);
    })
    .delay((d, i) => {
      return i * 100;
    });

  //text labels on bars
  svg
    .selectAll("text.bar")
    .data(barChartData)
    .enter()
    .append("text")
    .transition()
    .duration(1200)
    .text(function (d, i) {
      if (i % 2 == 0) {
        return d.Player;
      }
    })
    .attr("x", function (d) {
      return x(d.Season) + x.bandwidth() / 2;
    })
    .attr("y", function (d, i) {
      if (i % 2 == 0) {
        return y(d.six_count) - 20;
      }
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "#8a2be2")
    .attr("text-anchor", "middle");
}
