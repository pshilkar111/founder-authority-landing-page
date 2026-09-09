import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google Gen AI helper
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Helper to compute a robust rule-based baseline
function generateRuleBasedAudit(url: string) {
  // Extract identifier or slug from url
  const cleanUrl = url.trim().toLowerCase();
  const match = cleanUrl.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/);
  const rawHandle = match ? match[1].replace(/[-_]/g, ' ') : 'Executive Founder';
  const nameCapitalized = rawHandle
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Compute a realistic deterministic score based on handle characteristics
  let seed = 0;
  for (let i = 0; i < cleanUrl.length; i++) {
    seed = (seed + cleanUrl.charCodeAt(i) * (i + 1)) % 1000;
  }

  // Score between 6.8 and 8.6
  const scoreRaw = 6.8 + (seed % 19) * 0.1;
  const authorityScore = Math.min(9.4, Math.max(6.2, Number(scoreRaw.toFixed(1))));

  const foundationScore = Number(Math.min(9.5, Math.max(5.8, authorityScore - 0.3 + ((seed % 7) * 0.1))).toFixed(1));
  const authorityCategoryScore = Number(Math.min(9.8, Math.max(6.0, authorityScore + 0.2)).toFixed(1));
  const contentScore = Number(Math.min(8.9, Math.max(5.2, authorityScore - 0.6)).toFixed(1));
  const positioningScore = Number(Math.min(9.2, Math.max(5.5, authorityScore - 0.4)).toFixed(1));
  const growthScore = Number(Math.min(9.4, Math.max(5.9, authorityScore + 0.1)).toFixed(1));

  return {
    profileHandle: nameCapitalized,
    authorityScore,
    breakdown: {
      profileFoundation: foundationScore,
      authority: authorityCategoryScore,
      contentStrategy: contentScore,
      positioning: positioningScore,
      growthPotential: growthScore,
    },
    strengths: [
      'Strong underlying founder credibility and documented executive track record',
      'High domain expertise and clear alignment with high-value commercial audiences',
      'Valuable battle-tested founder perspective with immense thought leadership potential',
    ],
    improvements: [
      'Weak headline that reads as a passive job title rather than an executive value proposition',
      'Limited category positioning; misses the opportunity to own a differentiated niche narrative',
      'No structured content pillars or algorithmic publishing rhythm to convert profile views into inbound DMs',
    ],
    currentHeadline: `Founder / CEO | Building & Scaling Ventures`,
    recommendedHeadline: `Helping Venture-Backed Startups Scale Revenue & Enterprise Pipeline | Founder & Operator | Sharing Insights on Growth, Systems & Culture`,
    aboutSectionSuggestions: [
      'Hook the reader in the first 2 lines with your distinct thesis on your industry rather than a standard career bio.',
      'Highlight 2-3 specific quantified milestones (e.g. $X revenue unlocked, teams built, patents or portfolio reach).',
      'Include a clear Call-to-Action with your direct email or calendar link for prospective investors, clients, or talent.',
    ],
    contentPillars: [
      {
        title: 'Founder Journey & Lessons',
        description: 'Behind-the-scenes decision-making, early hiring mistakes, pivots, and candid tactical reflections.',
      },
      {
        title: 'Industry Insights & Market POV',
        description: 'Contrarian takes on emerging trends, where competitors are making mistakes, and where the sector is headed in 3-5 years.',
      },
      {
        title: 'Growth & Customer Acquisition',
        description: 'Deconstructed breakdowns of deals won, growth loops, product iterations, and unit economics.',
      },
      {
        title: 'Culture, Talent & Operational Systems',
        description: 'How you hire A-players, retain key talent, run weekly cadences, and scale organizational velocity.',
      },
    ],
    thoughtLeadershipVerdict:
      'High upside potential. With professional ghostwriting and structured weekly publishing, your profile can reliably generate 2-4 qualified commercial inquiries each week.',
  };
}

// POST /api/analyze-linkedin
app.post('/api/analyze-linkedin', async (req, res) => {
  try {
    const { linkedinUrl } = req.body;
    if (!linkedinUrl || typeof linkedinUrl !== 'string') {
      return res.status(400).json({ error: 'Valid LinkedIn URL is required' });
    }

    const baseline = generateRuleBasedAudit(linkedinUrl);
    const ai = getAIClient();

    if (!ai) {
      // Return enhanced baseline if Gemini API key is absent or pending
      return res.json({ success: true, data: baseline, source: 'standard-engine' });
    }

    // Call Gemini 2.5 Flash for high-velocity, customized authority analysis
    try {
      const prompt = `You are an elite LinkedIn Ghostwriter and Executive Brand Strategist at "Founder Authority" (Tagline: "Founders Build Companies. We Build Founder Brands.").
Analyze this LinkedIn profile URL for a founder/executive: "${linkedinUrl}".

Evaluate the profile across our proprietary 5-pillar scoring framework (each 20%):
1. Profile Foundation (Headline, banner, photo, about section)
2. Authority (Experience, credibility, achievements)
3. Content Strategy (Posting potential, storytelling, content pillars)
4. Positioning (Niche clarity, differentiation, value proposition)
5. Growth Potential (Lead generation, audience fit, market authority)

Provide a realistic, objective score between 6.0 and 9.2 (most unoptimized founder profiles score 6.8 - 7.8 out of 10).

Return ONLY valid JSON matching this exact structure:
{
  "profileHandle": "Estimated Name or Profile Handle",
  "authorityScore": 7.4,
  "breakdown": {
    "profileFoundation": 7.2,
    "authority": 8.0,
    "contentStrategy": 6.8,
    "positioning": 7.1,
    "growthPotential": 7.9
  },
  "strengths": [
    "Strengths point 1",
    "Strengths point 2",
    "Strengths point 3"
  ],
  "improvements": [
    "Improvement area 1",
    "Improvement area 2",
    "Improvement area 3"
  ],
  "currentHeadline": "Likely current headline based on URL handle or typical founder pattern",
  "recommendedHeadline": "High-converting, magnetic headline positioning them as an industry authority and inbound magnet",
  "aboutSectionSuggestions": [
    "Actionable tip 1 for the About section",
    "Actionable tip 2 with storytelling hook",
    "Actionable tip 3 with CTA placement"
  ],
  "contentPillars": [
    { "title": "Pillar 1 Title", "description": "Specific hook & angle" },
    { "title": "Pillar 2 Title", "description": "Specific hook & angle" },
    { "title": "Pillar 3 Title", "description": "Specific hook & angle" },
    { "title": "Pillar 4 Title", "description": "Specific hook & angle" }
  ],
  "thoughtLeadershipVerdict": "2-3 sentences assessing their commercial upside and inbound pipeline potential."
}`;

      let responseText: string | undefined;

      try {
        const primaryPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Primary model timeout')), 8000)
        );

        const response = await Promise.race([primaryPromise, timeoutPromise]);
        responseText = response.text;
      } catch (primaryErr) {
        console.warn('gemini-3.8-flash failed or timed out, trying gemini-3.6-flash:', primaryErr);
        try {
          const secondaryPromise = ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          });

          const secondaryTimeout = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Secondary model timeout')), 6000)
          );

          const secondaryResponse = await Promise.race([secondaryPromise, secondaryTimeout]);
          responseText = secondaryResponse.text;
        } catch (secondaryErr) {
          console.warn('gemini-3.6-flash fallback also failed:', secondaryErr);
        }
      }

      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, data: parsed, source: 'gemini-ai' });
      }
    } catch (aiError) {
      console.warn('Gemini API call failed, falling back to rule-based engine:', aiError);
    }

    return res.json({ success: true, data: baseline, source: 'fallback-engine' });
  } catch (error) {
    console.error('API analyze error:', error);
    res.status(500).json({ error: 'Failed to analyze LinkedIn profile' });
  }
});

// Start server with Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Founder Authority server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
