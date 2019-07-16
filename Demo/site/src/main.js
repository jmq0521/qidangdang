// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import $ from "jquery"
import ElementUI from 'element-ui'
import echarts from 'echarts'
//import BMap from 'BMap'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.prototype.$echarts = echarts
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vueaxios from 'vue-axios'
import filters from "./filters"
import "babel-polyfill"
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
Vue.use(ElementUI,MintUI,axios,Vueaxios,iView)
for(var key in filters){
  Vue.filter(key,filters[key]);
}

//请求拦截
axios.interceptors.request.use((config)=>{
  // console.log("-------"+config.url+"-------------");
  var configUrlArr = config.url.split("/");
  if(configUrlArr[0] == "v2") {
    config.url="http://api.7dangdang.cn/api/"+config.url;
  }else {
    config.url="http://api.7dangdang.cn/api/v1"+config.url;
  }
  // console.log("**************"+config.url+"**************");
  return config;
})



// axios.interceptors.request.use((config)=>{
//   // console.log("-------"+config.url+"-------------");
//   var configUrlArr = config.url.split("/");
//   if(configUrlArr[0] == "v2") {
//     config.url="http://ceshi.7dangdang.cn/api/"+config.url;
//   }else {
//     config.url="http://ceshi.7dangdang.cn/api/v1"+config.url;
//   }
//   // console.log("**************"+config.url+"**************");
//   return config;
// })


//响应拦截 data返回什么就是什么
axios.interceptors.response.use(({data})=>{
  return data;
})

//页面切换，滚动条距离顶端为0 title发生变化
router.afterEach((to,from,next) => {
  window.document.title = to.meta.title;
  // window.scrollTo(0,0);
})



//列表页实现缓存
router.afterEach((to, from) => {   
  console.log(from,123);    
  if(from.name==='pay' &&  to.name==='li'){        
    let isRefresh=sessionStorage.getItem('isRefresh');        
    console.log(isRefresh,789)        
    if(isRefresh==='0'){            
      sessionStorage.setItem('isRefresh',null);
      history.go(0)                
    }else{            
      sessionStorage.setItem('isRefresh',0);        
    }    
  }else if(to.name==='pay'&& from.name==='li'){        
    sessionStorage.setItem('isRefresh',0)    
  };
});

//销量页面实现缓存
router.afterEach((to, from) => {   
  if(from.name==='pay' &&  to.name==='sale'){        
    let isRefresh=sessionStorage.getItem('isRefresh');        
    console.log(isRefresh,789)        
    if(isRefresh==='0'){            
      sessionStorage.setItem('isRefresh',null);
      history.go(0)   
    }else{            
      sessionStorage.setItem('isRefresh',0);        
    }    
  }else if(to.name==='pay'&& from.name==='sale'){        
    sessionStorage.setItem('isRefresh',0)    
  }
});
router.afterEach((to, from) => {   
  if(from.name==='band' &&  to.name==='sale'){        
    let isRefresh=sessionStorage.getItem('isRefresh');        
    console.log(isRefresh,789)        
    if(isRefresh==='0'){            
      sessionStorage.setItem('isRefresh',null);
      history.go(0)     
    }else{            
      sessionStorage.setItem('isRefresh',0);        
    }    
  }else if(to.name==='band'&& from.name==='sale'){        
    sessionStorage.setItem('isRefresh',0)    
  }
});











//新品页面实现缓存
router.afterEach((to, from) => {   
  if(from.name==='pay' &&  to.name==='band'){        
    let isRefresh=sessionStorage.getItem('isRefresh');        
    console.log(isRefresh,789)        
    if(isRefresh==='0'){            
      sessionStorage.setItem('isRefresh',null);
      history.go(0)                
    }else{            
      sessionStorage.setItem('isRefresh',0);        
    }    
  }else if(to.name==='pay'&& from.name==='band'){        
    sessionStorage.setItem('isRefresh',0)    
  }
});
router.afterEach((to, from) => {   
  if(from.name==='sale' &&  to.name==='band'){        
    let isRefresh=sessionStorage.getItem('isRefresh');        
    console.log(isRefresh,789)        
    if(isRefresh==='0'){            
      sessionStorage.setItem('isRefresh',null);
      history.go(0)                
    }else{            
      sessionStorage.setItem('isRefresh',0);        
    }    
  }else if(to.name==='sale'&& from.name==='band'){        
    sessionStorage.setItem('isRefresh',0)    
  }
});














new Vue({
  el: '#app',
  router,
  components: { App }, 
  template: '<App/>'
})
