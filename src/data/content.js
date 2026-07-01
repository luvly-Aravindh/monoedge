// All static, repeated copy for the landing page lives here so the section
// components stay structural. Editing wording is a one-file job.

export const SCHED_URL = 'scheduling.html?v=1781847973';
export const LEAD_ENDPOINT = 'submit.php';
export const LEAD_MAGNET = '7 Ways a Manufacturing Plant Dies';

export const trustItems = [
  { n: '1 min', label: 'to your first insight' },
];

// Industry icons are unique SVGs, kept in the component. Order matters.
export const industries = [
  'textile',
  'tiles',
  'steel',
  'auto',
  'pharma',
  'food',
];

export const industryLabels = {
  textile: 'Textile and spinning',
  tiles: 'Tiles and ceramics',
  steel: 'Steel and rolling',
  auto: 'Auto components',
  pharma: 'Pharma and chemicals',
  food: 'Food and agro',
};

export const marqueeFrames = [
  { src: 'https://images.unsplash.com/photo-1742967422150-df4a56b1d198?auto=format&fit=crop&w=600&q=62', cap: 'Textile, prepping the line' },
  { src: 'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=600&q=62', cap: 'Inside a working plant' },
  { src: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=600&q=62', cap: 'Production in full swing' },
  { src: 'https://images.unsplash.com/photo-1742967422135-616546e2ff25?auto=format&fit=crop&w=600&q=62', cap: 'On the floor, where it happens' },
  { src: 'https://images.unsplash.com/photo-1745921204896-c2011440a4e2?auto=format&fit=crop&w=600&q=62', cap: 'Machinery that talks, if you read it' },
  { src: 'https://images.unsplash.com/photo-1716643863806-989dd76ae093?auto=format&fit=crop&w=600&q=62', cap: 'Every machine, a data source' },
  { src: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=600&q=62', cap: 'The line, end to end' },
];

export const problemCards = [
  {
    n: '01',
    h: 'The defect ships before you see it',
    p: 'A quality slip shows up as a rejected consignment at your customer, not on your floor. The signal was in your rejection data days earlier, tied to one supplier lot or one shift.',
  },
  {
    n: '02',
    h: 'The anomaly runs for weeks',
    p: 'A section drifts to 23% above its normal power band and nobody notices until the equipment fails. The reading sat in a sheet the whole time.',
  },
  {
    n: '03',
    h: 'The supplier degrades in silence',
    p: 'Rates drift up, quality drifts down, deliveries slip. Each issue lives in a different sheet, so the pattern never assembles until the account is already hurting.',
  },
];

export const steps = [
  { n: '01', d: '0', h: 'Upload', p: 'Connect the spreadsheets, registers and exports you already keep. No new system to run, no SQL to write.' },
  { n: '02', d: '1', h: 'Discover', p: 'More than 90 discovery algorithms and 5 AI agents read every source together and surface what matters.' },
  { n: '03', d: '0', h: 'Alert', p: 'The moment something drifts, you hear about it first, in plain language, on your feed and on Telegram.' },
  { n: '04', d: '1', h: 'Act', p: 'You fix the leak, the batch or the machine while it is still small, not after it becomes a loss.' },
];

export const beforeItems = [
  'The defect surfaces at your customer, as a debit note.',
  'The anomaly runs for weeks before the equipment fails.',
  'The monthly report lands after the month is already gone.',
  'Answers take days to assemble by hand across sheets.',
  'The team is always firefighting, never ahead.',
];

export const afterItems = [
  'You catch the bad lot before it ships.',
  'The drift reaches you while it is still a cheap fix.',
  'You see what is happening as it happens, not weeks later.',
  'You ask a question in plain language, get the number back.',
  'The team runs the plant instead of chasing it.',
];

// Knowledge-graph orbit nodes (positions are percentages inside .kgnet)
export const kgNodes = [
  { label: 'Customers', color: '#12cdbf', left: '82.6%', top: '50%' },
  { label: 'Machines', color: '#ffd166', left: '66.3%', top: '15.8%' },
  { label: 'Costs', color: '#7be0c0', left: '33.7%', top: '15.8%' },
  { label: 'Suppliers', color: '#7b9cff', left: '17.4%', top: '50%' },
  { label: 'Batches', color: '#ff8da3', left: '33.7%', top: '84.2%' },
  { label: 'Employees', color: '#b9a6ff', left: '66.3%', top: '84.2%' },
];

// Animated signal tracers that fly into the brain, staggered
export const kgTracers = [
  { path: 'M380,190 L230,190', begin: '0.0s' },
  { path: 'M305,60 L230,190', begin: '0.42s' },
  { path: 'M155,60 L230,190', begin: '0.84s' },
  { path: 'M80,190 L230,190', begin: '1.26s' },
  { path: 'M155,320 L230,190', begin: '1.68s' },
  { path: 'M305,320 L230,190', begin: '2.1s' },
];

export const kgPoints = [
  {
    icon: 'db',
    h: 'One source of truth',
    p: 'Production, Tally, sheets, HR, salaries, even gate passes. It all feeds one brain, instead of sitting in six disconnected places.',
  },
  {
    icon: 'graph',
    h: 'Every relationship, mapped',
    p: 'It connects suppliers to batches, machines to breakdowns, costs to causes. A root cause is one question away, not a week of digging.',
  },
  {
    icon: 'brain',
    h: 'Keeps the knowledge when people leave',
    p: 'The know-how that used to walk out the door with an experienced operator now stays in the system. Your second brain remembers.',
  },
];

export const capabilities = [
  { d: '0', h: 'Proactive discovery', p: 'It looks for the problem on its own, across every sheet, instead of waiting for you to ask the right question.' },
  { d: '1', h: 'Ask in plain language', p: 'Type a question the way you would ask a colleague. Get the number back in seconds, no dashboard hunting.' },
  { d: '2', h: 'Pattern memory', p: 'It remembers past failures and recurring issues, so the same problem never quietly comes back unseen.' },
  { d: '0', h: 'Data sanctity', p: 'It flags the gaps, duplicates and errors in your own records before they turn into a wrong decision.' },
  { d: '1', h: 'Smart alerts', p: 'Only what matters reaches you, when it matters, on the feed and on Telegram. No noise, no daily ritual.' },
  { d: '2', h: 'Reads everything you keep', p: 'Production logs, Tally, Google Sheets, HR and salary data, gate passes, even a sensor feed. It all feeds one brain, with nothing to rip out.' },
];

// Avatar images are imported in the component and attached by index
export const reviews = [
  {
    text: 'We had a bearing degradation pattern that our team had missed for weeks.Business Brain flagged a bearing degradation pattern on day three that our team had missed for weeks. The repair cost us \u20B940,000. If we had caught it after failure, we were looking at a full line shutdown and probably \u20B98-10 lakh in losses. That ROI is not even a conversation.',
    name: 'Rajan Mehta',
    role: 'Maintenance Head, Precision Auto Components',
    avatar: 'rev2',
    alt: 'Rajan Mehta',
  },
  {
    text: 'I am not an IT person and neither is my floor supervisor. What I liked is that it does not give you a chart and leave you guessing. It says: your reject rate on Line 3 spiked 18%, linked to material batch B-112 received Tuesday. That is something I can act on in the next hour.',
    name: 'Sunita Krishnaswamy',
    role: 'Plant Manager, Agro Pac Industries',
    avatar: 'rev1',
    alt: 'Sunita Krishnaswamy',
    d: '1',
  },
  {
    text: 'I expected a 3-month integration project. We connected our existing MES and ERP data in two days and had the first real insight by end of week one. No custom coding, no consultant sitting on-site for months. It just worked.',
    name: 'Deepak Srinivasan',
    role: 'COO, iTech Forge & Castings',
    avatar: 'rev4',
    alt: 'Deepak Srinivasan',
    d: '2',
  },
];

export const faqs = [
  {
    q: 'But will it actually work on our data?',
    a: 'That is exactly what a demo is for. Bring one real export from your plant and watch Business Brain read it live and surface the first real insight, usually in under a minute.',
  },
  {
    q: 'Do we need to replace Tally, Excel or our registers?',
    a: 'No. Business Brain reads what you already keep. It sits on top of your existing spreadsheets, exports and systems.',
  },
  {
    q: 'Does my team need to know SQL or data science?',
    a: 'No. There are zero lines of SQL to write. Anyone on the team can ask a question in plain language and get an answer.',
  },
  {
    q: 'How fast do we see value?',
    a: 'In the demo itself. You see a real insight from your own numbers before you decide anything.',
  },
];

// Sample proof-ticker feed. Replace with the live Proof feed before launch.
export const tickerItems = [
  { nm: 'Vikram Iyer', c: 'Pune, MH', a: 'Just requested a demo', t: '2 min ago' },
  { nm: 'Anjali Reddy', c: 'Coimbatore, TN', a: 'Just downloaded the guide', t: '14 min ago' },
  { nm: 'Deepak Agarwal', c: 'Rajkot, GJ', a: 'Just booked a demo', t: '1 hour ago' },
  { nm: 'Karthik Menon', c: 'Hyderabad, TS', a: 'Just requested a demo', t: '3 hours ago' },
  { nm: 'Nikhil Shah', c: 'Ahmedabad, GJ', a: 'Just downloaded the guide', t: 'yesterday' },
  { nm: 'Sandeep Patil', c: 'Nagpur, MH', a: 'Just booked a demo', t: '2 days ago' },
];
