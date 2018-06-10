<template>

    <div class="hello">
      <ul>
        <li v-for="item in items">
          <router-link :to="item.path">{{ item.name }}</router-link>
        </li>
      </ul>

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

    #logo {
      height:50px;
      width: 50px;
    }
</style>
