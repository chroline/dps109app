import { Meteor } from "meteor/meteor";
import CreateApp from "/imports/app/config";
import methods from "/imports/app/methods";
import { Mongo } from "meteor/mongo";

import { Teachers } from "/imports/app/collections";

$.extend(window, methods);

window.rem = (function rem() {
    var html = document.getElementsByTagName("html")[0];

    return function() {
        return parseInt(window.getComputedStyle(html)["fontSize"]);
    };
})();

window.toRem = length => {
    return parseInt(length) / rem();
};

const backButton = `<i class="material-icons" data-back="true">arrow_back_ios</i>`;
const star = `<div class="star"><i class="material-icons">star_outline</i></div>`;

Meteor.startup(() => {
    var g = Meteor.subscribe("teachers",function(r){
        console.log(r)
    });
    CreateApp();
    $("section").on("scroll", function() {
        if ($("section").scrollTop() >= 1.9 * rem()) {
            $(".bar").addClass("backshadow");
        } else {
            $(".bar").removeClass("backshadow");
        }
    });
});

window.barUpdate = page => {
    switch (page) {
        case "Home":
            $(".bar").removeClass("transparent");
            $(".bar p").html("Home");
            $(".bar .star").remove();
            break;
        case "Teacher":
            $(".bar").addClass("transparent");
            $(".bar p").html(backButton);
            $(".bar p i").click(function(event) {
                console.log("yeet");
                updateView("back", event.originalEvent.target);
            });
            $(".bar").append(star);
            break;
    }
};

window.breadcrumbs = [
    {
        name: "Home",
        params: {
            prev: true
        }
    }
];
