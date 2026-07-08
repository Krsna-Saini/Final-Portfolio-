import nodemailer from 'nodemailer'

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  NOTIFY_EMAIL,
} = process.env

const emailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS)

let transporter = null
if (emailConfigured) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: String(SMTP_SECURE) === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

function line(label, value) {
  return value ? `  ${label}: ${value}\n` : ''
}

/**
 * Notifies about a new opportunity.
 * Sends an email when SMTP is configured; always logs to the server console
 * so the notification is never silently lost.
 */
export async function notifyNewOpportunity(opp) {
  const summary =
    `\n🔔 New opportunity submitted\n` +
    line('Name', opp.name) +
    line('Email', opp.email) +
    line('Company', opp.company) +
    line('Type', opp.type) +
    line('Budget', opp.budget) +
    `  Message: ${opp.message}\n` +
    line('At', opp.createdAt)

  // Always visible in the terminal running the server.
  console.log(summary)

  if (!transporter) {
    console.log(
      '   (email disabled — set SMTP_HOST/SMTP_USER/SMTP_PASS to receive email alerts)',
    )
    return { emailed: false }
  }

  try {
    await transporter.sendMail({
      from: `"Portfolio Bot" <${SMTP_USER}>`,
      to: NOTIFY_EMAIL || SMTP_USER,
      replyTo: opp.email || undefined,
      subject: `New ${opp.type || 'opportunity'} from ${opp.name || 'someone'}`,
      text: summary,
    })
    return { emailed: true }
  } catch (err) {
    console.error('   email notification failed:', err.message)
    return { emailed: false, error: err.message }
  }
}
