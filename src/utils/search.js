/**
 * Unified product search matching predicate across catalog and search modal.
 * Matches query string case-insensitively against name, fabric, category, department, colorName, and zari.
 * @param {Object} product - Product object from catalog.
 * @param {string} searchQuery - Search query string.
 * @returns {boolean} True if product matches the query.
 */
export const matchesProductSearch = (product, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) return true;
  if (!product) return false;

  const q = searchQuery.trim().toLowerCase();
  const name = (product.name || '').toLowerCase();
  const fabric = (product.fabric || '').toLowerCase();
  const category = (product.category || '').toLowerCase();
  const department = (product.department || '').toLowerCase();
  const colorName = (product.colorName || '').toLowerCase();
  const zari = (product.zari || '').toLowerCase();

  return (
    name.includes(q) ||
    fabric.includes(q) ||
    category.includes(q) ||
    department.includes(q) ||
    colorName.includes(q) ||
    zari.includes(q)
  );
};

export default matchesProductSearch;
