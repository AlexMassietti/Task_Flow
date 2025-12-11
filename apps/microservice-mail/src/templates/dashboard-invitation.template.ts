export function dashboardInvitationTemplate(
  invitedBy: string,
  dashboardName: string,
  inviteLink: string
) {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Dashboard Invitation</h2>

      <p>Hello,</p>

      <p>
        <strong>${invitedBy}</strong> has invited you to join the dashboard 
        <strong>${dashboardName}</strong>.
      </p>

      <p>
        Click the following link to accept the invitation:
      </p>

      <a href="${inviteLink}"
         style="
            background-color: #4caf50;
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            border-radius: 6px;
         ">
        Accept Invitation
      </a>

      <p style="margin-top: 20px; color: gray;">
        If you were not expecting this invitation, you can safely ignore this message.
      </p>
    </div>
  `;
}
