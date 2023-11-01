import { Template } from "./types"

const skyzhTemplate = `
#set par(justify: true)

#set text(
  size: 12pt,
)

#let makeitem(item) = block[

    // Idk how to make this better :\
    //  titles
    #if item.title.len() != 0 [
      #strong(item.title)
    ]
    #if item.title.len() != 0 or item.rightTitle.len() != 0 [
      #h(1fr)
    ]
    #if item.rightTitle.len() != 0 [
      #item.rightTitle
    ]
    #if item.title.len() != 0 or item.rightTitle.len() != 0 [
      #linebreak(justify: false)
    ]
    // sub titles
    #if item.subTitle.len() != 0 [
      #item.subTitle
    ]
    #if item.subTitle.len() != 0 or item.rightSubTitle.len() != 0 [
      #h(1fr)
    ]
    #if item.rightSubTitle.len() != 0 [
      #item.rightSubTitle
    ]
    #if item.subTitle.len() != 0 or item.rightSubTitle.len() != 0 [
      #linebreak(justify: false)
    ]
    #eval(item.description, mode: "markup")
]

#let makesection(section) = block[
  == #section.name
  #chiline()
  #for item in section.items [
    #makeitem(item)
  ]
]

#let makeresume(resume) = block[
  = #resume.name 
  #let links = ()
  #for url in resume.urls [
    #links.push(url.title)
  ]
  #links.join(" | ")
  #for section in resume.sections [
    #makesection(section)
  ]
]
`

const skyzhWhite = `
#set page(
  margin: (x: 0.9cm, y: 1.3cm),
)

#let chiline() = {v(-3pt); line(length: 100%); v(-5pt)}

#set text(font: "Linux Biolinum")
`

const skyzhDark = `
#set page(
  margin: (x: 0.9cm, y: 1.3cm),
  fill: rgb(32, 32, 32)
)

#let chiline() = {v(-3pt); line(length: 100%, stroke: white); v(-5pt)}

#set text(font: "Linux Biolinum", fill:white)
`

const mizlanTemplate = `
#show heading: set text(weight: "extrabold")

#set par(justify: true)

#let makeitem(item) = block[

    //  titles
    #if item.title.len() != 0 [
      #strong(item.title)
    ]
    #if item.title.len() != 0 or item.rightTitle.len() != 0 [
      #h(1fr)
    ]
    #if item.rightTitle.len() != 0 [
      #text(gray)[#item.rightTitle]
    ]
    #if item.title.len() != 0 or item.rightTitle.len() != 0 [
      #linebreak(justify: false)
    ]
    // sub titles
    #if item.subTitle.len() != 0 [
      #item.subTitle
    ]
    #if item.rightSubTitle.len() != 0 [
      #text(gray)[--- #item.rightSubTitle]
    ]
    #if item.subTitle.len() != 0 or item.rightSubTitle.len() != 0 [
      #linebreak(justify: false)
    ]
    #eval(item.description, mode: "markup")
]

#let makesection(section) = block[
  == #section.name
  #chiline()
  #for item in section.items [
    #makeitem(item)
  ]
]

#let makeresume(resume) = block[
  #text(15pt)[= #resume.name]
  #let links = ()
  #for url in resume.urls [
    #links.push(url.title)
  ]
  #links.join(text(gray)[$space.hair$|$space.hair$])
  #for section in resume.sections [
    #makesection(section)
  ]
]
`

const mizlanhWhite = `
#set page(
  margin: (x: 1.1cm, y: 1.3cm),
 )
 
 #let chiline() = {v(-2pt); line(length: 100%, stroke: rgb("#777777")); v(-5pt)}
 
 #set text(font: "Inter", fill: rgb("#222222"), hyphenate: false)
`

const mizlanDark = `
#set page(
  margin: (x: 1.1cm, y: 1.3cm),
  fill: rgb(32, 32, 32)
 )
 
#let chiline() = {v(-2pt); line(length: 100%, stroke: rgb("#777777")); v(-5pt)}
 
#set text(font: "Inter", fill: white, hyphenate: false)
`

export const skyzh: Template = {
  style: skyzhTemplate,
  white: skyzhWhite,
  dark: skyzhDark,
}

export const mizlan: Template = {
  style: mizlanTemplate,
  white: mizlanhWhite,
  dark: mizlanDark,
}
