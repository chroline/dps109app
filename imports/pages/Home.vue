<template>
	<section>
		<div class="teachers">
			<div class="heading">
				<p>Your Teachers</p>
			</div>
			<div class="list">
				<span v-show="show == true">
					<div
						class="item"
						v-for="teacher in teachers"
						v-on:click="updateView('teacher', $event.target)"
						v-bind:data-teacher="teacher.id"
						v-bind:style="
							'background-image: url(' + teacher.media + ')'
						"
					>
						<p>
							{{ teacher["Prefix"] }} {{ teacher["Last name"] }}
						</p>
					</div>
					<div v-show="teachers.length == 0" class="none">
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
					v-on:click="updateView('teacher', $event)"
					data-school="walden"
				>
					<p>Walden Elementary School</p>
				</div>
				<div
					class="item"
					v-on:click="updateView('teacher', $event)"
					data-school="wilmot"
				>
					<p>Wilmot Elementary School</p>
				</div>
				<div
					class="item"
					v-on:click="updateView('teacher', $event)"
					data-school="kipling"
				>
					<p>Kipling Elementary School</p>
				</div>
				<div
					class="item"
					v-on:click="updateView('teacher', $event)"
					data-school="southpark"
				>
					<p>South Park Elementary School</p>
				</div>
				<div class="break"></div>
				<div
					class="item"
					v-on:click="updateView('teacher', $event)"
					data-school="shepard"
				>
					<p>Shepard Middle School</p>
				</div>
				<div
					class="item"
					v-on:click="updateView('teacher', $event)"
					data-school="caruso"
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
</template>

<script>
import methods from "../app/methods";

export default {
	name: "Home",
	data() {
		return {
			teachers: [],
			show: false
		};
	},
	watch: {
		show(val) {}
	},
	async mounted() {
		Teachers.find().forEach(function(){
			console.log("yes");
		})

		const teachers = Teachers.find();

		Meteor.call("itemFind",{woah:"woah"},function(e,r){
			console.log(r);
		})

		var Component = this;

		(await teachers).forEach(
			function(item) {
				this.teachers[this.teachers.length] = item.fields;
				this.teachers[this.teachers.length - 1].id = item.id;
				this.teachers[this.teachers.length - 1].media =
					item.fields["Media"][0].url;
			}.bind(this)
		);

		this.show = true;
		$("section").on("scroll", function() {
			console.log("Woah");
			if ($("section").scrollTop() >= 1.9 * rem()) {
				$(".bar").addClass("backshadow");
			} else {
				$(".bar").removeClass("backshadow");
			}
		});
	},
	methods
};
</script>

<style scoped lang="sass" src="../sass/home.sass"></style>
