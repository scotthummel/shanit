webpackJsonp([11],{162:function(e,t,n){var a=n(47)(n(470),n(522),null,null);e.exports=a.exports},470:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(97),s=function(e){return e&&e.__esModule?e:{"default":e}}(a);t["default"]={data:function(){return{article:{headline:"es"===this.$cookie.get("language")?"Eventos":"Events",subhead:"es"===this.$cookie.get("language")?"Shanti en la Comunidad":"Shanti in the Community",callout:"es"===this.$cookie.get("language")?"Shanti frecuentemente participa o participa en eventos en la comunidad local. Encontrará más información sobre ellos aquí.":"Shanti frequently puts on or participates in events in the local community. You will find more information about them here."},loading:!1,events:[]}},methods:{getEvents:function(){var e=this;this.loading=!0,http.get("/events").then(function(t){var n=t.body.events,a=[];"es"===e.$cookie.get("language")?n.forEach(function(e){a.push({event_name:e.es_event_name,event_callout:e.es_event_callout,slug:e.slug,image:e.image})}):n.forEach(function(e){a.push({event_name:e.en_event_name,event_callout:e.en_event_callout,slug:e.slug,image:e.image})}),e.events=a,e.loading=!1})["catch"](function(e){})},copy:function(e,t){return e+" "+t}},mounted:function(){this.getEvents()},components:{"psg-speak":s["default"]},computed:{readMore:function(){return"es"===this.$cookie.get("language")?"Lee más...":"Read more..."}}}},522:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("psg-page",{attrs:{article:e.article,loading:e.loading,events:e.events}},[n("div",{slot:"copy"},e._l(e.events,function(t,a){return n("div",{key:"index"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6"},[t.image?n("div",[n("img",{staticClass:"img-responsive",attrs:{src:"/uploads/events/"+t.image,alt:t.event_name}})]):e._e()]),e._v(" "),n("div",{staticClass:"col-md-6"},[n("h1",[e._v(e._s(t.event_name))]),e._v(" "),n("div",{domProps:{innerHTML:e._s(t.event_callout)}}),e._v(" "),n("router-link",{staticClass:"btn btn-color pull-right",attrs:{to:{name:"event/view",params:{slug:t.slug}}}},[e._v(e._s(e.readMore))]),e._v(" "),n("psg-speak",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],attrs:{text:e.copy(t.event_name,t.event_callout),primary:"true"}})],1)]),e._v(" "),n("hr")])}))])},staticRenderFns:[]}}});