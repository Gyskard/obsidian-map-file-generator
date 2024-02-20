<template>
  <el-space class="ml-5 mt-5" direction="vertical" alignment="start">
    <h2 class="text-4 font-400 text-left">Logs</h2>
    <el-text v-if="logsStore.logs.length === 0">...</el-text>
    <el-text v-else v-for="(log, index) in logsStore.logs" :key="index">
      <Status :status="log.status" />
      {{ log.text }}
    </el-text>
  </el-space>
</template>

<script setup lang="ts">
import { useLogsStore } from '@/stores/logs'

const logsStore = useLogsStore()
</script>
