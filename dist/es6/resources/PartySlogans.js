
const POSITIONS = [
  {
    name: 'yes',
    label: 'Ja',
    labelColorClass: 's-viz-color-diverging-6-6',
    voiceColorClass: 's-viz-color-diverging-6-4'
  },
  {
    name: 'no',
    label: 'Nein',
    labelColorClass: 's-viz-color-diverging-6-1',
    voiceColorClass: 's-viz-color-diverging-6-3'
  },
  {
    name: 'undecided',
    label: 'Stimmfreigabe',
    labelColorClass: 's-color-gray-10',
    voiceColorClass: 's-color-gray-4'
  }
];

export default class PartySlogans {

  constructor(item) {
    this.item = item;
  }

  render(el, drawSize) {
    el.innerHTML = this.getHtml(drawSize);
  }

  getHtml(drawSize = 'large') {

    let voiceInnerSpanClass = drawSize === 'large' ? 's-font-text' : 's-font-text-s';

    return POSITIONS.map((position) => {

      // get parties and organisations
      let voters = this.item.data[position.name];
      let parties = voters.parties.filter(p => p !== '');
      let organisations = voters.organisations.filter(o => o !== '');

      // do not render undecided voters if there's nothing to show
      if (position.name === 'undecided' && parties.length === 0 && organisations.length === 0) {
        return '';
      }

      // get legends
      let partyLegend = parties.length > 0 ? `<div class="s-font-note-s q-party-slogans-label--level2">Parteien</div>` : '';
      let orgLegend = organisations.length > 0 ? `<div class="s-font-note-s q-party-slogans-label--level2">Organisationen und Verbände</div>` : '';

      return `
        <div class="q-party-slogans-position ${drawSize === 'large' ? '' : 'q-party-slogans-position--small'}">
          <div class="s-font-note-s s-font-note-s--strong ${position.labelColorClass} q-party-slogans-label--level1">${position.label.toUpperCase()}</div>
          <div class="q-party-slogans-voices">
            ${partyLegend}
            <div>
            ${parties.map((p) => `<span class="${position.voiceColorClass} q-party-slogans-voice"><span class="${voiceInnerSpanClass}">${p}</span></span>`).join('')}
            </div>
          </div>
          <div class="q-party-slogans-voices">
            ${orgLegend}
            <div>
            ${organisations.map((o) => `<span class="${position.voiceColorClass} q-party-slogans-voice"><span class="${voiceInnerSpanClass}">${o}</span></span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

}
