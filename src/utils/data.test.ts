import { describe, expect, it } from '@jest/globals'
import { cleanName, getDataFromURL, isPlaceURL, removeAddress, toMarkdown } from './data'

const typeList = ['todo', 'food']

describe('getDataFromURL', () => {
  it('should use the place pin rather than the map view center', () => {
    const data = getDataFromURL(
      'https://www.google.com/maps/place/Bains+de+Soufre/@41.6874535,44.8103013,154m/data=!3m1!1e3!4m6!3m5!1s0x40440cd6e4b5b2a7:0x9f6b8d1a8c0c0f4!8m2!3d41.6880083!4d44.8109444!16s%2Fg%2F11b6g5x8yz'
    )
    expect(data).toStrictEqual({
      name: 'Bains de Soufre',
      latitude: '41.6880083',
      longitude: '44.8109444'
    })
  })
  it('should fall back on the map view center when there is no pin', () => {
    const data = getDataFromURL(
      'https://www.google.com/maps/place/Montr%C3%A9al,+QC/@45.5593046,-73.876679,11z'
    )
    expect(data).toStrictEqual({
      name: 'Montréal, QC',
      latitude: '45.5593046',
      longitude: '-73.876679'
    })
  })
  it('should decode every encoded character and accept other Google domains', () => {
    const data = getDataFromURL(
      'https://www.google.fr/maps/place/Foynes+Flying+Boat+%26+Maritime+Museum/@52.6115,-9.1105,17z'
    )
    expect(data.name).toEqual('Foynes Flying Boat & Maritime Museum')
  })
  it('should remove the address appended to the name', () => {
    const data = getDataFromURL(
      'https://www.google.com/maps/place/Tour+de+Cesson,+Rue+du+Commandant+le+Conniat,+22000+Saint-Brieuc/@48.528605,-2.7233055,39m/data=!3m1!1e3!4m10!1m3!11m2!2sz01Dx3tJzuzK_Wj7-2BBDw2wN_lRHQ!3e7!3m5!1s0x480e0334f1bbe003:0xd5a155d4c7418365!8m2!3d48.528605!4d-2.723046!16s%2Fg%2F11crzsfpfh?entry=ttu&g_ep=EgoyMDI2MTAxMy4wIKXMDSoASAFQAw%3D%3D'
    )
    expect(data).toStrictEqual({
      name: 'Tour de Cesson',
      latitude: '48.528605',
      longitude: '-2.723046'
    })
  })
  it('should throw when the URL has no coordinates', () => {
    expect(() => getDataFromURL('https://www.google.com/maps/place/Nowhere')).toThrow()
  })
})

describe('isPlaceURL', () => {
  it('should accept place URLs from any Google domain', () => {
    expect(isPlaceURL('https://www.google.com/maps/place/A/@1,2,3z')).toBe(true)
    expect(isPlaceURL('https://www.google.co.uk/maps/place/A/@1,2,3z')).toBe(true)
  })
  it('should reject other URLs', () => {
    expect(isPlaceURL('https://maps.app.goo.gl/abc')).toBe(false)
    expect(isPlaceURL('https://www.google.com/maps/search/A')).toBe(false)
  })
})

describe('removeAddress', () => {
  it('should keep names containing a comma but no address', () => {
    expect(removeAddress('Museum of Fine Arts, Boston')).toEqual('Museum of Fine Arts, Boston')
    expect(removeAddress('Rideau Canal, Lock 32 - Poonamalie')).toEqual(
      'Rideau Canal, Lock 32 - Poonamalie'
    )
  })
  it('should remove addresses with postal codes from several countries', () => {
    expect(removeAddress('Krämerbrücke, 99084 Erfurt-Altstadt, Allemagne')).toEqual('Krämerbrücke')
    expect(removeAddress('Ange, 345 Avenue Viger Ouest, Montréal, QC H2Z 2B8')).toEqual('Ange')
    expect(removeAddress('Berenstraat, 1016 GH Amsterdam, Pays-Bas')).toEqual('Berenstraat')
  })
})

describe('cleanName', () => {
  it('should normalize apostrophes, remove forbidden characters and capitalize', () => {
    expect(cleanName('tour d’observation: #1 / est')).toEqual("Tour d'observation 1 est")
  })
})

describe('toMarkdown', () => {
  const place = { name: 'A', latitude: '41.6880083', longitude: '-44.8109444' }
  it('should link the first selected type and keep the other values as tags', () => {
    expect(toMarkdown({ ...place, tags: ['trip', 'food', 'todo'] }, typeList)).toEqual(
      [
        '---',
        'coordinates:',
        '  - "41.6880083"',
        '  - "-44.8109444"',
        'type: "[[food]]"',
        'tags:',
        '  - trip',
        '  - todo',
        '---',
        ''
      ].join('\n')
    )
  })
  it('should omit tags when only a type is selected and type when none is selected', () => {
    expect(toMarkdown({ ...place, tags: ['todo'] }, typeList)).not.toContain('tags:')
    expect(toMarkdown({ ...place, tags: ['trip'] }, typeList)).not.toContain('type:')
  })
})
