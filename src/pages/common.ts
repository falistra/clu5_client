import { Audio, Video } from 'pages/models';

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

const NUMERO_MAX_RIPETIZIONI = 2;

export const setAudioPams = (audio: Audio) => {
  if (!(typeof audio.$.nrmaxripetizioni == 'undefined')) {
    audio.$.nrMaxRipetizioni = audio.$.nrmaxripetizioni;
  }

  if (typeof audio.ascolti_rimanenti == 'undefined') {
    if (typeof audio.$.nrMaxRipetizioni == 'undefined') {
      audio.$.nrMaxRipetizioni = NUMERO_MAX_RIPETIZIONI.toString();
      audio.ascolti_rimanenti = NUMERO_MAX_RIPETIZIONI; // parseInt(primaDomanda.$.nrMaxRipetizioni)
    } else {
      if (isNaN(parseInt(audio.$.nrMaxRipetizioni))) {
        audio.$.nrMaxRipetizioni = NUMERO_MAX_RIPETIZIONI.toString();
        audio.ascolti_rimanenti = NUMERO_MAX_RIPETIZIONI; // parseInt(primaDomanda.$.nrMaxRipetizioni)
      } else {
        audio.ascolti_rimanenti = parseInt(audio.$.nrMaxRipetizioni);
      }
    }
  }
};

export const setVideoPams = (video: Video) => {
  if (!(typeof video.$.nrmaxripetizioni == 'undefined')) {
    video.$.nrMaxRipetizioni = video.$.nrmaxripetizioni;
  }

  if (typeof video.ascolti_rimanenti == 'undefined') {
    if (typeof video.$.nrMaxRipetizioni == 'undefined') {
      video.$.nrMaxRipetizioni = NUMERO_MAX_RIPETIZIONI.toString();
      video.ascolti_rimanenti = NUMERO_MAX_RIPETIZIONI; // parseInt(primaDomanda.$.nrMaxRipetizioni)
    } else {
      if (isNaN(parseInt(video.$.nrMaxRipetizioni))) {
        video.$.nrMaxRipetizioni = NUMERO_MAX_RIPETIZIONI.toString();
        video.ascolti_rimanenti = NUMERO_MAX_RIPETIZIONI; // parseInt(primaDomanda.$.nrMaxRipetizioni)
      } else {
        video.ascolti_rimanenti = parseInt(video.$.nrMaxRipetizioni);
      }
    }
  }
};

export const sanitazeScript = (script: {
  immagine?: { $: { url: string } };
  audio?: Audio;
}) => {
  if (
    script.audio &&
    (typeof script.audio.$.url == 'undefined' ||
      script.audio.$.url == '' ||
      script.audio.$.url == 'nessuno')
  )
    delete script.audio;

  if (
    script.immagine &&
    (typeof script.immagine.$.url == 'undefined' ||
      script.immagine.$.url == '' ||
      script.immagine.$.url == 'nessuno')
  )
    delete script.immagine;
};
