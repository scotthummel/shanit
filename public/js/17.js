webpackJsonp([17],{117:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(4),o=a.n(n);t.default={data:function(){return{article:{}}},created:function(){var e=this;this.loading=!0,http.get("/articles/5").then(function(t){var a=t.body.article;e.article={headline:a.en_headline,subhead:a.en_subhead,callout:a.en_callout,body:a.en_body},"es"===e.$cookie.get("language")&&(e.article={headline:a.es_headline,subhead:a.es_subhead,callout:a.es_callout,body:a.es_body}),e.loading=!1}).catch(function(e){})},components:{"psg-speak":o.a}}},172:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("psg-page",{attrs:{article:e.article,loading:e.loading}},[a("div",{attrs:{slot:"copy"},slot:"copy"},[a("div",{domProps:{innerHTML:e._s(e.article.body)}}),e._v(" "),a("psg-speak",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],attrs:{text:e.article.body,primary:"true"}})],1)])},staticRenderFns:[]}},25:function(e,t,a){var n=a(1)(a(117),a(172),null,null);e.exports=n.exports}});