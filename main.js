Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
});




$(document).ready(
    function() {

      Tabletop.init( { key: public_spreadsheet_url3,
                         callback: showInfo3,
                         simpleSheet: true } );
      }

  );



var public_spreadsheet_url3 = 'https://docs.google.com/spreadsheets/d/1OSMq80knQ4zQu2OZBGnWHQJmfWzBlGuGV2m-mA-xX28/pubhtml';
var myData = [];



function showInfo3(data, tabletop) {
	alert("successfully processed walk sheet")
    
    var source = $("#walkTemplate").html();
	var template = Handlebars.compile(source);

	$.each( tabletop.sheets("Sheet1").all(), function(i, cat) {
      var html = template(cat);
      $("#item").append(html);
    });

    console.log(data[0].write)


  } // end of function 3



