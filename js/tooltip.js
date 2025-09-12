document.addEventListener('alpine:init', () => {
    Alpine.directive('tooltip', (el, { value, modifiers, expression }, { Alpine, effect, cleanup }) => {
        const options = typeof expression === 'string' ? { text: expression } : expression;
        
        // Default options
        const config = {
            text: 'Tooltip text',
            position: 'top',
            arrow: true,
            delay: 0,
            theme: 'light',
            ...options
        };
        
        // Parse modifiers
        modifiers.forEach(modifier => {
            if (['top', 'bottom', 'left', 'right'].includes(modifier)) {
                config.position = modifier;
            }
            if (modifier === 'noarrow') {
                config.arrow = false;
            }
            if (modifier === 'light') {
                config.theme = 'light';
            }
        });
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-popup absolute z-50 pointer-events-none';
        tooltip.style.display = 'none';
        
        // Theme classes
        const themeClasses = {
            dark: 'bg-black bg-opacity-90 text-white',
            light: 'bg-white border border-gray-300 text-gray-900 shadow'
        };
        
        // Create tooltip content
        tooltip.innerHTML = `
            <div class="relative hidden lg:block px-2 py-1 text-xs rounded ${themeClasses[config.theme]}">
                <div class="whitespace-nowrap">${config.text}</div>
                ${config.arrow ? `<div class="tooltip-arrow absolute w-2 h-2 ${config.theme === 'dark' ? 'bg-black bg-opacity-90' : 'bg-white border-gray-300'}"></div>` : ''}
            </div>
        `;
        
        // Position classes
        const positionClasses = {
            top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
            bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
            left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
            right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
        };
        
        // Arrow position classes
        const arrowClasses = {
            top: 'top-full left-1/2 transform -translate-x-1/2 rotate-45 -mt-1',
            bottom: 'bottom-full left-1/2 transform -translate-x-1/2 -rotate-135 -mb-1',
            left: 'left-full top-1/2 transform -translate-y-1/2 -rotate-45 -ml-1',
            right: 'right-full top-1/2 transform -translate-y-1/2 rotate-135 -mr-1'
        };
        
        // Apply positioning
        tooltip.className += ` ${positionClasses[config.position]}`;
        
        if (config.arrow) {
            const arrow = tooltip.querySelector('.tooltip-arrow');
            arrow.className += ` ${arrowClasses[config.position]}`;
            if (config.theme === 'light') {
                arrow.style.borderRight = '1px solid #d1d5db';
                arrow.style.borderBottom = '1px solid #d1d5db';
            }
        }
        
        // Make element container relative
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }
        
        // Append tooltip to element
        el.appendChild(tooltip);
        
        let timeoutId;
        
        // Show tooltip
        const showTooltip = () => {
            if (config.delay) {
                timeoutId = setTimeout(() => {
                    tooltip.style.display = 'block';
                    tooltip.style.opacity = '0';
                    setTimeout(() => tooltip.style.opacity = '1', 10);
                }, config.delay);
            } else {
                tooltip.style.display = 'block';
                tooltip.style.opacity = '0';
                setTimeout(() => tooltip.style.opacity = '1', 10);
            }
        };
        
        // Hide tooltip
        const hideTooltip = () => {
            if (timeoutId) clearTimeout(timeoutId);
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.style.display = 'none', 150);
        };
        
        // Event listeners
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
        el.addEventListener('focus', showTooltip);
        el.addEventListener('blur', hideTooltip);
        
        // Add transition
        tooltip.style.transition = 'opacity 0.15s ease-in-out';
        
        // Cleanup
        cleanup(() => {
            el.removeEventListener('mouseenter', showTooltip);
            el.removeEventListener('mouseleave', hideTooltip);
            el.removeEventListener('focus', showTooltip);
            el.removeEventListener('blur', hideTooltip);
            if (timeoutId) clearTimeout(timeoutId);
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        });
    });
});