<template >
	
  	<b-container ref="slider-master" id="audio-slider-holder" fluid class="bv-example-row">
      	<b-row >
			<b-col class="colzy" sm="3" md="3" lg="3" >
				<button class="help-button" @click="help"><font-awesome-icon :icon="['fas', 'question-circle']" size=2x /></button>
				<div id="edit-container" v-for="item in format">
					<file-uploader :mimetype="item" > </file-uploader>
	          	</div>
	  	        <button class="create-button" @click="addItem"><font-awesome-icon :icon="['fas', 'plus-circle']" size="3x" /> Create a new widget</button>
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
		        <div v-if="as3.length > 0" >
		            <draggable  :list="as3" tag="div" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
		                <audio-slider  v-for="(element, index) in as3" :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :loop="true" :draggable="true"  ></audio-slider>
		           	</draggable>
	            </div>
	           	<div v-else>
	           		<p></p>
	            </div>
	           	<button class="del-button" @click="delBuffer">Drag here to delete <font-awesome-icon :icon="['fas', 'trash']" size="3x" /> </button>
	           	<button class="log-button" @click="getBuffer"><font-awesome-icon :icon="['fas', 'info-circle']" size="lg" /> Logger</button>
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
  	import config from '@/config.json'

    const serverURL = config.httpServerURL;

	export default {
		data() {
		    return {
		    	as1: [{
		    			id: 1,
		    			name: "rain",
			    		audioSource:[serverURL+"/static/sounds/rain.mp3"],
				        iconFile: serverURL+'static/icons/rain-white.png',
				    },{
		    			id: 2,
		    			name: "wind",
			    		audioSource:[serverURL+"static/sounds/wind.mp3"],
				        iconFile: serverURL+'static/icons/wind-white.png',
			    	},{
		    			id: 3,
		    			name: "forrest",
			    		audioSource:[serverURL+"static/sounds/forrest.mp3"],
				        iconFile: serverURL+'static/icons/forrest-white.png',
			    	},{
		    			id: 4,
		    			name: "fire",
			    		audioSource:[serverURL+"static/sounds/fire.mp3"],
				        iconFile: serverURL+'static/icons/fire-white.png',
				    }
		    	],
		    	as2: [{
		    			id: 5,
		    			name: "water",
			    		audioSource:[serverURL+"static/sounds/water-stream.mp3"],
				        iconFile: serverURL+'static/icons/water-white.png',
			    	},{
		    			id: 6,
		    			name: "storm",
			    		audioSource:[serverURL+"static/sounds/storm.mp3"],
				        iconFile: serverURL+'static/icons/storm-white.png',
			    	},{
		    			id: 7,
		    			name: "café",
			    		audioSource:[serverURL+"static/sounds/cafe.mp3"],
				        iconFile: serverURL+'static/icons/cafe-white.png',
				    },{
		    			id: 8,
		    			name: "la-win",
			    		audioSource:[serverURL+"static/sounds/la-win.mp3"],
				        iconFile: serverURL+'static/icons/la-win-white.png',
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
	    		if ( format === "audio") {
	    			//this.$store.state
	    			console.log("newvalue",this.audioSource);
	    			this.audioSource.pop();
	    			var url = uploadedFile[0].url;

	    			console.log("newvalue1",this.audioSource);
	    			console.log("newvalue2",url);
					return this.audioSource.push(url);
	    		}
	    		if (format === "image") {
	    			//console.log("newvalue1",this.iconFile);
					return this.iconFile = uploadedFile[0].url;
	    		}
	    	});
	  	},

	  	mounted() {
	  		this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));
		    this.initialize();
		},

	  	updated() {
		    //this.update();
		},

		beforeDestroy() {

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
				if ( evt.relatedContext.list.length === 5 ){
					return false
				}
				return true;
			},

			checkMove: function(evt){
				var res = this.privateCheckMove(evt)
				this.canDrag = res;
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
				if ( this.as3.length === 0 ) {
					self.counter++;
					//var obj = Object.create(self.model);
					var obj = Object.assign({}, self.model) ;
					obj.id = 8+self.counter;
					obj.name = "customWidget"+self.counter;
					obj.audioSource = self.audioSource;
					obj.iconFile = self.iconFile;
					return self.as3.push(obj);
				}
				
				if ( this.as3.length > 0 && this.counter > 0 ) {
					var obj = Object.create(self.model) ;
					//var obj = Object.assign({}, self.model) ;
					obj.id = 9+self.counter;
					obj.name = "customWidget" + self.counter;
					obj.audioSource = self.audioSource;
					obj.iconFile = self.iconFile;
					self.counter++;					
					return self.as3.push(obj);
				}	
			},

			getBuffer() {
				console.log("as1", this.as1);
				console.log("as2", this.as2);
				console.log("as3", this.as3);
				console.log("model", this.model);
			},

			delBuffer() {
				this.as3 = [];
			},

			help() {
				alert("here is the help, but you better ask the bot :)");
			},

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
		background-color: transparent;
		height: 50%;
		max-height: 180px;
		margin-top: 5%;
		margin-bottom: 3%;
	}

	.create-button {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		font-size: 16px;
		padding-top: 10%;
		padding-bottom: 10%;
		color: white;
		position: absolute;
		left: 10%;
		top : 80%;
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
		padding-top: 0%;
		padding-bottom: 10%;
		color: white;
		position: absolute;
		top : 2%;
		right: 10%;
	}

	.help-button {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		padding-top: 0%;
		padding-bottom: 10%;
		top : 1%;
		position: absolute;
		color: white;
		cursor: pointer; 
	}

	.log-button {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		padding-top: 5%;
		padding-bottom: 10%;
		position: absolute;
		top : 85%;
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