import Tone, { PolySynth, Synth, MonoSynth } from "tone"
import * as context from "startaudiocontext"

export default class ToneSynth {
	constructor() {
		this.sound ;
		this.notes ;
		this._init();
		this.synthQuick();
		//this.synth;
	}

	_init() { 
		this.synth = new MonoSynth({
				"oscillator": {
					"type": "square8"
				},
				"envelope": {
					"attack": 0.05,
					"decay": 0.3,
					"sustain": 0.4,
					"release": 0.8
				},
				"filterEnvelope": {
					"attack": 0.001,
					"decay": 0.7,
					"sustain": 0.1,
					"release": 0.8,
					"baseFrequency": 300,
					"octaves": 4
				}
			}).toMaster()
		this.synth.volume.value = -20
	}

	synthAttack(notes) { //ex delay : '+0.05'
		Tone.context.resume().then(() => {
			//this.synth.triggerAttack(notes)
			this.synth.triggerAttack(notes, '+0.05')
		})
	}

	synthModulo(eventX, eventY) {
		//console.log(( eventX ) + ( eventY ))
		Tone.context.resume().then(() => {
		//this.synth.oscillator.frequency.value = ((eventX / 4) + (eventY / 4))
			this.synth.oscillator.frequency.value = ((eventX ) + (eventY))/10
		});
	}

	synthRelease() {
		this.synth.triggerRelease();
  	}

	synthQuick(notes) {
		Tone.context.resume().then(() => {
			this.synth.triggerAttackRelease(notes, "8n")
		})
	}

  
}