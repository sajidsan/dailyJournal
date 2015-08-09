//fade in elements

$(document).ready(function() {
  $('.fadeIn').fadeIn(1000);
});


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



  //get average happiness for some number of days
  function avgHappy(numDays) {
    var count = 0;
    var happyTotal = 0;
    var numDays = numDays;
    var startDate = moment().subtract(numDays, 'days');
    for (i = 0; i < data.length; i++) {
      if (data[i].moment > startDate) {
        count ++;
        happyTotal = happyTotal + Number(data[i].howwasyourday);
        console.log("# " + count + ": " + data[i].moment + "happy total is now: " + happyTotal);
      }
    }
    var avg = happyTotal / count;
    return avg;
  };
  console.log("the average happy = " + avgHappy(30));;
  //
  //generic average function
  function avgSleep(numDays) {
    var count = 0;
    var total = 0;
    var numDays = numDays;
    var startDate = moment().subtract(numDays, 'days');
    for (i = 0; i < data.length; i++) {
      if (data[i].moment > startDate) {
        count ++;
        total = total + Number(data[i].howmanyhoursdidyousleeplastnight);
        console.log("# " + count + ": " + data[i].timestamp + "total is now: " + total);
      }
    }
    var avg = total / count;
    return avg;
  };

  console.log("your average sleep over the last few days is = " + avgSleep(45));
  //drop random selection info into the header
  (function () {
    var randomEntryDayGo = randomEntry.whatfuninterestingormemorablethingshappened
    var randomEntryDate = randomEntry.moment.calendar();
    var randomEntryRelDate = randomEntry.moment.fromNow();
    $("#randomEntryDayGo").append(randomEntryDayGo);
    $("#randomEntryRelDate").append(randomEntryRelDate)
    $("#randomEntryDate").append(randomEntryDate);
  })();

  (function () {
    $("#avgHappy").append(avgHappy(30));
    $("#avgSleep").append(avgSleep(30));
  })();



} // end of function tabletopScope
