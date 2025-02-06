<template>

  <q-page-sticky v-if="i18n.caratteri[props.linguaDomanda].length > 0" position="bottom-right" :offset="fabPos">
    <VirtualKeyboard class="border-2 border-indigo-600" @key-pressed="carattere" v-touch-pan.prevent.mouse="moveFab">
      <div class="m-3">
        <KeyButton v-for="v of i18n.caratteri[props.linguaDomanda].split('')" :key="`key-${v}`" :value="v" />
      </div>
    </VirtualKeyboard>
  </q-page-sticky>
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

const fabPos = ref([18, 18])
const draggingFab = ref(false)

const moveFab = (ev: { isFirst?: boolean | undefined, isFinal?: boolean | undefined, delta?: { x?: number | undefined, y?: number | undefined } }) => {

  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true
  if (ev.delta)
    fabPos.value = [
      fabPos.value[0] - (ev.delta.x || 0),
      fabPos.value[1] - (ev.delta.y || 0)
    ]
}


defineOptions({
  name: 'TastieraVirtuale',
});

const carattere = (key: string) => {
  console.log(key)
  emit('update', key);
};

</script>
