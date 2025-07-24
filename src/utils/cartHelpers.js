// Helper function to format price to 2 decimal places
export const formatPrice = (price) => {
  return parseFloat(price.toFixed(2));
};

// Optimized debounce helper with immediate option
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return (...args) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}; 