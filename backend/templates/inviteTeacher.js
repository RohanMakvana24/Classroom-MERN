const inviteTeacherTemplate = (inviteLink) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invite Teacher</title>
  <style>
    /* Responsive email design */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h2 {
      color: #333;
    }
    .content {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    .cta-button {
      background-color: #4CAF50;
      color: white;
      padding: 14px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      display: inline-block;
    }
    .footer {
      font-size: 12px;
      text-align: center;
      color: #999;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>You're Invited to Teach a Class</h2>
    </div>
    <div class="content">
      <p>Dear Teacher,</p>
      <p>We’re excited to invite you to join our platform as a teacher for an upcoming class. Your expertise would be a valuable addition to our team.</p>
      <p>Please click the button below to fill out a short form and accept the invitation.</p>

      <div class="button-container">
        <a href="${inviteLink}" class="cta-button" target="_blank">Accept Invitation</a>
      </div>

      <p>If the button above doesn’t work, you can also click or copy and paste the following URL into your browser:</p>
      <p><a href="${inviteLink}">${inviteLink}</a></p>
    </div>
    <div class="footer">
      <p>This email was sent by Classroom.</p>
    </div>
  </div>
</body>
</html>
`;
};

export default inviteTeacherTemplate;
