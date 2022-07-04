import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { config } from "dotenv";

config()

@Injectable()
export class MessageService {
  constructor(private readonly mailService: MailerService) {}

  sendMessage(email: string, id: number): void {
    this.mailService.sendMail({
      to: email,
      from: process.env.MAIL,
      subject: 'This is for test',
      text: 'welcome',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
      </head>
      <body>
        <style>
          body {
            width: 100%;
            background-color: aquamarine;
          }
      
          .root {
            width: 100%;
            margin-top: 50px;
          }
      
          form {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
      
          input {
            display: none;
          }
      
          button {
            width: 100px;
            height: 50px;
            border: none;
            border-radius: 10px;
            margin-top: 50px;
            background-color: rebeccapurple;
            color: azure;
          }
        </style>
        <div class="root">
          <form action="http://localhost:3001/authorization/${id}" method="post">
            <div class="text">Please verify your email</div>
            <button type="submit">VERIFY</button>
          </form>
        </div>
      </body>
      </html>
      `
    })
    .then(result => console.log(result))
    .catch(error => console.log(error))
  }
}