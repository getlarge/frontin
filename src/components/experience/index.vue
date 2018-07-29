<template>
	<div id="project-timeline" >
        <mq-layout class="selector-mobile" mq="mobile">
            <v-touch class="selector" v-on:tap="changePage" >
				<font-awesome-icon v-if="interactive === true" :icon="['fas', 'toggle-on']" size="2x" />
				<font-awesome-icon v-else-if="interactive === false" :icon="['fas', 'toggle-off']" size="2x" /> 
            </v-touch>
        </mq-layout>
        <mq-layout class="selector-tablet" mq="tablet">
            <v-touch class="selector" v-on:tap="changePage" >
				<font-awesome-icon v-if="interactive === true" :icon="['fas', 'toggle-on']" size="2x" />
				<font-awesome-icon v-else-if="interactive === false" :icon="['fas', 'toggle-off']" size="2x" /> 
            </v-touch>
        </mq-layout>        
        <mq-layout class="selector-laptop" mq="laptop">
			<button class="selector" @click="changePage">
				<font-awesome-icon v-if="interactive === true" :icon="['fas', 'toggle-on']" size="2x" />
				<font-awesome-icon v-else-if="interactive === false" :icon="['fas', 'toggle-off']" size="2x" /> 
	      	</button>
        </mq-layout>
		<mq-layout class="selector-desktop" mq="desktop">
			<button class="selector" @click="changePage">
				<font-awesome-icon v-if="interactive === true" :icon="['fas', 'toggle-on']" size="2x" />
				<font-awesome-icon v-else-if="interactive === false" :icon="['fas', 'toggle-off']" size="2x" /> 
	      	</button>
        </mq-layout>
        <mq-layout class="selector-xxl" mq="xxl">
			<button class="selector" @click="changePage">
				<font-awesome-icon v-if="interactive === true" :icon="['fas', 'toggle-on']" size="3x" />
				<font-awesome-icon v-else-if="interactive === false" :icon="['fas', 'toggle-off']" size="3x" /> 

	      	</button>
        </mq-layout>


		<div v-if="interactive === true">
			<timeline>
			</timeline>
		</div>
		<div v-else-if="interactive === false ">
			<cv>
			</cv>
		</div>
  </div>

</template>

<script>

	import config from '@/config.json'
	import FontAwesomeIcon from "@fortawesome/vue-fontawesome"
	import cv from "./cv"
	import timeline from "./timeline"
	import { EventBus } from '@/main'

	export default {

		data() {
		    return {
		    	pageTopic: "getlarge" + this.$route.path,
        		serverURL: config.httpServerURL,
        		interactive: false,
			}
		},

		components: {
			FontAwesomeIcon,
			cv: cv,
			timeline: timeline,
		},

	  	created() {

	  	},

	  	mounted() {
	  		EventBus.$on("update:interactive", state => {
	  			if ( state === true || state === false ) {
	  				return this.interactive === state; 
	  			}
            });  
		
        },

		updated() {
			//console.log("this", this)
		},

		beforeUnmout() {

		},

		beforeDestroy() {
            EventBus.$off("stop:cards");
		},

		watch: { 
	      	
		},

		computed: {
		    btnStates () {
		      	return this.buttons.map(btn => btn.state)
		    },
		},

		methods: {
		 	changePage() {
		 		if (this.interactive === true ) {
		 			return this.interactive = false;
		 		}
		 		else if (this.interactive === false ) {
		 			return this.interactive = true;
		 		}
		 	},

	    },
	}
</script>


<style lang="scss">

	#project-timeline {
		color: #686868;
	    margin-top: 3%;
	    margin-bottom: 0% !important;


	    .selector {
	    	margin-left: 5%;		
	        background-color: transparent;
	        border: 1px;
	        border-color: #f9b23e;
	        color: #686868;
	    }

	    .selector:focus {
	        background-color: white;
	        border: 1px;
	        border-radius: 2px;
	        border-color: #f9b23e;
	        color: #686868;
	        box-shadow: 0 0 0 0.2rem  #f9b23e;
	    }

	    .selector:hover {
	        background-color: white;
	        border: 1px;
	        border-radius: 2px;
	        border-color: #f9b23e;
	        color: #33b277;
	    }

	}

	
</style>