<template>
	<v-app>
		<section>
			<div
				class="header-img"
				v-bind:style="'background-image: url(' + media + ')'"
			>
				<div class="name">
					<h1>{{ name }}</h1>
				</div>
			</div>
			<table class="table">
				<tbody>
					<tr>
						<th scope="row">
							<i class="material-icons">
								phone
							</i>
						</th>
						<td>Extension</td>
					</tr>
					<tr>
						<th scope="row">
							<i class="material-icons">
								mail
							</i>
						</th>
						<td>Email</td>
					</tr>
				</tbody>
			</table>
		</section>
	</v-app>
</template>
<!--
<style scoped lang="sass" src="../sass/school.sass"></style>
<!--<script>
import showdown from "showdown";

export default {
  name: "Teacher",
  data() {
    return {
      name: "",
      media: ""
    };
  },
  async mounted() {
    /*var desc = async function() {
      return new Promise(async resolve => {
        let send;
        await Meteor.call(
          "fileRetrieve",
          this.$route.params["Bio"][0].url,
          function(e, r) {
            resolve(new showdown.Converter().makeHtml(r));
          }
        );
      });
    }.bind(this);
    this.name = this.$route.params.name
    this.media = this.$route.params.media*/
  }
};
</script>-->
