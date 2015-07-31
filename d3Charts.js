var myData2 = [];


function d3Scope(data, tabletop) {
	alert("d3 successfully executed");

  console.log(data);
  //set myData equal to 'data' so that I can access it outside of thsi function
  myData2 = data;
  //i can't figure out how to move this d3 function outside of the scope of this other function. whatever 
  

  var w = 2000;
  var h = 200;
  var barPadding = 1;
  var barWidth = w / (data.length) - barPadding;
  var margin = {top: 10, right: 20, bottom: 20, left: 10};

  var format = d3.time.format("%A, %B %d");

  var xScale = d3.time.scale()
  	.domain([new Date(data[0].timestamp), new Date(data[data.length - 1].timestamp)])
  	.range([0, w]);

  console.log("the date of the start = " + xScale(new Date(data[data.length - 1].timestamp)));
  console.log("a date " + new Date(data[data.length - 1].timestamp));

  var yScale = d3.scale.linear()
  	.domain([0, 10])
  	.range([0, h - margin.top - margin.bottom]);

  var xAxis = d3.svg.axis()
  	.scale(xScale)
  	.orient('bottom')
  	.ticks(d3.time.months)
  	.tickFormat(d3.time.format('%b, %d'))
  	.tickSize(0)
  	.tickPadding(8);

  var svg = d3.select("#chart1")
  	.append("svg")
  	.attr("width", w)
  	.attr("height", h);

  svg.selectAll("rect")
  	.data(data)
  	.enter()
  	.append("rect")
  	.attr("x", function(d) {
  		return xScale(new Date(d.timestamp));
  	})
  	.attr("y", function(d) {
  		return h - yScale(d.howwasyourday);
  	})
  	.attr("width", 5)
  	.attr("height", function(d) {
  		return yScale(d.howwasyourday) - margin.bottom;
  	})
  	.attr("fill", "teal")
  	.on("mouseover", function(d) {
  		var xPosition = parseFloat(d3.select(this).attr("x"));
  		var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;
  		console.log(xPosition);
  		
  		//update tooltip position, give it data
  		d3.select("#tooltip")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px")						
						.select("#value")
						.text(d.didanythingfuninterestingormemorablehappen);
			   
		d3.select("#tooltip")
			.select("#heading")
			.text((format(new Date(d.timestamp))));
		//Show the tooltip
		d3.select("#tooltip").classed("hidden", false);
  	})
  	.on("mouseout", function() {
			   
	//Hide the tooltip
	d3.select("#tooltip").classed("hidden", true);		
	})
  	;

  svg.selectAll("text")
  	.data(data)
  	.enter()
  	.append("text")
  	.text(function(d) {
  		return d.howwasyourday;
  	})
  	.attr("x", function(d) {
  		return xScale(new Date(d.timestamp));
  	})
  	.attr("y", function(d) {
  		return h - yScale(d.howwasyourday);
  	})
  	.attr({
  		"font-family": "sans-serif",
  		"font-size": "11px",
  		"fill": "red"
  	})
  	;

  svg.append('g')
  	.attr('class', 'x axis')
  	.attr('transform', 'translate(0, ' + (h - margin.bottom) + ')')
  	.call(xAxis);

  	






  } // end of function 3






