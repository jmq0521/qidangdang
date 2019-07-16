<template>
  <div id="mesage">
    <Top></Top>
    <Head></Head>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Top from "../index/top" 
  import Head from "./head"
  import Bottom from "./bottom"
  export default {
    name: "index",
    components:{
      Top,
      Head,
      Bottom
    }
  }
</script>

<style scoped>

</style>
