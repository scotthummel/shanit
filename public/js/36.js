webpackJsonp([36],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_misc_TextToSpeech__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_misc_TextToSpeech___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_misc_TextToSpeech__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            article: {}
        };
    },
    created: function created() {
        var _this = this;

        this.loading = true;

        http.get('/articles/13')
        //.use(saCache)
        .then(function (response) {
            var article = response.body.article;

            _this.article = {
                headline: article.en_headline,
                subhead: article.en_subhead,
                callout: article.en_callout,
                body: article.en_body
            };

            if (_this.$cookie.get('language') === 'es') {
                _this.article = {
                    headline: article.es_headline,
                    subhead: article.es_subhead,
                    callout: article.es_callout,
                    body: article.es_body
                };
            }

            _this.loading = false;
        }).catch(function (error) {
            console.error(error);
        });
    },

    components: {
        'psg-speak': __WEBPACK_IMPORTED_MODULE_0__components_misc_TextToSpeech___default.a
    }
});

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('psg-page', {
    attrs: {
      "article": _vm.article,
      "loading": _vm.loading
    }
  }, [_c('div', {
    slot: "copy"
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.article.body)
    }
  }), _vm._v(" "), _c('h3', [_vm._v("Chairman")]), _vm._v(" "), _c('p', [_vm._v("Rudy Navarro")]), _vm._v(" "), _c('p', [_vm._v("Affiliation: ASU, Phoenix College")]), _vm._v(" "), _c('h3', [_vm._v("Secretary")]), _vm._v(" "), _c('h3', [_vm._v("Trent Tripp")]), _vm._v(" "), _c('p', [_vm._v("Affiliation: Rehab Specialists")]), _vm._v(" "), _c('h3', [_vm._v("Treasurer")]), _vm._v(" "), _c('p', [_vm._v("Shirley McLauglin")]), _vm._v(" "), _c('h3', [_vm._v("Director")]), _vm._v(" "), _c('p', [_vm._v("Dr. Charles Boag")]), _vm._v(" "), _c('h3', [_vm._v("Member")]), _vm._v(" "), _c('p', [_vm._v("Sue Tormala")]), _vm._v(" "), _c('p', [_vm._v("Affiliation: Owner, Chiropractic Physicians Group, Inc.")]), _vm._v(" "), _c('psg-speak', {
    attrs: {
      "text": _vm.article.body,
      "loading": _vm.loading,
      "primary": "true"
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-51a29b48", module.exports)
  }
}

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(116),
  /* template */
  __webpack_require__(158),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/piscean/Sites/shanti/resources/assets/js/views/contact/Board.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Board.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51a29b48", Component.options)
  } else {
    hotAPI.reload("data-v-51a29b48", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});