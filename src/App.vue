<template>
  <router-view />
</template>

<script setup lang="ts">
defineOptions({
  name: 'App'
})


import { useSessioneStore } from 'stores/sessione'
import { useRouter } from 'vue-router'
import { Cookies } from 'quasar';

const sessioneStore = useSessioneStore()
const router = useRouter()

if (!Cookies.has('simulazione')) {
  router.push({
    name: sessioneStore.domande[sessioneStore.counter][0],
    params: { id: sessioneStore.counter },
  });

} else {
  router.push({
    name: `simulazione_${sessioneStore.domande[sessioneStore.counter][0]}`,
    params: { id: sessioneStore.counter }
  })
  Cookies.set('simulazione', '', { expires: -1 }) // cancella cookie
}

</script>
