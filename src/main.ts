// Import styles.
import 'vidstack/player/styles/base.css';
// Register elements.
import 'vidstack/player';
import 'vidstack/player/ui';
import 'vidstack/icons';

import { LibASSTextRenderer, type TextTrackInit } from 'vidstack';

const player = document.querySelector('media-player')!;
const renderer = new LibASSTextRenderer(() => import('jassub'), {
  workerUrl: '/jassub/jassub-worker.js',
  legacyWorkerUrl: '/jassub/jassub-worker-legacy.js',
  availableFonts: {
    'touche semibold': `https://s3.translate.mom/Touche-Semibold-BF642a2ebf682d9.woff2`,
  },
  blendMode: 'js',
  debug: true,
});

player.textRenderers.add(renderer);

// We can listen for the `can-play` event to be notified when the player is ready.
player.addEventListener('can-play', () => {
  // ...
});

// ***********************************************************************************************
// Text Track Management
// ***********************************************************************************************

/**
 * You can add these tracks using HTML as well.
 *
 * @example
 * ```html
 * <media-provider>
 *   <track label="..." src="..." kind="..." srclang="..." default />
 *   <track label="..." src="..." kind="..." srclang="..." />
 * </media-provider>
 * ```
 */
const tracks: TextTrackInit[] = [
  // Subtitles
  {
    src: 'https://s3.translate.mom/(translatemom)subtitles.ass',
    label: 'English',
    language: 'en-US',
    kind: 'subtitles',
    default: true,
    type: 'ass',
  },
  {
    src: 'https://files.vidstack.io/sprite-fight/subs/spanish.vtt',
    label: 'Spanish',
    language: 'es-ES',
    kind: 'subtitles',
  },
  // Chapters
  {
    src: 'https://files.vidstack.io/sprite-fight/chapters.vtt',
    kind: 'chapters',
    language: 'en-US',
    default: true,
  },
];

for (const track of tracks) {
  player.textTracks.add(track);
}
