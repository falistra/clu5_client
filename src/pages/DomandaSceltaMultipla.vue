<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card" flat bordered>
      <q-card-section>
        <div class="text-overline q-mb-sm" v-html="script.prologo"></div>
        <div class="text-subtitle1 q-mb-xs" v-html="script.testo"></div>
        <div class="text-overline q-mt-sm q-mb-xs">
          Numero massimo risposte possibili:
          <span>{{ script.$.risposteCorrette }}</span>
        </div>
      </q-card-section>
      <q-separator />

      <div v-if="script.audio">
        <div style=“display:none”>
          <audio id="audio-player">
            <source :src="script.audio?.$.url" type="audio/ogg">
          </audio>
        </div>
        <q-btn :disable='btn_disabilitato' class="q-ml-md q-mt-sm btn-audio" align="between" color="primary"
          :label="label_btn_audio" :icon="icona_btn_audio" outline rounded @click="ascolta" />
      </div>

      <div v-if="script.audio">
        <audio-wrap src="script.audio?.$.url"></audio-wrap>
      </div>

      <q-card-section>
        <q-option-group v-model="script.rispostaData" inline left-label :options="opzioni"
          @update:model-value="setRispostaData" type="checkbox">
          <template v-slot:label="opt">
            <div class="row items-center">
              <span class="q-ml-md text-weight-bold text-left">{{ opt.label }}</span>
            </div>
          </template>
        </q-option-group>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaSceltaMultipla',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaSceltaMultipla } from 'pages/models';
import { ref } from 'vue';

import AudioWrap from 'src/components/AudioWrap.vue';

const sessione = useSessioneStore();
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaMultipla);

const opzioni = ref(
  script.value.risposte.risposta.map((item) => {
    return {
      // hash: item.$.hash,
      label: item._,
      value: item,
      disable: false
    };
  })
);
if (!script.value.rispostaData) script.value.rispostaData = []
if (!script.value.ascolti_rimanenti) script.value.ascolti_rimanenti = -1

const setRispostaData = (values: Array<{ $: { hash: string }; _: string }>) => {
  if (values.length == parseInt(script.value.$.risposteCorrette)) {
    if (script.value.rispostaData) {
      opzioni.value.forEach(x => {
        if (!script.value.rispostaData?.includes(x.value)) x.disable = true
        else x.disable = false
      })
    }
  } else opzioni.value.forEach(x => { x.disable = false })
}

const nrMaxRipetizioni = ref(parseInt(script.value.audio?.$.nrMaxRipetizioni || '') || NaN)
const ascolti = ref(0)
const label_btn_audio = ref(`Numero massimo ascolti permessi : ${nrMaxRipetizioni.value}`)
const icona_btn_audio = ref('volume_up')
const btn_disabilitato = ref(false)

//let ascolti_rimanenti = -1

const ascolta = () => {
  if (script.value.ascolti_rimanenti == 0) {
    label_btn_audio.value = `Raggiunto il Numero massimo di ascolti permessi : ${nrMaxRipetizioni.value}`
    icona_btn_audio.value = 'volume_off'
    btn_disabilitato.value = true
  } else {
    ascolti.value = ascolti.value + 1
    script.value.ascolti_rimanenti = nrMaxRipetizioni.value - ascolti.value
    label_btn_audio.value = `Numero ascolti ancora permessi : ${script.value.ascolti_rimanenti}`
    const audio = document.getElementById('audio-player') as HTMLMediaElement;
    if (audio) {
      audio.play();
      audio.addEventListener('pause', () => {
        btn_disabilitato.value = false
      });
      audio.addEventListener('play', () => {
        btn_disabilitato.value = true
      });
    }
  }
}


</script>

<style lang="sass" scoped>
.my-card
  width: 98%
  border: 2px solid

/* non usato */
.scelta
  text-align: left !important
  font-size: small

.btn-audio
  width: auto
</style>
