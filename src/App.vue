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

if (sessioneStore.domande.length > 0) {

  if (!Cookies.has('simulazione')) {
    if (sessioneStore.domande.length > 0) {
      router.push({
        name: sessioneStore.domande[sessioneStore.counter][0],
        params: { id: sessioneStore.counter },
      });
    }
  } else {
    if (sessioneStore.domande.length > 0) {
      router.push({
        name: `simulazione_${sessioneStore.domande[sessioneStore.counter][0]}`,
        params: { id: sessioneStore.counter }
      })
    }
    Cookies.set('simulazione', '', { expires: -1 }) // cancella cookie
  }
} else {
  router.push('/erroreServer')
}

</script>
