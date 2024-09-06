const verifyEmailTemplate = (otp, name) => `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
        <div style="
            max-width: 600px; 
            margin: auto; 
            background-color: #ffffff; 
            padding: 30px; 
            border-radius: 15px; 
            box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.1); 
            border: 1px solid #e0e0e0; 
           background-image: repeating-linear-gradient(135deg, rgba(189,189,189,0.1) 0px, rgba(189,189,189,0.1) 2px,transparent 2px, transparent 4px),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255)); background-size: 20px 20px;
        ">
            <div style="
                background-color: #ffffff; 
                color: #3968FE; 
                border-radius: 15px 15px 0 0; 
                padding: 20px;
                text-align: center;
            ">
                <img src="https://i.imgur.com/N9LBuQc.jpeg" alt="Query Quest Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 18px;  color: #000000;  ">Hello, <strong>${name}</strong></h2>
            </div>
            <div style="padding: 20px;">
                <p style="font-size: 14px; color: #555555; line-height: 1.6;">Thank you for registering with <strong  style="color: #3968FE;" >Query Quest!</strong></p>
                <p style="font-size: 14px; color: #555555; line-height: 1.6;">Your OTP for verification is:</p>
                <p style="
                    font-size: 18px; 
                    color: #3968FE; 
                    font-weight: bold; 
                    border: 1px dashed #3968FE; 
                    padding: 20px; 
                    text-align: center; 
                    border-radius: 10px; 
                    background-color: #eaf2ff; 
                    margin: 20px 20px; 
                    letter-spacing: 2px;
                ">${otp}</p>
                <p style="font-size: 12px; color: #777777; line-height: 1.6;">If you did not initiate this request, please ignore this email.</p>
            </div>
            <div style="
                background-color: #ffffff; 
                color: #3968FE; 
                border-radius: 0 0 15px 15px; 
                padding: 10px; 
                text-align: center;
            ">
                <p style="font-size: 12px; margin: 0;">Best regards,<br><strong>Query Quest Team</strong></p>
            </div>
        </div>
    </body>
</html>
`;

const resetEmailTemplate = (user, resetURL) => `
<html>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
      <div style="
        max-width: 600px; 
        margin: auto; 
        background-color: #ffffff; 
        padding: 30px; 
        border-radius: 15px; 
        box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.1); 
        border: 1px solid #e0e0e0; 
        background-image: repeating-linear-gradient(135deg, rgba(189,189,189,0.1) 0px, rgba(189,189,189,0.1) 2px,transparent 2px, transparent 4px),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255)); background-size: 20px 20px;
        ">
        <div style="
          background-color: #ffffff; 
          color: #2E69FF; 
          border-radius: 15px 15px 0 0; 
          padding: 20px;
          text-align: center;
        ">
          <img src="https://i.imgur.com/N9LBuQc.jpeg" alt="Query Quest Logo" style="width: 150px; height: auto; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 18px;">Hi ${user.name},</h2>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 14px; color: #555555; line-height: 1.6;">We received a request to reset your password. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetURL}" style="display: inline-block; padding: 15px 25px; font-size: 14px; color: #ffffff; background-color: #2E69FF; border-radius: 5px; text-decoration: none; font-weight: bold; text-align: center;">Reset Password</a>
          </div>
          <p style="font-size: 12px; color: #777777; text-align: center;">This link will expire in 1 hour.</p>
        </div>
        <div style=" 
          background-color: #ffffff; 
          color: #2E69FF; 
          border-radius: 0 0 15px 15px; 
          padding: 20px; 
          text-align: center;
        ">
          <p style="font-size: 14px; margin: 0;">Best regards,<br><strong>Query Quest Team</strong></p>
        </div>
      </div>
    </body>
  </html>
`;
export { verifyEmailTemplate, resetEmailTemplate };