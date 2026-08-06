// CHCS — Plus activation check.
//
// Runs on Vercel as a serverless function so the Stripe secret key never
// reaches the browser. It deliberately stores nothing: a paid Checkout session
// inside Stripe *is* the record that someone bought Plus, so there is no
// database to run, back up or leak.
//
// Requires the STRIPE_SECRET_KEY environment variable (Vercel → project →
// Settings → Environment Variables). Talks to Stripe over plain fetch rather
// than the `stripe` npm package to keep the repo dependency-free.

const STRIPE_SESSIONS = 'https://api.stripe.com/v1/checkout/sessions/';

// How long a checkout link keeps working after payment. Without storage we
// cannot mark a session as redeemed, so this is what stops a shared
// "?plus=..." URL from unlocking Plus forever. Buyers moving to a second
// device use the in-app sync code instead.
const MAX_SESSION_AGE_DAYS = 7;

module.exports = async (req, res) => {
  // Never let a CDN or service worker hold on to an activation result.
  res.setHeader('Cache-Control', 'no-store');

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(500).json({ ok: false, error: 'not_configured' });

  const id = String((req.query && req.query.session_id) || '').trim();
  // Stripe checkout session ids look like cs_live_… / cs_test_…. Rejecting
  // anything else here keeps junk from reaching the Stripe API at all.
  if (!/^cs_[A-Za-z0-9_]{10,120}$/.test(id)) {
    return res.status(400).json({ ok: false, error: 'bad_session' });
  }

  let session;
  try {
    const auth = Buffer.from(key + ':').toString('base64');
    const r = await fetch(STRIPE_SESSIONS + encodeURIComponent(id), {
      headers: { Authorization: 'Basic ' + auth },
    });
    if (r.status === 404) return res.status(404).json({ ok: false, error: 'unknown_session' });
    if (!r.ok) return res.status(502).json({ ok: false, error: 'stripe_error' });
    session = await r.json();
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'stripe_unreachable' });
  }

  if (session.payment_status !== 'paid') {
    return res.status(402).json({ ok: false, error: 'not_paid' });
  }

  const ageDays = (Date.now() / 1000 - (session.created || 0)) / 86400;
  if (ageDays > MAX_SESSION_AGE_DAYS) {
    return res.status(410).json({ ok: false, error: 'expired' });
  }

  return res.status(200).json({ ok: true });
};
