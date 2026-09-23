/**
 * Safely scrolls the window to an element by its DOM id with smooth animation.
 * @param {string} id - The ID of the target element.
 * @param {Object} options - Navigation and scroll options.
 * @param {ScrollBehavior} options.behavior - Scroll behavior ('smooth' | 'auto').
 * @param {Function} options.onNavigate - Optional callback after initiating scroll.
 */
export const scrollToSection = (id, options = {}) => {
  const { behavior = 'smooth', onNavigate } = options;
  if (typeof onNavigate === 'function') {
    onNavigate(id);
  }
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior });
  }
};

export default scrollToSection;
