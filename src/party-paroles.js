
const LABEL_MAP = {
  yes: 'Ja',
  no: 'Nein',
  undecided: 'Stimmfreigabe',
  parties: 'Parteien',
  organisations: 'Organisationen und Verbände'
}

export default class PartyParoles {

  constructor(item) {
    this.item = item;
  }

  render(el) {
    el.innerHTML = this.getHtml();
  }

  getHtml() {
    return ['yes', 'no', 'undecided'].reduce((prev, curr) => {

      // get parties and organisations
      let voters = this.item.data[curr];
      let parties = voters.parties.filter(p => p !== '');
      let organisations = voters.organisations.filter(o => o !== '');

      // do not render undecided voters if there's nothing to show
      if (curr === 'undecided' && parties.length === 0 && organisations.length === 0) {
        return prev;
      }

      // get legends
      let partyLegend = parties.length > 0 ? `<div class="s-font-note-s q-party-parole__label--level2">${LABEL_MAP.parties}</div>` : '';
      let orgLegend = organisations.length > 0 ? `<div class="s-font-note-s q-party-parole__label--level2">${LABEL_MAP.organisations}</div>` : '';

      return prev + `
        <div class="q-party-parole-position q-party-parole-position--${curr}">
          <div class="s-font-note-s s-font-note-s--strong q-party-parole-label--level1">${LABEL_MAP[curr].toUpperCase()}</div>
          <div class="q-party-parole-parties s-font-text">
            ${partyLegend}
            ${parties.map((p) => `<span class="q-party-parole-party">${p}</span>`).join('\n')}
          </div>
          <div class="q-party-parole-organisations s-font-text">
            ${orgLegend}
            ${organisations.map((o) => `<span class="q-party-parole-org">${o}</span>`).join('\n')}
          </div>
        </div>
      `;}
    ,'');
  }

}
