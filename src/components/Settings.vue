<template>
  <el-form class="max-w-3xl" :model="form" label-width="150px" :rules="rules" ref="formRef">
    <el-form-item :label="$t('form.url.label')" prop="url">
      <el-input v-model="form.url" :validate-event="false" />
    </el-form-item>
    <el-form-item :label="$t('form.tags.label')" prop="tags">
      <el-select
        v-model="form.tags"
        multiple
        filterable
        :placeholder="$t('form.tags.placeholder')"
        :validate-event="false"
      >
        <el-option
          v-for="item in tagList"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('form.folder.label')">
      <el-button v-if="canChooseFolder" @click="chooseFolder">
        {{ folder?.name ?? $t('form.folder.button') }}
      </el-button>
      <el-text v-else>{{ $t('form.folder.unsupported') }}</el-text>
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
import { reactive, ref, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Form } from '@/types/settings.types'
import { tagList } from '@/config/tags'
import { useLogsStore } from '@/stores/logs'
import { fileExists, getDataFromURL, isPlaceURL, saveFile, toMarkdown } from '@/utils/data'
import { Status } from '@/types/data.types'

const logsStore = useLogsStore()
const { t } = useI18n()

const form = reactive<Form>({ url: '', tags: [tagList[0].value] })
const formRef = ref<FormInstance>()

// Writing directly in a folder is only supported by Chromium based browsers
const canChooseFolder = 'showDirectoryPicker' in window
const folder = shallowRef<FileSystemDirectoryHandle>()

const chooseFolder = async () => {
  try {
    folder.value = await window.showDirectoryPicker({ mode: 'readwrite' })
  } catch {
    // picker closed without choosing a folder
  }
}

const validateURL = (_: any, value: any, callback: any) => {
  if (!isPlaceURL(value)) callback(new Error(t('form.url.rule')))
  else callback()
}

const rules = reactive<FormRules<Form>>({
  url: { validator: validateURL, required: true },
  tags: { required: true, message: t('form.tags.rule') }
})

const generateFile = async () => {
  try {
    const dataFromURL = getDataFromURL(form.url)
    const fileName = `${dataFromURL.name}.md`
    if (
      folder.value &&
      (await fileExists(folder.value, fileName)) &&
      !window.confirm(t('confirm.overwrite', { name: fileName }))
    ) {
      logsStore.addLog({
        text: `${t('logs.status.cancelled')} ${dataFromURL.name}`,
        status: Status.Failed
      })
      return
    }
    await saveFile(fileName, toMarkdown({ ...dataFromURL, tags: form.tags }, tagList), folder.value)
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
  await formEl.validate(async (valid) => {
    if (valid) {
      await generateFile()
      form.url = ''
    }
  })
}

defineExpose({ generateFile })
</script>
