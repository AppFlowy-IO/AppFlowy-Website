import { NextRequest, NextResponse } from 'next/server';

interface FeedbackData {
  name: string;
  email: string;
  company: string;
  message: string;
  inquiryType?: string;
  userCount?: string;
  currentPlan?: string;
  deploymentMode?: string;
  source: string;
}

function getPriority(userCount?: string, inquiryType?: string): string {
  const count = parseInt(userCount || '0') || 0;
  
  if (inquiryType === 'Enterprise Plan' || count >= 100) return 'High';
  if (count >= 20 || inquiryType === 'Custom Deployment') return 'Medium';
  return 'Low';
}

function getPriorityEmoji(priority: string): string {
  switch (priority) {
    case 'High': return '🔴';
    case 'Medium': return '🟡';
    default: return '🟢';
  }
}

function buildSlackMessage(data: FeedbackData) {
  const timestamp = Math.floor(Date.now() / 1000);
  const priority = getPriority(data.userCount || '0', data.inquiryType);
  const priorityEmoji = getPriorityEmoji(priority);
  
  const blocks = [
    {
      type: "divider"
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "💰 New Pricing Inquiry"
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*👤 Contact:* ${data.name}\n*📧 Email:* ${data.email}\n*🏢 Company:* ${data.company}\n*🚀 Deployment:* ${data.deploymentMode === 'self-hosted' ? 'AppFlowy Self-hosted' : 'AppFlowy Cloud'}`
      }
    }
  ];

  // Add optional fields if they exist
  if (data.inquiryType || data.userCount || data.currentPlan) {
    let optionalText = "";

    if (data.inquiryType) {
      optionalText += `*📝 Inquiry Type:* ${data.inquiryType}\n`;
    }

    if (data.userCount) {
      optionalText += `*👥 User Count:* ~${data.userCount} users\n`;
    }

    if (data.currentPlan) {
      optionalText += `*📋 Current Plan:* ${data.currentPlan}\n`;
    }

    optionalText += `*${priorityEmoji} Priority:* ${priority}`;
    
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: optionalText
      }
    });
  } else {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${priorityEmoji} Priority:* ${priority}`
      }
    });
  }

  blocks.push(
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*💬 Message:*\n${data.message}`
      }
    },
    
    {
      type: "context",
      // eslint-disable-next-line
      // @ts-ignore
      elements: [
        {
          type: "mrkdwn",
          text: `⏰ Received <!date^${timestamp}^{date_short} {time}|just now> • 🔗 Source: ${data.source}`
        }
      ]
    }
  );
  
  return {
    text: "💰 New Pricing Inquiry",
    blocks: blocks
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: FeedbackData = await request.json();
    
    if (!data.name || !data.email || !data.company || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (!slackWebhookUrl) {
      console.error('SLACK_WEBHOOK_URL environment variable is not set');
      return NextResponse.json(
        { error: 'Slack configuration missing' },
        { status: 500 }
      );
    }

    const slackMessage = buildSlackMessage(data);


    const slackResponse = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage)
    });

    if (!slackResponse.ok) {
      console.error('Failed to send to Slack:', slackResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Feedback sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}