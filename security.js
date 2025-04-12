// Source Protection System
(function() {
    const protect = {
        hash: str => btoa(encodeURIComponent(str)).split('').reverse().join(''),
        
        secureElement: element => {
            const content = element.innerHTML;
            element.innerHTML = protect.hash(content);
            element.setAttribute('data-protected', 'true');
        },

        secureAll: () => {
            const elements = document.querySelectorAll('script:not([src]), .song-slide, .player-controls');
            elements.forEach(protect.secureElement);
        }
    };

    // Detect DevTools
    setInterval(() => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) protect.secureAll();
    }, 100);

    // Prevent inspection
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey && e.shiftKey) || e.key === 'F12') {
            e.preventDefault();
            protect.secureAll();
        }
    }, true);

    // Block right-click
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        protect.secureAll();
    }, true);

    // Console protection
    ['log', 'info', 'warn', 'error', 'debug'].forEach(method => {
        console[method] = () => {
            protect.secureAll();
            return 'Access Denied';
        };
    });

    // Additional protection layers
    Object.defineProperty(window, 'console', {
        get: function() {
            protect.secureAll();
            return {
                log: () => {},
                warn: () => {},
                error: () => {},
                info: () => {},
                debug: () => {}
            };
        }
    });

    // Monitor source code changes
    new MutationObserver(() => {
        protect.secureAll();
    }).observe(document.documentElement, {
        childList: true,
        subtree: true
    });
})();
