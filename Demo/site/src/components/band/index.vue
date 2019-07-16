<template>
  <div id="li">
    <Top></Top>
    <Band></Band>
    <Bottom></Bottom>
    <Footer></Footer>
    <Aside></Aside>
    <Min></Min>
  </div>

</template>

<script>
  import Top from "../pay/top"
  import Band from "./band"
  import Aside from "../pay/aside"
  import Bottom from "../pay/bottom"
  import Footer from "../pay/foot"
  import Min from "../pay/min"
  export default {
    name: "vit",
    data() {
      return {
      }
    },
    components:{
        Top,
        Band,
        Aside,
        Bottom,
        Footer,
        Min
    },
    methods:{
      
    },
    mounted(){
     
    }
  }
</script>

<style scoped>
#lis{
  position: relative;
}
  
</style>

