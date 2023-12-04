import { Resend } from "resend";
import { RESEND_KEY, FRONTEND_DOMAIN } from "../../config/env";

const resend = new Resend(RESEND_KEY);

export const sendVerificationEmail = async (id: string, email: string) => {
  await resend.emails.send({
    from: "subs.medievalrain.net <subs@email.medievalrain.net>",
    to: [email],
    subject: "Verification",
    html: `Для верификации email перейдите по <a href="${FRONTEND_DOMAIN}/verification/${id}">ссылке</a>`,
  });
};
