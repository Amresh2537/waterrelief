import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json()
    console.log('📧 Email API Called:', new Date().toISOString())
    
    const { 
      name, 
      mobile, 
      plan, 
      amount, 
      screenshot, // Base64 image data
      toEmail = 'office.waterrelief@gmail.com'
    } = body

    // Log received data
    console.log('Customer:', name)
    console.log('Mobile:', mobile)
    console.log('Plan:', plan)
    console.log('Amount:', amount)
    console.log('Screenshot received:', !!screenshot)

    // Validate required fields
    const missingFields = []
    if (!name) missingFields.push('name')
    if (!mobile) missingFields.push('mobile')
    if (!plan) missingFields.push('plan')
    if (!amount) missingFields.push('amount')
    
    if (missingFields.length > 0) {
      console.error('❌ Missing fields:', missingFields)
      return Response.json(
        { 
          success: false,
          error: 'Missing required fields',
          missingFields 
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(toEmail)) {
      console.error('❌ Invalid email format:', toEmail)
      return Response.json(
        { 
          success: false,
          error: 'Invalid email address format'
        },
        { status: 400 }
      )
    }

    // Check environment variables
    console.log('🔧 Checking environment variables...')
    console.log('EMAIL_USER configured:', !!process.env.EMAIL_USER)
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      const errorMsg = 'Email credentials not configured. Please check .env.local file.'
      console.error('❌', errorMsg)
      return Response.json(
        { 
          success: false,
          error: errorMsg,
          code: 'ENV_MISSING'
        },
        { status: 500 }
      )
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Verify SMTP connection
    try {
      await transporter.verify()
      console.log('✅ SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError.message)
      return Response.json(
        { 
          success: false,
          error: 'Email server connection failed',
          details: verifyError.message,
          code: 'SMTP_FAILED'
        },
        { status: 500 }
      )
    }

    // Create email HTML content
    const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Water Relief Payment Confirmation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f9ff;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .email-header {
            background: linear-gradient(135deg, #1a5fb4, #2a7de1);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        
        .email-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .email-header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .email-body {
            padding: 30px;
        }
        
        .section-title {
            color: #1a5fb4;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e1f0ff;
        }
        
        .details-card {
            background: #f8fbff;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
            border-left: 4px solid #2a7de1;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e8f0ff;
        }
        
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .detail-label {
            font-weight: 600;
            color: #1a5fb4;
            min-width: 150px;
        }
        
        .detail-value {
            color: #333;
            flex: 1;
        }
        
        .payment-card {
            background: #f0f8ff;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
            border: 2px solid #2a7de1;
        }
        
        .payment-title {
            color: #1a5fb4;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .action-box {
            background: #e8f5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            border-left: 5px solid #4caf50;
        }
        
        .action-title {
            color: #2e7d32;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .action-steps {
            padding-left: 20px;
        }
        
        .action-steps li {
            margin-bottom: 8px;
            color: #333;
        }
        
        .email-footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e1f0ff;
            background: #f8fbff;
        }
        
        .water-drop {
            color: #2a7de1;
            font-size: 20px;
        }
        
        .attachment-info {
            background: #fff3e0;
            border-radius: 8px;
            padding: 15px;
            margin-top: 15px;
            border-left: 4px solid #ff9800;
        }
        
        @media (max-width: 600px) {
            .email-body {
                padding: 20px;
            }
            
            .detail-row {
                flex-direction: column;
            }
            
            .detail-label {
                margin-bottom: 5px;
                min-width: auto;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1><span class="water-drop">💧</span> Water Relief Payment Received</h1>
            <p>New Subscription Payment Confirmation</p>
        </div>
        
        <!-- Body -->
        <div class="email-body">
            <h2 class="section-title">Customer Payment Details</h2>
            
            <!-- Customer Details -->
            <div class="details-card">
                <div class="detail-row">
                    <div class="detail-label">👤 Customer Name:</div>
                    <div class="detail-value">${name}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">📱 Mobile Number:</div>
                    <div class="detail-value">${mobile}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">📅 Payment Date:</div>
                    <div class="detail-value">${new Date().toLocaleDateString('en-IN')}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">⏰ Payment Time:</div>
                    <div class="detail-value">${new Date().toLocaleTimeString('en-IN')}</div>
                </div>
            </div>
            
            <!-- Payment Information -->
            <div class="payment-card">
                <h3 class="payment-title">Payment Information</h3>
                
                <div class="detail-row">
                    <div class="detail-label">📋 Selected Plan:</div>
                    <div class="detail-value">${plan}</div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-label">💰 Amount Paid:</div>
                    <div class="detail-value">₹${amount}</div>
                </div>
                
                ${
                  screenshot ? 
                  `<div class="detail-row">
                    <div class="detail-label">📸 Payment Proof:</div>
                    <div class="detail-value">
                      <strong>Payment screenshot attached to this email</strong>
                    </div>
                  </div>` 
                  : ''
                }
            </div>
            
            ${screenshot ? `
            <div class="attachment-info">
                <p style="margin: 0; color: #5d4037;">
                    <strong>📎 Attachment:</strong> Payment screenshot is attached to this email as "payment-screenshot-${name}.jpg"
                </p>
            </div>
            ` : ''}
            
            <!-- Action Required -->
            <div class="action-box">
                <h3 class="action-title">✅ Action Required</h3>
                <ol class="action-steps">
                    <li>Verify payment in bank/UPI app</li>
                    <li>Check attached payment screenshot</li>
                    <li>Activate customer's Water Relief service</li>
                    <li>Send service confirmation via WhatsApp/SMS</li>
                </ol>
            </div>
            
            <!-- Notes -->
            <div style="background: #fff8e1; padding: 15px; border-radius: 8px; border-left: 4px solid #ffb300;">
                <p style="color: #5d4037; margin: 0;">
                    <strong>Note:</strong> This email was automatically generated from Water Relief Payment Portal. 
                    Customer will provide address details separately when required for service activation.
                </p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <p>© ${new Date().getFullYear()} Creative Electronix - Water Relief Service</p>
            <p>This is an automated message, please do not reply directly to this email.</p>
            <p>For support, contact: +91-9354922385 | office.waterrelief@gmail.com</p>
        </div>
    </div>
</body>
</html>`

    // Create plain text version
    const emailText = `
WATER RELIEF PAYMENT CONFIRMATION
=================================

CUSTOMER DETAILS:
-----------------
• Name: ${name}
• Mobile: ${mobile}
• Payment Date: ${new Date().toLocaleDateString('en-IN')}
• Payment Time: ${new Date().toLocaleTimeString('en-IN')}

PAYMENT INFORMATION:
--------------------
• Selected Plan: ${plan}
• Amount Paid: ₹${amount}
${screenshot ? `• Payment Proof: Screenshot attached to this email` : ''}

${screenshot ? `📎 ATTACHMENT: Payment screenshot is attached to this email` : ''}

ACTION REQUIRED:
----------------
1. Verify payment in bank/UPI app
2. Check attached payment screenshot
3. Activate customer's Water Relief service
4. Send service confirmation via WhatsApp/SMS

IMPORTANT NOTES:
----------------
• This email was automatically generated from Water Relief Payment Portal
• Customer will provide address details separately when required for service activation
• For support: +91-9354922385 | office.waterrelief@gmail.com

© ${new Date().getFullYear()} Creative Electronix - Water Relief Service
Automated Message - Please do not reply directly to this email.
`

    // Prepare email options with attachment
    const mailOptions = {
      from: `"Water Relief Payments" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      replyTo: 'office.waterrelief@gmail.com',
      subject: `💧 Water Relief Payment - ${name} (₹${amount})`,
      html: emailHTML,
      text: emailText,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high'
      }
    }

    // Add attachment if screenshot exists
    if (screenshot) {
      try {
        // Extract base64 data and filename
        const matches = screenshot.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        
        if (matches && matches.length === 3) {
          const contentType = matches[1]
          const base64Data = matches[2]
          const buffer = Buffer.from(base64Data, 'base64')
          
          // Determine file extension from content type
          let extension = 'jpg'
          if (contentType.includes('png')) extension = 'png'
          if (contentType.includes('gif')) extension = 'gif'
          if (contentType.includes('jpeg')) extension = 'jpg'
          
          const filename = `payment-screenshot-${name.replace(/\s+/g, '-').toLowerCase()}.${extension}`
          
          mailOptions.attachments = [{
            filename: filename,
            content: buffer,
            encoding: 'base64',
            contentType: contentType
          }]
          
          console.log(`📎 Attachment added: ${filename} (${buffer.length} bytes)`)
        } else {
          console.warn('⚠️ Invalid base64 image format')
        }
      } catch (attachmentError) {
        console.error('❌ Error processing attachment:', attachmentError)
        // Continue without attachment
      }
    }

    // Send email
    console.log('📤 Sending email to:', toEmail)
    console.log('📤 Sending from:', process.env.EMAIL_USER)
    
    const startTime = Date.now()
    const info = await transporter.sendMail(mailOptions)
    const endTime = Date.now()
    
    console.log('✅ Email sent successfully!')
    console.log('📨 Message ID:', info.messageId)
    console.log('⏱️ Time taken:', endTime - startTime, 'ms')
    console.log('📧 Response:', info.response)
    console.log('📎 Attachments sent:', info.accepted.length)
    
    // Return success response
    return Response.json({
      success: true,
      message: 'Email sent successfully to ' + toEmail,
      messageId: info.messageId,
      timestamp: new Date().toISOString(),
      hasAttachment: !!screenshot,
      deliveryDetails: {
        accepted: info.accepted,
        rejected: info.rejected,
        pending: info.pending,
        response: info.response
      }
    })

  } catch (error) {
    // Comprehensive error handling
    console.error('❌ Email sending failed:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    
    // User-friendly error messages
    let errorMessage = 'Failed to send email'
    let errorCode = 'UNKNOWN_ERROR'
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check email credentials.'
      errorCode = 'AUTH_FAILED'
    } else if (error.code === 'EENVELOPE') {
      errorMessage = 'Invalid email address format.'
      errorCode = 'INVALID_EMAIL'
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Cannot connect to email server. Please check internet connection.'
      errorCode = 'CONNECTION_FAILED'
    } else if (error.message.includes('Invalid login')) {
      errorMessage = 'Invalid email or password. Please check .env.local file.'
      errorCode = 'INVALID_CREDENTIALS'
    } else if (error.message.includes('rate limit')) {
      errorMessage = 'Email sending rate limit exceeded. Please try again later.'
      errorCode = 'RATE_LIMIT'
    } else if (error.message.includes('attachment')) {
      errorMessage = 'Error attaching screenshot. Email sent without attachment.'
      errorCode = 'ATTACHMENT_ERROR'
    }
    
    // Return error response
    return Response.json(
      { 
        success: false,
        error: errorMessage,
        code: errorCode,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Optional: Add GET method for testing
export async function GET() {
  return Response.json({
    status: 'Email API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD),
    supportsAttachments: true,
    instructions: 'Send POST request with customer payment details and optional screenshot'
  })
}