import { Script } from 'stores/models';
import moment from 'moment';

import { Stazione } from 'stores/Stazione';

export const Test = class {
  script: Script;
  inizioTest: object;
  countdownSospeso = false;
  ID_TEST = '';
  ID_SESSION = '';
  ID_USER = '';
  LINGUA = '';
  DOMANDE_GIA_POSTE: string[] = [];
  stazione_corrente = null as unknown as InstanceType<typeof Stazione>;

  constructor(script: Script) {
    this.script = script;
    this.inizioTest = moment(this.script.test.$.serverTime);
    this.ID_TEST = this.script.test.$.id;
    this.ID_SESSION = this.script.test.$.sessionId;
    this.ID_USER = this.script.test.$.idUser;
    this.LINGUA = this.script.test.prologo.$.lingua;

    const stazione_corrente = this.script.test.stazioni.stazione.find(
      (stazione) => stazione.$.iniziale == 'true'
    );
    if (stazione_corrente) {
      this.stazione_corrente = new Stazione(stazione_corrente);
    }
  }
};
