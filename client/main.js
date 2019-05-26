import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import $ from "jquery";

import CreateApp from "/imports/app/config";
import { processHome } from "/imports/app/methods";
import { Favorites } from "/imports/app/collections";

const rem = (window.rem = (function rem() {
  var html = document.getElementsByTagName("html")[0];

  return function() {
    return parseInt(window.getComputedStyle(html)["fontSize"], 10);
  };
})());

Meteor.startup(() => {
  Session.set("favorites.loaded", false);
  Meteor.subscribe("favorites", {
    onReady: function() {
      window.Favorites = Favorites;
      Favorites.find().forEach(function(item) {
        console.log("unfair");
        console.log(item);
      });
      Session.set("favorites.loaded", true);
    }
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
