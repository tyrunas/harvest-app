<script setup>
const props= defineProps({
  img:{
    type:String,
    required:true
  }
})

</script>

<template>
  
       <img :src="img" alt="user avatar" width="50" class="user-avatar">
  
</template>

<style scoped lang="scss">
.user-avatar{
  border-radius: 50px;   
  width: 35px;
}
</style>