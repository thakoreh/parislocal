import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface BusinessSubmission {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  address: string;
  city: string;
  description: string;
  website?: string;
  services: string;
  servingAreas: string;
  submittedAt: string;
  ip: string;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Parse body
    const body = await request.json();
    const {
      businessName,
      ownerName,
      email,
      phone,
      category,
      address,
      city,
      description,
      website,
      services,
      servingAreas,
    } = body;

    // Validate required fields
    const errors: string[] = [];

    if (!businessName || typeof businessName !== "string" || businessName.trim().length === 0) {
      errors.push("Business name is required.");
    }
    if (!ownerName || typeof ownerName !== "string" || ownerName.trim().length === 0) {
      errors.push("Owner name is required.");
    }
    if (!email || typeof email !== "string" || email.trim().length === 0) {
      errors.push("Email is required.");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push("Please provide a valid email address.");
      }
    }
    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      errors.push("Phone number is required.");
    }
    if (!category || typeof category !== "string" || category.trim().length === 0) {
      errors.push("Category is required.");
    }
    if (!address || typeof address !== "string" || address.trim().length === 0) {
      errors.push("Address is required.");
    }
    if (!description || typeof description !== "string" || description.trim().length === 0) {
      errors.push("Description is required.");
    }
    if (!services || typeof services !== "string" || services.trim().length === 0) {
      errors.push("Services are required.");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join(" ") },
        { status: 400 }
      );
    }

    // Build submission object
    const submission: BusinessSubmission = {
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category: category.trim(),
      address: address.trim(),
      city: city?.trim() || "Paris",
      description: description.trim(),
      website: website?.trim() || undefined,
      services: services.trim(),
      servingAreas: servingAreas?.trim() || "",
      submittedAt: new Date().toISOString(),
      ip,
    };

    // Save to local JSON file
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "business-submissions.json");

    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true });

    // Read existing submissions
    let submissions: BusinessSubmission[] = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      submissions = JSON.parse(fileContent);
    } catch {
      // File doesn't exist yet
    }

    submissions.push(submission);
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), "utf-8");

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your submission! We'll review your listing within 24 hours and it will appear in our directory once approved.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Business listing submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
