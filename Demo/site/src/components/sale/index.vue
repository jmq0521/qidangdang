<template>
  <div id="li">
    <Top></Top>
    <Sale></Sale>
    <Bottom></Bottom>
    <Footer></Footer>
    <Aside></Aside>
    <Min></Min>
  </div>

</template>

<script>
  import Top from "../pay/top"
  import Sale from "./sale"
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
        Sale,
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

