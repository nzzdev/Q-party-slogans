import env from 'env';

import {display} from 'index';
// import 'themes/default/dev-styles.css!';


let rendererConfig = {
  rendererBaseUrl: 'dist/system/'
}

var dummyData = [
  {
    "title": "Initiative zum bedingungslosen Grundeinkommen",
    // "sources": [{text:"SRG-Trend/gfs.bern"}],
    "data": {
      "yes": {
        parties: ['party1', 'party2'],
        organisations: ['org1', 'org2']
      },
      "no": {
        parties: ['party1', 'party2'],
        organisations: ['org1', 'org2']
      },
      "undecided": {
        parties: ['party1', 'party2'],
        organisations: ['org1', 'org2']
      },
    }
  },
  {
    "title": "Ohne undecided",
    // "sources": [{text:"SRG-Trend/gfs.bern"}],
    "data": {
      "yes": {
        parties: ['party1', 'party2'],
        organisations: ['org1', 'org2']
      },
      "no": {
        parties: ['party1', 'party2'],
        organisations: ['org1', 'org2']
      },
      "undecided": {
        parties: [],
        organisations: []
      },
    }
  },
  {
    "title": "Ohne Nein-Parteien",
    // "sources": [{text:"SRG-Trend/gfs.bern"}],
    "data": {
      "yes": {
        parties: ['party1', 'party2'],
        organisations: ['org1', 'org2']
      },
      "no": {
        parties: [],
        organisations: ['org2']
      },
      "undecided": {
        parties: [],
        organisations: []
      },
    }
  },
  {
    "title": "Ohne Titel",
    // "sources": [{text:"SRG-Trend/gfs.bern"}],
    "data": {
      "yes": {
        parties: ['party1', 'party2'],
        organisations: ['org1', 'org2']
      },
      "no": {
        parties: [],
        organisations: ['org2']
      },
      "undecided": {
        parties: [],
        organisations: []
      }
    },
    rendererConfig: {
      hideTitle: true
    }
  }
];

let {parentNode,nextSibling} = document.body.querySelector('main > header');
dummyData.forEach((config,i) => {
  let $el = document.createElement('div');
  $el.setAttribute('id', 'q-item-'+i)
  parentNode.insertBefore($el, nextSibling);
  display(config, $el, Object.assign({}, rendererConfig, config.rendererConfig || {}));
});
