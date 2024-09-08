<template>
  <q-page class="row items-center justify-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <PrologoComponent :prologo="script.prologo" />
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs" v-html="testoDomanda"></div>
          <div class="row justify-center" v-if="script.immagine">
            <ImgWrap :src="script.immagine?.$.url" size="100px" />


            <!-- <q-img :src="script.immagine?.$.url" error-src="~assets/ImmagineNonDisponibile.jpeg" height="20%"
              width="20%" fit="contain">
            </q-img> -->
          </div>
          <div class="row justify-center" v-if="script.audio">
            <audio-wrap :audio="script.audio" @update="set_ascolti"></audio-wrap>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row justify-center items-center">
            <q-btn-toggle v-model="script.rispostaData" no-caps dense push glossy toggle-color="primary"
              :options="opzioni" clearable @update:model-value="setRisposta">
              <template v-for="button in opzioni" :key="button.value" v-slot:[button.slot]>
                <div v-if="script.risposte.$ == undefined || script.risposte.$?.tipoopzioni == 'TESTO'"
                  class="risposta q-px-sm">
                  {{ button.testo }}
                </div>
                <div v-if="script.risposte.$?.tipoopzioni == 'IMMAGINE'" class="risposta q-px-sm">
                  <ImgWrap :src="button.testo" size="70px" />
                  <!--
                  <q-avatar size="70px">
                    <q-img :src="button.testo" error-src="~assets/ImmagineNonDisponibile.jpeg" />
                  </q-avatar> -->
                </div>
              </template>
            </q-btn-toggle>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaSceltaSingola',
});
import { useSessioneStore } from 'stores/sessione';
import { T_DomandaSceltaSingola } from 'pages/models';
import { ref } from 'vue'; // , computed
import PrologoComponent from 'src/components/PrologoComponent.vue';
import AudioWrap from 'src/components/AudioWrap.vue';
import ImgWrap from 'src/components/ImgWrap.vue';


const sessione = useSessioneStore();
const script = ref(sessione.domande[sessione.counter][1] as T_DomandaSceltaSingola);
if (script.value.audio && typeof script.value.audio.ascolti_rimanenti == 'undefined') {
  script.value.audio.ascolti_rimanenti = parseInt(script.value.audio.$.nrMaxRipetizioni)
}


if (script.value.immagine && (script.value.immagine?.$.url == '' || script.value.immagine?.$.url == undefined)) {
  delete script.value.immagine
}

let testoDomanda = ref(
  !script.value.rispostaData
    ? script.value.testo.replace(/([_]+)/gi, '<span class="text-weight-bold">$1</span>')
    : script.value.testo.replace(
      /([_]+)/gi,
      `<span class="text-weight-bold"> ${script.value.rispostaData} </span>`
    )
);

const opzioni = ref(
  script.value.risposte.risposta.map((item, index) => {
    return {
      testo: item._,
      value: item._,
      slot: index.toString(),
      style: { 'margin-right': '10px', border: '1px solid' },
      class: 'risposte',
    };
  })
);

const setRisposta = (risposta: string) => {
  if (!risposta)
    testoDomanda.value = script.value.testo.replace(
      /([_]+)/gi,
      '<span class="text-weight-bold">$1</span>'
    );
  else
    testoDomanda.value = ` ${script.value.testo.replace(
      /[_]+/gi,
      ` <span class="text-weight-bold">${risposta} </span> `
    )} `;
};

const set_ascolti = (val: number) => {
  if (script.value.audio) {
    script.value.audio.ascolti_rimanenti = val
    console.log(script.value.audio.ascolti_rimanenti)
  }
}



</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: auto

.risposta
  font-size: medium
  text-align: justify
  line-height: 85%
</style>
