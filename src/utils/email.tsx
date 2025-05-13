export function obfuscateEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;
  
  const obfuscatedUsername = username.length > 2 
    ? `${username[0]}${'*'.repeat(username.length - 2)}${username[username.length - 1]}`
    : username;
    
  return `${obfuscatedUsername}@${domain}`;
} 