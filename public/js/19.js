webpackJsonp([19],{

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TextToSpeech = __webpack_require__(6);

var _TextToSpeech2 = _interopRequireDefault(_TextToSpeech);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
    data: function data() {
        return {
            article: {}
        };
    },
    created: function created() {
        var _this = this;

        this.loading = true;

        http.get('/articles/1')
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
        })['catch'](function (error) {
            console.error(error);
        });
    },

    components: {
        'psg-speak': _TextToSpeech2['default']
    }
}; //
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

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('psg-page', {
    attrs: {
      "article": _vm.article,
      "loading": _vm.loading
    }
  }, [_c('div', {
    attrs: {
      "slot": "copy"
    },
    slot: "copy"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.loading),
      expression: "!loading"
    }]
  }, [_c('img', {
    staticClass: "img-responsive",
    attrs: {
      "src": "/img/first_step.jpg",
      "alt": "First Step"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-8"
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.article.body)
    }
  }), _vm._v(" "), _c('psg-speak', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.loading),
      expression: "!loading"
    }],
    attrs: {
      "text": _vm.article.body,
      "primary": "true"
    }
  })], 1)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c5edc5e", module.exports)
  }
}

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(134),
  /* template */
  __webpack_require__(193),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/brianwebb/Development/exponential/clients/shanti/resources/assets/js/views/about/GettingStarted.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] GettingStarted.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c5edc5e", Component.options)
  } else {
    hotAPI.reload("data-v-6c5edc5e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});