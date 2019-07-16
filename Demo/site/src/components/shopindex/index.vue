<template>
  <div id="shop-index">
    <Top></Top>
    <Head></Head>
    <Banner></Banner>
    <Market></Market>
    <Home></Home>
    <Bottom></Bottom>
    <Footer></Footer>
    <Aside></Aside>
  </div>
</template>

<script>
  import Top from "./top"
  import Head from "./head"
  import Banner from "./banner"
  import Market from "./market"
  import Home from "./home"
  import Bottom from "./bottom"
  import Footer from "../common/footer"
  import Aside from "./aside"
    export default {
      name: "index",
      components:{
        Top,
        Head,
        Banner,
        Market,
        Home,
        Bottom,
        Footer,
        Aside
      }
    }
</script>

<style scoped>
#shop-index{
  position: relative;
}

</style>
