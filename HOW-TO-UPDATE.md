# Rashmi Pal Portfolio — How to Update Content

## Folder Structure

```
portfolio/
├── index.html          ← Main website file (edit content here)
├── style.css           ← Visual styling
├── script.js           ← Interactions (lightbox, nav, form)
├── cv/
│   └── rashmi-pal-cv.pdf    ← Place your CV PDF here
└── images/
    ├── profile.jpg          ← Your profile photo (any size, preferably portrait)
    └── projects/
        ├── guest-house/     ← Add: 01.jpg, 02.jpg, 03.jpg ...
        ├── daycare/         ← Add: 01.jpg, 02.jpg, 03.jpg ...
        ├── preschool/       ← Add: 01.jpg, 02.jpg, 03.jpg ...
        └── yatri-niwas/     ← Add: 01.jpg, 02.jpg, 03.jpg, 04.jpg, 05.jpg, 06.jpg
```

---

## Adding Your Profile Photo

Place a photo named **`profile.jpg`** inside the `images/` folder.
- Recommended: portrait orientation, at least 600×800px
- Formats supported: .jpg, .jpeg, .png, .webp

---

## Adding Project Images

Put images inside the corresponding project folder:

| Project | Folder |
|---|---|
| Guest House | `images/projects/guest-house/` |
| Daycare Center | `images/projects/daycare/` |
| Pre-School | `images/projects/preschool/` |
| Yatri Niwas | `images/projects/yatri-niwas/` |

Name them `01.jpg`, `02.jpg`, `03.jpg`, etc.

To add more images to the lightbox gallery, open `index.html` and find the project's
`data-images` attribute, then add more paths:

```html
data-images='["images/projects/yatri-niwas/01.jpg","images/projects/yatri-niwas/07.jpg"]'
```

---

## Adding Your CV

Place your CV file at: `cv/rashmi-pal-cv.pdf`

The "Download CV" button will then work automatically.

---

## Updating Social Media Links

Open `index.html` and find the contact section. Update these `href` values:

```html
<a href="https://linkedin.com/in/YOUR-USERNAME" ...>LinkedIn</a>
<a href="https://behance.net/YOUR-USERNAME" ...>Behance</a>
<a href="https://instagram.com/YOUR-USERNAME" ...>Instagram</a>
```

---

## Updating the Contact Email

In `index.html`, find and replace `rashmipal@email.com` with your real email.
Also update it in `script.js` on the `mailto:` line.

---

## Free Hosting Options

### Option 1: GitHub Pages (Recommended — Free)
1. Create a free GitHub account at github.com
2. Create a new repository named `rashmipal-portfolio`
3. Upload all files to the repository
4. Go to Settings → Pages → Source: main branch
5. Your site goes live at: `https://yourusername.github.io/rashmipal-portfolio`

### Option 2: Netlify (Free, Drag & Drop)
1. Go to netlify.com → Sign up free
2. Drag and drop your entire portfolio folder onto the Netlify dashboard
3. Your site goes live instantly with a free URL

### Option 3: Vercel (Free)
1. Go to vercel.com → Sign up free
2. Import your GitHub repository
3. Auto-deploys on every update

---

## Performance Tips

- Compress images before uploading (use squoosh.app — free, in browser)
- Keep images under 500KB each for fast loading
- Profile photo: aim for under 200KB
