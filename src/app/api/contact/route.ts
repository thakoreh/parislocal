import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Simple in-memory rate limiter: max 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  entry.count += 1;
  return false;
}

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  submittedAt: string;
  ip: string;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Build submission object
    const submission: ContactSubmission = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      subject: subject?.trim() || undefined,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      ip,
    };

    // Save to local JSON file
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "contact-submissions.json");

    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true });

    // Read existing submissions
    let submissions: ContactSubmission[] = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      submissions = JSON.parse(fileContent);
    } catch {
      // File doesn't exist yet, start with empty array
    }

    submissions.push(submission);
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, message: "Thank you for your message. We'll get back to you soon!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
