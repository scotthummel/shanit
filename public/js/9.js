webpackJsonp([9],{160:function(e,a,t){var i=t(47)(t(457),t(485),null,null);e.exports=i.exports},457:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=t(95),s=function(e){return e&&e.__esModule?e:{default:e}}(i);a.default={data:function(){return{article:{}}},created:function(){var e=this;this.loading=!0,http.get("/articles/7").then(function(a){var t=a.body.article;e.article={headline:t.en_headline,subhead:t.en_subhead,callout:t.en_callout,body:t.en_body},"es"===e.$cookie.get("language")&&(e.article={headline:t.es_headline,subhead:t.es_subhead,callout:t.es_callout,body:t.es_body}),e.loading=!1}).catch(function(e){})},components:{"psg-speak":s.default}}},485:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("psg-page",{attrs:{article:e.article,loading:e.loading}},[t("div",{slot:"copy"},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-4"},[t("div",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}]},[t("img",{staticClass:"img-responsive",attrs:{src:"/img/individual_counseling.jpg",alt:"Individual Counseling"}}),e._v(" "),t("hr"),e._v(" "),t("img",{staticClass:"img-responsive",attrs:{src:"/img/group_counseling.jpg",alt:"Group Counseling"}})])]),e._v(" "),t("div",{staticClass:"col-md-8"},[t("div",{domProps:{innerHTML:e._s(e.article.body)}}),e._v(" "),t("psg-speak",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}],attrs:{text:e.article.body,primary:"true"}})],1)])])])},staticRenderFns:[]}}});