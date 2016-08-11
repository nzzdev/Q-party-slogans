
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

      let voters = this.item.data[curr];
      let parties = voters.parties.filter(p => p !== '');
      let organisations = voters.organisations.filter(o => o !== '');
      if (curr === 'undecided' && parties.length === 0 && organisations.length === 0) {
        return prev;
      }

      let partyLegend = '';
      if (parties.length > 0) {
        partyLegend = `<div class="s-font-note-s q-party-parole__label--level2">${LABEL_MAP.parties}</div>`
      }

      let orgLegend = '';
      if (organisations.length > 0) {
        orgLegend = `<div class="s-font-note-s q-party-parole__label--level2">${LABEL_MAP.organisations}</div>`
      }

      return prev + `
        <div class="q-party-parole__position q-party-parole__position--${curr}">
          <div class="s-font-note-s s-font-note-s--strong q-party-parole__label--level1">${LABEL_MAP[curr].toUpperCase()}</div>
          <div class="q-party-parole__parties s-font-text">
            ${partyLegend}
            ${parties.map((p) => `<span class="q-party-parole__party">${p}</span>`).join('\n')}
          </div>
          <div class="q-party-parole__organisations s-font-text">
            ${orgLegend}
            ${organisations.map((o) => `<span class="q-party-parole__org">${o}</span>`).join('\n')}
          </div>
        </div>
      `;}
    ,'');
  }

}
