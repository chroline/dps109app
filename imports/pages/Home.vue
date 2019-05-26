<template>
	<v-app>
		<section>
			<div class="teachers">
				<div class="heading">
					<p>Your Teachers</p>
				</div>
				<div class="list">
					<span v-show="show == true">
						<div
							class="item"
							v-for="teacher in favorites"
							v-on:click="updateView('teacher', teacher.id)"
							v-bind:data-school="teacher.school"
							:key="teacher.id"
							v-bind:style="
								'background-image: url(' + teacher.media + ')'
							"
						>
							<p>
								{{ teacher["Prefix"] }}
								{{ teacher["Last name"] }}
							</p>
						</div>
						<div v-show="favorites.length == 0" class="none">
							<p>You don't have any saved teachers.</p>
						</div>
					</span>
				</div>
			</div>
			<div class="schools">
				<p>All Schools</p>
				<div class="list">
					<div
						class="item"
						v-on:click="updateView('school', 'Walden')"
					>
						<p>Walden Elementary School</p>
					</div>
					<div
						class="item"
						v-on:click="updateView('school', 'Wilmot')"
					>
						<p>Wilmot Elementary School</p>
					</div>
					<div
						class="item"
						v-on:click="updateView('school', 'Kipling')"
					>
						<p>Kipling Elementary School</p>
					</div>
					<div
						class="item"
						v-on:click="updateView('school', 'South Park')"
					>
						<p>South Park Elementary School</p>
					</div>
					<div class="break"></div>
					<div
						class="item"
						v-on:click="updateView('school', 'Shepard')"
					>
						<p>Shepard Middle School</p>
					</div>
					<div
						class="item"
						v-on:click="updateView('school', 'Caruso')"
					>
						<p>Caruso Middle School</p>
					</div>
				</div>
			</div>
			<div class="pages">
				<p>Pages</p>
				<div class="list">
					<div class="item yellow">
						<p>Report an Absence</p>
					</div>
					<div class="item green">
						<p>Tip Line</p>
					</div>
					<div class="item">
						<p>Die</p>
					</div>
				</div>
			</div>
		</section>
	</v-app>
</template>

<script>
import { updateView } from "../app/methods";
import { Teachers } from "../app/database";
import $ from "jquery";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

export default {
	name: "Home",
	data() {
		return {
			favorites: [],
			show: false
		};
	},
	watch: {
		show(val) {}
	},
	methods: {
		updateView,
		processHome() {
			Favorites.find().forEach(
				function(favorite) {
					let data = Favorites.findOne(favorite);
					let item = Teachers.getTeacher(data.id, data.school);
					console.log(Favorites.findOne(item));
					this.favorites[this.favorites.length] = item.fields;
					this.favorites[this.favorites.length - 1].id = item.id;
					this.favorites[this.favorites.length - 1].media =
						item.fields["Media"][0].url;
				}.bind(this)
			);

			this.show = true;
			$("section").on("scroll", function() {
				console.log("Woah");
				if ($("section").scrollTop() >= 1.9 * window.rem()) {
					$(".bar").addClass("backshadow");
				} else {
					$(".bar").removeClass("backshadow");
				}
			});
		}
	},
	async mounted() {
		Tracker.autorun(
			function() {
				let ready = Session.get("favorites.loaded");
				if (ready) this.processHome();
			}.bind(this)
		);
	}
};
</script>

<style scoped lang="sass" src="../sass/home.sass"></style>
