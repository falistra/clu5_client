<template>
  <router-view />
</template>

<script setup lang="ts">
defineOptions({
  name: 'App'
})

// import { useQuasar } from 'quasar'
// const $q = useQuasar()
// const allCookies = $q.cookies.getAll()
// console.log(allCookies)

// import xml2js from 'xml2js'
// import { api } from 'boot/axios'

// import { Test } from './stores/Test'
// import { Loading } from 'quasar'

// import { useSessioneStore } from 'stores/sessione'
// import { useRouter } from 'vue-router'

// const sessioneStore = useSessioneStore()
// const router = useRouter()

// Loading.show({
//   message: 'Attendere, prego...'
// })
// const script = await api
//   .get(`/test/script/?idUser=${allCookies.idUtente}&idSess=${allCookies.idSessione}`)
//   .then((response) => {
//     // Notify.create({
//     //   message: 'Dati ricevuti dal server',
//     //   color: 'green-6',
//     // });
//     return response.data
//   })
//   .catch(() => {
//     // $q.notify({
//     //   color: 'negative',
//     //   position: 'top',
//     //   message: 'Loading failed',
//     //   icon: 'report_problem',
//     // });
//   })

// const test = new Test(
//   await xml2js
//     .parseStringPromise(script, {
//       explicitArray: false,
//       trim: true
//     })
//     .then(function (result) {
//       // nel caso ci sia una sola stazione => va trasformato da object in [object] : Array
//       if (!(Array.isArray(result.test.stazioni.stazione))) { result.test.stazioni.stazione = [result.test.stazioni.stazione] }
//       return result
//     })
//     .catch(function (err) {
//       console.error(err)
//     })
//   , script)

// sessioneStore.test = test

// await test.stazione_corrente.richiediDomandeServer()
// Loading.hide()

// sessioneStore.counter = 0
// router.push({
//   name: sessioneStore.domande[sessioneStore.counter][0],
//   params: { id: sessioneStore.counter }
// })

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
