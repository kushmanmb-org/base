import { NextRequest, NextResponse } from 'next/server';
import { logger } from 'apps/web/src/utils/logger';

export type HelpRequestData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  category?: string;
};

export type HelpRequestResponse = {
  success: boolean;
  message: string;
};

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as HelpRequestData;

    const { name, email, subject, message, category } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 },
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 10 characters long' },
        { status: 400 },
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message must not exceed 5000 characters' },
        { status: 400 },
      );
    }

    // Log the help request
    logger.info('Help request received', {
      name,
      email,
      subject,
      category,
      messageLength: message.length,
    });

    // In a real implementation, you would:
    // 1. Store the request in a database
    // 2. Send an email notification to support team
    // 3. Send a confirmation email to the user
    // For now, we'll just log it and return success

    const response: HelpRequestResponse = {
      success: true,
      message: 'Your help request has been submitted successfully. We will get back to you soon.',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    logger.error('Error processing help request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process help request' },
      { status: 500 },
    );
  }
}
