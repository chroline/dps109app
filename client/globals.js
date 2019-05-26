import $ from "jquery";

var breadcrumbs = [
  {
    name: "Home",
    params: {
      prev: true
    }
  }
];

$.extend(window, { breadcrumbs });
