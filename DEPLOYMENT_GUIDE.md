# 🚀 Arya VP Portfolio — Complete Deployment Guide

## What You've Got

A full-stack Next.js 15 portfolio with:
- ✅ Futuristic dark cyber UI matching your screenshots
- ✅ Animated PCB canvas background
- ✅ Typewriter hero with floating tech tags
- ✅ Interactive timeline (About)
- ✅ Animated radar chart + skill bars (Skills)
- ✅ Project cards with detail modals (Projects)
- ✅ Experience + Achievements sections
- ✅ Mission control contact form
- ✅ AI Avatar chatbot (powered by Claude API)
- ✅ Mobile responsive

---

## STEP 1 — Add Your Photo

Put your photo at: `public/photo.jpg`

Then in `components/Hero.tsx`, find the `<div>` with the placeholder "A" avatar and replace it with:
```jsx
<img src="/photo.jpg" alt="Arya VP" className="w-full h-full object-cover object-top" />
```

---

## STEP 2 — Update Contact Info

In `components/Contact.tsx`, update the `contacts` array:
- LinkedIn: change `linkedin.com/in/arya-vp` to your actual LinkedIn URL
- GitHub: change `github.com/arya-vp` to your actual GitHub URL

---

## STEP 3 — Deploy to Vercel (Free, Recommended)

### A. Install Prerequisites

1. **Install Node.js** (v18+): https://nodejs.org/en/download
2. **Install Git**: https://git-scm.com/downloads

### B. Create GitHub Repository

1. Go to https://github.com → New Repository
2. Name it `arya-portfolio` → Create (public or private, both work)
3. In your portfolio folder, run:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/arya-portfolio.git
git push -u origin main
```

### C. Deploy on Vercel

1. Go to https://vercel.com → Sign up with GitHub
2. Click **"New Project"** → Import your `arya-portfolio` repo
3. Framework: **Next.js** (auto-detected)
4. Click **"Deploy"** — it builds automatically!

### D. Add Your Anthropic API Key (for AI Avatar)

1. Get your free API key: https://console.anthropic.com
2. In Vercel → Your Project → **Settings** → **Environment Variables**
3. Add: `ANTHROPIC_API_KEY` = `sk-ant-...your-key...`
4. Click **Redeploy** → your AI avatar is now live!

Your site will be live at: `https://arya-portfolio.vercel.app`

---

## STEP 4 — Custom Domain (Optional but Pro)

### Buy a domain
- Namecheap: ~$10/year for `.dev` or `.tech`
- Suggested: `aryavp.dev` or `arya.engineer`

### Connect to Vercel
1. Vercel → Project → **Settings** → **Domains**
2. Add your domain (e.g., `aryavp.dev`)
3. Copy the DNS records Vercel shows you
4. Go to your domain registrar → DNS Settings → Add those records
5. SSL is **automatic** (Vercel handles it free)

---

## STEP 5 — Update the Website Later

Every time you make changes:

```bash
git add .
git commit -m "Update: description of change"
git push
```

Vercel auto-deploys on every push. Done!

---

## Alternative: Netlify

1. Go to https://netlify.com → New site from Git
2. Connect GitHub repo
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add env variable: `ANTHROPIC_API_KEY`

---

## Run Locally

```bash
cd arya-portfolio
npm install
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env.local
npm run dev
```

Open: http://localhost:3000

---

## AI Avatar — How It Works

The AI avatar is powered by Claude (claude-sonnet-4-6) via the Anthropic API.

- The system prompt gives Claude all your real data from your resume
- It speaks in first person as "Arya VP"
- Answers questions about projects, skills, internships, achievements
- Stays under 120 words per reply for snappy UX
- Uses engineering flair: "Signal received.", "Debug complete."

**Cost:** Anthropic gives $5 free credits. At ~300 tokens/response, that's 3,000+ conversations free. After that, claude-sonnet-4-6 is very affordable (~$0.003 per conversation).

**Free alternative:** Remove the API call in `components/AvatarChat.tsx` and replace with hardcoded responses if you don't want to use the API.

---

## Project Structure

```
arya-portfolio/
├── app/
│   ├── api/chat/route.ts     ← AI avatar API
│   ├── globals.css           ← All custom CSS / animations
│   ├── layout.tsx            ← HTML head, fonts
│   └── page.tsx              ← Main page assembly
├── components/
│   ├── PCBBackground.tsx     ← Canvas PCB animation
│   ├── Navbar.tsx            ← Sticky nav
│   ├── Hero.tsx              ← Full-screen hero
│   ├── About.tsx             ← Timeline + mission
│   ├── Skills.tsx            ← Radar + skill bars
│   ├── Projects.tsx          ← Project cards + modals
│   ├── ExperienceAchievements.tsx ← Work + badges
│   ├── Contact.tsx           ← Contact form
│   └── AvatarChat.tsx        ← AI avatar chatbot
└── public/
    └── photo.jpg             ← ADD YOUR PHOTO HERE
```

---

## Things to Customize

| What | Where |
|------|-------|
| Your photo | `public/photo.jpg` + `components/Hero.tsx` |
| LinkedIn/GitHub URLs | `components/Contact.tsx` |
| Skill percentages | `components/Skills.tsx` → `skillGroups` |
| Project GitHub links | `components/Projects.tsx` → add `href` to buttons |
| Resume PDF | `public/resume.pdf` |
| Email | `components/Contact.tsx` → `contacts` array |

---

*Built with Next.js 15 · Framer Motion · Tailwind CSS · Claude API*
*Designed for Arya VP — MEC Kochi, 2026*
