// Resend email integration for verification emails
import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

export async function sendVerificationEmail(toEmail: string, token: string, redirectPath?: string) {
  const { client, fromEmail } = await getUncachableResendClient();

  const baseUrl = process.env.REPLIT_DEV_DOMAIN
    ? `https://${process.env.REPLIT_DEV_DOMAIN}`
    : process.env.REPLIT_DEPLOYMENT_URL
    ? `https://${process.env.REPLIT_DEPLOYMENT_URL}`
    : 'http://localhost:5000';

  let verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;
  if (redirectPath) {
    verifyUrl += `&redirect=${encodeURIComponent(redirectPath)}`;
  }

  const { data, error } = await client.emails.send({
    from: fromEmail || 'Infinite Studio <onboarding@resend.dev>',
    to: [toEmail],
    subject: 'Verify Your Email — Infinite Studio',
    html: `
      <div style="background-color:#0A0A0A;padding:40px 20px;font-family:'Inter',Arial,sans-serif;">
        <div style="max-width:480px;margin:0 auto;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:40px;border-radius:2px;">
          <div style="text-align:center;margin-bottom:32px;">
            <span style="color:#2962FF;font-size:32px;">∞</span>
            <h1 style="color:#FFFFFF;font-size:18px;letter-spacing:4px;margin:8px 0 0;">INFINITE STUDIO</h1>
          </div>
          <p style="color:#CCCCCC;font-size:14px;line-height:1.6;margin-bottom:24px;">
            Welcome, Director. Confirm your email to activate your account and unlock your course access.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${verifyUrl}" style="display:inline-block;background-color:#2962FF;color:#FFFFFF;font-size:13px;font-weight:700;letter-spacing:2px;text-decoration:none;padding:16px 40px;border-radius:0;">
              VERIFY EMAIL
            </a>
          </div>
          <p style="color:#666666;font-size:11px;line-height:1.5;margin-top:32px;">
            If the button doesn't work, copy and paste this link into your browser:<br/>
            <a href="${verifyUrl}" style="color:#2962FF;word-break:break-all;">${verifyUrl}</a>
          </p>
          <div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:32px;padding-top:16px;text-align:center;">
            <p style="color:#444444;font-size:10px;letter-spacing:1px;">© 2025 INFINITE STUDIO</p>
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Failed to send verification email');
  }

  return data;
}

export async function sendPasswordResetEmail(toEmail: string, token: string) {
  const { client, fromEmail } = await getUncachableResendClient();

  const baseUrl = process.env.REPLIT_DEV_DOMAIN
    ? `https://${process.env.REPLIT_DEV_DOMAIN}`
    : process.env.REPLIT_DEPLOYMENT_URL
    ? `https://${process.env.REPLIT_DEPLOYMENT_URL}`
    : 'http://localhost:5000';

  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  const { data, error } = await client.emails.send({
    from: fromEmail || 'Infinite Studio <onboarding@resend.dev>',
    to: [toEmail],
    subject: 'Reset Your Password — Infinite Studio',
    html: `
      <div style="background-color:#0A0A0A;padding:40px 20px;font-family:'Inter',Arial,sans-serif;">
        <div style="max-width:480px;margin:0 auto;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:40px;border-radius:2px;">
          <div style="text-align:center;margin-bottom:32px;">
            <span style="color:#2962FF;font-size:32px;">∞</span>
            <h1 style="color:#FFFFFF;font-size:18px;letter-spacing:4px;margin:8px 0 0;">INFINITE STUDIO</h1>
          </div>
          <p style="color:#CCCCCC;font-size:14px;line-height:1.6;margin-bottom:24px;">
            We received a request to reset your password. Click the button below to choose a new password.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetUrl}" style="display:inline-block;background-color:#FF3D00;color:#FFFFFF;font-size:13px;font-weight:700;letter-spacing:2px;text-decoration:none;padding:16px 40px;border-radius:0;">
              RESET PASSWORD
            </a>
          </div>
          <p style="color:#999999;font-size:12px;line-height:1.5;margin-top:24px;">
            This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
          </p>
          <p style="color:#666666;font-size:11px;line-height:1.5;margin-top:16px;">
            If the button doesn't work, copy and paste this link into your browser:<br/>
            <a href="${resetUrl}" style="color:#2962FF;word-break:break-all;">${resetUrl}</a>
          </p>
          <div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:32px;padding-top:16px;text-align:center;">
            <p style="color:#444444;font-size:10px;letter-spacing:1px;">© 2025 INFINITE STUDIO</p>
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error('Failed to send password reset email:', error);
    throw new Error('Failed to send password reset email');
  }

  return data;
}
