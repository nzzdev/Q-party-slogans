'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var labelMap = {
  yes: 'Ja',
  no: 'Nein',
  undecided: 'Stimmfreigabe',
  'parties': 'Parteien',
  'organisations': 'Organisationen und Verbände'
};

var Opinion = (function () {
  function Opinion(el, item) {
    _classCallCheck(this, Opinion);

    el.innerHTML = this.render(item.data);
  }

  _createClass(Opinion, [{
    key: 'render',
    value: function render(data) {
      return ['yes', 'no', 'undecided'].reduce(function (prev, curr) {
        var label = labelMap[curr];
        var voters = data[curr];
        return prev + ('\n        <div class="q-opinion__position q-opinion__position--' + curr + '">\n          <div class="s-font-note-s s-font-note-s--strong q-opinion__label--level1">' + label.toUpperCase() + '</div>\n          <div class="q-opinion__parties s-font-text">\n            <div class="s-font-note-s q-opinion__label--level2">' + labelMap.parties + '</div>\n            ' + voters.parties.map(function (p) {
          return '<span class="q-opinion__party">' + p + '</span>';
        }).join('\n') + '\n          </div>\n          <div class="q-opinion__organisations s-font-text">\n            <div class="s-font-note-s q-opinion__label--level2">' + labelMap.organisations + '</div>\n            ' + voters.organisations.map(function (o) {
          return '<span class="q-opinion__org">' + o + '</span>';
        }).join('\n') + '\n          </div>\n        </div>\n      ');
      }, '');
    }
  }]);

  return Opinion;
})();

exports['default'] = Opinion;
module.exports = exports['default'];