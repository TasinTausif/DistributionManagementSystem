export const getImageUrl = (path) => {
    if (!path) return '';

    if (/^https?:\/\//i.test(path) || path.startsWith('blob:') || path.startsWith('data:')) {
        return path;
    }

    const apiUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '').replace(/^storage\//, '');

    return `${apiUrl}/product-images/${cleanPath}`;
};
