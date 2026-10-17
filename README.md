# Obsidian Map File Generator

A quick and dirty project to generate a markdown file for the [Obsidian Bases map view](https://obsidian.md/help/bases/views/map) from a Google Maps place URL.

## Screenshot

![](docs/example.png)

## How to use it

```
git clone https://github.com/Gyskard/obsidian-map-file-generator
npm install
npm run dev
```

Paste a Google Maps place URL, select tags and generate. With Chrome, Edge or another Chromium browser, you can choose the destination folder (for example the `Places` folder of your vault) and you are asked before replacing an existing file. Otherwise the file is downloaded.

Generated file:

```
---
coordinates:
  - "41.6880083"
  - "44.8109444"
icon: "list"
color: "#2b2b2b"
tags:
  - todo
---
```

In the map view, set the marker coordinates, icon and color to the `coordinates`, `icon` and `color` properties.

## Tags

Tags, with their marker icon ([Lucide](https://lucide.dev/icons) name) and color, are defined in `src/config/tags.ts`. The marker uses the icon and color of the first selected tag that defines them.

## Built With

* VueJS
* Pinia
* ElementPlus
