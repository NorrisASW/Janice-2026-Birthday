# PROJECT-BLUEPRINT.md

## Project Title
**Hello Kitty’s Secret Craft Lab**

## Project Goal
Build an interactive birthday website for **Janice**.

The website should feel:
- cute
- interactive
- warm
- playful
- handmade
- slightly techy
- very Hongkonger in tone

This is a birthday gift from **Norris** to **Janice**, based on their **GT batchmates friendship**.

The website should not feel romantic.  
It should feel like:
- colleague friendship
- batchmate warmth
- cute inside jokes
- thoughtful personalisation

---

## Core Concept
Hello Kitty is secretly making a birthday gift for Janice inside a handmade craft room.

Janice accidentally unlocks the room using her birthday date:

**24 / 08**

Since the gift is not fully ready yet, Janice helps Hello Kitty complete a few small interactive tasks.

At the end, three representative characters of the batchmates appear, walk toward Hello Kitty, line up together, and then transition into a real GT batch photo.

After that, the final birthday message from Norris is shown.

---

## Main Tone
### Visual Tone
- 60% fluffy handmade
- 30% classic Hello Kitty / Sanrio
- 10% cute tech

### Emotional Tone
- playful first
- warm later
- sincere ending
- not too childish
- not too cyber
- not too romantic

### Language Tone
Use:
- **English** for UI, system text, button labels, and light tech jokes
- **Traditional Chinese** with **natural Hong Kong Cantonese phrasing** for dialogue and emotional lines

Do not use awkward or overly written Cantonese.

---

## Main Characters
### Janice
Represented by:
- Hello Kitty
- glasses detail
- fluffy handmade vibe
- croissant
- curious personality
- quick to understand things
- reliable
- warm
- likes kids
- has a calm but funny side

### Tiffany
Represented by:
- Crayon Shin-chan
- shy smile
- says: `hehe`

### Cyris
Represented by:
- My Melody
- shows a heart
- represents `大愛`

### Norris
Represented by:
- Pochacco riding Yoshi
- appears in a cute, slightly absurd way
- movement should be slow and adorable, not too fast

---

## Story Structure

### Scene 0 — Birthday Login
Janice enters the secret craft lab with birthday lock.

#### Visual
- soft felt / stitched UI
- Hello Kitty inspired keypad panel
- handmade pastel background

#### Main UI Text
```text
HELLO KITTY'S SECRET CRAFT LAB

Birthday Access Code:
[ DD ] [ MM ]

[ UNLOCK ]
```

Correct input:
```text
24 / 08
```

#### Wrong Input Examples
```text
唔係喎，再試下？
```

```text
Invalid date.
你唔係想 debug 自己生日呀嘛？
```

```text
Access denied.
Hello Kitty 好似有少少懷疑你。
```

#### Success Text
```text
ACCESS GRANTED

Hello, Janice.

Wait...
JANICE?!

YOU WEREN'T SUPPOSED TO SEE THIS YET.
```

---

### Scene 1 — Secret Craft Room
Janice enters Hello Kitty’s craft room.

#### Visual Highlights
- large handmade craft table
- cotton / fluff
- yarn
- scissors
- ribbon
- half-made plush
- croissant
- laptop
- coffee mug
- sticky notes
- GT batch photo partially hidden
- small shelf / stage for batch characters
- small decorative references to Tiffany, Cyris, and Norris

#### Interaction
- cursor becomes a red bow
- Hello Kitty follows mouse movement smoothly
- Hello Kitty reacts to clicks
- objects glow / animate slightly on hover
- short hover captions appear

#### Main Dialogue
```text
Janice？！你點會而家入咗嚟㗎？

等陣先…… 呢份禮物仲未整好㗎。

不過你都見到喇，
不如順手幫我執埋尾啦？
```

#### Main Button
```text
[ OKAY LA, LET'S GO ]
```

---

### Scene 2 — Mission 1: Make Something Soft
Janice helps Hello Kitty finish a fluffy handmade plush gift.

#### Gameplay
- drag cotton into plush
- place soft fabric
- tie ribbon / add final touch

#### Tone
This mission reflects Janice’s love for handmade fluffy things.

#### Example Microcopy
```text
Fluffiness increasing...
```

```text
Warning:
Fluff overflow.
```

```text
好似再多啲 fluff 都得。
```

#### Completion Text
```text
MISSION COMPLETE

Trait unlocked:
SOFTNESS
```

#### Reflection Line
```text
有啲嘢一睇就知，
真係好有你風格。
```

---

### Scene 3 — Mission 2: Croissant Debug
Janice helps Hello Kitty fix a croissant-making problem.

#### Gameplay
A cute problem-solving mini-task:
- arrange correct croissant steps
- or identify what went wrong from a few funny failed croissant versions

#### Tone
This reflects Janice’s curiosity, quick understanding, and ability to figure things out.

#### Example Microcopy
```text
Expected:
Croissant

Received:
Something else
```

```text
Root cause analysis required.
```

```text
Requirement:
Make it cute.

Scope:
Increasing.
```

#### Completion Text
```text
MISSION COMPLETE

Trait unlocked:
CURIOSITY
```

#### Reflection Line
```text
你成日都會想再睇深一步，
但又唔會搞到好誇張。
```

---

### Scene 4 — Bring the Batch Together
This is the emotional bridge from cute character world to real batchmates.

#### Story Purpose
Hello Kitty realises the gift is still missing one thing:
the feeling of everyone being together.

#### Dialogue Setup
```text
禮物就差唔多整好，
但總係好似仲差少少。

……啊，差咗大家一齊嗰種感覺。
```

#### Gameplay
Janice activates the shelf / mini stage by placing the 3 batchmate character items:
- Shin-chan item
- My Melody item
- Pochacco riding Yoshi item

After activation, the characters come alive and walk toward Hello Kitty.

#### Character Entrance Rules
##### Tiffany / Shin-chan
- walks out
- shy smile
- says:

```text
hehe
```

##### Cyris / My Melody
- walks out
- shows a heart
- creates heart visual effect
- represents:

```text
大愛
```

##### Norris / Pochacco riding Yoshi
- walks out slowly
- cute parade feel
- not too fast
- slightly absurd but not disruptive

#### Important Rule
Hello Kitty does **not** need to verbally respond to each character one by one.

---

### Scene 5 — Four Characters Line Up
After all three characters walk in, the four character representations line up together.

#### Recommended Lineup
Use a visually balanced lineup with Hello Kitty clearly readable as the central lead character.

Possible order:
- Shin-chan
- My Melody
- Hello Kitty
- Pochacco riding Yoshi

or another arrangement if composition works better.

#### Visual Note
At this point, Hello Kitty can wear glasses to more clearly represent Janice.

#### Main Text
```text
大家鍾意嘅嘢唔同，
性格都唔一樣，
但企埋一齊又真係幾啱。
```

```text
Maybe that’s why this batch feels so special.
```

#### Name Reveal
Show these names below the characters:

```text
JANICE
TIFFANY
CYRIS
NORRIS
```

---

### Scene 6 — Batch Photo Reveal
After the 4 characters line up, transition into the real GT batch photo.

#### Transition Idea
- characters hold still
- soft fade / dissolve
- matching composition helps transform into the real photo
- photo appears in a frame or soft reveal

#### Caption
```text
由可愛角色，
變返我哋真人。
```

or

```text
Different interests.
Different personalities.
Same batch.
```

#### Asset
Use:
- **1 GT batch photo only**

---

### Scene 7 — Final Message
Hello Kitty steps back and the real final message appears.

#### Bridge Line
```text
最後呢部分，
唔係我寫㗎。
```

Then show Norris’ birthday message to Janice.

#### Message Direction
The final message should be:
- sincere
- warm
- not too long
- in natural English with a little Hong Kong flavour if needed
- appreciative
- friendship-based

#### Core Meaning
The message should express:
- Janice makes the GT batch feel warmer
- she is reliable, thoughtful, and quick to understand things
- she has a style and personality people appreciate
- Norris wanted to make her a gift in his own way
- wish her a happy birthday

---

## Interaction System

### Mouse Interaction
- red bow cursor
- small star / heart / stitch particles
- interactive hover effects
- smooth easing

### Hello Kitty Behaviour
- follows mouse gently
- blinks
- small bounce / sway
- reacts to clicks
- looks engaged and alive

### UI Behaviour
- stitched panels
- soft felt buttons
- scrapbook / handmade transitions
- no overly flashy effects

---

## Asset Wishlist
### Character / Prop Assets
- Hello Kitty style character
- glasses overlay for Hello Kitty
- Shin-chan style figure
- My Melody style figure
- Pochacco riding Yoshi figure
- croissant
- cotton / fluff
- plush craft props
- ribbons / yarn / scissors
- shelf / mini stage
- laptop / coffee / sticky notes
- 1 GT batch photo

### Optional Audio
- keep optional
- default muted
- allow toggle
- soft pop / stitch / chime sounds only

---

## Technical Goal
Build as:
- interactive web experience
- laptop-first
- mobile-safe fallback
- deployable on GitHub Pages

Suggested stack:
- HTML
- CSS
- JavaScript
- p5.js for interactive animation
- DOM overlays for UI and dialogue

---

## Success Criteria
Website should make Janice feel:
- this is cute
- this is very personalised
- this is so us
- this feels like our batch
- this is thoughtful
- this is fun to click through
- this was clearly made specially for her