<template>
  <div id="mesage">
    <Top></Top>
    <Head></Head>
    <Chat></Chat>
  </div>
</template>

<script>
   import Top from "../index/top" 
  import Head from "./head"
  import Chat from "./chat"

  export default {
    name: "index",
    components:{
      Top,
      Head,
      Chat
    }
  }
</script>

<style scoped>

</style>
