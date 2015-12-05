function pushToCalendar() {
  var calendar = CalendarApp.getCalendarById("CALENDAR_ID");

  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(2,1,lastRow,5);
  var values = range.getValues();

  var row = 0;
  for (var i = 0; i < values.length; i++) {

    var clientName = values[i][0]; // Col A
    var deckDueDate = values[i][1]; // Col B
    var deckStatus = values[i][2]; // Col C
    var brainstormStartTime = values[i][3]; // Col D
    var brainstormStatus = values[i][4]; // Col E

    if (clientName.length > 0) {
      
      if (deckDueDate !== "" && deckStatus !== 'yes') {
        var newDeckEvent = 'Deck + IO Due: ' + clientName + deckDueDate;
        calendar.createAllDayEvent(newDeckEvent, deckDueDate);
        sheet.getRange(i+2,3).setValue('yes');
      }

      if (brainstormStartTime !== "" && brainstormStatus !== 'yes') {
        var newBrainstormEvent = 'Creative Brainstorm Call: ' + clientName;
      // var brainstormEndTime = brainstormStartTime.addHours(6);
        calendar.createEvent(newBrainstormEvent, brainstormStartTime, brainstormEndTime);
        sheet.getRange(i+2,5).setValue('yes');
      }
    }
    row++;
  }
}
//add a menu when the spreadsheet is opened
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [];
  menuEntries.push({name: "Sync", functionName: "pushToCalendar"});
  sheet.addMenu("Matador Calendar", menuEntries);
}
/*
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
*/
/*
 script by Jacob Nelken. ~> www.jacobnelken.com
 original: http://www.adammcfarland.com/2013/08/09/tutorial-using-google-spreadsheets-to-update-a-google-calendar-our-new-vacation-management-system/
*/
