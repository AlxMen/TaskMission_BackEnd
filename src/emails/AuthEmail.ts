import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string
  name: string
  token: string
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "TaskMission <admin@taskmission.com>",
      to: user.email,
      subject: "TaskMission - Confirma tu cuenta",
      text: "TaskMission - Confirma tu cuenta",
      html: `<p>Hola: ${user.name}, has creado tu cuenta en TaskMission, ya casi esta todo listo, solo debes confirmar tu cuenta</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
        <p>E ingresa el codigo: <b>${user.token}</b></p>
        <p>Este token expira en 20 minutos</p>
      `,
    });
  };
  static sendPasswordResetToken = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "TaskMission <admin@taskmission.com>",
      to: user.email,
      subject: "TaskMission - Restaurar Contraseña",
      text: "TaskMission - Restaurar Contraseña",
      html: `<p>Hola: ${user.name}, has solicitado reestablecer tu contraseña</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Contraseña</a>
        <p>E ingresa el codigo: <b>${user.token}</b></p>
        <p>Este token expira en 20 minutos</p>
      `,
    });
  };
}
