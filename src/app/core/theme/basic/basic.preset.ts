import { definePreset } from '@primeng/themes';
import Material from '@primeng/themes/material';
import light from './light.json';
import dark from './dark.json';

export const basicPreset: unknown = definePreset(
  Material,
  {
    semantic: {
      colorScheme: {
        light: light,
        dark: dark
      }
    }
  }
);
