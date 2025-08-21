# 🎉 Kids Learning Website (Ages 3–6)

A **fun and interactive single-page web application** for children to learn **numbers, letters, and basic math skills** through colorful activities, audio guidance, and rewards.

Built with **HTML5, CSS (Tailwind optional), and JavaScript**, fully client-side and **easy to deploy on GitHub Pages**.

---

## **Features**

- Home Page with “Learn Numbers” and “Learn Letters”
- Numbers Activities: Count, Add, Subtract, Match, Fill Missing, Even/Odd
- Letters Activities: Balloon Pop, Match Letter, Fill Missing, Before & After
- Correct answer triggers confetti 🎉
- Wrong answer triggers shake animation
- Text-to-speech with adjustable voice (rate, pitch, volume)
- Repeat question button
- Points & gift/reward system with gift collection

---

## **Run Locally**

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/kids-learning.git
cd kids-learning
```

## Install Live Server (optional)
```bash
   npm install -g live-server
```

### Run the app
```bash
   live-server
```

Open your browser at http://127.0.0.1:8080.

# Deploy to GitHub Pages

Create a GitHub repository

1. Go to GitHub → New repository → kids-learning

2. Initialize git (if not already done)
```bash

git init
git add .
git commit -m "Initial commit"
```
3. Add remote origin
```bash

git remote add origin https://github.com/yourusername/kids-learning.git
```

4. Push code to GitHub
```bash

git branch -M main
git push -u origin main
```

# Enable GitHub Pages

1. Go to your repository → Settings → Pages
2. Source: main branch, root folder (/) → Save

Access your live app
GitHub will provide a URL like:

https://yourusername.github.io/kids-learning/

Folder Structure

```kids-learning/
│
├─ index.html         # Main HTML file
├─ style.css          # CSS (Tailwind/custom)
├─ js/
│   ├─ main.js        # Navigation & activity logic
│   ├─ ui.js          # Rendering functions
│   ├─ data.js        # Problem generators
│   └─ audio.js       # Voice/audio
├─ assets/            # Images, sounds, etc.
└─ README.md
```

Notes
Make sure all paths are relative, e.g., style.css, js/main.js.<br>
Test locally before pushing to GitHub Pages.<br>
Works in all modern browsers.