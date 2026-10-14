const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact({ name = "", email = "", subject = "", message = "" }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email.trim())) errors.email = "Please enter a valid email.";
  if (!subject.trim()) errors.subject = "Please enter a subject.";
  if (!message.trim()) errors.message = "Please enter a message.";
  else if (message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}
