document.addEventListener('alpine:init', () => {
    // Create the x-icon directive
    Alpine.directive('icon', (el, { expression }, { evaluateLater, effect }) => {
        const getIconName = evaluateLater(expression);
        
        const updateIcon = () => {
            getIconName(iconName => {
                if (!iconName) return;
                
                // Convert kebab-case to PascalCase for Lucide
                const pascalCase = iconName
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join('');
                
                // Get the Lucide icon
                const LucideIcon = window.lucide[pascalCase];
                
                if (LucideIcon) {
                    // Get optional attributes
                    const size = el.getAttribute('icon-size') || '24';
                    const strokeWidth = el.getAttribute('icon-stroke') || '2';
                    const color = el.getAttribute('icon-color') || 'currentColor';
                    
                    // Generate the SVG
                    const svg = LucideIcon.toSvg({
                        size: parseInt(size),
                        'stroke-width': parseFloat(strokeWidth),
                        color: color
                    });
                    
                    // Set the innerHTML
                    el.innerHTML = svg;
                } else {
                    console.warn(`Lucide icon "${iconName}" (${pascalCase}) not found`);
                    el.innerHTML = `<span style="color: red;">⚠️</span>`;
                }
            });
        };
        
        // Update icon reactively
        effect(updateIcon);
    });
});