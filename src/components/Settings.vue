<template>
  <el-form class="max-w-3xl" :model="form" label-width="150px" :rules="rules" ref="formRef">
    <el-form-item :label="$t('form.url.label')" prop="url">
      <el-input v-model="form.url" :validate-event="false" />
    </el-form-item>
    <el-form-item :label="$t('form.tags.label')" prop="tags">
      <el-select
        v-model="form.tags"
        multiple
        :placeholder="$t('form.tags.placeholder')"
        :validate-event="false"
      >
        <el-option
          v-for="item in tagList"
          :key="item.value"
          :label="$t(item.label)"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item class="mt-6">
      <el-button type="primary" @click="submitForm(formRef)">{{
        $t('form.button.text')
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Form, Tag } from '@/types/settings.types'
import { useLogsStore } from '@/stores/logs'
import { downloadFile, getDataFromURL } from '@/utils/data'
import { Status } from '@/types/data.types'

const logsStore = useLogsStore()
const { t } = useI18n()

const tagList: Tag[] = [{ label: 'form.tags.values.todo', value: 'todo' }]
const form = reactive<Form>({ url: '', tags: [tagList[0].value] })
const formRef = ref<FormInstance>()

const validateURL = (_: any, value: any, callback: any) => {
  if (!value.startsWith('https://www.google.com/maps/place/'))
    callback(new Error(t('form.url.rule')))
  else callback()
}

const rules = reactive<FormRules<Form>>({
  url: { validator: validateURL, required: true },
  tags: { required: true, message: t('form.tags.rule') }
})

const generateFile = () => {
  try {
    const dataFromURL = getDataFromURL(form.url)
    downloadFile({ ...dataFromURL, tags: form.tags })
    logsStore.addLog({
      text: `${t('logs.status.success')} ${dataFromURL.name}`,
      status: Status.Success
    })
  } catch (error) {
    logsStore.addLog({ text: `${t('logs.status.failed')} ${error}`, status: Status.Failed })
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      generateFile()
      form.url = ''
    }
  })
}

defineExpose({ generateFile })
</script>
