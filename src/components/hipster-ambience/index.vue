<template >
	
  	<b-container ref="slider-master" id="audio-slider-holder" fluid class="bv-example-row">
      	<b-row >
			<b-col class="colzy" sm="3" md="3" lg="3" >
				<button class="help-button" @click="help"><font-awesome-icon :icon="['fas', 'question-circle']" size=2x /></button>
				<div id="edit-container" v-for="item in format">
					<file-uploader :mimetype="item" > </file-uploader>
	          	</div>
	  	        <button class="create-button" @click="addItem"><font-awesome-icon :icon="['fas', 'plus-circle']" size="3x" /> Create</button>

	          	<!-- <div v-if="$refs.fileUploader.isSuccess">
				</div> -->
			</b-col>
			<b-col class="colzy" sm="3" md="3" lg="3" >
				 <draggable tag="div" :list="as1" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
					<audio-slider v-for="(element, index) in as1"  :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}"  :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :draggable="true" :loop="true" ></audio-slider>
	       		</draggable>
			</b-col>
			<b-col class="colzy" sm="3" md="3" lg="3" >
	            <draggable tag="div" :list="as2" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
					<audio-slider  v-for="(element, index) in as2" :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :loop="true" :draggable="true" ></audio-slider>
	           	</draggable>
			</b-col>
			<b-col class="colzy" sm="3" md="3" lg="3" >
				<button class="help-button" @click="getBuffer"><font-awesome-icon :icon="['fas', 'info-circle']" size="lg" /> Logger</button>
		        <div v-if="as3.length > 0" >
		            <draggable  :list="as3" tag="div" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
		                <audio-slider  v-for="(element, index) in as3" :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :loop="true" :draggable="true"  ></audio-slider>
		           	</draggable>
	           </div>
	           <div v-else>
	           	<p>Empty selection</p>
	           </div>
	           	<button class="del-button" @click="delBuffer">Delete <font-awesome-icon :icon="['fas', 'trash']" size="3x" /> </button>
			</b-col>
      	</b-row>
		<!-- <div class="status">
            <p v-if="canDrag!=null"  :class="canDrag? 'ok' : 'ko'">
                can Drag: {{canDrag}} future index {{futureIndex}}
            </p>
            <small v-else>
                No drag operation
            </small>
        </div> -->
    </b-container>

</template>

<script>

	import { rgb } from "d3-color"
	import { easeLinear } from "d3-ease"
	import { interpolateHcl, interpolateHclLong } from "d3-interpolate"
	import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
	import { append, attr, event, select, selectAll, style } from "d3-selection"
	import { active, transition } from "d3-transition"
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
	import draggable from "vuedraggable"
	import { mapState } from 'vuex'
	import { EventBus } from '@/main'
	import ToneSynth from '@/tone-components/synth'
	import audioSlider from './audio-slider'
	import fileUploader from '@/components/utils/file-upload'

	export default {
		data() {
		    return {
		    	as1: [{
		    			id: 1,
		    			name: "rain",
			    		audioSource:["static/sounds/rain.mp3"],
				        iconFile: 'static/icons/rain-white.png',
				    },{
		    			id: 2,
		    			name: "wind",
			    		audioSource:["static/sounds/wind.mp3"],
				        iconFile: 'static/icons/wind-white.png',
			    	},{
		    			id: 3,
		    			name: "forrest",
			    		audioSource:["static/sounds/forrest.mp3"],
				        iconFile: 'static/icons/forrest-white.png',
			    	},{
		    			id: 4,
		    			name: "fire",
			    		audioSource:["static/sounds/fire.mp3"],
				        iconFile: 'static/icons/fire-white.png',
				    }
		    	],
		    	as2: [{
		    			id: 5,
		    			name: "water",
			    		audioSource:["static/sounds/water-stream.mp3"],
				        iconFile: 'static/icons/water-white.png',
			    	},{
		    			id: 6,
		    			name: "storm",
			    		audioSource:["static/sounds/storm.mp3"],
				        iconFile: 'static/icons/storm-white.png',
			    	},{
		    			id: 7,
		    			name: "café",
			    		audioSource:["static/sounds/cafe.mp3"],
				        iconFile: 'static/icons/cafe-white.png',
				    },{
		    			id: 8,
		    			name: "la-win",
			    		audioSource:["static/sounds/la-win.mp3"],
				        iconFile: 'static/icons/la-win-white.png',
				    }
		    	],
		    	as3: [],
		        colorSet: [
			        {
			          color1: "#01c669",
			          color2: "#ff830f", //"#48725e"
		        	},
	        	],
	        	format: ["audio", "image"],
	        	duration : 7000,
	        	dragging: false,
				targetElement: null,
				canDrag: null,
				futureIndex: null,
				audioSource : [],
				iconFile : "",
				counter: 0,
				obj: {},
	        	model: {
	        		id: null,
	        		name: "null",
		        	audioSource: ["null"],
		        	iconFile: "null",
	        	},
	  		}
	  	},

		components: {
			draggable,
			audioSlider,
			fileUploader,
			FontAwesomeIcon
		},

		created() {
	  		EventBus.$on("audio-slider-value", (id, value) => {
		      //console.log("newvalue", id, value)
		      /// changer les couleurs de références, 
		      //this.store.push()
		      return this.toggleBG(id, value);
	    	});
	    	EventBus.$on("file-uploader", (format, uploadedFile) => {
	    		if ( format == "audio") {
	    			//this.$store.state
	    			this.audioSource.pop();
	    			var url = uploadedFile[0].url;
	    			this.audioSource.push(url);
					return console.log("newvalue",this.audioSource);
	    		}
	    		if (format == "image") {
					this.iconFile = uploadedFile[0].url;
					return console.log("newvalue1",this.iconFile);
	    		}
	    	});
	  	},

	  	mounted() {
	  		this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));
		    this.initialize();
		    //console.log("this", this);
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

			privateCheckMove: function(evt){
				this.targetElement = evt.relatedContext.element
				if ( evt.relatedContext.list.length == 5 ){
					return false
				}
				return true;
			},

			checkMove: function(evt){
				var res = this.privateCheckMove(evt)
				this.canDrag=res;
				this.futureIndex = evt.draggedContext.futureIndex;
				return res;
			},

			endDrag: function () {
				this.canDrag = null;
				this.targetElement = null;
				this.futureIndex = null;
			},

			startDrag: function (evt) {
				console.log(evt)
			},

			addItem(){
				var self = this;
				//this.$store.commit('as3', files)
				if ( this.as3.length == 0 && this.counter == 0 ) {
					self.obj = Object.create(self.model);
					self.obj.id = 1;
					self.obj.name = "customWidget";
					self.obj.audioSource = self.audioSource;
					self.obj.iconFile = self.iconFile;
					self.counter++;
					//self.as3.push(self.model);
					self.as3.push(obj);
					return console.log(self.counter);
				}
				
				if ( this.as3.length > 0 && this.counter > 0 ) {
					var obj = Object.create(self.model) ;
					obj.id = self.counter;
					obj.name = "customWidget"+self.counter;
					obj.audioSource = self.audioSource;
					obj.iconFile = self.iconFile;
					self.counter++;
					//self.as3.push(self.model);
					self.as3.push(obj);
					return console.log(self.counter);
				}	
			},

			getBuffer() {
				console.log("as3", this.as3);
				console.log("model", this.model);
			},

			delBuffer() {
				this.as3 = [];
			},

			help() {
				alert("here is the help, but you better ask the bot :)");
			}

	    },
	}
	
</script>

<style lang="scss">

	#audio-slider-holder {
		text-align: center;
		font-size: 16px;
		padding: 3%;
		color: white;
	}

	#edit-container {
		height: 50%;
		max-height: 180px;
		color: white;
		margin-top: 3%;
		margin-bottom: 3%;
	}

	.create-button {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		font-size: 16px;
		padding-top: 5%;
		padding-bottom: 10%;
		color: white;
		position: absolute;
		left: 10%;
		top : 70%;
	}

	.create-button :hover {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		cursor: pointer; 
	}

	.del-button {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		font-size: 16px;
		padding-left: 10%;
		padding-top: 5%;
		padding-bottom: 10%;
		color: white;
		position: absolute;
		top : 70%;
		right: 10%;
	}

	.help-button {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		padding-top: 5%;
		padding-bottom: 10%;
		color: white;
		cursor: pointer; 
	}

	.colzy {
		padding-bottom: 2%;
		padding-top: 5%;
	}


	h1 {
    	font-family: 'Aloes-Bd';
    	font-size: 28px; 
    	text-transform: uppercase;
    	text-align: center; 
		color: white;
	}
</style>