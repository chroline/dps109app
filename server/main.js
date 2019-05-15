import { Meteor } from "meteor/meteor";
import axios from "axios";
import Airtable from "airtable";
import { Teachers } from "/imports/app/collections";

Teachers.insert({ woah: "woah" });

const base = new Airtable({ apiKey: "key3zVNJMO5ooi70U" }).base(
	"appVvaAvbskgXqsO6"
);
function getTeachers() {
	var teachers = [];
	return new Promise(resolve => {
		base("Teachers")
			.select({
				view: "Grid view"
			})
			.eachPage(function page(records) {
				// This function (`page`) will get called for each page of records.

				records.forEach(function(record) {
					teachers[teachers.length] = record;
					if (teachers.length == records.length) {
						resolve(teachers);
					}
				});
			});
	});
}
async function init() {
	console.log("in init");
	(await getTeachers()).forEach(function(item) {
		Teachers.insert(item);
	});
}

init();
Meteor.methods({
	itemFind(query) {
		//console.log(Teachers);
		//return Teachers;
	},
	async getTeachers() {
		console.log("woah");
		console.log(Teachers.find({}));
	},
	async getTeacher(element) {
		return new Promise(resolve => {
			resolve(Teachers.findOne({ id: element }));
		});
	},
	async fileRetrieve(link) {
		return new Promise(resolve => {
			axios.get(link).then(response => {
				resolve(response.data);
			});
		});
	}
});

Meteor.publish("teachers",function teachers(){
	console.log("woah!");
	this.ready(function() {
		console.log("ready");
	})
	return Teachers.find({});
})
