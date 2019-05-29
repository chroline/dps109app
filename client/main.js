import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Tracker } from "meteor/tracker";
import $ from "jquery";
import CreateApp from "/imports/app/config";
import { Colors } from "/imports/app/database";
import methods from "/imports/both/methods";
import { updateView } from "/imports/app/methods";

const rem = (window.rem = (function rem() {
    var html = document.getElementsByTagName("html")[0];

    return function() {
        return parseInt(window.getComputedStyle(html)["fontSize"], 10);
    };
})());

Meteor.startup(() => {
    window.updateView = updateView;
    Session.set("favorites.loaded", false);
    Meteor.call("getFavorites", async function(e, favorites) {
        Meteor.call("updateFavorites", favorites);
    });

    Tracker.autorun(function() {
        let loaded = Session.get("favorites.loaded");
        var pages = Session.get("favorites.pages");
        console.log(loaded);
        if (loaded !== false) {
            $('.favorites button').each(function() {
                $(this).remove();
            })
            pages.forEach(function(page) {
                var name = page.params.name;
                if (page.name == "School") {
                    switch (name) {
                        case "Shepard":
                        case "Caruso":
                            name = name + " Middle";
                            break;
                        default:
                            name = name + " Elementary";
                            break;
                    }
                }
                var el = `<button onclick="updateView('${page.name}','${page.params.name}');content.up()" class="bth-${Colors[page.params.name]}">${name}</button>`;
                console.log(el);
                $(".favorites").append(el);
            });
        }
    });

    CreateApp();

    $("main").on("scroll", function() {
        if ($("main").scrollTop() >= 1.9 * rem()) {
            $(".bar").addClass("backshadow");
        } else {
            $(".bar").removeClass("backshadow");
        }
    });
});