"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(userEmail, userName, doctorName, date, time) {
  console.log("Attempting to send email to:", userEmail); // ستظهر هذه أولاً

  try {
    const data = await resend.emails.send({
      from: "HealthConnect <onboarding@resend.dev>",
      to: [userEmail],
      subject: "Booking Confirmation - Appointment Booked!",
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Hello ${userName}!</h2>
          <p>Your appointment with <strong>${doctorName}</strong> has been confirmed.</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
        </div>
      `,
    });

    console.log("Resend Success Response:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Resend Error Detail:", error); // ستخبرك هنا لو المشكلة في الـ API Key
    return { success: false, error };
  }
}
