<template>
  <q-page>
    <PrologoComponent
      class="max-h-20 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
      :prologo="script.prologo" />
    <div class="row q-mr-sm">
      <div class="col-6">
        <div class="column">
          <!-- <div style="max-height: 150px" class="col-auto scroll text-subtitle2 q-my-sm q-mx-md"
            v-html="common_api.sanitizeUnicode(script.testo)" /> -->
          <audio-wrap v-if="script.audio" class="col q-my-md q-mx-md" :audio="script.audio" @update="set_ascolti" />
          <video-wrap v-if="script.video" class="col q-my-md q-mx-md" :video="script.video"
            @update="set_ascolti_video" />
        </div>
        <q-scroll-area class="col" style="height: calc(90vh)" visible :thumb-style="thumbStyle" :bar-style="barStyle">
          <div class="q-pa-sm mr-3">
            <div class="row q-my-xs" v-for="item in script.partiFisse.item" :key="item.$.hash">
              <div class="col parte-fissa">
                <q-img v-if="script.coppie.$.tipoopzioni == 'IMMAGINE'" no-native-menu :src="`/media/${item._}`"
                  style="max-height : 100%; max-width: 100%" error-src="~assets/ImmagineNonDisponibile.jpeg" />
                <!--
                <ImgWrap v-if="script.coppie.$.tipoopzioni == 'IMMAGINE'" mode="contain"
                  :src="{ $: { url: item._ } }" /> -->
                <div v-else class="q-ma-sm" v-html="item.label" style="overflow: auto; max-height: 200px" />
              </div>
              <div class="col bg-teal-2 zona-ricevente" @dragover.prevent @dragenter.prevent
                @drop="onDrop($event, item)" @dblclick="annulla(item)">
                <div class="text-subtitle q-ma-sm item text-justify">
                  <!-- <q-tooltip v-if="item.rispostaData?.label" class="bg-indigo" anchor="top middle" self="bottom middle"
                    :offset="[5, 5]">
                    <strong>{{ $t('Trascina') }}.{{ $t('Doppio_click') }}</strong>
                  </q-tooltip> -->
                  <span v-html="item.rispostaData?.label" />
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="col-6">
        <q-scroll-area style="height: calc(90vh)" visible :thumb-style="thumbStyle" :bar-style="barStyle">
          <q-badge color="blue" class="text-subtitle2">
            {{ $t('Trascina') }}. {{ $t('Doppio_click') }}
          </q-badge>

          <q-list dense class="q-mr-lg">
            <q-item v-for="item in lista_risposte_disponibili" :key="item.$.hash">
              <q-item-section side>
                <div class="q-ma-sm item" draggable="true" @dragstart="startDrag($event, item)">
                  <!-- <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                    <strong>{{ $t('Trascina') }}.{{ $t('Doppio_click') }}</strong>
                  </q-tooltip> -->
                  <span class="bg-teal-1 q-pa-xs text-weight-medium" v-html="item.label" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaAbbinamentoSingolo',
});
import { useSessioneStore } from '../stores/sessione';
import { T_DomandaAbbinamentoSingolo, IDomanda } from './models';
import { ref, reactive, computed, watch } from 'vue';
import * as Common from './common';
import PrologoComponent from '../components/PrologoComponent.vue';
// import ImgWrap from '../components/ImgWrap.vue';
import { common_api } from '../boot/common-utils';
import AudioWrap from '../components/AudioWrap.vue';
import VideoWrap from '../components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from './common';

const sessione = useSessioneStore();
const script = reactive(
  sessione.domande[sessione.counter][1] as T_DomandaAbbinamentoSingolo
);
const domanda = sessione.domande[sessione.counter][2] as IDomanda;

if (script.audio) setAudioPams(script.audio);
if (script.video) setVideoPams(script.video);

script.partiMobili.item.forEach(
  (item) => (item.label = common_api.sanitizeUnicode(item._))
);
script.partiFisse.item.forEach(
  (item) => (item.label = common_api.sanitizeUnicode(item._))
);

if (typeof script.risposta2Server === 'undefined') {
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {},
  };
}

watch(script.partiFisse, (partiFisse) => {
  partiFisse.item.forEach((item) => {
    if (script.risposta2Server) {
      if (item.rispostaData) {
        script.risposta2Server.risposte[item.$.hash] = item.rispostaData.$.hash;
      } else
        delete script.risposta2Server.risposte[item.$.hash]
    }
  });

  script.logRisposta = partiFisse.item
    .filter((item) => item.rispostaData)
    .map((item) => {
      return {
        fisso: { testo: item._, value: item.$.hash },
        mobile: {
          testo: item.rispostaData?._,
          value: item.rispostaData?.$.hash,
        },
      };
    });
});

script.partiMobili.item.forEach((item) => {
  const risposta_presente = script.partiFisse.item.find((value) => {
    if (value.rispostaData && value.rispostaData.$.hash == item.$.hash)
      return true;
    else return false;
  });
  item.disponibile = !risposta_presente;
});

interface Item {
  $: { hash: string };
  _: string;
  rispostaData?: { $: { hash: string }; _: string };
}

const isDragging = ref(false);

const startDrag = (evt: DragEvent, item: Item) => {
  if (evt) {
    ((evt as Event).target as Element).classList.add('dragging');
  }
  if (evt.dataTransfer) {
    isDragging.value = true;
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.clearData();
    evt.dataTransfer.setData('risposta', item.$.hash);
  }
};

const lista_risposte_disponibili = computed(() =>
  script.partiMobili.item.filter((value) => value.disponibile)
);

const onDrop = function (evt: DragEvent, item: Item) {
  if (evt.dataTransfer) {
    if (item.rispostaData) {
      const item_ = script.partiMobili.item.find(
        (value) =>
          value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
      );
      item.rispostaData = undefined;
      if (item_) item_.disponibile = true;
    }

    const risposta_data_hash = evt.dataTransfer.getData('risposta');
    const risposta_data = lista_risposte_disponibili.value?.find(
      (value) => value.$.hash == risposta_data_hash
    );
    if (risposta_data) {
      risposta_data.disponibile = false;
      item.rispostaData = risposta_data;
    }
  }
};

const annulla = (item: Item) => {
  const item_ = script.partiMobili.item.find(
    (value) =>
      value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
  );
  item.rispostaData = undefined;
  if (item_) item_.disponibile = true;
  const item__ = script.partiFisse.item.find(
    (value) =>
      value.$.hash == (item.rispostaData ? item.rispostaData.$.hash : null)
  );
  if (item__) item__.rispostaData = undefined

};

const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle);
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle);

const set_ascolti = (val: number) => {
  if (script.audio) {
    script.audio.ascolti_rimanenti = val;
  }
};
const set_ascolti_video = (val: number) => {
  if (script.video) {
    script.video.ascolti_rimanenti = val;
  }
};
</script>

<style lang="sass" scoped>

.zona-ricevente
  border-top: 2px solid black
  border-bottom: 2px solid black
  border-right: 2px solid black
  min-height: 20px
  min-width: 150px
  text-wrap: wrap

.parte-fissa
  border: 2px solid black
  /* min-height: 40px */

.item
  cursor: grab
  font-size: small
  font-weight: bold
  text-align: justify
  width: auto

.dragging
  background-color : $indigo-2
</style>
