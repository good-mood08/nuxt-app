<template>  
    <yandex-map
        v-model="map"
        :settings="{
          location: {
            center: [37.617644, 55.755819],
            zoom: 9,
          },
        }"
        width="100%"
        height="500px"
    >
      <yandex-map-default-scheme-layer/>
      <yandex-map-default-features-layer/>
      <div v-for="point in props.points.data">

          <yandex-map-default-marker :settings="{ coordinates: [+point.lat, +point.lon] }"/>
          
        </div>
        <yandex-map-default-marker
        :settings="{
            coordinates: [37.188144, 55.933842],
            title: 'Marker with static content',
            subtitle: 'Marker with static content description',
            color: 'green',
            popup: { position: 'top', content: 'Static content that hides marker', hidesMarker: true },
        }"
    >
        <template #popup="{ close }">
            <div
                class="marker-popup"
                @click="close()"
            >
                Click me to close popup
            </div>
        </template>
    </yandex-map-default-marker>
        <yandex-map-default-marker
        v-model="defaultMarker"
        :settings="{
            //Здесь вам НУЖНО брать координаты либо из функции onDragMove, либо из маркера, стриггерив реактивность
            //Яндекс при выполнении функции .update зачем-то подставляет оригинальные координаты, хотя они не менялись =(
            coordinates: [37.617644, 55.755819],
            title: `Долгота: ${ defaultMarker?.coordinates[0].toFixed(2) }<br>Широта: ${ defaultMarker?.coordinates[1].toFixed(2) }`,
            draggable: true,
            onDragMove,
           
        }"
    />
    </yandex-map>
  </template>
  
  <script setup lang="ts">
  import { shallowRef } from 'vue';
  import type { YMap } from '@yandex/ymaps3-types';
  import {
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultMarker,
  } from 'vue-yandex-maps';
import type { YMapDefaultMarker } from '@yandex/ymaps3-types/packages/markers';
  
    interface Point {
        lat: number,
        lon: number,
    }

  const props = defineProps<{
    points: Point[]
    
  }>()
  const defaultMarker = shallowRef<YMapDefaultMarker | null>(null);
  const onDragMove = () => {
    triggerRef(defaultMarker);
};

  //Можно использовать для различных преобразований
  const map = shallowRef<null | YMap>(null);
  </script>

<style scoped>
.marker-popup {
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  color: black;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.marker {
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  padding: 10px 20px;
  white-space: nowrap;
}

.popup {
  position: absolute;
  top: calc(100% + 10px);
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  color: black;
}
</style>