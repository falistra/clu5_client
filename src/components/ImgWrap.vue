<template>
  <div class="row justify-center">
    <q-avatar v-if="src" :size="size">
      <q-img :src="`/media/${src}`" error-src="~assets/ImmagineNonDisponibile.jpeg" />
    </q-avatar>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'ImgWrap',
});

interface Props {
  size: string;
  src: string | undefined;
};

// const props =
defineProps<Props>()


</script>
