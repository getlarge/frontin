<template>

  <div >  
    
    <mq-layout class="controls-mobile" mq="mobile">
      <vue-draggable-resizable   id="tooltipContainer" :x="settings.width/4" :y="settings.height/2.5"  :w="settings.width/2" :h="settings.height/1.5"  v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" >
        <div id="tooltip">
          <b-container  >
            <div class="title">{{title}}</div>
            <b-row >
              <b-col xs="6"  >
                <div class="description">{{description}}</div>
              </b-col>
              <b-col xs="6" >
                <b-img class="pics" :src="img" fluid/>
              </b-col>  
            </b-row>
            <div class="tags">{{tags}}</div>
          </b-container>
        </div>
      </vue-draggable-resizable>
    </mq-layout>

    <mq-layout class="controls-tablet" mq="tablet">
        <vue-draggable-resizable  id="tooltipContainer" :x="settings.width/4" :y="settings.height/4"  :w="settings.width/2" :h="settings.height/1.7"  v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" >
          <div id="tooltip">
            <b-container >
              <div class="title">{{title}}</div>
              <b-row >
                <b-col sm="5"  >
                  <div class="description">{{description}}</div>
                </b-col>
                <b-col sm="7"   >
                  <b-img class="pics" :src="img" fluid/>
                </b-col>  
              </b-row>
              <div class="tags">{{tags}}</div>
            </b-container>
          </div>
      </vue-draggable-resizable>
    </mq-layout>
    
    <mq-layout class="controls-laptop" mq="laptop">
      <vue-draggable-resizable  id="tooltipContainer"  :x="settings.width/4" :y="settings.height/6"  :w="settings.width/2" :h="settings.height/2"  v-on:dragging="onDrag" :resizable="false" v-on:resizing="onResize" >
        <div id="tooltip">
          <b-container fluid class="bv-example-row">
            <div class="title">{{title}}</div>
            <b-row >
              <b-col  md="5" lg="5" >
                <div class="description">{{description}}</div>
              </b-col>
              <b-col md="7" lg="7" >
                <b-img class="pics" :src="img" fluid/>
              </b-col>  
            </b-row>
            <div class="tags">{{tags}}</div>
          </b-container>
        </div>
      </vue-draggable-resizable>
    </mq-layout>

    <mq-layout class="controls-desktop" mq="desktop">
      <vue-draggable-resizable id="tooltipContainer" :x="settings.width/4" :y="settings.height/8"  :w="settings.width/2" :h="settings.height/2.3" :minw="500" :minh="settings.height/2.2" v-on:dragging="onDrag"  :resizable="false" v-on:resizing="onResize" :handles="['tr']">
        <div id="tooltip">
          <b-container  fluid >
            <div class="title">{{title}}</div>
            <b-row >
              <b-col lg="5" >
                <div class="description">{{description}}</div>
              </b-col>
              <b-col lg="7" >
                <b-img class="pics" :src="img" fluid/>
              </b-col>  
            </b-row>
            <div class="tags">{{tags}}</div>
          </b-container>
        </div>
      </vue-draggable-resizable>
    </mq-layout>

    <mq-layout class="controls-xxl" mq="xxl">
      <vue-draggable-resizable id="tooltipContainer" :x="settings.width/4" :y="settings.height/8"  :w="settings.width/2" :h="settings.height/2" :minw="500" :minh="settings.height/2.2" v-on:dragging="onDrag"  :resizable="false" v-on:resizing="onResize" :handles="['tr']">
        <div id="tooltip">
          <b-container  fluid >
            <div class="title">{{title}}</div>
            <b-row >
              <b-col lg="5" >
                <div class="description">{{description}}</div>
              </b-col>
              <b-col lg="7" >
                <b-img class="pics" :src="img" fluid/>
              </b-col>  
            </b-row>
            <div class="tags">{{tags}}</div>
          </b-container>
        </div>
      </vue-draggable-resizable>
    </mq-layout>
  </div>
</template>

<script>

  import VueDraggableResizable from 'vue-draggable-resizable'

  export default {
    name: 'tooltip',
    props: ['title', 'description', 'img', 'tags'],

    data: function () {
      return {
        settings: {
          width : Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
          height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        },
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }
    },

    components: {
      VueDraggableResizable
    },

    methods: {
      onResize: function (x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
      },
      onDrag: function (x, y) {
        this.x = x
        this.y = y
      }
    }

  }


</script>

<style lang="scss">

  .controls-mobile {

   #tooltipContainer {
      font-size: 8px;
      line-height: 8px;
      padding: 6px;
      border-radius: 3px;
      background: rgba(255,255,255,0.9);
      color: #000;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border:1px solid rgba(200,200,200,0.85);
      text-align: center;
    }

    img { height: 90px;  }

    #tooltip .description {
      font-size: 7px;
    }

    #tooltip .tags {
      font-size: 7px;
    } 
  }

  .controls-tablet {

   #tooltipContainer {
      font-size: 10px;
      line-height: 12px;
      padding: 10px;
      border-radius: 3px;
      background: rgba(255,255,255,0.9);
      color: #000;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border:1px solid rgba(200,200,200,0.85);
      text-align: center;
    }

    img { height: 110px;  }

    #tooltip .description {
      font-size: 10px;
    }

    #tooltip .tags {
      font-size: 10px;
    } 
  }

  .controls-laptop {

   #tooltipContainer {
      font-size: 14px;
      line-height: 16px;
      padding: 12px;
      border-radius: 3px;
      background: rgba(255,255,255,0.9);
      color: #000;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border:1px solid rgba(200,200,200,0.85);
      text-align: center;
    }
    img { height: 150px;  }
  }

  .controls-desktop {

    #tooltipContainer {
      font-size: 16px;
      line-height: 20px;
      padding: 13px;
      border-radius: 3px;
      background: rgba(255,255,255,0.9);
      color: #000;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border:1px solid rgba(200,200,200,0.85);
      text-align: center;
    }
    img { height: 250px;  }
  }

  .controls-xxl {

    #tooltipContainer {
      font-size: 16px;
      line-height: 20px;
      padding: 13px;
      border-radius: 3px;
      background: rgba(255,255,255,0.9);
      color: #000;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border:1px solid rgba(200,200,200,0.85);
      text-align: center;
    }
    img { height: 320px;  }
  }

  #tooltip {
    text-align:center;
    z-index: 1000;
    position: absolute;
    display: block;
    max-height: 70px;
  }

  #tooltip .title {
    color: #686868;
    font-family: 'Aloes-Bd';
    margin-bottom: 3%;
  }

  #tooltip .description {
    margin-top: 3%;
    color:#686868;
    text-align: justify;
  } 

  img[class] { width: 100% }

  #tooltip .pics {
    object-fit: cover
  }

  #tooltip .tags {
    margin-top: 3%;
    color:#33b277;
    font-style:italic;
  }

</style>
