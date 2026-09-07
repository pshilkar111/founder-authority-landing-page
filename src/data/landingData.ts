import {
  ServiceItem,
  ProblemItem,
  WhoWeHelpItem,
  ProcessStepItem,
  LinkedInPostMockupItem,
  ResultItem,
  PricingPlanItem,
  TestimonialItem,
  FaqItem,
} from '../types';

export const TRUST_STATS = [
  {
    number: '100+',
    label: 'Content Pieces Created',
    sublabel: 'Engineered for viral organic distribution',
  },
  {
    number: '50+',
    label: 'Founder Profiles Optimized',
    sublabel: 'Converted into inbound lead funnels',
  },
  {
    number: '1M+',
    label: 'LinkedIn Impressions Generated',
    sublabel: 'Targeted directly to decision-makers',
  },
];

export const TRUST_LOGOS = [
  { name: 'Y Combinator Alumni', badge: 'YC Alumni Founders' },
  { name: 'Peak XV Backed', badge: 'Peak XV Portfolio' },
  { name: 'Techstars Cohort', badge: 'Techstars 2024' },
  { name: 'D2C Scale Brands', badge: 'Top 50 D2C India' },
  { name: 'Sequoia Surge', badge: 'Surge Alumni' },
  { name: 'Forbes 30 Under 30', badge: 'Forbes Honorees' },
];

export const PROBLEM_CARDS: ProblemItem[] = [
  {
    id: 'no-time',
    emoji: '⏰',
    title: 'No Time To Create Content',
    explanation:
      'You are already working 60+ hours a week running operations, closing deals, and managing team firefighting. Drafting 3 thoughtful LinkedIn posts takes 5-8 hours you simply do not have.',
    consequence: 'Result: Your LinkedIn remains a dormant digital resume while competitors capture mindshare.',
  },
  {
    id: 'dont-know-what-to-post',
    emoji: '✍️',
    title: "Don't Know What To Post",
    explanation:
      'You have deep domain expertise, but staring at a blank screen wondering what resonates with peers, investors, or clients leads to creator paralysis and generic reposts.',
    consequence: 'Result: Lukewarm posts that fail to articulate your true authority and unique vantage point.',
  },
  {
    id: 'inconsistent-visibility',
    emoji: '📉',
    title: 'Inconsistent Visibility',
    explanation:
      'You post enthusiastically for 4 days, get busy with client work for 3 weeks, and vanish. The LinkedIn algorithm ruthlessly penalizes sporadic cadence with zero reach.',
    consequence: 'Result: Zero compounding organic reach and missed inbound partnerships every month.',
  },
  {
    id: 'low-engagement',
    emoji: '🤔',
    title: 'Low Engagement & Authority',
    explanation:
      'When you finally do post, you get 6 likes from polite colleagues. Your content fails to provoke conversation, inspire prospective customers, or convert into commercial pipeline.',
    consequence: 'Result: You remain the "best-kept secret" in your industry despite building remarkable products.',
  },
];

export const SERVICES_CARDS: ServiceItem[] = [
  {
    id: 'personal-branding',
    title: 'LinkedIn Personal Branding',
    iconName: 'UserCheck',
    shortBenefit: 'Transform your personal profile into an omnipresent authority magnet that commands respect and drives inbound opportunities.',
    keyDeliverable: 'Executive persona architecture & complete digital brand playbook',
  },
  {
    id: 'content-strategy',
    title: 'Content Strategy',
    iconName: 'Compass',
    shortBenefit: 'Custom 90-day editorial roadmaps aligning your commercial objectives with high-performing narrative pillars.',
    keyDeliverable: '4 proprietary content pillars + target audience persona mapping',
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    iconName: 'PenTool',
    shortBenefit: 'Done-for-you ghostwriting that sounds 100% authentically like you, capturing your tone, nuances, and hard-earned war stories.',
    keyDeliverable: 'Short-form hooks, long-form breakdowns, and viral carousels',
  },
  {
    id: 'profile-optimization',
    title: 'Profile Optimization',
    iconName: 'Sparkles',
    shortBenefit: 'Re-engineering your banner, headline, featured section, and about narrative into a high-converting landing page.',
    keyDeliverable: 'Conversion-focused visual design & lead-capture funnel setup',
  },
  {
    id: 'founder-positioning',
    title: 'Founder Positioning',
    iconName: 'Target',
    shortBenefit: 'Carve out an uncontested market angle so prospects immediately associate your category with your personal name.',
    keyDeliverable: 'Category point-of-view (POV) manifesto & battle-tested talking points',
  },
  {
    id: 'thought-leadership',
    title: 'Thought Leadership Development',
    iconName: 'Award',
    shortBenefit: 'Position yourself as an industry benchmark quoted in media, invited to top podcasts, and keynoting major conferences.',
    keyDeliverable: 'Deep-dive industry essays, contrarian theses & viral trend teardowns',
  },
];

export const WHO_WE_HELP_CARDS: WhoWeHelpItem[] = [
  {
    id: 'd2c-founders',
    title: 'D2C Founders',
    iconName: 'ShoppingBag',
    description: 'Founders scaling direct-to-consumer and retail brands who need high brand trust, vendor leverage, and lower customer acquisition costs.',
    desiredOutcome: 'Turn founder storytelling into brand equity, wholesale distribution deals, and organic customer acquisition.',
    statBadge: 'Avg. 3.2x organic retail brand reach',
  },
  {
    id: 'startup-founders',
    title: 'Startup Founders',
    iconName: 'Rocket',
    description: 'Seed to Series B venture-backed entrepreneurs raising capital, recruiting 10x talent, and building category credibility.',
    desiredOutcome: 'Warm investor outreach, effortless senior engineering & marketing recruitment, and early enterprise pilots.',
    statBadge: 'Avg. 40+ inbound investor & talent DMs',
  },
  {
    id: 'marketing-leaders',
    title: 'Marketing Leaders',
    iconName: 'TrendingUp',
    description: 'CMOs, VPs, and agency heads who know personal brand amplification accelerates their company marketing by 10x.',
    desiredOutcome: 'Establish immediate category benchmark status and keynote speaking invitations at marquee industry summits.',
    statBadge: 'Industry benchmark recognition',
  },
  {
    id: 'consultants',
    title: 'Consultants & Advisors',
    iconName: 'Briefcase',
    description: 'B2B consultants, fractional CXOs, and boutique advisory partners whose revenue relies directly on trust and expertise.',
    desiredOutcome: 'Replace cold outreach with predictable $10k–$50k inbound retainer client inquiries.',
    statBadge: 'Consistent inbound retainer pipeline',
  },
  {
    id: 'real-estate',
    title: 'Real Estate Professionals',
    iconName: 'Building2',
    description: 'Luxury developers, commercial syndicators, and senior brokers transacting high-ticket institutional and HNI assets.',
    desiredOutcome: 'Build unmatched local & national prestige to attract high-net-worth investors and exclusive mandates.',
    statBadge: 'High-ticket investor deal flow',
  },
];

export const PROCESS_STEPS: ProcessStepItem[] = [
  {
    stepNumber: 1,
    title: 'Discovery Call',
    subtitle: 'Extracting Your Unique IP',
    description:
      'We run a structured 45-minute audio or video interview to uncover your founder journey, hard-won operational insights, contrarian opinions, and growth goals.',
    duration: 'Week 1',
    deliverable: 'Voice Archetype & Strategic Brief',
  },
  {
    stepNumber: 2,
    title: 'Content Strategy',
    subtitle: 'Architecting Your Playbook',
    description:
      'We map out your 4 core content pillars, audience psychographics, target keywords, and a comprehensive 30-day editorial schedule designed for conversion.',
    duration: 'Week 1-2',
    deliverable: '90-Day Authority Blueprint',
  },
  {
    stepNumber: 3,
    title: 'Content Creation',
    subtitle: 'Ghostwriting High-Impact Posts',
    description:
      'Our team crafts high-retention text posts, visual slide carousels, and thought-leadership teardowns in your precise voice. You review and approve in 1 click.',
    duration: 'Ongoing Weekly',
    deliverable: 'Fortnightly Batch of 8-10 Posts',
  },
  {
    stepNumber: 4,
    title: 'Publishing & Optimization',
    subtitle: 'Peak Distribution & Engagement',
    description:
      'We schedule posts for optimal global timezones, format for zero algorithmic penalties, craft first-comment discussions, and optimize based on real-time traction.',
    duration: 'Daily Execution',
    deliverable: 'Algorithmic Optimization & Engagement Sync',
  },
  {
    stepNumber: 5,
    title: 'Authority Growth',
    subtitle: 'Converting Eyeballs Into Pipeline',
    description:
      'We review profile analytics, follower quality, profile visits, and inbound leads every month—doubling down on what generates tangible commercial ROI.',
    duration: 'Monthly Cadence',
    deliverable: 'Executive ROI & Lead Attribution Report',
  },
];

export const LINKEDIN_POST_MOCKUPS: LinkedInPostMockupItem[] = [
  {
    id: 'post-1',
    author: {
      name: 'Rohan Malhotra',
      headline: 'Founder & CEO at Naturale D2C | Scaled to ₹45Cr ARR | Forbes 30u30',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      verified: true,
      followers: '48,290 followers',
    },
    timeAgo: '1d • Edited • 🌐',
    category: 'D2C Scaling Case Study',
    badgeText: 'Post 1: Founder lessons from scaling a D2C business',
    contentLines: [
      'We almost went bankrupt at ₹2 Crore ARR.',
      '',
      'Our Facebook Ad ROAS dropped from 3.8x to 1.1x overnight in 2022. Cash burn was ₹18 Lakhs/month. I couldn’t sleep for 6 weeks.',
      '',
      'Here are the 4 counter-intuitive pivots that helped us scale to ₹45Cr ARR profitably without burning VC money:',
      '',
      '1. We stopped chasing new customers and obsessed over 60-day repeat rates (our LTV surged 140%).',
      '2. We killed 14 underperforming SKUs to double down on our 2 hero products with 74% gross margins.',
      '3. Replaced scripted influencer ads with raw, behind-the-scenes founder teardowns showing our factory QC.',
      '4. Turned LinkedIn into our B2B wholesale distribution engine (signed 42 modern trade chains organically).',
      '',
      'Your product quality doesn’t sell itself until you build trust in public.',
      '',
      'Which one of these challenges is hurting your brand right now? 👇',
    ],
    hasMedia: true,
    mediaType: 'carousel',
    mediaTitle: 'The D2C Unit Economics Framework (Swipe 1/7)',
    mediaSubtitle: 'How to transition from paid CAC addiction to 58% organic repeat revenue',
    hashtags: ['#D2CBrands', '#FounderLessons', '#EcommerceGrowth', '#Bootstrapped'],
    stats: {
      reactions: 1482,
      comments: 219,
      reposts: 94,
      impressions: '142,000+',
    },
  },
  {
    id: 'post-2',
    author: {
      name: 'Ananya Sharma',
      headline: 'Co-founder & CTO @ CloudPulse (YC W23) | Building AI Infrastructure',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      verified: true,
      followers: '32,150 followers',
    },
    timeAgo: '3d • 🌐',
    category: 'Startup Growth Insights',
    badgeText: 'Post 2: Startup growth insights',
    contentLines: [
      'The biggest myth about building in AI:',
      '“You need proprietary foundational models to win.”',
      '',
      'Truth? 92% of enterprise buyers don’t care about your parameter count.',
      'They care about data security, latency under 200ms, and zero compliance headache.',
      '',
      'When we raised our $3.5M Seed round last quarter, 3 tier-1 lead investors told us:',
      '“We noticed you because of your transparent engineering breakdowns on LinkedIn.”',
      '',
      'By sharing our benchmark latency logs openly:',
      '→ We hired 4 senior backend engineers with $0 recruiter fees',
      '→ Closed 18 Fortune 500 POC pilots completely inbound',
      '→ Established defensible category leadership before spending $1 on outbound SDRs',
      '',
      'Transparency is the ultimate moat in a crowded tech market.',
    ],
    hasMedia: true,
    mediaType: 'chart',
    mediaTitle: 'Inbound Pipeline vs Outbound SDR Cost Comparison',
    mediaSubtitle: 'Founder-led organic distribution generated 4.6x higher conversion velocity',
    hashtags: ['#Startups', '#VentureCapital', '#SoftwareEngineering', '#FounderJourney'],
    stats: {
      reactions: 2314,
      comments: 312,
      reposts: 168,
      impressions: '215,000+',
    },
  },
  {
    id: 'post-3',
    author: {
      name: 'Vikramaditya Rao',
      headline: 'VP of Growth & Marketing | Ex-Razorpay, Zepto | B2B SaaS Advisor',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      verified: true,
      followers: '64,900 followers',
    },
    timeAgo: '5d • Edited • 🌐',
    category: 'Marketing Leadership',
    badgeText: 'Post 3: Marketing leadership perspective',
    contentLines: [
      'Contrarian marketing take for 2025:',
      '',
      'Corporate brand pages on LinkedIn are basically ghost towns.',
      'Nobody wakes up excited to engage with a company logo.',
      '',
      'People buy from people.',
      '',
      'When our CEO started sharing personal perspectives on our product architecture, our pipeline changed dramatically:',
      '',
      '• Company Page: 45,000 followers → 18 likes per post',
      '• Founder Profile: 28,000 followers → 450+ likes & 80 qualified DMs',
      '',
      'If your company is spending $20,000/month on sponsored company ads while your leadership team has blank LinkedIn banners, you are lighting marketing budget on fire.',
      '',
      'Turn your executive team into media engines. That is modern B2B growth.',
    ],
    hasMedia: true,
    mediaType: 'framework',
    mediaTitle: 'Executive Brand Amplification Flywheel',
    mediaSubtitle: 'How founder authority drives company pipeline at 1/10th the acquisition cost',
    hashtags: ['#B2BMarketing', '#GrowthStrategy', '#Leadership', '#ExecutiveBranding'],
    stats: {
      reactions: 3890,
      comments: 488,
      reposts: 274,
      impressions: '380,000+',
    },
  },
];

export const RESULTS_CARDS: ResultItem[] = [
  {
    id: 'visibility',
    title: 'More Visibility',
    tagline: '10x–50x Impressions',
    description: 'Reach hundreds of thousands of relevant industry executives, partners, and buyers every month without paying a single dollar in ad spend.',
    metric: '100K–500K+ monthly impressions',
    iconName: 'Eye',
  },
  {
    id: 'networking',
    title: 'Better Networking',
    tagline: 'Direct Access to Leaders',
    description: 'Bypass gatekeepers. Connect directly with peer founders, angel investors, tier-1 VCs, and prospective high-value alliance partners.',
    metric: '85% response rate on founder DMs',
    iconName: 'Users',
  },
  {
    id: 'inbound-leads',
    title: 'Inbound Leads',
    tagline: 'Pre-sold Customers',
    description: 'Prospects reach out to you already convinced of your expertise, cutting your sales cycle in half and eliminating aggressive discounting.',
    metric: '15–40 qualified discovery calls/mo',
    iconName: 'Inbox',
  },
  {
    id: 'hiring-advantage',
    title: 'Hiring Advantage',
    tagline: 'Zero Recruitment Fees',
    description: 'Top-tier engineers, operators, and executives want to work for visionary leaders they admire. Attract A-players organically.',
    metric: 'Saved ₹10L+ in headhunter commissions',
    iconName: 'UserPlus',
  },
  {
    id: 'industry-authority',
    title: 'Industry Authority',
    tagline: 'Benchmark Positioning',
    description: 'Become the undisputed go-to authority journalists quote, podcasts invite, and event organizers ask to speak on key topics.',
    metric: 'Top 1% Social Selling Index (SSI)',
    iconName: 'Crown',
  },
  {
    id: 'speaking-opportunities',
    title: 'Speaking Opportunities',
    tagline: 'Stage & Media Presence',
    description: 'Receive unsolicited invitations to keynote industry conferences, panels, university masterclasses, and leading podcasts.',
    metric: '2–4 keynotes & panel invites quarterly',
    iconName: 'Mic',
  },
];

export const PRICING_PLANS: PricingPlanItem[] = [
  {
    id: 'starter',
    name: 'Starter Plan',
    tagline: 'For emerging founders looking to establish consistent LinkedIn presence.',
    priceInr: '₹15,000',
    priceUsd: '$249',
    period: '/month',
    isPopular: false,
    idealFor: 'Early-stage founders & solopreneurs building initial momentum',
    features: [
      '12 Posts Monthly (3 high-impact posts/week)',
      'Profile Optimization (Banner, Headline & About section)',
      'Monthly Strategy Call (45-min ideation session)',
      'Audience Engagement Guidelines',
      'Basic Monthly Analytics & Reach Report',
      'Slack / WhatsApp async communication',
    ],
    ctaText: 'Start with Starter',
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    tagline: 'Our flagship accelerator for founders ready to drive serious pipeline and authority.',
    priceInr: '₹35,000',
    priceUsd: '$499',
    period: '/month',
    isPopular: true,
    idealFor: 'Scaling startup founders, D2C CEOs & high-growth leaders',
    features: [
      '20 Posts Monthly (5 posts/week cadence)',
      '4 Carousels (Custom branded design frameworks)',
      'Weekly Reviews & Real-time Content Optimization',
      'Complete Done-For-You Content Strategy',
      'Advanced Profile Funnel (Custom CTA links & banner)',
      'Comment Section Strategy & Early Engagement Sync',
      'Bi-weekly 30-min Executive Brain Dump Calls',
      'Detailed Lead Attribution & Monthly ROI Dashboard',
    ],
    ctaText: 'Claim Growth Plan',
  },
  {
    id: 'authority',
    name: 'Authority Plan',
    tagline: 'White-glove executive positioning for industry leaders and enterprise CEOs.',
    priceInr: 'Custom Pricing',
    priceUsd: 'Custom Pricing',
    period: 'tailored scope',
    isPopular: false,
    idealFor: 'Established founders, enterprise executives & venture partners',
    features: [
      'Newsletter Strategy & Bi-weekly Long-form Substack/LinkedIn Edition',
      'Founder Interviews & Multi-format Content Repurposing',
      'Advanced Positioning & Category Design POV',
      'Personal Brand Consulting & Media Pitch Prep',
      'Podcast Placement & Speaking Gig Opportunities',
      'Dedicated Senior Ghostwriter & Creative Director',
      'Direct WhatsApp VIP Priority Access',
      'Ghost-engagement in Tier-1 Industry Threads',
    ],
    ctaText: 'Inquire for Authority Plan',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Siddharth Varma',
    role: 'Co-founder & CEO',
    company: 'Zentra Logistics (Series A, $6M Raised)',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    quote:
      'Before Founder Authority, I was posting maybe once every two months. In 90 days of working with their team, our posts generated over 1.4 million impressions. We closed 3 enterprise logistics contracts directly from LinkedIn DMs and hired our Head of Product with zero agency spend.',
    results: '+1.4M Impressions | 3 Enterprise Deals Closed',
    verifiedFollowers: 'Grew from 2.1K to 24.8K followers',
  },
  {
    id: 'test-2',
    name: 'Pooja Narang',
    role: 'Founder',
    company: 'Avanya Organics (Top D2C Brand)',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    quote:
      'What amazed me most is how accurately they captured my tone. I spend literally 30 minutes every two weeks doing a quick voice note with them, and their team turns it into viral carousels and sharp founder stories. Our retail buyer inquiries jumped 4x within two months.',
    results: '4x Retail Buyer Inquiries | 30 min/fortnight time investment',
    verifiedFollowers: 'Grew from 4.5K to 38.2K followers',
  },
  {
    id: 'test-3',
    name: 'Kunal Singhania',
    role: 'Managing Partner',
    company: 'Apex Strategic Advisory & Capital',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    quote:
      'As an M&A and corporate finance consultant, credibility is everything. Founder Authority positioned me as the go-to voice on Indian mid-market capital restructuring. The ROI on our Growth Plan was paid back 20x on the very first retainer client we landed from inbound LinkedIn outreach.',
    results: '20x ROI on first retainer client | 89 SSI Score',
    verifiedFollowers: 'Grew from 1.8K to 19.5K followers',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Do I need to write content myself?',
    answer:
      'No. Our system is designed specifically for time-poor founders. You spend just 30 to 45 minutes every two weeks on a guided brain-dump interview or sending async voice notes. Our specialized ghostwriters research, draft, edit, design graphics, and format every single piece to mirror your authentic tone of voice.',
    keyTakeaway: 'You provide the insights and war stories; we do 95% of the heavy lifting.',
  },
  {
    question: 'How much time is required?',
    answer:
      'Under 2 hours a month. We require a 45-minute bi-weekly kick-off or async voice-memo download, plus 5–10 minutes weekly to review and approve posts inside our streamlined portal before they go live.',
    keyTakeaway: 'Less than 15 minutes a week for total LinkedIn dominance.',
  },
  {
    question: 'Do you guarantee followers?',
    answer:
      'We do not engage in fake follower growth, spam pods, or bot engagement rings. We guarantee consistent, strategic, high-converting organic distribution targeted at your precise commercial buyers, peers, and investors. Most clients experience 3x to 8x follower growth in 90 days alongside substantial inbound business opportunities.',
    keyTakeaway: 'Quality over vanity: 10,000 qualified target buyers beat 100,000 irrelevant accounts every time.',
  },
  {
    question: 'Which industries do you work with?',
    answer:
      'We specialize in high-trust, high-ticket domains where founder credibility directly drives transaction volume: Venture-backed Startups, D2C/Consumer Brands, B2B SaaS, Marketing Agencies, Management & Financial Consultants, and High-ticket Real Estate developers.',
    keyTakeaway: 'If your customer or investor researches your LinkedIn before making a decision, our service is built for you.',
  },
  {
    question: 'How do you capture my authentic tone of voice?',
    answer:
      'During onboarding, we perform an in-depth Voice Archetype Audit analyzing your previous speeches, podcasts, tweets, and emails. We build a custom founder lexicon and perspective guardrails so your network can never tell the content was ghostwritten.',
    keyTakeaway: '100% authentic to your voice, zero robotic AI cliches.',
  },
  {
    question: 'What happens during the Free LinkedIn Audit?',
    answer:
      'We review your current profile, headline positioning, content engagement ratios, and missed inbound opportunities. We then send you a personalized 7-point audit report with actionable recommendations—completely free, with zero pressure.',
    keyTakeaway: 'Immediate tactical value before you ever spend a rupee.',
  },
];
