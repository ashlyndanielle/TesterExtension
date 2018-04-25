[CDATA[
  function init() {
    var time = new Date();
    var locale = "en-gb";

    var DD = time.getDate();
    var DDD = time.toLocaleString(locale, {
      weekday: "long"
    });
    var MMM = time.toLocaleString(locale, {
      month: "short"
    }).toUpperCase();

    document.getElementById("day").textContent = DD;
    document.getElementById("weekday").textContent = DDD;
    document.getElementById("month").textContent = MMM;

    // var DDDD = time.toLocaleString(locale, { weekday: "long" });
    // var MM   = time.getMonth() + 1;
    // var MMMM = time.toLocaleString(locale, {month: "long"});
    // var YYYY = time.getFullYear();
  }
]]

document.querySelector('svg').onload = init();