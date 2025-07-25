const EmailTemplte = (email  ,verificationToken ,fullname) => {
 return `<html>
 <head>
  <link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" rel="stylesheet"/>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <style>
   body {
            font-family: Arial, sans-serif;
        }
        .header {
            background-color: #0056b3;
            color: white;
            padding: 10px;
            text-align: center;
        }
        .header img {
            vertical-align: middle;
            margin-right: 10px;
        }
        .content {
            padding: 20px;
        }
        .btn-primary {
            background-color: #0056b3;
            border-color: #0056b3;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            color: #6c757d;
        }
        .footer i {
            margin: 0 5px;
        }

        #logotext{
        font-weight : 700;
        font-size :20px;
        }
  </style>
 </head>
 <body>
  <div class="container mt-3">
   <div class="text-center">
    <p>
     To ensure you get all correspondence from
     <a href="#">
      Classroom
     </a>
     , please add this email to your Address Book.
    </p>
   </div>
   <div class="header">
    <span id='logotext' >
     Classroom
    </span>
   </div>
   <div class="content">
    <p>
     Hey ${fullname},
    </p>
    <p>
     Thank you for creating an account with
     <strong>
      Classroom
     </strong>
     , we are happy to welcome you in our family.
    </p>
    <p>
     Almost done! Just click the button below to activate your account!
    </p>
    <br>
    <div class="text-center">
     <a style='color : white; padding : 10px;' class="btn btn-primary" href='${process.env.APP_BASE_URL}/api/v1/auth/verify/${verificationToken}'>
       Activate Your Account
     </a>
    </div>
     <br>
    <hr/>
    <div class="text-center">
     <i class="fas fa-comments">
     </i>
     <span>
      And yes, don't forget, We are always there to help you!
      <br/>
      Shoot us an email at :
      <a href="mailto:${email}">
       ${email}
      </a>
     </span>
    </div>
   </div>
   <div class="footer">
    <p>
     © 2014 - 2025 Classroom
    </p>
   </div>
  </div>
 </body>  
</html>
`;
};

export default EmailTemplte;
