import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { resend } from "@/lib/resend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const payload = await getPayload({ config });

    const now = new Date().toISOString();

    const reminders = await payload.find({
      collection: "quote-requests",
      where: {
        and: [
          {
            ownerReminderDate: {
              less_than_equal: now,
            },
          },
          {
            reminderSentAt: {
              exists: false,
            },
          },
          {
            status: {
              not_equals: "completed",
            },
          },
        ],
      },
      limit: 20,
    });

    for (const requestItem of reminders.docs) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.OWNER_EMAIL || "",
        subject: `Reminder: follow up with ${requestItem.fullName}`,
        html: `
          <h2>Quote follow-up reminder</h2>

          <p><strong>Client:</strong> ${requestItem.fullName}</p>
          <p><strong>Phone:</strong> ${requestItem.phone}</p>
          <p><strong>Email:</strong> ${requestItem.email}</p>
          <p><strong>Location:</strong> ${requestItem.location}</p>
          <p><strong>Status:</strong> ${requestItem.status}</p>

          <p>Please follow up with this client.</p>
        `,
      });

      await payload.update({
        collection: "quote-requests",
        id: requestItem.id,
        data: {
          reminderSentAt: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      processed: reminders.docs.length,
    });
  } catch (error) {
    console.error("Quote reminder cron failed:", error);

    return NextResponse.json(
      { success: false, message: "Cron failed." },
      { status: 500 },
    );
  }
}
