<template>
  <div id="pay">
    <Top></Top>
    <Head></Head>
    <Banner></Banner>
    <Band></Band>
    <Sale></Sale>
    <Sta></Sta>
    <Bottom></Bottom>
    <Foot></Foot>
    <Min></Min>
    <Aside></Aside>
  </div>
</template>

<script>
  import Top from "./top"
  import Head from "./head"
  import Banner from "./banner"
  import Band from "./band"
  import Sale from "./sale"
  import Sta from "./sta"
  import Bottom from "./bottom"
  import Foot from "./foot"
  import Min from "./min"
  import Aside from "./aside"
    export default {
      name: "det",
      data(){
        return{
          
        }
      },
      components:{
        Top,
        Head,
        Banner,
        Band,
        Sale,
        Sta,
        Bottom,
        Foot,
        Min,
        Aside
      },
      beforeRouteLeave (to, from, next) {    
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop    
        next()  
      },

      beforeRouteEnter (to, from, next) {    
        next(vm => {     
          document.body.scrollTop = vm.scrollTop    
        })  
      },
      methods:{
      
      },
    
      mounted(){
        
      },
      
     
    }
</script>

<style scoped>
</style>
