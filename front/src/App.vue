<template>
  <el-config-provider namespace="ep">
    <PageHeader />
    <Settings />
    <Logs />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'

useDark()
</script>
