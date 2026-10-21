<script lang="ts">
import styles from './PencilFilters.module.scss';

/**
 * SVG filter defs behind `.pencil-edge` (global.scss). Mounted once by the
 * root layout. `#pencil-wiggle` animates the turbulence seed; consumers MUST
 * use `.pencil-edge` (own compositor layer) so re-filtering stays on that box,
 * not the scrolling document. `#pencil-edge-static` is the frozen twin for
 * off-screen surfaces and prefers-reduced-motion.
 */
</script>

<svg xmlns="http://www.w3.org/2000/svg" class={styles.defs} aria-hidden="true">
  <defs>
    <filter id="pencil-wiggle" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="1" result="noise">
        <animate attributeName="seed" values="1;3;5;7;2;6;4;1" dur="1.5s" repeatCount="indefinite" />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
    <filter id="pencil-edge-static" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>
