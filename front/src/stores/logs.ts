import type { Log } from '@/types/data.types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useLogsStore = defineStore('logs', () => {
  const logs: Ref<Array<Log>> = ref([])

  const addLog = (log: Log) => {
    if (logs.value.length > 9) logs.value.pop()
    logs.value.unshift(log)
  }

  return { logs, addLog }
})
