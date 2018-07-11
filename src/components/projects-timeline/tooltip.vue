<template>

  <div >

    <mq-layout class="controls-desktop" mq="desktop">

      <div id="tooltipPositioner">
        <div id="tooltip">
          <b-container id="tooltipContainer" fluid >
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
      </div>
    </mq-layout>

    <mq-layout class="controls-laptop" mq="laptop">
      <div id="tooltipPositioner">
        <div id="tooltip">
          <b-container id="tooltipContainer" fluid class="bv-example-row">
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
      </div>
    </mq-layout>

    <mq-layout class="controls-tablet" mq="tablet">
      <div id="tooltipPositioner">
        <div id="tooltip">
          <b-container id="tooltipContainer" >
            <div class="title">{{title}}</div>
            <b-row >
              <b-col sm="6"  >
                <div class="description">{{description}}</div>
              </b-col>
              <b-col sm="6"   >
                <b-img class="pics" :src="img" fluid/>
              </b-col>  
            </b-row>
            <div class="tags">{{tags}}</div>
          </b-container>
        </div>
      </div>
    </mq-layout>
    
    <mq-layout class="controls-mobile" mq="mobile">
      <div id="tooltipPositioner">
        <div id="tooltip">
          <b-container id="tooltipContainer"  >
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
      </div>
    </mq-layout>

  </div>
</template>

<script>

  module.exports = {
    name: 'tooltip',
    props: ['title', 'description', 'img', 'tags']
  }

</script>

<style lang="scss">

  .controls-mobile {

    #tooltipPositioner {
      position: relative;
      left: 50%;
      top: 25px;
    }

    #tooltipContainer {
      position: absolute;
      top: -30px;
      width: 200px;
      left: -100px;
      font-size: 8px;
      line-height: 8px;
      padding: 6px;
      border-radius: 3px;
      background: rgba(255,255,255,0.9);
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border:1px solid rgba(200,200,200,0.85);
    }

    #tooltip .pics {
      max-width: 100%;
      max-height: 60px;    
    }

    #tooltip .description {
      font-size: 7px;
    }

    #tooltip .tags {
      font-size: 7px;
    } 
  }

  .controls-tablet {

    #tooltipPositioner {
      position: relative;
      left: 50%;
      top: 45px;
    }

    #tooltipContainer {
      position: absolute;
      top: -40px;
      width: 300px;
      left: -150px;
      font-size: 10px;
      line-height: 12px;
      padding: 10px;
      border-radius: 3px;
      background: rgba(255,255,255,0.9);
      color: #000;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border:1px solid rgba(200,200,200,0.85);
      text-align:center;
    }

    #tooltip .pics {
      width: 80%;
      max-height: 130px;    
    }

    #tooltip .description {
      font-size: 10px;
    }

    #tooltip .tags {
      font-size: 10px;
    } 
  }

  .controls-laptop {

    #tooltipPositioner {
      position: relative;
      left: 50%;
      top: 75px;
    }

    #tooltipContainer {
      position: absolute;
      top: -90px;
      width: 400px;
      left: -200px;
      font-size: 14px;
      line-height: 16px;
      padding: 12px;
      border-radius: 3px;
      background: rgba(255,255,255,0.9);
      color: #000;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      -moz-box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      border:1px solid rgba(200,200,200,0.85);
      text-align:center;
    }

    #tooltip .pics {
      max-width: 100%;
      max-height: 150px;
    }

  }

  .controls-desktop {

    #tooltipPositioner {
      position: relative;
      left: 50%;
      top: 100px;
    }

    #tooltipContainer {
      position: absolute;
      top: -130px;
      width: 500px;
      left: -250px;
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

    #tooltip .pics {
      max-width: 100%;
      max-height: 220px;
    }

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

  #tooltip .tags {
    margin-top: 3%;
    color:#33b277;
    font-style:italic;
  }

</style>
