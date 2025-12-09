export function dashboardInvitationTemplate(
  invitedBy: string,
  dashboardName: string,
  inviteLink: string
) {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Invitación al dashboard</h2>

      <p>Hola,</p>

      <p>
        <strong>${invitedBy}</strong> te ha invitado a unirte al dashboard 
        <strong>${dashboardName}</strong>.
      </p>

      <p>
        Haz clic en el siguiente enlace para aceptar la invitación:
      </p>

      <a href="${inviteLink}"
         style="
            background-color: #4caf50;
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            border-radius: 6px;
         ">
        Aceptar invitación
      </a>

      <p style="margin-top: 20px; color: gray;">
        Si no estabas esperando esta invitación, puedes ignorar este mensaje.
      </p>
    </div>
  `;
}
