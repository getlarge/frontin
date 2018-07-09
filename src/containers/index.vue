<template>
    <div class="hello">
      <b-jumbotron  text-variant="white" >
        <h5>work by</h5>
        <h2>Edouard Maleix</h2>
        <hr class="my-4">
        
        <b-container fluid class="bv-example-row">
          <p >
            Retrospective of previous and present projects. For more information visit the website or contact me.
          </p>
          <b-row align-h="center">
            <b-col sm="3" md="3" lg="3" >
              <b-btn class="player" href="#/portfolio"  >
                <b-img class="iconic" src="static/icons/enter-white.png" fluid />
              </b-btn>
            </b-col>
            <b-col sm="3" md="3" lg="3" >
              <b-btn class="player"  @click="chat._initClient()"  >
                <b-img class="iconic" src="static/icons/send-white.png" fluid />
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

  .iconic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    opacity: 1 !important;
  }

  .iconic:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
  }

  .player {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    opacity: 0.8;
    padding-top: 10%;
    padding-bottom: 10%;
  }

  .player:hover {
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
