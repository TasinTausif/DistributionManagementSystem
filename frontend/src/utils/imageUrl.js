/**
 * Get the full URL for an image stored on the backend.
 * 
 * @param {string} path - The relative path from the storage root (e.g., 'products/123.jpg')
 * @returns {string} - The full URL to the image
 */
export const getImageUrl = (path) => {
    if (!path) return '';
    const storageUrl = import.meta.env.VITE_STORAGE_URL || 'http://127.0.0.1:8000/storage';
    // Ensure we don't double slash
    const cleanUrl = storageUrl.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return `${cleanUrl}/${cleanPath}`;
};
