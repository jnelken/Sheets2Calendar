function pushToCalendar() {

  var myCalID = Browser.inputBox("Enter your Calender ID:");
  var calendar = CalendarApp.getCalendarById(myCalID);

  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(2,1,lastRow,5);
  var values = range.getValues();
  var updateRange = sheet.getRange('G1');
  //show updating message
  updateRange.setFontColor('red');

  var row = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i][0].length > 0) {

      var clientName = values[i][0]; // Col A
      var deckDate = values[i][1]; // Col B
      var deckStatus = values[i][2]; // Col C
      var brainstormDate = values[i][3]; // Col D
      var brainstormStatus = values[i][4]; // Col E

      //Deck IO column (item = [i][0] date = [i][1], check = [i][2])
      if (deckStatus != '√') {
        var newDeckIODueDate = 'Deck + IO Due: ' + clientName;
        calendar.createAllDayEvent(newDeckIODueDate, deckDate);
        sheet.getRange(i+2,3).setValue('√');
      }

      //Creative Brainstorm Column (item = [i][0], date = [i][3], check = [i][4])
      if (brainstormStatus != '√') {
        var newbrainstorm = 'Creative Brainstorm Finalized: ' + clientName;
        calendar.createEvent(newBrainstorm, brainstormDate, brainstormDate);
        sheet.getRange(i+2,5).setValue('√');
      }

    }
    row++;
  }
  //hide updating message
  updateRange.setFontColor('white');
}

//add a menu when the spreadsheet is opened
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [];
  menuEntries.push({name: "Sync", functionName: "pushToCalendar"});
  sheet.addMenu("Matador Calendar", menuEntries);
}
/*
Notes:
 To trigger an alert use Browser.msgBox();
 onEdit triggers when spreadsheet is edited, however was unreliable
 To support edits, we need to grab calendar event by id (currently is not supported), then compare the date of the event with the date in the spreadsheet and adjust if they don't match
 script by Jacob Nelken
 original: http://www.adammcfarland.com/2013/08/09/tutorial-using-google-spreadsheets-to-update-a-google-calendar-our-new-vacation-management-system/
*/
