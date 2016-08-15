
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

export default class PartyParoles {

  constructor(item) {
    this.item = item;
  }

  render(el) {
    el.innerHTML = this.getHtml();
  }

  getHtml() {
    return POSITIONS.reduce((prev, curr) => {

      // get parties and organisations
      let voters = this.item.data[curr.name];
      let parties = voters.parties.filter(p => p !== '');
      let organisations = voters.organisations.filter(o => o !== '');

      // do not render undecided voters if there's nothing to show
      if (curr.name === 'undecided' && parties.length === 0 && organisations.length === 0) {
        return prev;
      }

      // get legends
      let partyLegend = parties.length > 0 ? `<div class="s-font-note-s q-party-parole-label--level2">Parteien</div>` : '';
      let orgLegend = organisations.length > 0 ? `<div class="s-font-note-s q-party-parole-label--level2">Organisationen</div>` : '';

      return prev + `
        <div class="q-party-parole-position">
          <div class="s-font-note-s s-font-note-s--strong ${curr.labelColorClass} q-party-parole-label--level1">${curr.label.toUpperCase()}</div>
          <div class="q-party-parole-voices">
            ${partyLegend}
            ${parties.map((p) => `<span class="${curr.voiceColorClass} q-party-parole-voice"><span class="s-font-text">${p}</span></span>`).join('\n')}
          </div>
          <div class="q-party-parole-voices">
            ${orgLegend}
            ${organisations.map((o) => `<span class="${curr.voiceColorClass} q-party-parole-voice"><span class="s-font-text">${o}</span></span>`).join('\n')}
          </div>
        </div>
      `;}
    ,'');
  }

}
