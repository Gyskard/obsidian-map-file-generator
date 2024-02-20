import type { Place, UrlData } from '../types/data.types'
import saveAs from 'file-saver'

export const getDataFromURL = (url: string): UrlData => {
  // yes I know regex is a better solution, leave me alone
  const splitUrl = url.substring(34).split('/')
  const splitLocalisation = splitUrl[1].substring(1).split(',')
  return {
    name: decodeURI(splitUrl[0]).replace(/\+/g, ' '),
    localisation: [splitLocalisation[0], splitLocalisation[1]].join(',')
  }
}

export const tagsToString = (tags: Array<string>): string => tags.map((tag) => `#${tag}`).join(' ')

export const downloadFile = (place: Place) => {
  const markdownContent = `---\nlocations:\n---\n\n[](geo:${place.localisation})\n\n${tagsToString(place.tags)}`
  saveAs(new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' }), `${place.name}.md`)
}
