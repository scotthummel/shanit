webpackJsonp([12],{124:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(4),i=a.n(n);t.default={data:function(){return{article:{},loading:!1}},methods:{copy:function(e,t){return e+" "+t}},mounted:function(){var e=this;this.loading=!0,http.get("/events/"+this.$route.params.slug).then(function(t){var a=t.body.event;"es"===e.$cookie.get("language")?e.article=null!==a?{headline:a.es_event_name,subhead:new Date(a.event_start).toLocaleDateString(),callout:a.es_event_callout,body:a.es_event_description,map_link:a.map_link,image:a.image,event_url:a.event_url}:{headline:"Event Not Found",subhead:"404 Error",callout:"We're sorry, but we could not locate this event. Perhaps it has already passed or you are following a mistyped link.",not_found:!0}:e.article=null!==a?{headline:a.en_event_name,subhead:new Date(a.event_start).toLocaleDateString(),callout:a.en_event_callout,body:a.en_event_description,map_link:a.map_link,image:a.image,event_url:a.event_url}:{headline:"Event Not Found",subhead:"404 Error",callout:"We're sorry, but we could not locate this event. Perhaps it has already passed or you are following a mistyped link.",not_found:!0},e.loading=!1}).catch(function(e){})},components:{"psg-speak":i.a}}},150:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("psg-page",{attrs:{article:e.article,loading:e.loading}},[a("div",{attrs:{slot:"copy"},slot:"copy"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[e.article.image&&!e.article.map_link?a("div",[a("img",{staticClass:"img-responsive",attrs:{src:"/uploads/events/"+e.article.image,alt:"article.headline"}})]):e._e(),e._v(" "),e.article.map_link?a("div",[a("div",{domProps:{innerHTML:e._s(e.article.map_link)}})]):e._e()]),e._v(" "),a("div",{staticClass:"col-md-6"},[e.article.not_found?e._e():a("div",[a("h1",[e._v(e._s(e.article.headline))]),e._v(" "),a("div",{domProps:{innerHTML:e._s(e.article.body)}}),e._v(" "),e.article.event_url?a("div",[a("a",{staticClass:"btn btn-color pull-right",attrs:{href:e.article.event_url,target:"_blank"}},[e._v("Read More...")])]):e._e(),e._v(" "),a("psg-speak",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],attrs:{text:e.copy(e.article.headline,e.article.body),primary:"true"}})],1)])])])])},staticRenderFns:[]}},32:function(e,t,a){var n=a(1)(a(124),a(150),null,null);e.exports=n.exports}});