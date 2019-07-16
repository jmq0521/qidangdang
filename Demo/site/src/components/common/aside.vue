<template>
  <div id="asde">
    <img src='../../image/hj.png'/>
  </div>
</template>

<script>
    export default {
      name: "asde",
      mounted(){
        $("#asde").click(function() {
          $("body,html").animate({
            scrollTop: 0
          }, "fast");
        })

        $(document).scroll(function(){
          var scrTop = $(window).scrollTop();
          if(scrTop>800){
            $("#asde").slideDown(150);
          }else{
            $("#asde").slideUp(150);
          }
        })
      }
    }
</script>

<style scoped>
 #asde{
   width: 60px;
   height: 60px;
   position: fixed;
   top: 700px;
   right: 100px;
   display: none;
 }
  #asde img{
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
</style>
