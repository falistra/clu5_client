<template>

  <!-- <q-page-sticky v-if="i18n.caratteri[props.linguaDomanda].length > 0" position="bottom-right" :offset="fabPos">
    <q-bar dense class="bg-primary text-white" v-touch-pan.prevent.mouse="moveFab">
      <q-btn dense flat icon="drag_indicator" />
      <q-tooltip class="bg-indigo" anchor="center middle" self="center middle">
        <strong>Per spostare, trascina con il mouse... </strong>
      </q-tooltip>
    </q-bar>
    <VirtualKeyboard class="border-2 border-indigo-600" @key-pressed="carattere">
      <div>
        <KeyButton v-for="v of i18n.caratteri[props.linguaDomanda].split('')" :key="`key-${v}`" :value="v" />
      </div>
    </VirtualKeyboard>
  </q-page-sticky> -->

  <div v-if="i18n.caratteri[props.linguaDomanda].length > 0" class="self-center border-4 border-indigo-600">
    <VirtualKeyboard class="m-2" @key-pressed="carattere">
      <div>
        <KeyButton v-for="v of i18n.caratteri[props.linguaDomanda].split('')" :key="`key-${v}`" :value="v" />
      </div>
    </VirtualKeyboard>
  </div>

</template>

<script setup lang="ts">
import { VirtualKeyboard, KeyButton } from '@dongivan/virtual-keyboard';
import '@dongivan/virtual-keyboard/default.css';

import { ref } from 'vue';

import { useI18nStore } from '../stores/i18n';
const i18n = ref(useI18nStore());

// import { useSessioneStore } from '../stores/sessione';
// const sessione = useSessioneStore();

const props = withDefaults(defineProps<{ linguaDomanda: string }>(), {
  linguaDomanda: '1',
});

const emit = defineEmits(['update']);

// const fabPos = ref([18, 18])
// const draggingFab = ref(false)

// const moveFab = (ev: { isFirst?: boolean | undefined, isFinal?: boolean | undefined, delta?: { x?: number | undefined, y?: number | undefined } }) => {

//   draggingFab.value = ev.isFirst !== true && ev.isFinal !== true
//   if (ev.delta)
//     fabPos.value = [
//       fabPos.value[0] - (ev.delta.x || 0),
//       fabPos.value[1] - (ev.delta.y || 0)
//     ]
// }


defineOptions({
  name: 'TastieraVirtuale',
});

const carattere = (key: string) => {
  console.log(key)
  emit('update', key);
};
</script>


<style scoped>
:deep() {
  .vk-btn {
    border: solid 1px black;
    font-size: 12px;
    width: fit-content;
    height: fit-content;
    min-width: 14px;
    min-height: 14px;
  }
}
</style>
