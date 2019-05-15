import 'jquery';
import 'jquery-ui'

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var gripStartY = null;
var startDrag = null;
var event;
var ylocation = $(".content")[0].getBoundingClientRect().top;
var currentSlide = 1;
feather.replace();
function dragUp(yaxis) {

        $(".favorites").show();
        $(".frame").show();
    event = yaxis;
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
    if (gripStartY == ylocation) {
        if (ylocation - yaxis.touches[0].clientY <= 0) {
            distance = (0 - distance + difference) / 3;
        }
        else {
            distance = (0 - distance + difference) / 1.2;
        }
    }
    else {
        distance = (0 - distance) / 1.5;
    }
    if (gripStartY == ylocation) {
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
    }
    else {
        $(".background .layer1").css({
            WebkitFilter: "contrast(1.2) grayscale(1) blur(" + (distance / 5) / 3 + "px)"
        });
        $(".background .layer1").css({
            transform: "scale(" + (1 + (distance / 5) / 100 / 2) + ")"
        });
    }
    if (firstDrag) {
        $(".content").animate({
            marginTop: gripStartY - ylocation + distance - 10 + "px"
        }, 50);
    }
    else {
        $(".content").css("margin-top", gripStartY - ylocation + distance - 10 + "px");
    }
    var blurAmount = (event.touches[0].pageY - ylocation) / (((ylocation * 0.75) - 120) / 0.75);
    $(".favorites").css("opacity", 0 + (1 - -blurAmount));
    $(".frame").css("opacity", -blurAmount - 1);
}
function detect() {
    var br1 = parseFloat($(".background .layer1")
        .css("filter")
        .replace("contrast(1.2) grayscale(1) blur(", "")
        .replace("px)", ""));
    $({ blurRadius: br1 }).animate({ blurRadius: 0 }, {
        duration: 500,
        easing: "swing",
        // use jQuery UI or Easing plugin for more options
        step: function () {
            $(".background .layer1").css({
                WebkitFilter: "contrast(1.2) grayscale(1) blur(" +
                    this.blurRadius +
                    "px)"
            });
        },
        complete: function () {
            $(".background .layer1").css({
                WebkitFilter: "contrast(1.2) grayscale(1) blur(0px)"
            });
        }
    });
    var br2 = parseFloat($(".background .layer1")
        .css("transform")
        .split(",")[3]);
    $({ blurRadius: br2 }).animate({ blurRadius: 1 }, {
        duration: 1000,
        easing: "easeOutQuart",
        // use jQuery UI or Easing plugin for more options
        step: function () {
            $(".background .layer1").css({
                transform: "scale(" + this.blurRadius + ")"
            });
        },
        complete: function () {
            $(".background .layer1").css({
                transform: "scale(1)"
            });
        }
    });
    gripStartY = startDrag = null;
    var top = $(".content")
        .css("margin-top")
        .replace("px", "");
    if (event.touches[0].pageY <= 100) {
        content.up();
    }
    else {
        content.down();
    }
}
$(".grip").on("touchmove", function (event) {
    dragUp(event);
});
$(".grip").on("touchend", function () {
    detect();
});
$(".layer1 .pic").each(function (i) {
    $(this).css("background-image", "url(assets/imgs/" + (i + 1) + ".jpg)");
});
function slideshow() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.fadeOut = function () {
                        return new Promise(function (resolve) {
                            $(".layer1").fadeOut(2000);
                            setTimeout(function () {
                                resolve("1");
                            }, 2000);
                        });
                    };
                    this.fadeIn = function () {
                        return new Promise(function (resolve) {
                            $(".layer1").fadeIn(2000);
                            setTimeout(function () {
                                resolve();
                            }, 2000);
                        });
                    };
                    return [4 /*yield*/, this.fadeOut()];
                case 1:
                    _a.sent();
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
                    }
                    $(".layer1 .pic").each(function () {
                        $(this).hide();
                    });
                    $(".layer1 .pic:nth-child(" + currentSlide + ")").show();
                    return [4 /*yield*/, this.fadeIn()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
setInterval(function () {
    slideshow();
}, 14000);

window.content = {
    up: function () {
        $(".content").data("show", "true");
        $(".content").animate({
            marginTop: 50 - ylocation + "px"
        }, 100, "easeOutCirc");
        $(".overlay").addClass("show");
        $(".overlay").animate({
            opacity: 1
        }, 250);
        $(".favorites").css("opacity", 0);
        $(".frame").css("opacity", 1);
        $(".favorites").hide();
        $(".frame").show();
    },
    down: function () {
        $(".content").data("show", "false");
        $(".content").animate({
            marginTop: -10 + "px"
        }, 200, "easeOutBack");
        $(".overlay").animate({
            opacity: 0
        }, 200, function () {
            $(".overlay").removeClass("show");
        });
        $(".favorites").css("opacity", 1);
        $(".frame").css("opacity", 0);
        $(".favorites").show();
        $(".frame").hide();
    }
};

$(".overlay").click(function () {
    content.down();
});

//# sourceMappingURL=index.js.map