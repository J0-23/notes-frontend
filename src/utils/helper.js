//todo change this later - not using regex
//validating email
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// get user initials from full name (e.g. "John Doe" -> "JD")
export const getInitials = (name) => {
  if (!name) return ""; // handle empty input

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};
