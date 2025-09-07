import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';
import light from './light.json';
import dark from './dark.json';
import components from './components.json';

console.log(Material)
export const basicPreset: unknown = definePreset(
  Material,
  {
    components: { ...components },
    semantic: {
      colorScheme: {
        light: light,
        dark: dark
      },
      primary: {
        50: '{green.50}',
        100: '{green.100}',
        200: '{green.200}',
        300: '{green.300}',
        400: '{green.400}',
        500: '{green.500}',
        600: '{green.600}',
        700: '{green.700}',
        800: '{green.800}',
        900: '{green.900}',
        950: '{green.950}'
      }
    }
  }
);
console.log((basicPreset as any))
