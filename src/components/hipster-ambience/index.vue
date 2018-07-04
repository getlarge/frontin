<template >
  	<b-container ref="slider-master" id="audio-slider-holder" fluid class="bv-example-row">
<!--       <b-row align-h="center">
 -->      <b-row >
		<b-col align-h="center" sm="3" md="3" lg="3" >
			<div v-for="item in format">
				<file-uploader :mimetype="item" > </file-uploader>
          	</div>
          	<!-- <div v-if="$refs.fileUploader.isSuccess">
				<b-button id="generate"  type="button">Generate</b-button>
			</div> -->
		</b-col>

		<b-col sm="3" md="3" lg="3" >
			<audio-slider v-for="as in as1" :key="as.id" :icon="as.iconFile" :sources="as.audioSources" :loop="true" ></audio-slider>
			<audio-slider v-for="as in as2" :key="as.id" :icon="as.iconFile" :sources="as.audioSources" :loop="true" ></audio-slider>
			<audio-slider v-for="as in as3" :key="as.id" :icon="as.iconFile" :sources="as.audioSources" :loop="true" ></audio-slider>
		</b-col>

		<b-col sm="3" md="3" lg="3" >
			<audio-slider v-for="as in as4" :key="as.id" :icon="as.iconFile" :sources="as.audioSources" :loop="true" ></audio-slider>
			<audio-slider v-for="as in as5" :key="as.id" :icon="as.iconFile" :sources="as.audioSources" :loop="true" ></audio-slider>
			<audio-slider v-for="as in as6" :key="as.id" :icon="as.iconFile" :sources="as.audioSources" :loop="true" ></audio-slider>
		</b-col>
      </b-row>

    </b-container>

</template>

<script>
	import { rgb } from "d3-color"
	import { easeLinear } from "d3-ease"
	import { interpolateHcl, interpolateHclLong } from "d3-interpolate"
	import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
	import { append, attr, event, select, selectAll, style } from "d3-selection"
	import { active, transition } from "d3-transition"
	import { EventBus } from '@/main'
	import ToneSynth from '@/tone-components/synth'
	import audioSlider from './audio-slider'
	import fileUploader from '@/components/utils/file-upload'

	export default {
		data() {
		    return {
		    	as: [{
			    	as1: [{
		    			id: 1,
			    		audioSources:["static/sounds/rain.mp3"],
				        iconFile: 'static/icons/rain-white.png',
				    }],
		    	}],
		    	as1: [
		    		{
		    			id: 1,
			    		audioSources:["static/sounds/rain.mp3"],
				        iconFile: 'static/icons/rain-white.png',
			    	}
		    	],
		    	as2: [
		    		{
		    			id: 2,
			    		audioSources:["static/sounds/wind.mp3"],
				        iconFile: 'static/icons/wind-white.png',
			    	}
		    	],
		    	as3: [
		    		{
		    			id: 3,
			    		audioSources:["static/sounds/forrest.mp3"],
				        iconFile: 'static/icons/forrest-white.png',

			    	}
		    	],
		    	as4: [
		    		{
		    			id: 4,
			    		audioSources:["static/sounds/fire.mp3"],
				        iconFile: 'static/icons/fire-white.png',

			    	}
		    	],
		    	as5: [
		    		{
		    			id: 5,
			    		audioSources:["static/sounds/water-stream.mp3"],
				        iconFile: 'static/icons/water-white.png',

			    	}
		    	],
		    	as6: [
		    		{
		    			id: 6,
			    		audioSources:["static/sounds/storm.mp3"],
				        iconFile: 'static/icons/storm-white.png',

			    	}
		    	],
		        colorSet: [
			        {
			          color1: "#01c669",
			          color2: "#ff830f", //"#48725e"
		        	},
	        	],
	        	format: ["image", "audio"],
	        	duration : 5000,
	        	store: [],
	  		}
	  	},

		components: {
		  audioSlider,
		  fileUploader,
		},

		created() {
	  		EventBus.$on("audio-slider-value", (id, value) => {
		      //console.log("newvalue", id, value)
		      /// changer les couleurs de références, 
		      //this.store.push()
		      return this.toggleBG(id, value);
	    	});
	    	EventBus.$on("file-uploader", (format, uploadedFile) => {
		      console.log("newvalue", format, uploadedFile)
		      //return this.as.audio(id, value);
	    	});

	  	},

	  	mounted() {
	  		this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));
		    this.initialize();
		    console.log("this", this);
		},

	  	updated() {
		    //this.update();
		},

		methods: {
			initialize() {
				select(this.$el)
					.style("background-color", this.color("0.1"))
					.style("opacity", "0.4" )

				this.transitionBG();
				//console.log(this)
			},

			transitionBG() {
				var self = this;
				select(this.$el)
				.transition()
					.style("background-color", this.color("0.1"))       
					.duration(this.duration)
					.ease(easeLinear) 
					.style("background-color", this.color("0.3"))
					.transition()        
					.duration(this.duration)
					.ease(easeLinear)       
					.style("background-color", this.color("0.5"))
					.transition()       
					.duration(this.duration)
					.ease(easeLinear)  
					.style("background-color", this.color("0.7"))
					.transition()       
					.duration(this.duration)
					.ease(easeLinear)  
					.style("background-color", this.color("0.9"))
					.on("end", self.transitionBG);  
			},

			toggleBG(id, value) {
				//this.globalValues = globalValues+ ou - values;
				// attribuer une palette de couleurs par composants
				select(this.$el)
					.style("background-color", this.color(value))
			},


	    },
	}
	
</script>

<style scoped>

	#audio-slider-holder {
		font-size: 14px;
		padding: 5%;
		color: white;
	}

</style>