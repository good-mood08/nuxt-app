<template>
  <div>
    <Map :points="response"></Map>
    <!-- {{JSON.stringify(response,null, 2)  }} -->
  </div>
</template>

<script setup lang="ts">
  const { find } = useStrapi()

  const response = ref()
 response.value = await find('locations')
console.log(JSON.stringify(response.value.data,null, 2) );

</script>
