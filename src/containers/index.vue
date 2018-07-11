<template>
    <div class="hello">
      <b-jumbotron  text-variant="white" >
        <h5>work by</h5>
        <h2>Edouard Maleix</h2>
        <hr class="my-4">
        
        <b-container fluid class="bv-example-row">
          
          <b-row align-h="center">
            <b-col xs="12" sm="12" md="12" lg="12" >
              <p >
                Retrospective of previous and present projects. For more information visit the website or contact me.
              </p>
            </b-col>
            <b-col xs="3" sm="3" md="3" lg="3" >
              <b-btn class="doors" href="#/portfolio"  >
                <b-img class="signs" :src="icon1" fluid />
              </b-btn>
            </b-col>
            <b-col xs="3" sm="3" md="3" lg="3" >
              <b-btn class="doors"  @click="chat._initClient()"  >
                <b-img class="signs" :src="icon2" fluid />
              </b-btn>
            </b-col>

          </b-row>
        </b-container>
      </b-jumbotron>
    </div>
</template>

<script>

  import { routes } from '@/router/menu'
  import liveRocketChat  from '@/services/live-rocketchat'

  export default {
      data() {
        return {
          items: routes,
          icon1: "static/icons/enter-white.png",
          icon2: "static/icons/send-white.png",
          chat: new(liveRocketChat),
        }
    }
  }
  
</script>

<style scoped>

  h1, h2 {
    font-family: Aloes-Bd;
    font-size: 20px;
  }

  h5 {
    font-size: 18px;
/*      color: #dbdbdb;
*/    }

  ul {
    /*list-style-type: none;*/
    padding: 0;
    margin: auto;
    width: 300px;
  }

  li {
    /*display: inline-block;*/
    margin: 0 0px;
    list-style: decimal
  }

/*    a {
    color: blue;
    display: block;
    text-decoration: none;
    text-align: left;
  }*/

  a:hover {
    text-decoration: underline;
    background-color: #33b277;
  }

  .jumbotron {
    background-color: #33b277;
    opacity: 0.7;
  }

  .hello {
    position: relative;
    width: 80%;
    height: 60%;
    text-align: center;
    overflow: hidden;
    margin-top: 10%;
    margin-left: 10%;
  }

  .signs {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    opacity: 1 !important;
  }

  .signs:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
  }

  .doors {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    opacity: 0.8;
    padding-top: 10%;
    padding-bottom: 10%;
  }

  .doors:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #686868;
    opacity: 1;
    background-color: transparent;
    border: 5px;
    border-radius: 1px;
    cursor: pointer; 
  }

  /*img:hover {
    content:url(@/../static/icons/send.png); 
  }*/

</style>
