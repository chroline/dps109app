import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import axios from "axios";
import _ from "lodash";
import * as database from "/imports/app/database";
import { Favorites } from "/imports/app/collections";
import methods from "/imports/both/methods";


console.log("session1..");
console.log(Session);

Meteor.methods({
    async fileRetrieve(link) {
        return new Promise(resolve => {
            axios.get(link).then(response => {
                resolve(response.data);
            });
        });
    },
    async getFavorites() {
        return Favorites.find({}).fetch();
    },
    async addFavorite(fav) {
        let favorite = await Favorites.insert(fav);
        return favorite;
    },
    async removeFavorite(id) {
      let favorite = await Favorites.remove(id[0]);
      return favorite;
    },
    async isFavorite(page) {
        return new Promise(resolve => {
            let ok = false;
            let item = null;
            Meteor.call("getFavorites", function(e, favorites) {
                favorites.forEach(function(fav) {
                    if ((page[0].name == fav[0].name) && (page[0].params.name == fav[0].params.name)) {
                        ok = true;
                        item = fav;
                    }
                });
                resolve({ok,item});
            });
        });
    }
});

/*Meteor.publish("favorites", function teachers() {
    console.log("woah!");
    return Favorites.find({});
});*/