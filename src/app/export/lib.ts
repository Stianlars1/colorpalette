export const css = `:root {
  --background: #FAF9F9;
  --foreground: #1F2020;
  /* ... accent and gray scales ... */
}`;
export const shadcn = `:root {
  --background: 0 0% 2%;
  --card: 100% 0 0% 83%;
  --popover: 0 0% 83%;
  /* ... other component variables ... */
}`;
export const tailwind = `module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#FAF9F9',
        foreground: '#1F2020',
        accent: {
          50: '#FBFCFE',
          // ... other shades
        }
      }
    }
  }
}`;

export const radix = `:root {
 /* General Colors */   
  --background: 0 9.1% 97.8%;
  --foreground: 180 1.6% 12.4%;
    
  /* Accent Colors */
  --accent-1: 220 60% 99%;
  --accent-2: 216 100% 98%;
  // ... other shades
}`;

export const cssInJs = `export const lightTheme = {
  accent: {
    50: '220 60% 99%',
    100: '216 100% 98%',
    // ... other shades
}`;
export const scss = `:root {
  // Accent Colors
  $accent-50: 220 60% 99%;
  $accent-100: 216 100% 98%;
  $accent-200: 219 100% 96.1%;
  // ... other shades
 }`;

export const materialUI = `const lightTheme = {
      palette: {
        primary: {
          main: '221 91.2% 60%',
          light: '217.2 100% 90.2%',
          dark: '221.3 71.2% 52.4%',
          contrastText: '0 0% 100%',
        },
        secondary: {
          main: '220 1.3% 55.5%',
          light: '200 4.9% 88%',
          dark: '210 1% 39.2%',
          contrastText: '180 1.6% 12.4%',
        }
        // ... other fields
        }
}`;

export const chakraUI = `import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  colors: {
    brand: {
      50: '220 60% 99%',
      100: '216 100% 98%',
      200: '219 100% 96.1%'
        // ... other shades
      }
    }
})`;
