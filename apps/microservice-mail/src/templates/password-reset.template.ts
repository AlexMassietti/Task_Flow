export function passwordResetTemplate(
  username: string | undefined,
  resetLink: string
) {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Restablecer contraseña</h2>

      <p>Hola ${username ?? 'usuario'},</p>

      <p>Recibimos una solicitud para restablecer tu contraseña.</p>

      <p>
        Haz clic en el siguiente enlace para continuar:
      </p>

      <a href="${resetLink}" 
         style="
            background-color: #4caf50;
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            border-radius: 6px;
         ">
        Restablecer contraseña
      </a>

      <p style="margin-top: 20px; color: gray;">
        Si no solicitaste esto, simplemente ignora este mensaje.
      </p>
    </div>
  `;
}
