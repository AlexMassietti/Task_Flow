export function passwordResetTemplate(
  username: string | undefined,
  resetLink: string
) {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Password Reset</h2>

      <p>Hello ${username ?? 'user'},</p>

      <p>We received a request to reset your password.</p>

      <p>
        Click the link below to continue:
      </p>

      <a href="${resetLink}" 
         style="
            background-color: #4caf50;
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            border-radius: 6px;
         ">
        Reset Password
      </a>

      <p style="margin-top: 20px; color: gray;">
        If you did not request this, simply ignore this message.
      </p>
    </div>
  `;
}
