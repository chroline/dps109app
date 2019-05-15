import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Teachers = new Mongo.Collection('teachers');

if(Meteor.isClient) {
	window.Teachers = Teachers;
}