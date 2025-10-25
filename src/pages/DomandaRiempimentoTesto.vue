<template>
  <q-page>
    <div class="flex flex-col">
      <PrologoComponent
        class="max-h-40 my-2 mx-5 p-2 scroll-mr-6 overflow-auto rounded hover:rounded-lg bg-slate-100 shadow-lg shadow-slate-200/50"
        :prologo="script.prologo" />

      <img-wrap v-if="script.immagine" :src="script.immagine" />
      <audio-wrap v-if="script.audio" :audio="script.audio" @update="set_ascolti" />
      <video-wrap v-if="script.video" :video="script.video" @update="set_ascolti_video" />

      <!-- <div class="q-my-sm q-mx-md  my-2 mx-5 p-2 scroll-mr-6 overflow-auto" style="max-height: calc(47vh);"> -->

      <q-scroll-area class="q-gutter-md q-mt-md q-mx-md" :visible="true" :thumb-style="thumbStyle" :bar-style="barStyle"
        style="height: calc(47vh)">
        <div class="my-5 mx-3 mr-5" v-html="testo_quesito"></div>
      </q-scroll-area>
      <!-- </div> -->

      <q-scroll-area class="q-gutter-md q-mt-md q-mx-md" :visible="true" :thumb-style="thumbStyle" :bar-style="barStyle"
        style="height: calc(47vh)">
        <div class="row q-gutter-sm q-py-md" style="display: flex; flex-wrap: wrap;">
          <div v-for="risposta in lista_risposte_disponibili" :key="risposta.id">
            <div draggable="true" @dragstart="startDrag($event, risposta.testo)">
              <q-tooltip class="bg-indigo" anchor="top middle" self="bottom middle" :offset="[5, 5]">
                <strong>{{ $t('Trascina') }}</strong>
              </q-tooltip>
              <div
                class="q-px-sm text-wrap text-small bg-teal-1 rounded border-solid hover:border-dotted border-2 border-indigo-600"
                v-html="risposta.label"></div>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DomandaRiempimentoTesto',
});
import { ref, computed, watch, onMounted } from 'vue';

import { useSessioneStore } from '../stores/sessione';
import { T_DomandaRiempimentoTesto, IDomanda } from './models';
import PrologoComponent from '../components/PrologoComponent.vue';
import AudioWrap from '../components/AudioWrap.vue';
import ImgWrap from '../components/ImgWrap.vue';
import VideoWrap from '../components/VideoWrap.vue';
import { setAudioPams, setVideoPams } from './common';
import { common_api } from '../boot/common-utils';

import tippy, { Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import { useI18n } from 'vue-i18n';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { t } = useI18n();

import * as Common from './common';

const sessione = useSessioneStore();

const script = sessione.domande[
  sessione.counter
][1] as T_DomandaRiempimentoTesto;

// console.log(script.risposte.risposta)

if (!script.rispostaData) script.rispostaData = {};
const domanda = sessione.domande[sessione.counter][2] as IDomanda;
sessione.log_STAZIONI[sessione.id_stazione_corrente].idsDomandeVisualizzate?.push(domanda.id);

if (typeof script.risposta2Server == 'undefined')
  script.risposta2Server = {
    specie: parseInt(domanda.tecnica),
    peso: domanda.peso,
    risposte: {},
  };


watch(script.rispostaData, (rispostaData) => {
  if (script.risposta2Server)
    script.risposta2Server.risposte = Object.fromEntries(
      Object.entries(rispostaData).map(([k, o]) => [k, o.hash])
    );
  script.logRisposta = Object.fromEntries(
    Object.entries(rispostaData).map(([k, o]) => [
      k,
      { testo: o._, value: o.hash },
    ])
  );
});

if (script.audio) setAudioPams(script.audio);
if (script.video) setVideoPams(script.video);
// console.log(script)
let testo = '';
if (typeof script.testo == 'string') testo = script.testo;
if (typeof script.testo == 'object') testo = script.testo._;

const slots = testo.match(/((\_+)(\d+)(\_+))/g)
const dimslots = Object.fromEntries(slots?.map(
  (value, index) => {
    return [index, value.length]
  }
) || [])

// console.log('dimslots', dimslots)

const testo_quesito = ref(common_api.sanitizeUnicode(testo.replace(/(\_+)(\d+)(\_+)/g, ` <SPAN CLASS='drop-zone font-medium text-blue-600 slot-RT-${domanda.id}'  ID='${domanda.id}-$2'></SPAN> `)))

const dropZones = () => {

  const spans = document.querySelectorAll(`span.slot-RT-${domanda.id}`)
  const tippies: { [Key: string]: Instance } = {};

  spans.forEach((el) => {

    const span = el as HTMLElement

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_id, slotIndex] = span.id.split('-')
    span.textContent = script.rispostaData[slotIndex]
      ? script.rispostaData[slotIndex]._
      : '_'.repeat(Math.max(dimslots[slotIndex] || 10, 10));

    if (span.textContent.match(/^(\_+)$/)) {
      // span.classList.remove('tooltip');
      // (span, { onShow: (instance) => { instance.hide() } })
      // tippy(span).destroy()
    } else {
      const t_ = tippy(span, {
        content: t('dblclick_annulla'),
        allowHTML: true,
        theme: 'light',
        arrow: true,
        trigger: 'mouseenter'
      })
      tippies[span.id] = t_
    }

    span.addEventListener('dragenter', (event) => {
      event.preventDefault();
      (event.target as HTMLElement).style.border = 'dotted 2px black';
    })

    span.addEventListener('dragleave', (event) => {
      event.preventDefault();
      (event.target as HTMLElement).style.border = 'none';
    })

    span.addEventListener('dragend', (event) => {
      event.preventDefault();
      (event.target as HTMLElement).style.border = 'none';
    })

    span.addEventListener('dragover', (event) => {
      event.preventDefault();
      if (event.dataTransfer)
        event.dataTransfer.dropEffect = 'move';
    })

    span.addEventListener('drop', (event) => {
      event.preventDefault();
      (event.target as HTMLElement).style.border = 'none';
      if (event.dataTransfer) {
        const risposta_data = event.dataTransfer.getData('risposta');
        if (event.target) {
          const span = (event.target as HTMLElement)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_id, slotIndex] = span.id.split('-')

          if (span.textContent?.match(/^(\_+)$/)) {

            const risposta = lista_risposte_disponibili.value?.find(
              (value) => value.testo == risposta_data
            );
            if (risposta) {
              script.rispostaData[slotIndex] = {
                hash: risposta.id,
                _: risposta.testo,
              };
              risposta.disponibile = false;
              const script_risposta = script.risposte.risposta.find(
                (value) => value._ == risposta.testo
              );
              if (script_risposta) script_risposta.disponibile = false;
            }
            span.textContent = common_api.sanitizeTextRT(risposta_data);

          } else {
            // toglie risposta precedente
            const risposta_precedente = span.textContent
            const risposta_p = lista_risposte.value?.find(
              (value) => value.testo == risposta_precedente
            );
            if (risposta_p) {
              delete script.rispostaData[slotIndex]

              risposta_p.disponibile = true;
              const script_risposta = script.risposte.risposta.find(
                (value) => value._ == risposta_p.testo
              );
              if (script_risposta) script_risposta.disponibile = true;
            }

            tippies[span.id]?.destroy();


            // aggiunge risposta nuova

            const risposta = lista_risposte_disponibili.value?.find(
              (value) => value.testo == risposta_data
            );
            if (risposta) {
              script.rispostaData[slotIndex] = {
                hash: risposta.id,
                _: risposta.testo,
              };
              risposta.disponibile = false;
              const script_risposta = script.risposte.risposta.find(
                (value) => value._ == risposta.testo
              );
              if (script_risposta) script_risposta.disponibile = false;
            }
            span.textContent = common_api.sanitizeTextRT(risposta_data);
          }
          const t_ = tippy(span, {
            content: t('dblclick_annulla'),
            allowHTML: true,
            theme: 'light',
            arrow: true,
            trigger: 'mouseenter',
          });
          tippies[span.id] = t_

        }
      }
    })

    span.addEventListener('dblclick', (event) => {
      event.preventDefault();
      const span = (event.target as HTMLElement)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_id, slotIndex] = span.id.split('-')

      const risposta_data = span.textContent
      const risposta = lista_risposte.value?.find(
        (value) => value.testo == risposta_data
      );
      if (risposta) {
        delete script.rispostaData[slotIndex]

        risposta.disponibile = true;
        const script_risposta = script.risposte.risposta.find(
          (value) => value._ == risposta.testo
        );
        if (script_risposta) script_risposta.disponibile = true;
      }

      span.textContent = '_'.repeat(dimslots[slotIndex] || 10);
      tippies[span.id]?.destroy();
    })
  })
};

onMounted(dropZones);

const startDrag = (evt: DragEvent, item: string) => {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('risposta', item);
  }
};

interface IRisposta {
  id: string;
  testo: string;
  disponibile: boolean;
  label: string;
}
const lista_risposte = ref(
  script.risposte.risposta.map(
    (value) =>
      <IRisposta>{
        id: value.$.hash,
        testo: value._,
        disponibile: value.disponibile === undefined ? true : value.disponibile,
        label: common_api.sanitizeUnicode(value._),
      }
  )
);


const lista_risposte_disponibili = computed(() =>
  lista_risposte.value.filter((value) => value.disponibile === true)
);

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

const thumbStyle = ref<Partial<CSSStyleDeclaration>>(Common.thumbStyle);
const barStyle = ref<Partial<CSSStyleDeclaration>>(Common.barStyle);
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  border: 2px solid

.drop-zone
  font-weight: 900
  width: 100px
  min-width: 100px
  border: 1px dotted black

</style>
