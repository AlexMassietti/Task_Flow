export function passwordResetTemplate(
  username: string | undefined,
  resetLink: string
) {
  const colors = {
    primary: '#4f46e5',
    bg: '#f3f4f6',
    text: '#333333',
    muted: '#666666'
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restablecer Contraseña</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.bg}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 20px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <tr>
            <td bgcolor="${colors.primary}" style="padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Seguridad de la Cuenta</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px; text-align: center;">
              <p style="color: ${colors.text}; font-size: 18px; margin-top: 0;">Hola <strong>${username ?? 'usuario'}</strong>,</p>
              <p style="color: ${colors.muted}; font-size: 16px; line-height: 1.5;">
                Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. 
                Si no realizaste esta solicitud, puedes ignorar este correo de forma segura.
              </p>
              <div style="margin: 30px 0;">
                <a href="${resetLink}" style="background-color: ${colors.primary}; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Restablecer Contraseña
                </a>
              </div>
              <p style="color: #9ca3af; font-size: 13px; margin-top: 25px;">
                Este enlace expirará en un tiempo determinado por razones de seguridad.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Si tienes problemas con el botón, copia y pega este enlace en tu navegador:<br>
                <span style="color: ${colors.primary};">${resetLink}</span>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}