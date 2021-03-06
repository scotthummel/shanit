webpackJsonp([14],{

/***/ 141:
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
        })['catch'](function (error) {
            console.error(error);
        });
    },

    components: {
        'psg-speak': _TextToSpeech2['default']
    },
    computed: {
        chairman: function chairman() {
            if (this.$cookie.get('language') === 'es') {
                return 'Presidente';
            } else {
                return 'Chairman';
            }
        },
        secretary: function secretary() {
            if (this.$cookie.get('language') === 'es') {
                return 'Secretario';
            } else {
                return 'Secretary';
            }
        },
        treasurer: function treasurer() {
            if (this.$cookie.get('language') === 'es') {
                return 'Tesorero';
            } else {
                return 'Treasurer';
            }
        },
        member: function member() {
            if (this.$cookie.get('language') === 'es') {
                return 'Miembro';
            } else {
                return 'Member';
            }
        },
        affiliation: function affiliation() {
            if (this.$cookie.get('language') === 'es') {
                return 'Afiliación';
            } else {
                return 'Affiliation';
            }
        }
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

/***/ }),

/***/ 187:
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
    domProps: {
      "innerHTML": _vm._s(_vm.article.body)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-4 col-sm-offset-2"
  }, [_c('h3', [_vm._v(_vm._s(_vm.chairman))]), _vm._v(" "), _c('h5', [_vm._v("Rudy Navarro")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.affiliation) + ": Arizona State University, Phoenix College")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h3', [_vm._v(_vm._s(_vm.secretary))]), _vm._v(" "), _c('h5', [_vm._v("Trent Tripp")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.affiliation) + ": Rehab Specialists")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h3', [_vm._v(_vm._s(_vm.treasurer))]), _vm._v(" "), _c('h5', [_vm._v("Open")]), _vm._v(" "), _c('hr', {
    staticClass: "visible-xs"
  })]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-4"
  }, [_c('h3', [_vm._v("Director")]), _vm._v(" "), _c('h5', [_vm._v("Dr. Charles Boag")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h3', [_vm._v(_vm._s(_vm.member))]), _vm._v(" "), _c('h5', [_vm._v("Wayne Tormala")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.affiliation) + ": Chief of the Tobacco and Chronic Disease Division of AZ Department of Health Services (ADHS)")])])]), _vm._v(" "), _c('psg-speak', {
    attrs: {
      "text": "Rudy Navarro is the chairman. Trent Tripp is the secretary. The treasurer position is open. Dr. Charles Boag is the director. Wayne Tormala is a member.",
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

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(141),
  /* template */
  __webpack_require__(187),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/brianwebb/Development/exponential/clients/shanti/resources/assets/js/views/contact/Board.vue"
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