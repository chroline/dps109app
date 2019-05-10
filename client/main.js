import { Meteor } from 'meteor/meteor'
import CreateApp from '/imports/app/config'

var rem = function rem() {
    var html = document.getElementsByTagName('html')[0];

    return function () {
        return parseInt(window.getComputedStyle(html)['fontSize']);
    }
}();

function toRem(length) {
    return (parseInt(length) / rem());
}

Meteor.startup(() => {

	CreateApp();

	$("section").on("scroll",function(){
    	if($("section").scrollTop() >= (1.9*rem())) {
        	$(".bar").addClass("backshadow");
    	} else {
        	$(".bar").removeClass("backshadow");
    	}
	})
})
