export function secondsToDate(n) {
  var day = parseInt(n / (24 * 3600));

  n = n % (24 * 3600);
  var hour = parseInt(n / 3600);

  n %= 3600;
  var minutes = n / 60;

  n %= 60;
  var seconds = n;

  return (
    day + "d, " + hour + "h, " + minutes.toFixed() + "m"
    //+
    // seconds.toFixed() +
    // " " +
    // "seconds "
  );
}
