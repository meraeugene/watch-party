import { convertTo24Hour, formatDateLuxon } from "@/app/helpers/utils";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { DateTime } from "luxon";

export async function POST(req: NextRequest) {
  const {
    email,
    movieTitle,
    ticketImage,
    hostName,
    date,
    time,
    movieDuration = "60",
  } = await req.json();

  if (
    !email ||
    !ticketImage ||
    !movieTitle ||
    !hostName ||
    !date ||
    !time ||
    !movieDuration
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const formattedTime = convertTo24Hour(time);
  const start = DateTime.fromISO(`${date}T${formattedTime}`, {
    zone: "Asia/Manila",
  });
  const end = start.plus({ minutes: parseInt(movieDuration) });

  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Watch Party: ${movieTitle}`
  )}&dates=${formatDateLuxon(start)}/${formatDateLuxon(
    end
  )}&details=${encodeURIComponent(
    `Hosted by ${hostName} on Discord. Don't miss it!`
  )}&location=${encodeURIComponent("Discord")}&sf=true&output=xml`;

  const cloudinaryRes = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: JSON.stringify({
        file: ticketImage,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const cloudinaryData = await cloudinaryRes.json();

  if (!cloudinaryData.secure_url) {
    return NextResponse.json(
      { error: "Failed to upload to Cloudinary" },
      { status: 500 }
    );
  }

  const imageUrl = cloudinaryData.secure_url;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Watch Party with ${hostName}" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: `${hostName} invited you to watch "${movieTitle}"!`,
    html: `
  <div style="font-family: Arial, sans-serif; text-align: center;">
    <img 
      src="${imageUrl}" 
      alt="Ticket" 
      style="
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 20px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      " 
    />
    <a href="${calendarUrl}" target="_blank"
      style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #4285F4;
        color: white;
        text-decoration: none;
        font-size: 16px;
        border-radius: 4px;
        font-weight: 500;
        font-family: 'Roboto', Arial, sans-serif;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
      Remind Me!
    </a>

    <p style="margin: 20px 0; font-size: 16px; color: #333;">
  🎬 Want to host your own watch party and send invites like this? <a href="https://watch-party-invitation.vercel.app/" target="_blank" style="color: #4285F4; text-decoration: none; font-weight: bold;">Visit Watch Party now</a> and plan a movie together anytime you like!
</p>

  </div>
`,
  });

  return NextResponse.json({ success: true });
}
