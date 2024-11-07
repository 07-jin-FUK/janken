"use strict";
window.addEventListener("DOMContentLoaded", function () {
  const btn_play = document.getElementById("switch");
  const videoElement = document.querySelector("#OP");

  btn_play.addEventListener("click", (e) => {
    videoElement.play();
  });
});

window.addEventListener("DOMContentLoaded", function () {
  const btn_play = document.getElementById("switch");
  const videode = document.querySelector("#kaset");

  btn_play.addEventListener("click", (e) => {
    setTimeout(() => {
      videode.play();
    }, 2800);
  });
});

$("#power").on("click", function () {
  $("#light").toggle();

  setTimeout(() => {
    $("#kaset").show();

    $("#OP").css("display", "none");
  }, 2800);

  setTimeout(() => {
    $("#Game").show();
  }, 5000);
});

window.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("Game");
  const vide = document.querySelector("#kettei");

  btn.addEventListener("click", (e) => {
    vide.play();
  });

  btn.addEventListener(
    "click",
    (e) => {
      window.location.replace("./rpg/pokemon.html");
    },
    2000
  );

  // tn.addEventListener("click", e => {
  //     this.setTimeout(function () {
  //         window.location.href = "./rpg/index.html";

  //     }, 2000);

  // });
});
