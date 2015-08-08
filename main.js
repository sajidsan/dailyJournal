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
	console.log("tabletop successfully loaded");
  console.log(data);

  //go through and turn date objects into moment.js objects,

  (function () {
    for (i = 0; i < data.length; i++) {
      data[i].moment = moment(new Date(data[i].timestamp));
    }
  })();

  //set myData equal to 'data' so that I can access it outside of this function
  myData = data;

  //I think this is the tabletop template, but i can't remember. CHECK THIS OUT.
  var source = $("#walkTemplate").html();
	var template = Handlebars.compile(source);

	$.each( tabletop.sheets("Sheet1").all(), function(i, cat) {
      var html = template(cat);
      $("#item").append(html);
    });
  //make a random selection from 'data' and assign it to a variable
  var randomEntry = data[Math.floor(Math.random() * data.length)];
  //drop random selection info into the header
  (function () {
  var randomEntryDayGo = randomEntry.didanythingfuninterestingormemorablehappen
  var randomEntryDate = randomEntry.moment.calendar();
  var randomEntryRelDate = randomEntry.moment.fromNow();
  $("#randomEntryDayGo").append(randomEntryDayGo);
  $("#randomEntryRelDate").append(randomEntryRelDate)
  $("#randomEntryDate").append(randomEntryDate);
  })();

  //get average happiness for some number of days
  function avgHappy(numDays) {
    var count = 0;
    var happyTotal = 0;
    var numDays = numDays;
    var startDate = moment().subtract(numDays, 'days');
    for (i = 0; i < data.length; i++) {
      if (data[i].timestamp > startDate) {
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

} // end of function tabletopScope
