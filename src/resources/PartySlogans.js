
const POSITIONS = [
  {
    name: 'yes',
    label: 'Ja',
    labelColorClass: 's-viz-color-diverging-6-6',
    voiceColorClass: 's-viz-color-diverging-6-4'
  },
  {
    name: 'undecided',
    label: 'Stimmfreigabe',
    labelColorClass: 's-color-font-gray-10',
    voiceColorClass: 's-color-font-gray-4'
  },
  {
    name: 'no',
    label: 'Nein',
    labelColorClass: 's-viz-color-diverging-6-1',
    voiceColorClass: 's-viz-color-diverging-6-3'
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
      let partyLegend = parties.length > 0 ? `<div class="s-font-note-s q-party-slogan-label--level2">Parteien</div>` : '';
      let orgLegend = organisations.length > 0 ? `<div class="s-font-note-s q-party-slogan-label--level2">Organisationen</div>` : '';

      let voiceInnerSpanClass = drawSize === 'large' ? 's-font-text' : 's-font-text-s';
      
      return `
        <div class="q-party-slogan-position">
          <div class="s-font-note-s s-font-note-s--strong ${position.labelColorClass} q-party-slogan-label--level1">${position.label.toUpperCase()}</div>
          <div class="q-party-slogan-voices">
            ${partyLegend}
            ${parties.map((p) => `<span class="${position.voiceColorClass} q-party-slogan-voice"><span class="${voiceInnerSpanClass}">${p}</span></span>`).join('\n')}
          </div>
          <div class="q-party-slogan-voices">
            ${orgLegend}
            ${organisations.map((o) => `<span class="${position.voiceColorClass} q-party-slogan-voice"><span class="${voiceInnerSpanClass}">${o}</span></span>`).join('\n')}
          </div>
        </div>
      `;
    }).join('');
  }

}
