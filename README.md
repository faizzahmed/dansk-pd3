# Dansk Prøve i Dansk 3 (PD3) — Knowledge Hub & Strategy Portal

A static, modular preparation portal and strategy guide for the Danish **Prøve i Dansk 3 (PD3)** written and reading examination.

Designed to replicate the official Danish Ministry exam booklet visual theme (*Udlændinge- og Integrationsministeriet / SIRI*) while organizing all high-yield notes, strategies, structural templates, authentic model essays, B2 connectors, and interactive audio flashcards.

---

## 📖 Portal Structure & Pages

1. **[index.html](index.html) — Portal Home & Evaluation Standards**
   - Exam architecture overview (*Læseforståelse* vs *Skriftlig fremstilling*).
   - Official SIRI 7-point assessment rubrics (Pragmatic, Discursive, Linguistic).
   - Actionable **+1 Grade Blueprint** to elevate essays from 02 &rarr; 4 &rarr; 7 &rarr; 10 &rarr; 12.

2. **[reading.html](reading.html) — Læseforståelse Strategy Guide**
   - 90-minute time allocation & 39-point scoring conversion table.
   - Delprøve 1: Scanning & matching fast-elimination strategy.
   - Delprøve 2A: Deep reading setup, the 3 recurring question patterns (*Holdning*, *Afgørende grunde*, *Overensstemmelse*), trap elimination, stem vocabulary table, and strictly chronological passage flow.
   - Delprøve 2B & 3: Sentence insertion and grammar cloze test roadmaps.

3. **[writing.html](writing.html) — Skriftlig Fremstilling Master Guide & Models**
   - 4-phase time management budget (4 hours / 240 minutes).
   - The **50% Rule** for Point 3 in Delprøve 2.
   - Delprøve 1: 4-step modular email blueprint with full model email & side-by-side English glosses.
   - Delprøve 2A: 4-paragraph graph & trend analysis model with data vocabulary.
   - Delprøve 2B: 4-paragraph argumentative debate essay model with counterargument scaffolding.
   - The 15-Minute Proofreading Sweep: V2 inversion, S-C-V-O in ledsætninger, nutids-r, and adjective agreements.

4. **[templates.html](templates.html) — Plug-and-Play Writing Templates**
   - Fill-in-the-blank structural skeletons with 1-click **"Kopiér Skabelon"** buttons.
   - Categorized B2 Sentence Bank for graph analysis, expressing personal stances, counterarguments, and societal impact.

5. **[vocabulary.html](vocabulary.html) — B2 Connectors & Audio Flashcards**
   - Interactive 55-card flashcard trainer with 3D flip animation.
   - Native Danish pronunciation using the browser's Web Speech API (`da-DK`).
   - Star/Bookmark system persisted in `localStorage`.
   - Comprehensive B2 Connectors (*forbinderord*) classification table (Addition, Contrast, Cause/Effect, Prepositions).

6. **[resources.html](resources.html) — Resources, Logistics & Study Links**
   - Exam day logistics, checklist, and official ministry links (*Dansk og Prøver*, SIRI).

---

## 🚀 GitHub Pages Deployment

This portal is 100% static (Vanilla HTML5, CSS3, modern ES6 JavaScript) with zero build steps or external dependencies.

To deploy on GitHub Pages:
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Dansk PD3 Knowledge Hub"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment**, set **Source** to `Deploy from a branch`.
   - Select branch `main` and folder `/ (root)`.
   - Click **Save**.
3. Your portal will be live in seconds at `https://<your-username>.github.io/<your-repo-name>/`.

---

## ⚖️ Official Evaluation Standard & Principles

- **SIRI August 2024 Standard:** Evaluates language proficiency across Pragmatic, Discursive, and Linguistic competencies.
- **"Sprog, ikke viden":** The candidate is evaluated strictly on linguistic clarity, nuance, coherence, and grammatical accuracy, never on subjective opinions or factual knowledge.
- **Strict Anonymity:** Contains zero personally identifiable information (PII). All materials are generalized for all PD3 candidates.
