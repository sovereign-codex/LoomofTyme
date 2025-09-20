export interface BackgroundConfig {
  backgroundImage?: string;
  scrollGlowEffect: boolean;
}

export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  backgroundImage: "assets/generated/scroll_chamber_bg.png",
  scrollGlowEffect: true
};

export const TYME_HALL_CONFIG: BackgroundConfig = {
  backgroundImage: undefined, // Use default mystical background
  scrollGlowEffect: true
};

/**
 * Apply background configuration to the scroll chamber interface
 */
export function applyBackgroundConfig(config: BackgroundConfig = DEFAULT_BACKGROUND_CONFIG) {
  const rootElement = document.documentElement;
  
  // Apply background image if specified
  if (config.backgroundImage) {
    rootElement.style.setProperty('--scroll-chamber-bg', `url(${config.backgroundImage})`);
  } else {
    rootElement.style.removeProperty('--scroll-chamber-bg');
  }
  
  // Apply glow effect setting
  if (config.scrollGlowEffect) {
    rootElement.classList.add('scroll-glow-enabled');
  } else {
    rootElement.classList.remove('scroll-glow-enabled');
  }
  
  return config;
}

/**
 * Get current background configuration from DOM
 */
export function getCurrentConfig(): BackgroundConfig {
  const rootElement = document.documentElement;
  const backgroundImage = rootElement.style.getPropertyValue('--scroll-chamber-bg');
  const scrollGlowEffect = rootElement.classList.contains('scroll-glow-enabled');
  
  return {
    backgroundImage: backgroundImage || undefined,
    scrollGlowEffect
  };
}