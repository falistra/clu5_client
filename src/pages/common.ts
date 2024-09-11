import { Audio } from 'pages/models';

export const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '10px',
  opacity: '0.75',
};

export const barStyle = {
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '15px',
  opacity: '0.2',
};

export const setAudioPams = (audio: Audio) => {
  if (!(typeof audio.$.nrmaxripetizioni == 'undefined')) {
    audio.$.nrMaxRipetizioni = audio.$.nrmaxripetizioni;
  }

  if (typeof audio.ascolti_rimanenti == 'undefined') {
    if (typeof audio.$.nrMaxRipetizioni == 'undefined') {
      audio.$.nrMaxRipetizioni = Number.MAX_SAFE_INTEGER.toString();
      audio.ascolti_rimanenti = Number.MAX_SAFE_INTEGER; // parseInt(primaDomanda.$.nrMaxRipetizioni)
    } else {
      if (isNaN(parseInt(audio.$.nrMaxRipetizioni))) {
        audio.$.nrMaxRipetizioni = Number.MAX_SAFE_INTEGER.toString();
        audio.ascolti_rimanenti = Number.MAX_SAFE_INTEGER; // parseInt(primaDomanda.$.nrMaxRipetizioni)
      } else {
        audio.ascolti_rimanenti = parseInt(audio.$.nrMaxRipetizioni);
      }
    }
  }
};
