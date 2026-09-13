import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { getClinic } from "@/api/sanity/clinic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, date, reason } = body as {
      name: string;
      phone: string;
      email: string;
      date: string;
      reason: string;
    };

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const clinic = await getClinic();
    const clinicName = clinic?.name ?? "Dental Clinic";
    const toEmail = process.env.CLINIC_EMAIL || clinic?.email || "";

    if (!toEmail) {
      console.error("CLINIC_EMAIL is not set in environment or Sanity CMS.");
      return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? `${clinicName} <onboarding@resend.dev>`;

    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Not specified";

    const detailRows = [
      ["Clinic", clinicName],
      ["Patient Name", name],
      ["Phone Number", phone],
      ["Email Address", email || "Not provided"],
      ["Preferred Date", formattedDate],
      ["Reason / Service", reason || "Not specified"],
    ]
      .map(
        ([label, value]) =>
          `<tr>
          <td style="padding:14px 16px;background:#f1f5f9;border-radius:8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;width:160px;vertical-align:top;">${label}</td>
          <td style="padding:14px 16px;font-size:15px;color:#0f172a;font-weight:600;vertical-align:top;">${value}</td>
        </tr>
        <tr><td colspan="2" style="height:6px;"></td></tr>`
      )
      .join("");

    const replyHint = email
      ? `<div style="margin-top:28px;padding:16px 20px;background:#eff6ff;border-left:4px solid #3b82f6;border-radius:0 8px 8px 0;">
          <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600;">You can reply directly to this email to contact the patient.</p>
        </div>`
      : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Appointment Request - ${clinicName}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);max-width:600px;">
          <tr>
            <td style="background:linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%);padding:36px 40px;">
              <p style="margin:0;font-size:13px;color:#bfdbfe;font-weight:600;letter-spacing:2px;text-transform:uppercase;">${clinicName}</p>
              <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;color:#ffffff;">New Appointment Request</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.6;">
                A new appointment request has been submitted for <strong>${clinicName}</strong>. Please review the details below and confirm with the patient.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${detailRows}
              </table>
              ${replyHint}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">Sent for ${clinicName} &middot; Appointment Notification System</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = [
      `NEW APPOINTMENT REQUEST — ${clinicName.toUpperCase()}`,
      "=".repeat(30),
      `Clinic:          ${clinicName}`,
      `Patient Name:    ${name}`,
      `Phone Number:    ${phone}`,
      `Email Address:   ${email || "Not provided"}`,
      `Preferred Date:  ${formattedDate}`,
      `Reason/Service:  ${reason || "Not specified"}`,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      ...(email ? { replyTo: [email] } : {}),
      subject: `New Appointment Request from ${name} — ${clinicName}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking route error:", err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
