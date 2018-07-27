<template >
  	<b-container ref="slider-master" id="audio-slider-holder" fluid class="bv-example-row">
      	<b-row >
			<b-col class="colzy" id="control-col" sm="3" md="3" lg="3" >
				<div id="edit-container" v-for="item in format">
					<file-uploader :mimetype="item" > </file-uploader>
	          	</div>
	  	        <button class="create-button" @click="addItem"><font-awesome-icon :icon="['fas', 'plus-circle']" size="3x" /> Create a new widget</button>
	          	<!-- <div v-if="$refs.fileUploader.isSuccess">
				</div> -->
				<div v-if="as0.length > 0" >
		            <draggable  :list="as0" tag="div" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
		                <audio-slider  v-for="(element, index) in as0" :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :loop="true" :draggable="true"  ></audio-slider>
		           	</draggable>
	            </div>
	           	<div v-else>
	           		<p></p>
	            </div>
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
		        <draggable  :list="as3" tag="div" class="dragArea" :options="{group:'sliders'}"  :move="checkMove" @end="endDrag" @start="startDrag">
		            <audio-slider  v-for="(element, index) in as3" :class="{'target': element===targetElement, 'ok':canDrag, 'ko':!canDrag}" :key="element.id" :icon="element.iconFile" :sources="element.audioSource" :loop="true" :draggable="true"  ></audio-slider>
		        </draggable>
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

  	import config from '@/config.json'
	import { rgb } from "d3-color"
	import { easeLinear } from "d3-ease"
	import { interpolateHcl, interpolateHclLong } from "d3-interpolate"
	import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale"
	import { event, select, selectAll } from "d3-selection"
	import { active, transition } from "d3-transition"
	import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
	import draggable from "vuedraggable"
	import { mapState } from 'vuex'
	import { EventBus } from '@/main'
	import audioSlider from './audio-slider'
	import fileUploader from '@/components/utils/file-upload'

    const serverURL = config.httpServerURL;

	export default {
		data() {
		    return {
		    	as0: [],
		    	as1: [{
		    			id: 1,
		    			name: "vent",
			    		audioSource:[serverURL+"static/sounds/wind.mp3"],
				        iconFile: serverURL+'static/icons/blaetter.png',
			    	},{
		    			id: 2,
		    			name: "feu",
			    		audioSource:[serverURL+"static/sounds/fire.mp3"],
				        iconFile: serverURL+'static/icons/feuer.png',
				    },{
		    			id: 3,
		    			name: "eau",
			    		audioSource:[serverURL+"static/sounds/water-stream.mp3"],
				        iconFile: serverURL+'static/icons/meer.png',
			    	}
		    	],
		    	as2: [{
		    			id: 4,
		    			name: "pluie",
			    		audioSource:[serverURL+"/static/sounds/rain.mp3"],
				        iconFile: serverURL+'static/icons/wolke.png',
				    },{
		    			id: 5,
		    			name: "foret",
			    		audioSource:[serverURL+"static/sounds/forrest.mp3"],
				        iconFile: serverURL+'static/icons/wald.png',
			    	},{
		    			id: 6,
		    			name: "tempete",
			    		audioSource:[serverURL+"static/sounds/storm.mp3"],
				        iconFile: serverURL+'static/icons/sturm.png',
			    	},
		    	],
		    	as3: [{
		    			id: 7,
		    			name: "café",
			    		audioSource:[serverURL+"static/sounds/cafe.mp3"],
				        iconFile: serverURL+'static/icons/koffee.png',
				    },{
		    			id: 8,
		    			name: "livre",
			    		audioSource:[serverURL+"static/sounds/book.mp3"],
				        iconFile: serverURL+'static/icons/buch.png',
				    },{
		    			id: 9,
		    			name: "trophée",
			    		audioSource:[serverURL+"static/sounds/champion.mp3"],
				        iconFile: serverURL+'static/icons/trophae.png',
				    }
				],
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
	        	sliderValue: 0,
	  		}
	  	},

		components: {
			draggable,
			audioSlider,
			fileUploader,
			FontAwesomeIcon
		},

		created() {
			
	  	},

	  	mounted() {
	  		EventBus.$on("start:tutorial", i => {
                var text = "Create your own sound ambiance with this small application.\nClick on each icons to play a sound and use the slider to update volume, you can create your own widget too, just add audio and image files.\nAll icons are hand drawn by Isabella Kohout";
                var tags = "";
                var img = "static/img/tuto-ambiance.gif";
                EventBus.$emit('update:tutorial', "Tutorial", text, tags, img );     
            });  
	  		EventBus.$on("start:audio-slider", (id, value) => {
		      //this.store.push()
		      	if ( value > this.sliderValue ) {
		      		this.sliderValue = this.sliderValue + 0.1;
		      	}
		      	if ( value < this.sliderValue ) {
		      		this.sliderValue = this.sliderValue -0.1;
		      	}		    
		       	EventBus.$emit("update:audio-slider", this.sliderValue);
		      	return this.toggleBG(id, this.sliderValue);
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
            this.color = interpolateHclLong(rgb(this.colorSet[0].color1),rgb(this.colorSet[0].color2));

		},

	  	updated() {
		    //this.update();
		},

		beforeDestroy() {
            EventBus.$off("start:tutorial");
            EventBus.$emit("stop:tutorial");     
		},

		methods: {
			initialize() {
				select("#control-col")
					.style("background-color", this.color("0.1"))
					.style("opacity", "0.3" )
				this.transitionBG();
			},

			transitionBG() {
				var self = this;
				//select(this.$el)
				select("#control-col")
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
				var self = this;
				//this.globalValues = globalValues+ ou - values;
				// attribuer une palette de couleurs par composants
				select("#control-col")
					.style("opacity", "0.4" )
					.style("background-color", self.color(value))
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
				if ( this.as0.length === 0 ) {
					self.counter++;
					var obj = Object.create(self.model);
					obj.id = 9+self.counter;
					obj.name = "customWidget"+self.counter;
					obj.audioSource = self.audioSource;
					obj.iconFile = self.iconFile;
					return self.as0.push(obj);
				}
				
				if ( this.as0.length > 0 && this.counter > 0 ) {
					self.counter++;					
					//var obj = Object.create(self.model);
					var obj = Object.assign({}, self.model);
					//var obj = Object.assign({}, self.model) ;
					obj.id = 9+self.counter;
					obj.name = "customWidget" + self.counter;
					obj.audioSource = self.audioSource;
					obj.iconFile = self.iconFile;
					return self.as0.push(obj);
				}	
			},

			getBuffer() {
				console.log("as0", this.as0);
				console.log("as1", this.as1);
				console.log("as2", this.as2);
				console.log("as3", this.as3);
				console.log("model", this.model);
			},

			delBuffer() {
				this.as0 = [];
			},

	    },
	}
	
</script>

<style lang="scss">

	#audio-slider-holder {
		text-align: center;
		font-size: 16px;
		padding: 3%;
		color: grey;
	}

	#audio-slider {
		max-width: 95%;
	}

	#edit-container {
		height: 30%;
		margin-top: 2%;
		margin-bottom: 2%;
	}

	.create-button {
		display: flex;
		align-items: center;
		background-color: transparent;
		border: none;
		font-size: 16px;
		padding-top: 1%;
		padding-bottom: 2%;
		color: white;
		position: relative;
	}

	.create-button :hover {
		display: flex;
		align-items: center;
		color: #e8e8e8;
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

	#control-col {
		background-color: #aaf7d3;
		color: white;
		opacity: 1;
		width: 100%;
		min-height: 500px;
		border-radius: 50px;
	}

	h1 {
    	font-family: 'Aloes-Bd';
    	font-size: 28px; 
    	text-transform: uppercase;
    	text-align: center; 
		color: white;
	}
</style>