<template>
  <q-page class="row items-center justify-evenly">
    <PrologoComponent :prologo="script.prologo" />
    <q-card class="my-card" flat bordered>
      <q-card-section>

        <div class="text-subtitle1 q-mb-xs" v-html="script.testo"></div>
        <div class="text-overline q-mt-sm q-mb-xs">
          Numero massimo risposte possibili:
          <span>{{ script.$.risposteCorrette }}</span>
        </div>
      </q-card-section>
      <div class="row justify-center" v-if="script.audio">
        <audio-wrap :audio="script.audio" @update="set_ascolti"></audio-wrap>
      </div>

      <q-separator />

      <!-- <div v-if="script.audio">
        <audio-wrap :audio="script.audio"></audio-wrap>
      </div> -->

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
import PrologoComponent from 'src/components/PrologoComponent.vue';
import AudioWrap from 'src/components/AudioWrap.vue';

import { ref } from 'vue';

// import AudioWrap from 'src/components/AudioWrap.vue';

const sessione = useSessioneStore();
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaMultipla);
if (script.value.audio && typeof script.value.audio.ascolti_rimanenti == 'undefined') {
  script.value.audio.ascolti_rimanenti = parseInt(script.value.audio.$.nrMaxRipetizioni)
}

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

const set_ascolti = (val: number) => {
  if (script.value.audio) {
    script.value.audio.ascolti_rimanenti = val
    console.log(script.value.audio.ascolti_rimanenti)
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
