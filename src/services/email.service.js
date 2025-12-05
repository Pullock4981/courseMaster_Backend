const nodemailer = require('nodemailer');

// Create transporter - configure based on your email provider
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Alternative: Use SMTP directly
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT || 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

const sendWelcomeEmail = async (userEmail, userName) => {
    // Don't send email if email service is not configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.log('⚠️ Email service not configured. Skipping welcome email.');
        return;
    }

    try {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        const mailOptions = {
            from: `"CourseMaster" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Welcome to CourseMaster! 🎓',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to CourseMaster! 🎉</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-top: 0;">Hi <strong>${userName}</strong>,</p>
            
            <p style="font-size: 16px;">
              Thank you for joining CourseMaster! We're thrilled to have you on board and excited to be part of your learning journey.
            </p>
            
            <p style="font-size: 16px;">
              With CourseMaster, you can:
            </p>
            <ul style="font-size: 16px; padding-left: 20px;">
              <li>Explore a wide range of courses</li>
              <li>Learn from expert instructors</li>
              <li>Track your progress and achievements</li>
              <li>Complete assignments and quizzes</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${frontendUrl}/courses" 
                 style="display: inline-block; padding: 14px 28px; background-color: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Browse Courses →
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              If you have any questions, feel free to reach out to our support team.
            </p>
            
            <p style="font-size: 14px; color: #666; margin-top: 10px;">
              Happy Learning!<br>
              <strong>The CourseMaster Team</strong>
            </p>
          </div>
        </body>
        </html>
      `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${userEmail} - Message ID: ${info.messageId}`);
    } catch (error) {
        console.error('❌ Error sending welcome email:', error.message);
        // Don't throw error - registration should still succeed even if email fails
    }
};

module.exports = { sendWelcomeEmail };

