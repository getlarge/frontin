
export default class utils {
  constructor() {
        //this.client;
    }

	// utils to delay promise
	wait(ms) {
		return x => {
			return new Promise(resolve => setTimeout(() => resolve(x), ms));
		};
	}

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

}

//export { wait, getRandomInt, initStorage, getStorage, setStorage, removeStorage };

