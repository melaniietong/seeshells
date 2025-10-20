export const formatName = (name: string): string => {
    if (!name) return '';

    const formatted = name.replace(/_/g, ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};