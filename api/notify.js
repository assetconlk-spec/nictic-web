export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Silently skip if Resend is not configured yet
  if (!process.env.RESEND_API_KEY) {
    return res.status(200).json({ ok: true })
  }

  const { name, email, phone, subject, message } = req.body || {}

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Gajalanka Tours <hello@gajalankatours.com>',
        to: ['hello@gajalankatours.com'],
        subject: `New Inquiry: ${subject || '(no subject)'}`,
        html: `
          <h2 style="color:#1a1a1a">New inquiry from ${name}</h2>
          <table style="border-collapse:collapse;width:100%;max-width:560px">
            <tr><td style="padding:8px 0;color:#555;width:100px"><strong>Name</strong></td><td style="padding:8px 0">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#555"><strong>Phone</strong></td><td style="padding:8px 0">${phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#555"><strong>Subject</strong></td><td style="padding:8px 0">${subject || '—'}</td></tr>
          </table>
          <h3 style="color:#1a1a1a;margin-top:24px">Message</h3>
          <p style="color:#333;line-height:1.6">${(message || '').replace(/\n/g, '<br>')}</p>
          <hr style="margin-top:32px;border:none;border-top:1px solid #eee">
          <p style="color:#999;font-size:12px">Sent via gajalankatours.com contact form</p>
        `,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Resend error:', text)
    }
  } catch (err) {
    console.error('Email send failed:', err)
  }

  // Always return 200 — the form submission (PocketBase save) is what matters
  return res.status(200).json({ ok: true })
}
