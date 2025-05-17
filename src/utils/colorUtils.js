/**
 * Generates a consistent shade of the primary color based on a string input
 * @param {string} str - The input string (tag name)
 * @returns {string} - A CSS color value in the green family (shades of the primary color)
 */
export const getTagColor = (str) => {
  // Generate a hash from the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Base green hue is around 100-140 (for primary color family)
  // Use a narrow hue range to keep colors in the green family
  const hue = 100 + (hash % 40); // Range from 100-140 degrees (greens)
  
  // Vary saturation slightly but keep it high enough for visibility
  const saturation = 60 + (hash % 30); // Range from 60-90%
  
  // Vary lightness but keep it in a readable range
  const lightness = 25 + (hash % 30); // Range from 25-55%
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
