export const messages = {
  en: {
    form: {
      button: {
        text: 'Generate'
      },
      tags: {
        label: 'Tags',
        placeholder: 'Select tags',
        rule: 'At least one tag is required'
      },
      url: {
        label: 'Google Maps URL',
        rule: 'Google Maps place URL is required'
      },
      folder: {
        label: 'Folder',
        button: 'Choose folder',
        unsupported:
          'Files are downloaded (choosing a folder requires Chrome, Edge or another Chromium browser)'
      }
    },
    confirm: {
      overwrite: '{name} already exists in this folder. Replace it?'
    },
    logs: {
      status: {
        success: 'generate file for',
        failed: 'something bad happened :',
        cancelled: 'file already exists, cancelled for'
      }
    }
  }
}
