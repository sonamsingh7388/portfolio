# Sonam Singh — Personal Portfolio Website

A modern, responsive, and professional personal portfolio website built with pure **HTML, CSS, and JavaScript** — no frameworks needed.

---

## 🗂️ File Structure

```
My portfolio/
├── index.html                  ← Main portfolio page
├── README.md                   ← This file
├── assets/
│   ├── css/
│   │   └── style.css           ← All styles (dark theme, glassmorphism, responsive)
│   ├── js/
│   │   └── main.js             ← Interactions, animations, form validation
│   ├── images/
│   │   ├── profile.jpg         ← Your profile photo (replace with real photo)
│   │   └── hero-bg.jpg         ← Hero background image
│   └── resume/
│       ├── README.txt          ← Instructions for adding your resume
│       └── resume.pdf          ← ADD YOUR RESUME HERE (not included yet)
```

---

## 🚀 How to Run Locally

### Option A — Open directly in a browser (simplest)
1. Double-click `index.html` to open it in your browser.
2. Everything works out of the box — no build step required.

### Option B — Use Live Server (VS Code, recommended)
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The site auto-reloads when you save changes.

### Option C — Python simple HTTP server
```bash
python -m http.server 5500
# Then open: http://localhost:5500
```

---

## 📸 How to Add Your Profile Photo

1. Take or choose a professional photo of yourself.
2. Rename the file to `profile.jpg`.
3. Place it in `assets/images/profile.jpg` (overwrite the placeholder).
4. Best: square crop (1:1), min 400x400px, facing the camera.

---

## 📄 How to Add Your Resume

1. Export your resume as a **PDF**.
2. Name it exactly: `resume.pdf`
3. Place it in `assets/resume/resume.pdf`.
4. The Download Resume button will automatically work.

---

## ✏️ How to Update Projects

Open `index.html` and find the project sections (search for `id="project1"`, `id="project2"`, `id="project3"`).

For each project, update these parts:

```html
<!-- Project title -->
<h3 class="project-title">Your Project Name Here</h3>

<!-- Short description -->
<p class="project-desc">What your project does...</p>

<!-- Tech tags -->
<div class="tech-stack">
  <span class="tech-tag">Python</span>
  <span class="tech-tag">Streamlit</span>
</div>

<!-- GitHub link — replace the href -->
<a href="https://github.com/sonamsingh7388/YOUR-REPO-NAME" ...>GitHub</a>

<!-- Live Demo link — replace the href -->
<a href="https://your-app.streamlit.app" ...>Live Demo</a>
```

---

## 📧 How to Add Contact Details

In `index.html`, find the `<!-- TODO -->` comments in the contact section and footer:

- Replace `your.email@example.com` with your real email address.
- Replace `https://linkedin.com/in/your-linkedin-username` with your LinkedIn URL.

---

## 📬 How to Enable Real Email Sending

The form is currently demo-only. To send real emails:

**Formspree (free, easiest):**
1. Sign up at formspree.io
2. Create a form → get your endpoint URL
3. Add `action="https://formspree.io/f/YOUR_ID"` to the form tag in `index.html`
4. Change form method to `method="POST"` and remove the JS override

**EmailJS (no backend):**
1. Sign up at emailjs.com
2. Follow their JS SDK setup
3. Replace the demo submit handler in `assets/js/main.js`

---

## 🌐 How to Deploy Online (Free)

**GitHub Pages (recommended):**
1. Push all files to a GitHub repository
2. Go to Settings → Pages → Deploy from branch → main / root
3. Live at: `https://sonamsingh7388.github.io/repo-name`

**Netlify (drag and drop):**
1. Go to netlify.com
2. Drag the entire portfolio folder onto the deploy area
3. Instantly live with a free URL

**Vercel:**
1. Push to GitHub
2. Import at vercel.com
3. Deploy with one click

---

## ✅ TODO Checklist

- [ ] Replace profile.jpg with your real photo
- [ ] Add resume.pdf to assets/resume/
- [ ] Update Project 1 GitHub and Live Demo URLs
- [ ] Update Project 2 GitHub and Live Demo URLs
- [ ] Fill in Project 3 title, description, and URLs
- [ ] Update email address in contact section and footer
- [ ] Update LinkedIn URL in contact section and footer
- [ ] Connect contact form to Formspree or EmailJS
- [ ] Deploy online

---

*Built with HTML, CSS, and JavaScript — Sonam Singh, B.Tech CSE (Data Science)*
