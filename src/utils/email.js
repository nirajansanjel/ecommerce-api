 import { Resend } from 'resend';
import config from '../config/config.js';

const resend = new Resend(config.resendEmail.emailApiKey);

 async function sendEmail(recipient,{subject,body}) {
const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [recipient],
    subject,
    html: body,
  });

  if (error) { throw error
    
  }
  return data

}
export default sendEmail;