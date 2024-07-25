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

      <q-media-player v-if="script.audio" type="audio" :sources="sources"></q-media-player>

      <!-- <audio class="q-ma-md" controls>
        <source :src="script.audio?.$.url" type="audio/ogg">
      </audio> -->
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
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'

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

const sources = ref([
  {
    src: 'script.audio?.$.url',
    type: 'audio/ogg'
  }
])


setRispostaData(script.value.rispostaData)
const audio = document.querySelector('audio');
console.log(audio)
const ascolti = ref(0)

if (audio) {
  audio.addEventListener('play', () => {
    ascolti.value = + 1
    console.log(ascolti.value)
    const nrMaxRipetizioni = script.value.audio?.$.nrMaxRipetizioni || '-1'
    if (ascolti.value == parseInt(nrMaxRipetizioni)) {
      console.log('MAX raggiunto')
      audio.muted = true
    }
  }
  )
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
</style>
