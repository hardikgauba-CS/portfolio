# Step-by-step: Use your own API keys for the portfolio

Do these in order. After each step, you can run `npm run dev` to test.

---

## Step 1: Create your local env file

- Copy `.env.example` to `.env.local` (already done if you ran the command).
- Open `.env.local` in your editor. You’ll fill in values in the next steps.

---

## Step 2: GitHub (contribution graph)

**2a. Set your GitHub username**

- In `.env.local`, set:
  - `GITHUB_USERNAME=YourGitHubUsername`
- Use your real GitHub username (e.g. `hardikgauba`), no token here.

**2b. Create a GitHub Personal Access Token**

1. Go to: https://github.com/settings/tokens
2. Click **“Generate new token”** → **“Generate new token (classic)”**
3. Name it e.g. `Portfolio read-only`
4. Expiration: 90 days or “No expiration” (your choice)
5. **Do not** check any scopes (repo, admin, etc.). Public contribution data needs no extra scopes.
6. Click **“Generate token”**, copy the token (starts with `ghp_`).
7. In `.env.local`, set:
   - `GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx`
8. Save the file. Never commit `.env.local` or share the token.

**2c. Test**

- Run `npm run dev`, open the site, and check that the GitHub contribution widget loads and shows **your** graph.

---

## Step 3: OpenAI (AI Assistant chat)

1. Go to: https://platform.openai.com/api-keys
2. Sign in or create an account. You may need to add a payment method for API usage.
3. Click **“Create new secret key”**, name it e.g. `Portfolio`, copy the key (starts with `sk-`).
4. In `.env.local`, set:
   - `OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx`
5. Restart dev server and test the AI Assistant widget.

---

## Step 4: Mapbox (map widget)

1. Go to: https://account.mapbox.com/ (sign up if needed).
2. Open **Access tokens**. Use the default public token or create one.
3. Ensure the token has **Public** scopes (for map display).
4. In `.env.local`, set:
   - `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.xxxxxxxxxxxxxxxxxxxx`
5. Restart and check the map widget. If the token is missing, the app shows a short message instead of breaking.

---

## Step 5: Optional – Instagram widget

Only if you want the Instagram feed:

1. Go to https://developers.facebook.com/, create an app, add **Instagram Basic Display**.
2. Get the **access token** and **user ID** from the Instagram Basic Display config.
3. In `.env.local`, set:
   - `INSTAGRAM_ACCESS_TOKEN=...`
   - `INSTAGRAM_USER_ID=...`
- If these are missing, the Instagram widget may show an error; the rest of the site still works.

---

## Step 6: Optional – MongoDB (feedback form)

Only if you want to store feedback in a database:

1. Create a free cluster at https://www.mongodb.com/atlas
2. Get the connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/dbname`).
3. In `.env.local`, set:
   - `MONGO_URI=mongodb+srv://...`
- If missing, the feedback form may not save; you can add this later.

---

## Step 7: Deploy (e.g. Vercel)

1. Push your code (without `.env.local` – it’s gitignored).
2. In Vercel: **Project → Settings → Environment Variables**.
3. Add the **same** variable names and values you used in `.env.local`:
   - `GITHUB_TOKEN`
   - `GITHUB_USERNAME`
   - `OPENAI_API_KEY` (if you use the AI widget)
   - `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` (if you use the map)
   - Optionally: `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`, `MONGO_URI`
4. Redeploy the project. The site will use these env vars instead of your friend’s keys.

---

**Summary:**  
Replace your friend’s keys with your own in `.env.local` (and in Vercel env vars for deploy). The only thing we need from you to prefill in the guide is your **GitHub username**; you create all tokens yourself and paste them into `.env.local`.
