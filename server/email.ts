import sgMail from '@sendgrid/mail';

// Check if the SendGrid API key is set
if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY not set. Email functionality will not work.');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Send an email using SendGrid
 */
export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('Cannot send email: SENDGRID_API_KEY not set');
      return false;
    }
    
    await sgMail.send(emailData);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send a contact form notification email
 */
export async function sendContactFormEmail(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<boolean> {
  const adminEmail = 'talal.ahmad.qamar@gmail.com';
  
  const emailData: EmailData = {
    to: adminEmail,
    from: adminEmail, // Must be a verified sender in SendGrid
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  };
  
  return await sendEmail(emailData);
}

/**
 * Send a notification when a new case study is added
 */
export async function sendNewCaseStudyNotification(
  title: string,
  slug: string,
  client: string
): Promise<boolean> {
  const adminEmail = 'talal.ahmad.qamar@gmail.com';
  
  const emailData: EmailData = {
    to: adminEmail,
    from: adminEmail,
    subject: `New Case Study Added: ${title}`,
    text: `
      A new case study has been added to your portfolio:
      
      Title: ${title}
      Client: ${client}
      URL: /case-studies/${slug}
    `,
    html: `
      <h2>New Case Study Added</h2>
      <p>A new case study has been added to your portfolio:</p>
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Client:</strong> ${client}</p>
      <p><strong>URL:</strong> <a href="/case-studies/${slug}">/case-studies/${slug}</a></p>
    `
  };
  
  return await sendEmail(emailData);
}