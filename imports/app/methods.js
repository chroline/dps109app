import $ from "jquery";
import { Meteor } from "meteor/meteor";
import { Teachers, Schools } from "./database";

export const updateView = async(type, el) => {
    this.setParams = async() => {
        return new Promise(async resolve => {
            switch (type) {
                case "teacher":
                    let list = await Teachers().getTeacher(el[0], el[1]);
                    list.fields.id = list.id;
                    resolve(list.fields);
                    break;
                case "school":
                    resolve(Schools[el]);
                    break;
                case "directory":
                    resolve({});
                    break;
                case "back":
                    resolve({
                        prev: true
                    });
                    break;
                default:
                    resolve({});
                    break;
            }
        });
    };

    const params = await this.setParams();

    this.page = () => {
        console.log(params);
        return new Promise(resolve => {
            let page;
            switch (type) {
                case "teacher":
                    params.prev = false;
                    page = {
                        name: "Teacher",
                        params
                    };
                    resolve(page);
                    break;
                case "school":
                    params.prev = false;
                    page = {
                        name: "School",
                        params: $.extend(params, { name: el })
                    };
                    resolve(page);
                    break;
                case "directory":
                    params.prev = false;
                    page = {
                        name: "Directory",
                        params: $.extend(params, { name: el })
                    };
                    resolve(page);
                    break;
                case "home":
                    params.prev = true;
                    page = {
                        name: "Home",
                        params
                    };
                    resolve(page);
                    break;
                case "back":
                    window.breadcrumbs.pop();
                    page = window.breadcrumbs[window.breadcrumbs.length - 1];
                    page.params.prev = true;
                    resolve(page);
                    break;
                default:
                    resolve({name:type,params:{name:type.replace(/_/g," ")}});
                    break;
            }
        });
    };
    var currentPage = await this.page();
    window.router.push(currentPage);

    if (type !== "back")
        window.breadcrumbs[window.breadcrumbs.length] = currentPage;
};

export const barUpdate = (page, vue) => {
    switch (page) {
        case "Home":
            vue.fav = false;
            vue.prev = false;
            vue.title = "Home";
            vue.clearHeader = false;
            break;
        case "Teacher":
            vue.fav = false;
            vue.prev = true;
            vue.title = "Teacher";
            vue.clearHeader = true;
            break;
        case "Directory":
            vue.fav = false;
            vue.prev = true;
            vue.title = "Directory";
            vue.clearHeader = false;
            break;
        case "School":
            vue.fav = false;
            vue.prev = true;
            vue.title = "School";
            vue.clearHeader = true;
            break;
        default:
            vue.fav = false;
            vue.prev = true;
            vue.title = page.replace(/_/g," ");
            vue.clearHeader = false;
            break;
    }
};

export const addFavorite = async() => {
    Meteor.call("addFavorite", [
        window.breadcrumbs[window.breadcrumbs.length - 1]
    ],function() {
        Meteor.call("getFavorites", function(e, favorites) {
          console.log("update!!");
          Meteor.call("updateFavorites", favorites);
        });
    });
}

export const removeFavorite = async(id) => {
    Meteor.call("removeFavorite", [
        id
    ],function() {
        Meteor.call("getFavorites", function(e, favorites) {
          console.log("update!!");
          Meteor.call("updateFavorites", favorites);
        });
    });
}