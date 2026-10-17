import type { Tag } from '../types/settings.types'

// Edit this list to match your own tags.
// icon: a Lucide icon name (https://lucide.dev/icons), color: any CSS color.
// The marker uses the icon and color of the first selected tag that defines them.
export const defaultIcon = 'circle'
export const defaultColor = 'var(--color-blue)'

const green = 'var(--color-green)'
const yellow = 'var(--color-yellow)'
const pink = 'var(--color-pink)'
const cyan = 'var(--color-cyan)'
const red = 'var(--color-red)'
const blue = 'var(--color-blue)'
const black = '#2b2b2b'

export const tagList: Tag[] = [
  { value: 'todo', icon: 'list', color: black },
  { value: 'todoprio', icon: 'list', color: blue },
  { value: 'food', icon: 'utensils', color: green },
  { value: 'place', icon: 'circle', color: green },
  { value: 'park', icon: 'trees', color: green },
  { value: 'building', icon: 'building', color: green },
  { value: 'urbex', icon: 'ghost', color: green },
  { value: 'museum', icon: 'landmark', color: green },
  { value: 'walk', icon: 'footprints', color: green },
  { value: 'water', icon: 'waves', color: green },
  { value: 'parking', icon: 'square-parking', color: green },
  { value: 'religion', icon: 'church', color: green },
  { value: 'photo', icon: 'camera', color: green },
  { value: 'station', icon: 'train-front', color: green },
  { value: 'train', icon: 'train-front', color: green },
  { value: 'castle', icon: 'castle', color: green },
  { value: 'art', icon: 'paintbrush', color: green },
  { value: 'national-park', icon: 'mountain', color: green },
  { value: 'monument', icon: 'pyramid', color: green },
  { value: 'bridge', icon: 'route', color: green },
  { value: 'beach', icon: 'tree-palm', color: green },
  { value: 'boat', icon: 'ship-wheel', color: green },
  { value: 'lighthouse', icon: 'lightbulb', color: green },
  { value: 'plane', icon: 'plane', color: green },
  { value: 'cave', icon: 'flashlight', color: green },
  { value: 'port', icon: 'anchor', color: green },
  { value: 'airport', icon: 'plane-takeoff', color: green },
  { value: 'city', icon: 'building-2', color: green },
  { value: 'capitol', icon: 'flag', color: green },
  { value: 'arc', icon: 'rainbow', color: green },
  { value: 'street', icon: 'signpost', color: green },
  { value: 'stairs', icon: 'chart-no-axes-column-increasing', color: green },
  { value: 'pharmacy', icon: 'pill', color: green },
  { value: 'tower', icon: 'tower-control', color: green },
  { value: 'library', icon: 'library', color: green },
  { value: 'tunnel', icon: 'train-front-tunnel', color: green },
  { value: 'bike', icon: 'bike', color: green },
  { value: 'ski', icon: 'mountain-snow', color: green },
  { value: 'text', icon: 'message-square-text', color: green },
  { value: 'zoo', icon: 'panda', color: green },
  { value: 'paper', icon: 'printer', color: green },
  { value: 'sailboat', icon: 'sailboat', color: green },
  { value: 'telepherique', icon: 'cable-car', color: green },
  { value: 'aquarium', icon: 'fish', color: green },
  { value: 'hotel', icon: 'bed', color: yellow },
  { value: 'camping', icon: 'tent', color: yellow },
  { value: 'home', icon: 'house-heart', color: yellow },
  { value: 'old-home', icon: 'house', color: yellow },
  { value: 'work', icon: 'briefcase-business', color: cyan },
  { value: 'old-work', icon: 'computer', color: cyan },
  { value: 'service', icon: 'info', color: pink },
  { value: 'market', icon: 'shopping-cart', color: pink },
  { value: 'shopping', icon: 'shirt', color: pink },
  { value: 'medical', icon: 'hospital', color: pink },
  { value: 'gas', icon: 'fuel', color: pink },
  { value: 'car', icon: 'car', color: pink },
  { value: 'garage', icon: 'wrench', color: pink },
  { value: 'ferry', icon: 'ship', color: pink },
  { value: 'bus', icon: 'bus', color: pink },
  { value: 'heliport', icon: 'helicopter', color: pink },
  { value: 'laundry', icon: 'washing-machine', color: pink },
  { value: 'coiffure', icon: 'scissors', color: pink },
  { value: 'opticien', icon: 'glasses', color: pink },
  { value: 'poste', icon: 'mail', color: pink },
  { value: 'activity', icon: 'trophy', color: red },
  { value: 'show', icon: 'drama', color: red }
]
