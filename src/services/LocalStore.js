import Vue from "vue";
import VueLocalStorage from "vue-localstorage";
import logger from "@/services/logger";

Vue.use(VueLocalStorage);

export const localStore = new Vue({
  localStorage: {
    session: {
      type: Object,
      id: {
        type: Number
      },
      timestamp: {
        type: Number
      },
      user: {
        firstName: "world"
      }
    },
    connected: {
      type: Boolean
    },
    userAgent: {
      type: String,
      default: "helloworld!"
    }
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    // initStorage:
    //   params:
    //       key <string>     : localStorage key to remove
    //   returns:
    //       <boolean> : telling if operation succeeded
    initStorage(agent, id) {
      try {
        if (
          this.getStorage("sessionId") !== null &&
          this.getStorage("userAgent") !== null
        ) {
          return;
        }
        this.setStorage("sessionId", id);
        return this.setStorage("userAgent", agent);
      } catch (e) {
        logger.publish(
          4,
          "store",
          "initStorage: Error creating keys to localStorage:",
          e
        );
        return false;
      }
    },
    // removeStorage: removes a key from localStorage and its sibling expiracy key
    //   params:
    //       key <string>     : localStorage key to remove
    //   returns:
    //       <boolean> : telling if operation succeeded
    removeStorage(key) {
      try {
        this.$localStorage.remove(key);
        this.$localStorage.remove(key + "_expiresIn");
        return true;
      } catch (e) {
        logger.publish(
          4,
          "store",
          `removeStorage: Error removing key [
            ${key}
            ] from localStorage: `,
          e
        );
        return false;
      }
    },
    // getStorage: retrieves a key from localStorage previously set with setStorage().
    //   params:
    //       key <string> : localStorage key
    //   returns:
    //       <string> : value of localStorage key
    //       null : in case of expired key or failure
    getStorage(key) {
      const now = Date.now(); //epoch time, lets deal only with integer
      // set expiration for storage
      let expiresIn = this.$localStorage.get(key + "_expiresIn");
      if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
      }
      if (expiresIn < now) {
        // Expired
        this.removeStorage(key);
        return null;
      } else {
        try {
          const value = this.$localStorage.get(key);
          return value;
        } catch (e) {
          logger.publish(
            4,
            "store",
            `getStorage: Error reading key [
            ${key}
            ] from localStorage: `,
            e
          );
          return null;
        }
      }
    },
    // setStorage: writes a key into localStorage setting a expire time
    //   params:
    //       key <string>     : localStorage key
    //       value <string>   : localStorage value
    //       expires <number> : number of seconds from now to expire the key
    //   returns:
    //       <boolean> : telling if operation succeeded
    setStorage(key, value, expires) {
      if (expires === undefined || expires === null) {
        expires = 24 * 60 * 60; // default: seconds for 1 day
      } else {
        expires = Math.abs(expires); //make sure it's positive
      }
      const now = Date.now(); //millisecs since epoch time, lets deal only with integer
      const schedule = now + expires * 1000;
      try {
        this.$localStorage.set(key, value);
        this.$localStorage.set(key + "_expiresIn", schedule);
      } catch (e) {
        logger.publish(
          4,
          "store",
          `setStorage: Error setting key [
            ${key}
            ] in localStorage: `,
          e
        );
        return false;
      }
      return true;
    }

    // clearStorage() {
    //  try {
    //    this.$localStorage.set(key, value);
    //    this.$localStorage.set(key + "_expiresIn", schedule);
    //  } catch (e) {
    //    logger.publish(4, "store", "initStorage: Error removing keys from localStorage:", e);
    //    return false;
    //  }
    //  return true;
    // },
  }
});
