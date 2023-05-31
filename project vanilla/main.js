window.onload = function () {
  const seconds = {
    total: 00,
    m: 00,
    f: 00,
    nb: 00,
  };
  const tens = {
    total: 00,
    m: 00,
    f: 00,
    nb: 00,
  };
  const appendSeconds = {
    total: document.getElementById("seconds-total"),
    m: document.getElementById("seconds-m"),
    f: document.getElementById("seconds-f"),
    nb: document.getElementById("seconds-nb"),
  };
  const appendTens = {
    total: document.getElementById("tens-total"),
    m: document.getElementById("tens-m"),
    f: document.getElementById("tens-f"),
    nb: document.getElementById("tens-nb"),
  };

  const buttonStartM = document.getElementById("button-start-m");
  const buttonStartF = document.getElementById("button-start-f");
  const buttonStartNB = document.getElementById("button-start-nb");
  const buttonStop = document.getElementById("button-stop");
  const buttonReset = document.getElementById("button-reset");
  let IntervalTotal;
  let IntervalM;
  let IntervalF;
  let IntervalNB;

  buttonStartM.onclick = function () {
    clearAllIntervals();
    IntervalM = setInterval(() => startTimer("m"), 10);
    IntervalTotal = setInterval(() => startTimer("total"), 10);
  };
  buttonStartF.onclick = function () {
    clearAllIntervals();
    IntervalF = setInterval(() => startTimer("f"), 10);
    IntervalTotal = setInterval(() => startTimer("total"), 10);
  };
  buttonStartNB.onclick = function () {
    clearAllIntervals();
    IntervalNB = setInterval(() => startTimer("nb"), 10);
    IntervalTotal = setInterval(() => startTimer("total"), 10);
  };

  buttonStop.onclick = function () {
    clearAllIntervals();
  };

  buttonReset.onclick = function () {
    clearAllIntervals();
    for (gender in seconds) {
      seconds[gender] = 00;
      tens[gender] = 00;
      appendTens[gender].innerHTML = "00";
      appendSeconds[gender].innerHTML = "00";
    }
  };

  function clearAllIntervals() {
    clearInterval(IntervalTotal);
    clearInterval(IntervalM);
    clearInterval(IntervalF);
    clearInterval(IntervalNB);
  }

  function startTimer(gender) {
    tens[gender]++;

    if (tens[gender] <= 9) {
      console.log("in this if <= 9");
      appendTens[gender].innerHTML = "0" + tens[gender];
    }

    if (tens[gender] > 9) {
      console.log("in this if > 9");
      appendTens[gender].innerHTML = tens[gender];
    }

    if (tens[gender] > 99) {
      seconds[gender]++;
      appendSeconds[gender].innerHTML = "0" + seconds[gender];
      tens[gender] = 0;
      appendTens[gender].innerHTML = "0" + 0;
    }

    if (seconds > 9) {
      appendSeconds[gender].innerHTML = seconds[gender];
    }
  }
};
