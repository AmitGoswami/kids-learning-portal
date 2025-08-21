# Kids Learning Website (Ages 3–6)
## Product Specification – Clickable Wireframe Layout

---

## 1. Home Page
- **Layout**:
    - Header: “:tada: Let’s Learn!” (big, playful font, centered).
    - Two large buttons:
        - :blue_book: **Learn Numbers** (Colorful numbers, e.g., :one::two::three:).
        - :abc: **Learn Letters** (ABC balloons).
    - Footer: Background music toggle :musical_note: (on/off).
- **Interactions**:
    - Tap **Learn Numbers** → Navigate to **Numbers Menu Page**.
    - Tap **Learn Letters** → Navigate to **Letters Menu Page**.
    - Toggle :musical_note: → Mute/unmute background music.

---

## 2. Numbers Menu Page
- **Layout**:
    - Title: “:abacus: Numbers Fun!”
    - Grid of cards (large, colorful buttons):
        1. **Count Objects** (:apple::apple::apple:)
        2. **Add Numbers** (:heavy_plus_sign:)
        3. **Subtract Numbers** (:heavy_minus_sign:)
        4. **Match Numbers** (:game_die: → “3”)
        5. **Fill Missing Numbers** (1, 2, __, 4, 5)
- **Navigation**:
    - Back button :arrow_left: → Home Page.
    - Tap activity → open **Activity Page** for that game.

---

## 3. Letters Menu Page
- **Layout**:
    - Title: “:abc: Letters Fun!”
    - Grid of cards:
        1. **Balloon Pop (Find Letter)** :balloon:
        2. **Match Letter to Object** (A → :apple:)
        3. **Fill Missing Letters** (A, B, __, D)
        4. **Before & After** (What comes after D?)
- **Navigation**:
    - Back button :arrow_left: → Home Page.
    - Tap activity → open **Activity Page** for that game.

---

## 4. Activity Page (Generic Layout for Each Game)
- **Top Bar**:
    - Current Score :star: (e.g., “Score: 30”)
    - Gift progress :gift: (progress bar or meter, e.g., “20/50 points to next gift”).
    - Back :arrow_left: to Numbers/Letters Menu.
- **Main Content Area**:
    - Instruction text + audio button :loud_sound: (e.g., “How many apples?”).
    - Visuals (objects, letters, balloons, etc.).
    - Multiple choice answers (big buttons/cards).
- **Feedback**:
    - Correct answer: Confetti :tada: + “Yay! Well done!” (audio).
    - Wrong answer: Shake animation + “Oops, try again!” (audio).

---

## 5. Rewards Screen (after reaching gift threshold)
- **Layout**:
    - Title: “:gift: You Got a Gift!”
    - Animation: Gift box opening → sticker/badge revealed.
    - Buttons:
        - “Continue Playing” → Back to last activity.
        - “See My Gifts” → Gift Collection Page.

---

## 6. Gift Collection Page
- **Layout**:
    - Title: “:trophy: My Gifts”
    - Grid of unlocked stickers/badges (e.g., :star: :balloon: :bear: :apple:).
    - Empty slots grayed out (to encourage replay).
- **Navigation**:
    - Back :arrow_left: → Rewards Screen or Home.

---

## User Flow (Clickable Simulation)
1. Home Page → Tap **Learn Numbers**.
2. Numbers Menu → Tap **Count Objects**.
3. Activity Page (shows apples, asks “How many?”).
4. Kid answers correctly → Confetti, +10 points.
5. Score hits 50 → Rewards Screen :gift:.
6. Unlock sticker → View in Gift Collection Page.
7. Back to activity or main menu.