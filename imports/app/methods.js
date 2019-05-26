import $ from "jquery";
import { Meteor } from "meteor/meteor";
import { Schools } from "./database";

export const updateView = async (type, el) => {
  this.setParams = async () => {
    return new Promise(async resolve => {
      switch (type) {
        case "teacher":
          break;
        case "school":
          resolve(Schools[el]);
          break;
        case "back":
          resolve({
            prev: true
          });
          break;
        default:
          alert("idk");
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
          page = {
            name: "Teacher",
            params
          };
          resolve(page);
          break;
        case "school":
          page = {
            name: "School",
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
          resolve(page);
          break;
      }
    });
  };
  var currentPage = await this.page();
  window.router.push(currentPage);

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
    case "School":
      vue.fav = false;
      vue.prev = true;
      vue.title = "School";
      vue.clearHeader = true;
      break;
    default:
      break;
  }
};
