
const labelMap = {
  yes: 'Ja',
  no: 'Nein',
  undecided: 'Stimmfreigabe',
  'parties': 'Parteien',
  'organisations': 'Organisationen und Verbände'
}

export default class Opinion {

  constructor(el,item){
    el.innerHTML = this.render(item.data);
  }

  render(data) {
    return ['yes','no','undecided'].reduce((prev,curr)=>{
      let label = labelMap[curr];
      let voters = data[curr];
      return prev + `
        <div class="q-opinion__position q-opinion__position--${curr}">
          <div class="s-font-note-s s-font-note-s--strong q-opinion__label--level1">${label.toUpperCase()}</div>
          <div class="q-opinion__parties s-font-text">
            <div class="s-font-note-s q-opinion__label--level2">${labelMap.parties}</div>
            ${voters.parties.map((p)=>`<span class="q-opinion__party">${p}</span>`).join('\n')}
          </div>
          <div class="q-opinion__organisations s-font-text">
            <div class="s-font-note-s q-opinion__label--level2">${labelMap.organisations}</div>
            ${voters.organisations.map((o)=>`<span class="q-opinion__org">${o}</span>`).join('\n')}
          </div>
        </div>
      `;},'')
      // + `<div class="s-font-note-s q-opinion__footnote">* abweichende Sektionen</div>`
      ;
  }

}
