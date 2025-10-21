#!/usr/bin/env node

/**
 * Critical CSS Inlining Script
 * This script inlines critical CSS for above-the-fold content
 * to improve PageSpeed scores and reduce render-blocking resources
 */

import { critical } from 'critical';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const config = {
  base: join(projectRoot, 'dist/'),
  src: 'index.html',
  dest: 'index.html',
  inline: true,
  extract: true,
  width: 1300,
  height: 900,
  minify: true,
  ignore: {
    atrule: ['@font-face'],
    rule: [/\.sr-only/],
    decl: (node, value) => {
      return /url\(/.test(value);
    }
  }
};

try {
  console.log('🎨 Inlining critical CSS...');
  const { css, html } = await critical.generate(config);
  console.log('✅ Critical CSS inlined successfully!');
  console.log(`📊 Critical CSS size: ${(css.length / 1024).toFixed(2)} KB`);
} catch (error) {
  console.error('❌ Error inlining critical CSS:', error);
  process.exit(1);
}
