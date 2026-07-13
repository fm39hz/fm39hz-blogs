import { AnimDuration, AnimDurationMs, AnimEasing } from '$lib/design-system/tokens/animation';
import { Dir, Lang, Theme } from '$lib/types';

export { AnimDuration, AnimDurationMs, AnimEasing, Dir, Lang, Theme };

/** @deprecated use AnimDuration.slow */
export const ANIM_DURATION = AnimDuration.slow;
/** @deprecated use AnimDuration.theme */
export const THEME_TRANSITION_DURATION = AnimDuration.theme;
export const COPY_FEEDBACK_MS = AnimDurationMs.theme;
export const COPY_BTN_SIZE = 28;
export const COPY_BTN_ROTATE = 2;
export const POSTS_DIR = '/src/content/articles/*.md';
export const PAGES_DIR = '/src/content/pages/*.md';
export const SLUG_REGEX = /\.(en|vi)\.md$/;
export const MD_EXT_REGEX = /\.md$/;
