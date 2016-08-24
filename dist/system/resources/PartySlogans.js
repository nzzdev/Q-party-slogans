System.register([], function (_export) {
  'use strict';

  var POSITIONS, PartySlogans;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      POSITIONS = [{
        name: 'yes',
        label: 'Ja',
        labelColorClass: 's-viz-color-diverging-6-6',
        voiceColorClass: 's-viz-color-diverging-6-4'
      }, {
        name: 'no',
        label: 'Nein',
        labelColorClass: 's-viz-color-diverging-6-1',
        voiceColorClass: 's-viz-color-diverging-6-3'
      }, {
        name: 'undecided',
        label: 'Stimmfreigabe',
        labelColorClass: 's-color-gray-10',
        voiceColorClass: 's-color-gray-4'
      }];

      PartySlogans = (function () {
        function PartySlogans(item) {
          _classCallCheck(this, PartySlogans);

          this.item = item;
        }

        _createClass(PartySlogans, [{
          key: 'render',
          value: function render(el) {
            el.innerHTML = this.getHtml();
          }
        }, {
          key: 'getHtml',
          value: function getHtml() {
            var _this = this;

            return POSITIONS.map(function (position) {
              var voters = _this.item.data[position.name];
              var parties = voters.parties.filter(function (p) {
                return p !== '';
              });
              var organisations = voters.organisations.filter(function (o) {
                return o !== '';
              });

              if (position.name === 'undecided' && parties.length === 0 && organisations.length === 0) {
                return '';
              }

              var partyLegend = parties.length > 0 ? '<div class="s-font-note-s q-party-slogans-label--level2">Parteien</div>' : '';
              var orgLegend = organisations.length > 0 ? '<div class="s-font-note-s q-party-slogans-label--level2">Organisationen und Verbände</div>' : '';

              return '\n        <div class="q-party-slogans-position">\n          <div class="s-font-note-s s-font-note-s--strong ' + position.labelColorClass + ' q-party-slogans-label--level1">' + position.label.toUpperCase() + '</div>\n          <div class="q-party-slogans-voices">\n            ' + partyLegend + '\n            <div class="s-font-text">\n              ' + parties.map(function (p) {
                return '<span class="' + position.voiceColorClass + ' q-party-slogans-voice"><span class="s-color-gray-9">' + p + '</span></span>';
              }).join('') + '\n            </div>\n          </div>\n          <div class="q-party-slogans-voices">\n            ' + orgLegend + '\n            <div class="s-font-text">\n              ' + organisations.map(function (o) {
                return '<span class="' + position.voiceColorClass + ' q-party-slogans-voice"><span class="s-color-gray-9">' + o + '</span></span>';
              }).join('') + '\n            </div>\n          </div>\n        </div>\n      ';
            }).join('');
          }
        }]);

        return PartySlogans;
      })();

      _export('default', PartySlogans);
    }
  };
});