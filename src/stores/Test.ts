import { Script } from './models';
import moment from 'moment';
import { Stazione } from './Stazione';

export const Test = class {
  SCRIPT = '';
  script: Script;
  inizioTest: moment.Moment;
  serverTime: moment.Moment;
  clientTime: moment.Moment;
  countdownSospeso = false;
  ID_TEST = '';
  ID_SESSION = '';
  ID_USER = '';
  LINGUA = '';
  LIVELLO_ACQUISITO = '';
  STATO_ACQUISITO = '';
  DOMANDE_GIA_POSTE: number[] = [];
  STORIA: string[] = [];

  stazione_corrente = null as unknown as InstanceType<typeof Stazione>;

  constructor(script: Script, SCRIPT: string) {
    this.script = script;
    this.SCRIPT = SCRIPT;
    this.inizioTest = moment(this.script.test.$.serverTime);
    this.serverTime = this.inizioTest; // clone
    this.clientTime = moment();
    this.ID_TEST = this.script.test.$.id;
    this.ID_SESSION = this.script.test.$.sessionId;
    this.ID_USER = this.script.test.$.idUser;
    this.LINGUA = this.script.test.prologo.$.lingua;

    this.STORIA.push(`${this.ServerTime()} = Inizio TEST`);

    const script_stazione_corrente = this.script.test.stazioni.stazione.find(
      (stazione) => {
        return stazione.$.iniziale == 'true';
      }
    );
    if (script_stazione_corrente) {
      this.stazione_corrente = new Stazione(script_stazione_corrente, this);
    }
  }

  ServerTime() {
    const ora = moment();
    const delta = ora.diff(this.clientTime, 'ms');
    return this.inizioTest.add(delta, 'ms');
  }
};
