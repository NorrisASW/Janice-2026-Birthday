# OPENCODE-HANDOFF.md

## Objective
Build an interactive birthday website based on `PROJECT-BLUEPRINT.md`.

This is not a generic birthday page.  
It is a small interactive story experience.

Priority order:
1. feeling and interaction
2. visual style
3. story flow
4. polish
5. mobile fallback

---

## Build Principles
### 1. Do not over-engineer
Use a simple structure.

Recommended stack:
- HTML
- CSS
- vanilla JavaScript
- p5.js for animation and interactive scene logic

Do not start with React unless absolutely needed.

### 2. Laptop-first
Primary experience is on laptop.  
Mobile only needs graceful fallback, not full parity.

### 3. Separate content from logic
Text content should be easy to edit without rewriting core code.

Use:
- JSON or JS object config for scene content
- separate asset manifest if possible

### 4. Build scene by scene
Do not attempt all scenes in one pass.

---

## Recommended Project Structure
```text
/
  index.html
  style.css
  main.js

  /assets
    /images
    /audio
    /icons

  /data
    content.json
    scenes.json

  /js
    app.js
    state.js
    sceneManager.js
    ui.js
    interactions.js
    audio.js

    /scenes
      loginScene.js
      craftRoomScene.js
      fluffyMissionScene.js
      croissantMissionScene.js
      batchScene.js
      finalScene.js
```

If OpenCode prefers fewer files, that is acceptable, but these responsibilities should remain separated.

---

## Required Scene List

### Scene 0 — Login
Requirements:
- date input for day and month
- correct answer: `24 / 08`
- wrong answer feedback
- success transition to craft room

Acceptance criteria:
- user can only continue after correct date
- microcopy displays properly
- transition feels soft and cute

---

### Scene 1 — Craft Room
Requirements:
- main hub scene
- Hello Kitty follows mouse
- bow cursor
- hoverable objects
- click dialogue trigger
- visible handmade craft room environment

Acceptance criteria:
- Hello Kitty motion feels smooth
- room feels alive
- at least 10 interactive hoverable elements
- button to start first mission

---

### Scene 2 — Fluffy Mission
Requirements:
- small drag interaction
- add fluff / craft elements to plush
- completion state

Acceptance criteria:
- drag behaviour works
- mission can be completed clearly
- completion unlocks next state

---

### Scene 3 — Croissant Mission
Requirements:
- simple logic puzzle or ordering game
- cute failure states
- completion state

Acceptance criteria:
- puzzle understandable in under 10 seconds
- mission not too hard
- completion unlocks next state

---

### Scene 4 — Bring the Batch Together
Requirements:
- activate 3 batchmate items
- animate 3 characters entering
- characters walk toward Hello Kitty
- Hello Kitty does not need to verbally respond to each one
- line up 4 characters together
- show names:
  - JANICE
  - TIFFANY
  - CYRIS
  - NORRIS

Acceptance criteria:
- entrance animation readable and cute
- pace not too fast
- Pochacco riding Yoshi should move slowly and adorably
- Shin-chan shows shy smile and `hehe`
- My Melody shows heart and `大愛`

---

### Scene 5 — Batch Photo Reveal
Requirements:
- soft transition from character lineup to real GT batch photo
- show 1 batch photo only

Acceptance criteria:
- transition feels emotional and clean
- no abrupt jump cut
- photo readable and framed nicely

---

### Scene 6 — Final Message
Requirements:
- bridge line from Hello Kitty
- final message from Norris
- replay or ending button

Acceptance criteria:
- readable layout
- emotional pacing works
- final message feels sincere, not too long

---

## State Management
Track:
- login success
- scene progress
- mission completion
- whether batch scene unlocked
- whether final message shown

Recommended:
- lightweight in-memory app state
- optional localStorage for resume / replay

---

## Interaction Requirements

### Cursor
- custom red bow cursor
- optional small particles on movement

### Character Motion
- Hello Kitty should smoothly follow mouse
- use easing or interpolation
- idle animation should exist

### Hover Micro-Interactions
Craft room should include hover captions on objects.

Examples:
- cotton
- croissant
- laptop
- coffee
- photo
- shelf
- ribbon
- plush

### Click Interactions
At minimum:
- start mission
- acknowledge dialogue
- reveal / activate items
- replay ending

---

## Visual Style Requirements
Use:
- soft pinks
- creams
- Hello Kitty red
- soft handcrafted textures
- subtle felt / stitched details
- gentle rounded shapes

Avoid:
- harsh neon
- overly cluttered UI
- cyberpunk look
- heavy black tech aesthetic

The site should feel like:
- cute handcrafted storybook
- with a bit of UI humour

---

## Language Requirements
### English
Use for:
- buttons
- labels
- system text
- tech jokes

### Traditional Chinese
Use for:
- dialogue
- emotional lines
- casual conversational moments

Important:
Cantonese phrasing should feel natural for Hong Kong users.

Avoid unnatural or too-written Cantonese.

---

## Content Notes
### Janice
Traits to express:
- thoughtful
- reliable
- quick to understand things
- likes fluffy handmade things
- made croissants before
- warm presence in batch
- curious, but not “overly drill” in a caricature way
- wears glasses

### Tiffany
Represented by Shin-chan:
- shy smile
- says `hehe`

### Cyris
Represented by My Melody:
- shows heart
- `大愛`

### Norris
Represented by Pochacco riding Yoshi:
- cute
- slow
- funny but not too chaotic

---

## Delivery Phases

### Phase 1 — Skeleton
Build:
- file structure
- scene manager
- basic overlays
- basic styles

### Phase 2 — Core Hub
Build:
- login
- craft room
- Hello Kitty follow mouse
- object interactions

### Phase 3 — Missions
Build:
- fluffy mission
- croissant mission

### Phase 4 — Batch Sequence
Build:
- item activation
- character entrance
- four-character lineup
- names
- photo reveal

### Phase 5 — Final Message
Build:
- final bridge
- message layout
- replay control

### Phase 6 — Polish
Build:
- transitions
- particles
- hover details
- optional audio
- responsive cleanup

---

## QA Checklist
### Functional
- [ ] correct birthday `24 / 08` unlocks site
- [ ] wrong date shows feedback
- [ ] all scenes can be completed
- [ ] user can reach final message
- [ ] replay works

### Interaction
- [ ] Hello Kitty follows mouse smoothly
- [ ] drag actions work
- [ ] characters enter at readable pace
- [ ] Pochacco riding Yoshi is not too fast
- [ ] hover captions do not block core UI

### Content
- [ ] names are correct
- [ ] Cantonese lines feel natural
- [ ] final message tone is right
- [ ] Tiffany / Cyris / Norris character actions are correct

### Visual
- [ ] handmade feeling is strong
- [ ] Hello Kitty identity is clear
- [ ] scene transitions are soft
- [ ] batch photo reveal feels warm

---

## What OpenCode Should Produce First
Before full build, OpenCode should first produce:

### 1. Static scene mockups
At least:
- login screen
- craft room
- croissant mission
- four-character lineup / batch photo reveal

### 2. Motion prototype
At least:
- Hello Kitty follows mouse
- hover interactions
- one simple transition

Only after these feel correct should full implementation continue.

---

## How to Prompt OpenCode
Recommended first prompt:

```text
Build a laptop-first interactive birthday website called "Hello Kitty’s Secret Craft Lab" using HTML, CSS, vanilla JavaScript, and p5.js.

Read and follow:
1. PROJECT-BLUEPRINT.md
2. OPENCODE-HANDOFF.md

Start with Phase 1 and Phase 2 only:
- project scaffold
- scene manager
- login scene
- main craft room scene
- Hello Kitty following mouse
- hoverable craft room objects
- natural Hong Kong Traditional Chinese dialogue
- English UI labels

Do not build all scenes yet.
First deliver:
1. file structure
2. core implementation
3. clear notes on where to plug in assets
4. instructions to run locally
5. list of missing art assets still needed
```

---

## How to Continue After First Delivery
Second prompt:

```text
Continue the project.

Build Phase 3:
- fluffy mission
- croissant mission

Keep the existing visual language and code structure.
Make the interactions simple, cute, and reliable.
```

Third prompt:

```text
Continue the project.

Build Phase 4 and Phase 5:
- batchmate activation scene
- Shin-chan shy smile with "hehe"
- My Melody heart with "大愛"
- Pochacco riding Yoshi entering slowly
- four-character lineup
- name reveal
- batch photo reveal
- final message scene
```

Final polish prompt:

```text
Polish the website:
- improve transitions
- improve particles
- refine hover captions
- add optional sound toggle
- improve laptop experience
- ensure mobile does not break
- clean up spacing and typography
```

---

## Input Assets You Will Need
Prepare these before or during build:
- Hello Kitty visual assets or stylised original equivalents
- glasses version / overlay
- Shin-chan visual
- My Melody visual
- Pochacco visual
- Yoshi visual
- background textures
- craft props
- GT batch photo
- final message text
- optional sound effects

If final exact assets are not ready yet, use placeholders first.