import type { AstroIntegration } from '@swup/astro'

declare global {
  interface Window {
    // type from '@swup/astro' is incorrect
    swup: AstroIntegration
    /**
     * Guard flag set by Layout.astro. swup runs with `updateHead: true`, so an inline
     * head script can re-execute on every client-side navigation; this keeps the
     * analytics `page:view` hook registration idempotent.
     */
    __vercelAnalyticsHooked?: boolean
  }
}
