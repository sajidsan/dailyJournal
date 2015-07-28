Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
});




$(document).ready(
    function() {

      Tabletop.init( { key: public_spreadsheet_url,
                         callback: d3Scope,
                         simpleSheet: true } );

      Tabletop.init( { key: public_spreadsheet_url,
                         callback: tabletopScope,
                         simpleSheet: true,
                         orderby: 'timestamp',
                         reverse: true } );


    }
 
);

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1OSMq80knQ4zQu2OZBGnWHQJmfWzBlGuGV2m-mA-xX28/pubhtml';
var myData = [];
var numDays = 7;

function tabletopScope(data, tabletop) {
	alert("tabletop successfully loaded");
  console.log(data);
  //set myData equal to 'data' so that I can access it outside of this function
  myData = data;
  var source = $("#walkTemplate").html();
	var template = Handlebars.compile(source);

	$.each( tabletop.sheets("Sheet1").all(), function(i, cat) {
      var html = template(cat);
      $("#item").append(html);
    });

  //throw away code trying to calculate time using js library datejs
  var nDaysAgo = (30).days().ago();
  var aDay = Date.parse(data[0].timestamp);
  var dateEl = (Date.parse(data[0].timestamp)).getTime();
  console.log("1 month ago: " + Date.january().first().monday());

  alert("calculating time + day: " + aDay + "real time: " + dateEl + "30 days ago date is: " + nDaysAgo);


  //number of entries for past 30 days
  function getParsedTime(rawDate) {
    var getParsedTime = (Date.parse(rawDate)).getTime();
    return getParsedTime;
  }
  console.log("parsed first time = " + getParsedTime(data[0].timestamp) + "parsed 30 days ago = " + ((3).days().ago()).getTime());

  function avgHappy(numDays) {
    var count = 0;
    var happyTotal = 0;
    var numDays = numDays;
    var timeRange = (numDays).days().ago();
    for (i = 0; i < data.length; i++) {
      if (getParsedTime(data[i].timestamp) > (timeRange).getTime()) {
        count ++;
        happyTotal = happyTotal + Number(data[i].howwasyourday);
        console.log("# " + count + ": " + data[i].timestamp + "happy total is now: " + happyTotal);
      }
    }
    var avg = happyTotal / count;
    return avg;
  };
  console.log("the average happy = " + avgHappy(30));;
  //

  //function to calculate the average of how the past week has gone.
  function happyAvg(days) {
    //define the time range for the avg
    var numDays = days;
    var firstDay = data.length - numDays + 1;
    console.log(firstDay);
    var total = 0;
    for (i=0; i < numDays; i++) {
      var total = total + Number(data[i].howwasyourday);
      console.log("total on day" + data[i].timestamp + " = " + total);
    }
    var avgValue = total/numDays;
    return avgValue;
  };



  console.log("your last " + numDays + " days were this good: " + happyAvg(numDays));

  console.log("logging an object myData " + myData[0].didyouworkouttoday);
} // end of function tabletopScope


console.log("trying to log myData outside of the function" + myData);
  //d3
  



