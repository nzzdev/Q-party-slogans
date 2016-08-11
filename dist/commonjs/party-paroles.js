'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LABEL_MAP = {
  yes: 'Ja',
  no: 'Nein',
  undecided: 'Stimmfreigabe',
  parties: 'Parteien',
  organisations: 'Organisationen und Verbände'
};

var PartyParoles = (function () {
  function PartyParoles(item) {
    _classCallCheck(this, PartyParoles);

    this.item = item;
  }

  _createClass(PartyParoles, [{
    key: 'render',
    value: function render(el) {
      el.innerHTML = this.getHtml();
    }
  }, {
    key: 'getHtml',
    value: function getHtml() {
      var _this = this;

      return ['yes', 'no', 'undecided'].reduce(function (prev, curr) {

        var voters = _this.item.data[curr];
        var parties = voters.parties.filter(function (p) {
          return p !== '';
        });
        var organisations = voters.organisations.filter(function (o) {
          return o !== '';
        });
        if (curr === 'undecided' && parties.length === 0 && organisations.length === 0) {
          return prev;
        }

        var partyLegend = '';
        if (parties.length > 0) {
          partyLegend = '<div class="s-font-note-s q-party-parole__label--level2">' + LABEL_MAP.parties + '</div>';
        }

        var orgLegend = '';
        if (organisations.length > 0) {
          orgLegend = '<div class="s-font-note-s q-party-parole__label--level2">' + LABEL_MAP.organisations + '</div>';
        }

        return prev + ('\n        <div class="q-party-parole-position q-party-parole-position--' + curr + '">\n          <div class="s-font-note-s s-font-note-s--strong q-party-parole-label--level1">' + LABEL_MAP[curr].toUpperCase() + '</div>\n          <div class="q-party-parole-parties s-font-text">\n            ' + partyLegend + '\n            ' + parties.map(function (p) {
          return '<span class="q-party-parole-party">' + p + '</span>';
        }).join('\n') + '\n          </div>\n          <div class="q-party-parole-organisations s-font-text">\n            ' + orgLegend + '\n            ' + organisations.map(function (o) {
          return '<span class="q-party-parole-org">' + o + '</span>';
        }).join('\n') + '\n          </div>\n        </div>\n      ');
      }, '');
    }
  }]);

  return PartyParoles;
})();

exports['default'] = PartyParoles;
module.exports = exports['default'];