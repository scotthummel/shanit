webpackJsonp([8],{165:function(a,e,t){var s=t(47)(t(472),t(502),null,null);a.exports=s.exports},472:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=t(96),o=function(a){return a&&a.__esModule?a:{default:a}}(s);e.default={data:function(){return{article:{}}},computed:{frysHeader:function(){return"es"===this.$cookie.get("language")?"Recompensas comunitarias de Fry's":"Fry's Community Rewards"},amazonSmile:function(){return"es"===this.$cookie.get("language")?'\nComo parte de sus esfuerzos filantrópicos comunitarios, Amazon ha creado un programa para ayudar a las organizaciones sin fines de lucro a recaudar dinero a través de compras en su sitio web. El programa se llama Amazon Smile y se encuentra en <a href="https://smile.amazon.com/ch/86-0592079" target="_blank"> esta ubicación </a>. Primero, vincule su cuenta de Amazon al grupo de Phoenix Shanti en un proceso de instalación fácil. Entonces, cada vez que hagas compras en este acoplamiento, Amazon contribuirá el 0.5% del precio de compra a Shanti.':'As part of its community philanthropic efforts, Amazon has created a program to help non-profits raise money through purchases on its website. The program is called Amazon Smile and is located at <a href="https://smile.amazon.com/ch/86-0592079" target="_blank">this location</a>. First, link your Amazon account to the Phoenix Shanti Group in an easy setup process. Then, every time you shop at this link, Amazon will contribute 0.5% of the purchase price to Shanti.'},frys:function(){return"es"===this.$cookie.get("language")?'Tan fácil como es configurar su cuenta de Amazon para beneficiar a Shanti, la creación de su tarjeta de Fry para ayudar a Shanti es aún más fácil. Simplemente siga los tres pasos en el gráfico de la izquierda. Entonces, cada vez que hagas una compra en Fry\'s, una porción de ella ayudará a Shanti. Para obtener más información, vaya a <a href="http://www.fryscommunityrewards.com" target="_blank"> su sitio web </a>.':'As easy as it is to set up your Amazon account to benefit Shanti, setting up your Fry\'s card to help Shanti is even easier. Just follow the the three steps on the graphic at left. Then, every time you make a purchase at Fry\'s, a portion of it will help Shanti. For more information, go to <a href="http://www.fryscommunityrewards.com" target="_blank">their website</a>.'}},created:function(){var a=this;this.loading=!0,http.get("/articles/15").then(function(e){var t=e.body.article;a.article={headline:t.en_headline,subhead:t.en_subhead,callout:t.en_callout,body:t.en_body},"es"===a.$cookie.get("language")&&(a.article={headline:t.es_headline,subhead:t.es_subhead,callout:t.es_callout,body:t.es_body}),a.loading=!1}).catch(function(a){})},components:{"psg-speak":o.default}}},502:function(a,e){a.exports={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("psg-page",{attrs:{article:a.article,loading:a.loading}},[t("div",{attrs:{slot:"copy"},slot:"copy"},[t("div",{domProps:{innerHTML:a._s(a.article.body)}}),a._v(" "),t("div",{staticClass:"row"},[t("div",{staticClass:"col-sm-6"},[t("a",{attrs:{href:"https://smile.amazon.com/ch/86-0592079"}},[t("img",{staticClass:"img-responsive",attrs:{src:"/img/amazon.png",alt:"Amazon Smile"}})])]),a._v(" "),t("div",{staticClass:"col-sm-6"},[t("h1",[a._v("Amazon Smile")]),a._v(" "),t("p",{domProps:{innerHTML:a._s(a.amazonSmile)}})])]),a._v(" "),t("hr"),a._v(" "),t("div",{staticClass:"row"},[t("div",{staticClass:"col-sm-6"},[t("a",{attrs:{href:"http://www.fryscommunityrewards.com",target:"_blank"}},[t("img",{staticClass:"img-responsive",attrs:{src:"/img/frys.jpg",alt:"Fry's Community Rewards"}})])]),a._v(" "),t("div",{staticClass:"col-sm-6"},[t("h1",[a._v(a._s(a.frysHeader))]),a._v(" "),t("p",{domProps:{innerHTML:a._s(a.frys)}})])])])])},staticRenderFns:[]}}});