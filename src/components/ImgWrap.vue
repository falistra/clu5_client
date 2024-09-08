<template>
  <q-avatar :size="size">
    <q-img :src="`/media/${src}`" error-src="~assets/ImmagineNonDisponibile.jpeg" />
  </q-avatar>
</template>

<script setup lang="ts">

defineOptions({
  name: 'ImgWrap',
});

interface Props {
  size: string;
  src: string;
};

// const props =
defineProps<Props>()


</script>
