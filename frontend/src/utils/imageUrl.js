/**
 * Get the full URL for an image stored on the backend.
 * 
 * @param {string} path - The relative path from the storage root (e.g., 'products/123.jpg')
 * @returns {string} - The full URL to the image
 */
export const getImageUrl = (path) => {
    if (!path) return '';

    if (/^https?:\/\//i.test(path) || path.startsWith('blob:') || path.startsWith('data:')) {
        return path;
    }

    const apiUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '').replace(/^storage\//, '');

    return `${apiUrl}/product-images/${cleanPath}`;
};
