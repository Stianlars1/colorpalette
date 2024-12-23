export const themesExample1 = `/* Light theme */
:root {
  --background: #FAF9F9;
  --foreground: #1F2020;
  /* ... rest of light theme colors ... */
}

/* Dark theme */
[data-theme="dark"] {
  --background: #050505;
  --foreground: #ECEDEE;
  /* ... rest of dark theme colors ... */
}`;
export const themesExample2 = `// To switch to dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// To switch to light theme
document.documentElement.removeAttribute('data-theme');`;
