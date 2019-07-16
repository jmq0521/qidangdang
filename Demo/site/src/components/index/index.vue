<template>
  <div id="index">
    <Top></Top>
    <Head></Head>
    <Cent></Cent>
    <Footer></Footer>
  </div>
</template>

<script>
  import Top from "./top"
  import Head from "./head"
  import Cent from "./center"
  import Footer from "../common/footer"
  export default {
    name: "index",
    data(){
      return{
      
      }
    },
    components:{
        Top,
        Head,
        Cent,
        Footer
    },
    mounted(){

    }
  }
</script>

<style scoped>


</style>
