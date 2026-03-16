import { FormDataContact } from "@/components/landing/ContactForm";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY_EMAIL);

export async function POST(req: Request) {
  try {
    const { fullname, email, subject, message }: FormDataContact =
      await req.json();

    if (!fullname || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Consultelo <onboarding@resend.dev>",
      to: process.env.EMAIL_ADDRESS || "delivered@resend.dev",
      replyTo: email,
      subject: `New Contact | Subject: ${subject} | From: ${email}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Error sending email" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 },
    );
  }
}
