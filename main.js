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


function tabletopScope(data, tabletop) {
	alert("more successes amongst mustaches");
  console.log(data);
  //set myData equal to 'data' so that I can access it outside of thsi function
  myData = data;
  var source = $("#walkTemplate").html();
	var template = Handlebars.compile(source);

	$.each( tabletop.sheets("Sheet1").all(), function(i, cat) {
      var html = template(cat);
      $("#item").append(html);
    });
  } // end of function 3

  //d3
  



