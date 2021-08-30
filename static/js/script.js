document.addEventListener("DOMContentLoaded", function (event) {
  const dataText = [
    "London.",
    "DevOps.",
    "Backend.",
    "Architecting.",
    "Planning.",
    "Consulting.",
  ];

  function typeWriter(text, i, fnCallback) {
    if (typeof text != "undefined") {
      if (i < text.length) {
        document.querySelector("h1").innerHTML = text.substring(0, i + 1);

        setTimeout(function () {
          typeWriter(text, i + 1, fnCallback);
        }, 150);
      } else if (typeof fnCallback == "function") {
        setTimeout(fnCallback, 700);
      }
    }
  }

  function StartTextAnimation(i) {
    if (typeof dataText[i] == "undefined") {
      setTimeout(function () {
        StartTextAnimation(0);
      }, 15000);
    }
    typeWriter(dataText[i], 0, function () {
      StartTextAnimation(i + 1);
    });
  }

  StartTextAnimation(0);
});
