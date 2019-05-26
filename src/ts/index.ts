import $ from "jquery";
import "jquery-ui";
import feather from "feather-icons";

var gripStartY = null;
var startDrag = null;
var byaxis;
var ylocation = $(".content")[0].getBoundingClientRect().top;
var currentSlide = 1;

feather.replace();

function dragUp(yaxis) {
  $(".favorites").show();
  $(".frame").show();

  byaxis = yaxis;
  var firstDrag = false;
  if (gripStartY == null) {
    gripStartY = $(".content")[0].getBoundingClientRect().top;
  }
  if (startDrag == null) {
    startDrag = yaxis.touches[0].clientY;
    firstDrag = true;
  }
  var difference = gripStartY - startDrag;
  var distance = gripStartY - yaxis.touches[0].clientY;
  if (gripStartY === ylocation) {
    if (ylocation - yaxis.touches[0].clientY <= 0) {
      distance = (0 - distance + difference) / 3;
    } else {
      distance = (0 - distance + difference) / 1.2;
    }
  } else {
    distance = (0 - distance) / 1.5;
  }
  if (gripStartY === ylocation) {
    if (ylocation - yaxis.touches[0].clientY <= 0) {
      $(".background .layer1").css({
        WebkitFilter: "contrast(1.2) grayscale(1) blur(" + distance / 3 + "px)"
      });
      if (distance > 0) {
        $(".background .layer1").css({
          transform: "scale(" + (1 + distance / 100 / 2) + ")"
        });
      }
    }
  } else {
    $(".background .layer1").css({
      WebkitFilter:
        "contrast(1.2) grayscale(1) blur(" + distance / 5 / 3 + "px)"
    });
    $(".background .layer1").css({
      transform: "scale(" + (1 + distance / 5 / 100 / 2) + ")"
    });
  }
  if (firstDrag) {
    $(".content").animate(
      {
        marginTop: gripStartY - ylocation + distance - 10 + "px"
      },
      50
    );
  } else {
    $(".content").css(
      "margin-top",
      gripStartY - ylocation + distance - 10 + "px"
    );
  }

  var blurAmount =
    (event.touches[0].pageY - ylocation) / ((ylocation * 0.75 - 120) / 0.75);
  console.log(0 + (1 - -blurAmount));
  $(".favorites").css("opacity", 0 + (1 - -blurAmount));
  $(".frame").css("opacity", -blurAmount - 1);
}

function detect() {
  var br1 = parseFloat(
    $(".background .layer1")
      .css("filter")
      .replace("contrast(1.2) grayscale(1) blur(", "")
      .replace("px)", "")
  );
  $({ blurRadius: br1 }).animate(
    { blurRadius: 0 },
    {
      duration: 500,
      easing: "swing", // or "linear"
      // use jQuery UI or Easing plugin for more options
      step: function() {
        $(".background .layer1").css({
          WebkitFilter:
            "contrast(1.2) grayscale(1) blur(" + this.blurRadius + "px)"
        });
      },
      complete: function() {
        $(".background .layer1").css({
          WebkitFilter: "contrast(1.2) grayscale(1) blur(0px)"
        });
      }
    }
  );
  var br2 = parseFloat(
    $(".background .layer1")
      .css("transform")
      .split(",")[3]
  );
  $({ blurRadius: br2 }).animate(
    { blurRadius: 1 },
    {
      duration: 1000,
      easing: "easeOutQuart", // or "linear"
      // use jQuery UI or Easing plugin for more options
      step: function() {
        $(".background .layer1").css({
          transform: "scale(" + this.blurRadius + ")"
        });
      },
      complete: function() {
        $(".background .layer1").css({
          transform: "scale(1)"
        });
      }
    }
  );
  gripStartY = startDrag = null;
  var top = $(".content")
    .css("margin-top")
    .replace("px", "");
  if (event.touches[0].pageY <= 100) {
    content.up();
  } else {
    content.down();
  }
}

$(".grip").on("touchmove", function(event) {
  dragUp(event);
});

$(".grip").on("touchend", function() {
  detect();
});

$(".layer1 .pic").each(function(i) {
  $(this).css("background-image", "url(assets/imgs/" + (i + 1) + ".jpg)");
});

async function slideshow() {
  this.fadeOut = function() {
    return new Promise(resolve => {
      $(".layer1").fadeOut(2000);
      setTimeout(() => {
        resolve("1");
      }, 2000);
    });
  };
  this.fadeIn = function() {
    return new Promise(resolve => {
      $(".layer1").fadeIn(2000);
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  await this.fadeOut();
  switch (currentSlide) {
    case 1:
    case 2:
    case 3:
    case 4:
      currentSlide++;
      break;

    case 5:
      currentSlide = 1;
      break;
    default:
      break;
  }
  $(".layer1 .pic").each(function() {
    $(this).hide();
  });
  $(".layer1 .pic:nth-child(" + currentSlide + ")").show();
  await this.fadeIn();
}

setInterval(function() {
  slideshow();
}, 14000);

var content = {
  up: function() {
    $(".content").data("show", "true");
    $(".content").animate(
      {
        marginTop: 50 - ylocation + "px"
      },
      100,
      "easeOutCirc"
    );
    $(".overlay").addClass("show");
    $(".overlay").animate(
      {
        opacity: 1
      },
      250
    );
    $(".favorites").css("opacity", 0);
    $(".frame").css("opacity", 1);
  },
  down: function() {
    $(".content").data("show", "false");
    $(".content").animate(
      {
        marginTop: -10 + "px"
      },
      200,
      "easeOutBack"
    );
    $(".overlay").animate(
      {
        opacity: 0
      },
      200,
      function() {
        $(".overlay").removeClass("show");
      }
    );
    $(".favorites").css("opacity", 1);
    $(".frame").css("opacity", 0);
  }
};

$(".overlay").click(function() {
  content.down();
});
