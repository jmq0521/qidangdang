<template>
  <div id="lis">
    <Top></Top>
    <List></List>
    <Bottom></Bottom>
    <Footer></Footer>
    <Aside></Aside>
  </div>

</template>

<script>
  import Top from "./top"
  import List from "./list"
  import Aside from "../shopindex/aside"
  import Bottom from "../shopindex/bottom"
  import Footer from "../common/footer"
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
        Footer
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

