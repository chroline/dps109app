import { Meteor } from "meteor/meteor";

Meteor.methods({
    updateFavorites: favorites => {
        if (Meteor.isClient) {
            let teachers = [];
            let pages = [];
            favorites.forEach(function(fav) {
                if (fav[0].name == "Teacher") {
                    teachers[teachers.length] = fav;
                } else {
                    pages[pages.length] = fav[0];
                }
            });
            Session.set("favorites.teachers", teachers);
            Session.set("favorites.pages", pages);
            Session.setDefault("favorites.loaded", 0);
            Session.set("favorites.loaded", Session.get("favorites.loaded") + 1);
        }
    }
});