export default{ //对象的属性名称就是过滤器名字
  currency(v,obj){
    obj=obj || {}; //obj是默认值
    obj.num=obj.num || 2;//2是默认值
    obj.type=obj.type||"￥";//$是默认值
    return obj.type+v.toFixed(obj.num);
  },
  date(v){
    var date=new Date(v);//当前时间
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"
      +date.getDate().toString().padStart(2,"0")
      +":"+date.getHours().toString().padStart(2,"0")
      +":"+date.getMinutes().toString().padStart(2,"0")
      +":"+date.getSeconds().toString().padStart(2,"0");
  },
  data(v){
    var date=new Date(v);//当前时间
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"
      +date.getDate().toString().padStart(2,"0");
  },
  imgUrl(v){
    return v
  }
}

