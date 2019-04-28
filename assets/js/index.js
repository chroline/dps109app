var gripStartY = null;
var event;
var movement = -11;
var ylocation = ($(".content")[0].getBoundingClientRect()).top;

function dragUp(yaxis) {
    event = yaxis;
    if (gripStartY == null) {
        gripStartY = ($(".content")[0].getBoundingClientRect()).top;
    }
    var distance = gripStartY - yaxis.touches[0].clientY + 10;
    if (gripStartY == ylocation) {
        if (ylocation - yaxis.touches[0].clientY <= 0) {
            distance = ((0 - distance) / 3)
        } else {
            distance = ((0 - distance) / 1.2);
        }
    } else {
        distance = ((0 - distance) / 2);
    }
    $(".content").css("margin-top", (gripStartY - ylocation) + distance + "px");
}

function detect() {
    gripStartY = null;
    var top = ($(".content").css("margin-top")).replace("px", "");
    if (event.touches[0].pageY <= 100) {
        $(".content").animate({
            marginTop: (50 - ylocation) + "px"
        }, 100, "easeOutCirc");
        $(".overlay").addClass("show");
        $(".overlay").animate({
            opacity: 1
        },200)
    } else {
        $(".content").animate({
            marginTop: -10 + "px"
        }, 100, "easeOutCirc");
        $(".overlay").animate({
            opacity: 0
        },200,function(){
            $(".overlay").removeClass("show");
        })
    }
}

$(".grip").on('touchmove', function (event) {
    dragUp(event);
});

$(".grip").on('touchend', function () {
    detect();
});

var hammertime = new Hammer($(".grip")[0]);
hammertime.on('swipeup', function(ev) {
	alert();
});