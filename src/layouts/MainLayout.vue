<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-blue-2 text-black" elevated borded style="max-height: 45px">
      <q-toolbar class="row flex-center">
        <q-toolbar-title class=" col text-subtitle1">
          <div class="row flex-center">
            {{ sessioneStore.test.script?.test.studente.$.cognome + ' ' +
              sessioneStore.test.script?.test.studente.$.nome }}
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="col text-subtitle1">
          <div class="row flex-center">
            Parte {{ sessioneStore.numero_stazione_corrente }} di {{
              sessioneStore.test.script.test.stazioni.stazione.length }} ; {{ sessioneStore.domande.length }}
            domande in questa parte
          </div>
        </q-toolbar-title>
        <q-toolbar-title class="col text-subtitle1">
          <div class="row flex-center">
            {{ sessioneStore.test.script.test.$.descrizione }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <!-- <q-toolbar class="col-1">
          <q-toolbar-title>
            <q-btn color="secondary" @click="$q.fullscreen.toggle()" size="xs"
              :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" />
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar class="col-1">
          <q-toolbar-title>
            <q-btn color="secondary" @click="log" icon="receipt_long" size="xs" />
          </q-toolbar-title>
        </q-toolbar> -->

    </q-header>

    <q-page-container>
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <!--- server per il cambio pagina -->
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer bordered class="bg-blue-2 text-black" elevated borded style="max-height: 45px">
      <div class="row items-center justify-between">
        <q-toolbar class="col-12">
          <q-toolbar-title>
            <barra-navigazione />
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">

// import { useQuasar } from 'quasar'
import { useSessioneStore } from 'stores/sessione';

const sessioneStore = useSessioneStore();

defineOptions({
  name: 'MainLayout',
});
import BarraNavigazione from 'src/components/BarraNavigazione.vue';

// import { useRouter } from 'vue-router';
// const router = useRouter();
// const log = () => {
//   router.push({
//     name: 'log',
//   });
// }


</script>

<style lang="sass">

.row-horizontal-alignment
  .row
    background: rgba(#aa0, .1)
  .row > div
    background: rgba(#999,.15)
    border: 1px solid rgba(#999,.2)
</style>
