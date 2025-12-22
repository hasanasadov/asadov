import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ------------------ Server Validation ------------------ */
const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  selectedProjects: z.array(z.string()).min(1),
  selectedBudget: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const { fullName, email, message, selectedProjects, selectedBudget } = data;

    /* ------------------ ADMIN EMAIL ------------------ */
    const adminEmail = await resend.emails.send({
      from: "Asadov Studio <noreply@mail.asadov.site>",
      to: [process.env.CONTACT_RECEIVER!],
      replyTo: email,
      subject: `New Inquiry · ${fullName}`,
      html: `
  <div style="
    background:#0b0b0b;
    color:#e6e6e6;
    font-family: ui-sans-serif, system-ui, -apple-system;
    padding:64px 24px;
  ">
    <div style="max-width:680px;margin:0 auto;">

      <div style="margin-bottom:56px;">
        <p style="
          font-size:11px;
          letter-spacing:.28em;
          text-transform:uppercase;
          opacity:.5;
          margin-bottom:12px;
        ">
          Incoming Project Request
        </p>
        <h1 style="
          font-size:26px;
          font-weight:500;
          letter-spacing:-.02em;
          margin:0;
        ">
          New Inquiry
        </h1>
      </div>

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:40px;
        margin-bottom:56px;
      ">
        <div>
          <p style="font-size:11px;opacity:.5;margin-bottom:6px;">Identity</p>
          <p style="font-size:16px;margin:0;">${fullName}</p>
        </div>

        <div>
          <p style="font-size:11px;opacity:.5;margin-bottom:6px;">Coordinates</p>
          <p style="font-size:16px;margin:0;">${email}</p>
        </div>
      </div>

      <div style="margin-bottom:40px;">
        <p style="font-size:11px;opacity:.5;margin-bottom:8px;">
          Service Required
        </p>
        <p style="
          font-size:15px;
          line-height:1.6;
          margin:0;
        ">
          ${selectedProjects.join(" · ")}
        </p>
      </div>

      <div style="margin-bottom:56px;">
        <p style="font-size:11px;opacity:.5;margin-bottom:8px;">
          Investment Range
        </p>
        <p style="font-size:15px;margin:0;">
          ${selectedBudget}
        </p>
      </div>

      <div style="
        border-top:1px solid #1f1f1f;
        padding-top:40px;
      ">
        <p style="
          font-size:15px;
          line-height:1.8;
          white-space:pre-line;
          margin:0;
        ">
${message}
        </p>
      </div>

      <div style="
        margin-top:72px;
        font-size:11px;
        opacity:.35;
      ">
        Submitted via asadov.site
      </div>

    </div>
  </div>
  `,
    });

    if (adminEmail.error) {
      console.error("Admin email error:", adminEmail.error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    /* ------------------ USER AUTO-REPLY ------------------ */
    await resend.emails.send({
      from: "Asadov Studio <noreply@mail.asadov.site>",
      to: [email],
      subject: "We received your message",
      html: `
  <div style="
    background:#ffffff;
    color:#0b0b0b;
    font-family: ui-sans-serif, system-ui, -apple-system;
    padding:64px 24px;
  ">
    <div style="max-width:520px;margin:0 auto;">

      <p style="
        font-size:11px;
        letter-spacing:.28em;
        text-transform:uppercase;
        opacity:.5;
        margin-bottom:24px;
      ">
        Confirmation
      </p>

      <h1 style="
        font-size:22px;
        font-weight:500;
        letter-spacing:-.02em;
        margin-bottom:32px;
      ">
        Hello ${fullName},
      </h1>

      <p style="
        font-size:15px;
        line-height:1.8;
        margin-bottom:28px;
      ">
        Your message has been successfully received.
        We are reviewing your project details and will
        get back to you shortly.
      </p>

      <p style="
        font-size:14px;
        opacity:.6;
        line-height:1.7;
      ">
        If additional details are required, we will reach out directly.
      </p>

      <div style="
        margin-top:56px;
        font-size:13px;
        font-weight:500;
      ">
        — Asadov Studio
      </div>

      <div style="
        margin-top:40px;
        font-size:11px;
        opacity:.4;
      ">
        This is an automated confirmation email.
      </div>

    </div>
  </div>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
