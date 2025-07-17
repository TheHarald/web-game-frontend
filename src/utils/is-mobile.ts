/**
 * Detects if the current device is a mobile device
 * @returns {boolean} True if the device is likely a mobile device
 */
export const isMobileDevice = (): boolean => {
  // Check for touch support and pointer characteristics
  const hasTouchSupport =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Check user agent for common mobile patterns
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(
      userAgent
    );

  // Check screen characteristics
  const isSmallScreen = window.innerWidth < 768;

  // Combine checks (prioritizing touch support and user agent)
  return hasTouchSupport && (isMobileUserAgent || isSmallScreen);
};
