import { useEffect } from 'react';

/**
 * SEO Component for managing Head elements
 * @param {string} title - Page title (will be suffixed with " | OFPPT Cours")
 * @param {string} description - Meta description
 * @param {string} keywords - Meta keywords (comma separated)
 */
export default function SEO({ title, description, keywords }) {
    useEffect(() => {
        // Update Title
        const baseTitle = 'OFPPT Cours';
        document.title = title ? `${title} | ${baseTitle}` : baseTitle;

        // Update Meta Tags Helper
        const setMeta = (name, content) => {
            if (!content) return;
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.name = name;
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Standard Meta
        setMeta('description', description);
        setMeta('keywords', keywords);

        // Open Graph / Social Media (Optional advanced addition)
        const setOg = (property, content) => {
            if (!content) return;
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.property = property;
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setOg('og:title', title || baseTitle);
        setOg('og:description', description);

    }, [title, description, keywords]);

    return null;
}
