<template>
  <q-page class="column">
    <PrologoComponent class="col-auto" style="max-height: 70px" :prologo="script.prologo" />
    <q-card class="col-12">
      <q-card-section horizontal>
        <q-card-section class="col-6">
          <div style="max-height: 300px" class="col-auto scroll text-caption q-my-sm q-mx-md "
            v-html="common_api.sanitizeUnicode(script.testo_comprensione)"></div>
          <img-wrap v-if="primaDomanda.immagine" class="col" :src="primaDomanda.immagine" size="100px" />
          <audio-wrap v-if="primaDomanda.audio" class="col q-mt-md" :audio="primaDomanda.audio"
            @update="set_ascolti"></audio-wrap>
          <video-wrap class="col q-mt-md" v-if="primaDomanda.video" :video="primaDomanda.video"
            @update="set_ascolti_video"></video-wrap>
        </q-card-section>
        <q-card-section class="col-6">
          <q-scroll-area visible :thumb-style="my_thumbStyle" :bar-style="my_barStyle" style="height: 300px">
            <div class="domanda q-mr-md" v-for="domanda in domande" :key="domanda.testo">
              <div class="text-overline" v-html="domanda.prologo"></div>
              <div class="text-subtitle q-ml-md q-my-sm text-weight-bold"
                v-html="common_api.sanitizeUnicode(domanda.testo)"></div>
              <q-option-group class="q-mx-sm q-mb-sm text-weight-medium" v-model="domanda.rispostaData"
                :options="domanda.risposte" dense color="primary" />
            </div>
          </q-scroll-area>

        </q-card-section>
      </q-card-section>
    </q-card>

  </q-page>

</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaComprensioneTesto',
});

import { useSessioneStore } from 'stores/sessione';
import { T_DomandaComprensioneTesto, T_DomandaSceltaSingola, IDomanda } from 'pages/models';
import { ref, watch, reactive } from 'vue';
import PrologoComponent from 'src/components/PrologoComponent.vue';
import ImgWrap from 'src/components/ImgWrap.vue';
import { common_api } from 'src/boot/common-utils'
import AudioWrap from 'src/components/AudioWrap.vue';
import VideoWrap from 'src/components/VideoWrap.vue';
import { setAudioPams, setVideoPams, thumbStyle, barStyle } from 'pages/common'

const sessione = useSessioneStore();
const script = ref(
  sessione.domande[sessione.counter][1] as T_DomandaComprensioneTesto
);
const domanda = sessione.domande[sessione.counter][2] as IDomanda

if (typeof script.value.risposta2Server == 'undefined')
  script.value.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {}
  }

const primaDomanda: T_DomandaSceltaSingola = script.value.domande.domandasceltasingola[0]

if (primaDomanda.audio) setAudioPams(primaDomanda.audio)
if (primaDomanda.video) setVideoPams(primaDomanda.video)

const domande = reactive(
  script.value.domande.domandasceltasingola.map((dss) => ({
    prologo: dss.prologo,
    testo: dss.testo,
    risposte: dss.risposte.risposta.map((item, index) => ({
      testo: item._,
      label: item._,
      value: item._,
      hash: item.$.hash,
      slot: index.toString(),
      style: { 'line-height': '85%', 'font-size': 'small', 'margin-right': '5px', border: '1px solid' },
    })),
    rispostaData: dss.rispostaData,
  }))
);

watch(domande, async (risposte) => {
  risposte.forEach((item, index) => {
    script.value.domande.domandasceltasingola[index].rispostaData =
      item.rispostaData || undefined;
    const key = script.value.domande.domandasceltasingola[index].$.hash
    const risposta = item.risposte.find((e) => e.testo == item.rispostaData)
    if (script.value.risposta2Server && key && risposta)
      script.value.risposta2Server.risposte[key] = risposta?.hash
    else {
      if (script.value.risposta2Server && key)
        script.value.risposta2Server.risposte[key] = ''
    }
  });
});

const set_ascolti = (val: number) => {
  if (primaDomanda.audio)
    primaDomanda.audio.ascolti_rimanenti = val
}

const set_ascolti_video = (val: number) => {
  if (primaDomanda.video) {
    primaDomanda.video.ascolti_rimanenti = val
  }
}

const my_thumbStyle = ref<Partial<CSSStyleDeclaration>>(thumbStyle)
const my_barStyle = ref<Partial<CSSStyleDeclaration>>(barStyle)

</script>

<style lang="sass" scoped>
.senza-scroll
  height: calc(75vh)

.risposta
  font-size: small
  text-align: justify
  line-height: 85%

.domanda
  border-style: solid solid solid solid
  margin-bottom: 10px
</style>
