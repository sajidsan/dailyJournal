var myData2 = [];


function d3Scope(data, tabletop) {
	alert("many successes");

  console.log(data);
  //set myData equal to 'data' so that I can access it outside of thsi function
  myData2 = data;
  //i can't figure out how to move this d3 function outside of the scope of this other function. whatever
  d3.select("#chart1")
  .selectAll("div")
    .data(myData2)
  .enter().append("div")
    .style("width", function(d) { return d.howwasyourday * 30 + "px"; })
    //.style("height", 10)
    .style("background-color", "blue")
    .style("color", "white")
    .text(function(d) { return d.timestamp; });





  var chart = d3.select("#chart1");
  var div = chart.append("div");
  div.html(myData2[0].timestamp);

  } // end of function 3






var shortData = [42, 50, 8, 7];







