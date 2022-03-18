$(function () {
  $(".floor-scheme svg").removeAttr("height width").show();

  $("[data-label_id]").each(function (index) {
    let flat = $(this).attr("data-label_id");
    flat = flat.length === 1 ? "0" + flat : flat;
    flat = "кв" + flat;
    $(this).attr("data-label_id", flat);
  });
  $("[data-link_id]").each(function (index) {
    let flat = $(this).attr("data-link_id");
    flat = flat.length === 1 ? "0" + flat : flat;
    flat = "кв" + flat;
    $(this).attr("data-link_id", flat);
  });
  $("[data-name]").each(function (index) {
    let flat = $(this).attr("data-name");
    let check = flat.match(/\d{1,3}/gi);

    if (check !== null && check.length) {
      flat = flat.match(/\d{1,3}/gi)[0];
      flat = flat.length === 1 ? "0" + flat : flat;
      flat = "кв" + flat;
      $(this).attr("data-name", flat);
    } else {
      $(this).removeAttr("data-name");
    }
  });

  // подсветка при наведении
  let enterFlat = function (flatId) {
    if ($("[data-link_id=" + flatId + "]").length > 0) {
      let flatOpacity = $("svg g[data-name=" + flatId + "] path").attr(
        "fill-opacity"
      );
      $("svg [data-name=" + flatId + "] path")
        .stop()
        .animate(
          {
            "fill-opacity": Number(flatOpacity) + 0.4,
          },
          300
        );
      $("[data-link_id=" + flatId + "]").addClass("active");
      $("[data-label_id=" + flatId + "]")
        .stop()
        .fadeIn(300);
    }
  };
  let exitFlat = function (flatId) {
    if ($("[data-link_id=" + flatId + "]").length > 0) {
      let flatOpacity = $("svg g[data-name=" + flatId + "] path").attr(
        "fill-opacity"
      );
      $("svg [data-name=" + flatId + "] path")
        .stop()
        .animate(
          {
            "fill-opacity": flatOpacity,
          },
          300
        );
      $("[data-link_id=" + flatId + "]").removeClass("active");
      $("[data-label_id=" + flatId + "]")
        .stop()
        .fadeOut(300);
    }
  };

  $(".flat__sidebar-info-flats [data-link_id]").mouseenter(function () {
    let flatId = $(this).attr("data-link_id");
    enterFlat(flatId);
  });
  $(".flat__sidebar-info-flats [data-link_id]").mouseleave(function () {
    let flatId = $(this).attr("data-link_id");
    exitFlat(flatId);
  });

  $("[data-label_id]").mouseenter(function () {
    let flatId = $(this).attr("data-label_id");
    enterFlat(flatId);
  });
  $("[data-label_id]").mouseleave(function () {
    let flatId = $(this).attr("data-label_id");
    exitFlat(flatId);
  });

  $("svg g[data-name]").mouseenter(function () {
    let flatId = $(this).attr("data-name");
    enterFlat(flatId);
  });
  $("svg g[data-name]").mouseleave(function () {
    let flatId = $(this).attr("data-name");
    exitFlat(flatId);
  });

  var svg = $(".floor-scheme svg");
  var svgWidth = svg.attr("viewBox").split(" ")[2];
  var svgHeight = svg.attr("viewBox").split(" ")[3];

  function findFlatCenter(curFlat) {
    let currentFlat = curFlat[0];
    let curPoints = currentFlat.attributes.d.value
      .replace("M", "")
      .replace(" M ", " L ")
      .trim()
      .split(" L ");
    let curPointsTransform = currentFlat.attributes.transform.value
      .replace("matrix(", "")
      .replace(")", "")
      .split(",");
    let positionX = [];
    let positionY = [];

    for (let i = 0; i < curPoints.length; i++) {
      let points = curPoints[i].split(" ");
      positionX[i] = points[0];
      positionY[i] = points[1];
    }
    positionX =
      (Math.max.apply(null, positionX) + Math.min.apply(null, positionX)) / 2;
    positionY =
      (Math.max.apply(null, positionY) + Math.min.apply(null, positionY)) / 2;

    positionX = (positionX / svgWidth) * 100;
    positionY = (positionY / svgHeight) * 100;

    positionX = positionX * curPointsTransform[0];
    positionY = positionY * curPointsTransform[3];

    return { x: positionX, y: positionY };
  }

  function setFlatLabelPos(curLabel) {
    let svgCurFlat = $(
      "svg [data-name='" + curLabel.attr("data-label_id") + "'] path"
    );
    if (svgCurFlat.length === 0) {
      return;
    }
    let positions = findFlatCenter(svgCurFlat);
    curLabel.css({ left: positions.x + "%", top: positions.y + "%" });
    //curLabel.css({"transform": "translate("+-positions.x+"%, "+-positions.y+"%)"});
  }

  $("[data-label_id]").each(function (index) {
    setFlatLabelPos($(this));
  });

  var swiper_floors = new Swiper(".swiper-container", {
    direction: "vertical",
    slidesPerView: 5,
    centeredSlides: true,
    centeredSlidesBounds: true,
    navigation: {
      nextEl: ".floors_down",
      prevEl: ".floors_up",
    },
  });

  var center_floor = $(".swiper-slide a.active").attr("data-num") - 1;
  swiper_floors.slideTo(center_floor, false, false);
});
