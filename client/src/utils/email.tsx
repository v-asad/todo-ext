export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;

  const maskedUsername =
    username.length > 2
      ? `${username[0]}${'*'.repeat(username.length - 2)}${username[username.length - 1]}`
      : username;

  return `${maskedUsername}@${domain}`;
}
