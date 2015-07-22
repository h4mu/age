var deviceReadyDeferred = $.Deferred();
var jqmReadyDeferred = $.Deferred();

$(document).on("deviceready", function() {
  deviceReadyDeferred.resolve();
});

$(document).on("mobileinit", function () {
  jqmReadyDeferred.resolve();
});

$.when(deviceReadyDeferred, jqmReadyDeferred).then(init);

$(document).on("pagecreate",function(event){
  init();
});

function init() {
  updateAll();
  $("#monthList li a").click(function () {
    localStorage.month = $(this).parent().index();
    $("#month").html($(this).text());
    updateResult();
    $("#monthPopup").popup("close");
    updateDays();
  });
  $("#yearList li a").click(function () {
    localStorage.year = $(this).text();
    $("#year").html(localStorage.year);
    updateResult();
    $("#yearPopup").popup("close");
    updateDays();
  });
}

function updateAll() {
  updateResult();
  updateYears();
  updateMonths();
  updateDays();
}

function updateResult() {
  $("#result").html(
    localStorage.year && localStorage.month && localStorage.day 
    ? moment().diff(moment([localStorage.year, localStorage.month, localStorage.day]), "days")
    : "Please select your birth date");
}

function updateDays() {
  if (localStorage.day) {
    $("#day").html(localStorage.day);
  }
  var dayList = $("#dayList").empty();
  var days = localStorage.year && localStorage.month
    ? moment(
      localStorage.year + "-" + (localStorage.month <= 9 ? "0" : "") + (parseInt(localStorage.month) + 1), "YYYY-MM")
      .daysInMonth()
    : 31;

  for (var i = 1; i <= days; i++) {
    dayList.append("<li><a href=\"#\">" + i + "</a></li>");
  }
  dayList.listview("refresh");
  $("#dayList li a").click(function () {
    localStorage.day = $(this).parent().index() + 1;
    $("#day").html(localStorage.day);
    updateResult();
    $("#dayPopup").popup("close");
  });
}

function updateMonths() {
  var currentLocaleData = moment.localeData("en");
  if (localStorage.month) {
    $("#month").html(currentLocaleData.months(moment([1,localStorage.month,1])));
  }
  var monthList = $("#monthList").empty();

  for (var i = 0; i <= 11; i++) {
    monthList.append("<li><a href=\"#\">" + currentLocaleData.months(moment([1,i,1])) + "</a></li>");
  }
  monthList.listview("refresh");
}

function updateYears(){
  if (localStorage.year) {
    $("#year").html(localStorage.year);
  }
  var yearList = $("#yearList").empty();
  var thisYear = moment().year();
  
  for (var i = thisYear - 3; i > thisYear - 150; i--) {
    yearList.append("<li><a href=\"#\">" + i + "</a></li>");
  }
  yearList.listview("refresh");
}
