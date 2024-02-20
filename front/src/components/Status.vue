<template>
  <el-icon v-if="props.status === Status.Success" color="green">
    <Check />
  </el-icon>
  <el-icon v-else color="red">
    <Close />
  </el-icon>
</template>

<script setup lang="ts">
import { Check } from '@element-plus/icons-vue'
import { Close } from '@element-plus/icons-vue'
import { Status } from '@/types/data.types'

const props = defineProps(['status'])
</script>
