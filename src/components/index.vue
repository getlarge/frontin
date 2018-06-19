<template>
    <div class="hello">
      <b-jumbotron bg-variant="info" text-variant="white" >
        <h5>work by</h5>
        <h2>Edouard Maleix</h2>
        <hr class="my-4">
        <p >
          Retrospective of previous and present projects. For more information visit the website or contact me.
        </p>
        <b-btn variant="primary" href="#/portfolios">Enter</b-btn>
        <b-btn variant="success" href="#">Contact</b-btn>
      </b-jumbotron>
    </div>
</template>

<script>

  import { routes } from '@/router/menu'

  export default {
      data() {
        return {
          items: routes,
        }
    }
  }
  
</script>

<style scoped>

    h1, h2 {
      font-weight: normal;
    }

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
      text-decoration: underline;;
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
</style>
