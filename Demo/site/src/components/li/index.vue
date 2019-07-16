<template>
  <div id="li">
    <Top></Top>
    <List></List>
    <Bottom></Bottom>
    <Footer></Footer>
    <Aside></Aside>
    <Min></Min>
  </div>

</template>

<script>
  import Top from "../pay/top"
  import List from "./list"
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
        List,
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

