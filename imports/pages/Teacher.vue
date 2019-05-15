<template>
	<section>
		<div
			class="header-img"
			v-bind:style="'background-image: url(' + media + ')'"
		>
			<div class="info">
				<h1>{{ name }}</h1>
				<p>{{ teach }}</p>
			</div>
		</div>
		<p class="desc" v-html="desc"></p>
		<table class="table">
			<tbody>
				<tr>
					<th scope="row">
						<i class="material-icons">
							phone
						</i>
					</th>
					<td>Extension</td>
					<td>+{{ ext }}</td>
				</tr>
				<tr>
					<th scope="row">
						<i class="material-icons">
							mail
						</i>
					</th>
					<td>Email</td>
					<td>{{ email }}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<style scoped lang="sass" src="../sass/teacher.sass"></style>
<script>
import showdown from "showdown";

export default {
  name: "Teacher",
  data() {
    return {
      name: "Girl Example",
      desc: "Hey Nic Raboy"
    };
  },
  async mounted() {
    var desc = async function() {
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
    this.name =
      this.$route.params["First name"] +" "+ this.$route.params["Last name"];
    //this.desc = await desc();
    this.teach = this.$route.params["Short desc."];
    this.ext = this.$route.params["Extension"];
    this.media = this.$route.params["Media"][0].url;
    this.email = this.$route.params["Email"];
  }
};

</script>
