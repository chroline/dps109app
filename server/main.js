import { Meteor } from "meteor/meteor";
import axios from "axios";
import _ from "lodash";

import { Favorites } from "/imports/app/collections";
import * as database from "/imports/app/database"

//init();

Meteor.methods({
  async getFavorite(element) {
    return new Promise(resolve => {
      resolve(Favorites.findOne({ id: element }));
    });
  },
  async getTeacher(element) {

  },
  async fileRetrieve(link) {
    return new Promise(resolve => {
      axios.get(link).then(response => {
        resolve(response.data);
      });
    });
  }
});

Meteor.publish("favorites", function teachers() {
  console.log("woah!");
  return Favorites.find({});
});
