import type { Place, UrlData } from '../types/data.types'
import saveAs from 'file-saver'

const placeURL = /^https:\/\/(?:www\.)?google\.[a-z.]+\/maps\/place\/([^/?#]+)/
const pinCoordinates = /!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/
const viewCoordinates = /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/

export const isPlaceURL = (url: string): boolean => placeURL.test(url)

// Characters forbidden in file names or breaking Obsidian links
export const cleanName = (name: string): string => {
  const cleaned = name
    .replace(/[‘’]/g, "'")
    .replace(/[\\/:*?"<>|#^[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

// Google sometimes appends the address to the name: "Name, street, 22000 City"
const postalCode = /\b\d{5}\b|\b[A-Z]\d[A-Z] ?\d[A-Z]\d\b|\b\d{4} ?[A-Z]{2}\b/
export const removeAddress = (name: string): string => {
  const [first, ...rest] = name.split(',')
  return rest.some((part) => postalCode.test(part)) ? first : name
}

export const getDataFromURL = (url: string): UrlData => {
  const name = url.match(placeURL)?.[1]
  // !3d!4d is the place pin, @lat,lng is only the center of the map view
  const coordinates = url.match(pinCoordinates) ?? url.match(viewCoordinates)
  if (!name || !coordinates) throw new Error('unable to read the name or the coordinates')
  return {
    name: cleanName(removeAddress(decodeURIComponent(name.replace(/\+/g, ' ')))),
    latitude: coordinates[1],
    longitude: coordinates[2]
  }
}

// The first selected value that is a type becomes the `type` link, the others become tags
export const toMarkdown = (place: Place, typeList: Array<string>): string => {
  const type = place.tags.find((tag) => typeList.includes(tag))
  const tags = place.tags.filter((tag) => tag !== type)
  return [
    '---',
    'coordinates:',
    `  - ${JSON.stringify(place.latitude)}`,
    `  - ${JSON.stringify(place.longitude)}`,
    ...(type ? [`type: ${JSON.stringify(`[[${type}]]`)}`] : []),
    ...(tags.length ? ['tags:', ...tags.map((tag) => `  - ${tag}`)] : []),
    '---',
    ''
  ].join('\n')
}

export const fileExists = async (folder: FileSystemDirectoryHandle, fileName: string) => {
  try {
    await folder.getFileHandle(fileName)
    return true
  } catch {
    return false
  }
}

// Writes in the chosen folder, or downloads the file when no folder is chosen
export const saveFile = async (
  fileName: string,
  content: string,
  folder?: FileSystemDirectoryHandle
) => {
  if (!folder) {
    saveAs(new Blob([content], { type: 'text/markdown;charset=utf-8' }), fileName)
    return
  }
  const file = await folder.getFileHandle(fileName, { create: true })
  const writable = await file.createWritable()
  await writable.write(content)
  await writable.close()
}
