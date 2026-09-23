/**
 * Calculates discount percentage safely between original and current price.
 * @param {number} originalPrice - Original price in INR.
 * @param {number} currentPrice - Current active price in INR.
 * @returns {number} Rounded percentage discount (e.g. 48).
 */
export const calculateDiscountPercentage = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Returns formatted discount badge text (e.g. "48% OFF").
 * @param {number} originalPrice - Original price in INR.
 * @param {number} currentPrice - Current active price in INR.
 * @param {string} fallback - Fallback label if no discount applies.
 * @returns {string} Formatted discount string.
 */
export const formatDiscountBadge = (originalPrice, currentPrice, fallback = 'Direct From Master Weavers') => {
  const percent = calculateDiscountPercentage(originalPrice, currentPrice);
  return percent > 0 ? `${percent}% OFF` : fallback;
};
