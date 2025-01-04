import { describe, expect, it } from '@jest/globals'
import { getDataFromURL, tagsToString } from './data'

describe('validateURL', () => {
  it('should return name and localisation when giving correct google maps url', () => {
    const data = getDataFromURL(
      'https://www.google.com/maps/place/Montr%C3%A9al,+QC/@45.5593046,-73.876679,11z'
    )
    expect(data).toStrictEqual({
      name: 'Montréal, QC',
      localisation: '45.5593046,-73.876679'
    })
  })
  it('should return name and localisation when giving correct google maps url', () => {
    const data = getDataFromURL(
      'https://www.google.com/maps/place/Bains+de+Soufre/@41.6874535,44.8103013,154m'
    )
    expect(data).toStrictEqual({
      name: 'Bains de Soufre',
      localisation: '41.6874535,44.8103013'
    })
  })
})

describe('tagsToString', () => {
  it('should return string with every tags when giving correct array of strings', () => {
    expect(tagsToString(['test1', 'test2'])).toEqual('#test1 #test2')
  })
  it('should return empty string when giving empty array', () => {
    expect(tagsToString([])).toEqual('')
  })
})
