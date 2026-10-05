import { validateContent } from './validate-content';

const entries = await validateContent();
console.log(`Content languages and bilingual TOCs validated: ${entries.length} translations.`);
