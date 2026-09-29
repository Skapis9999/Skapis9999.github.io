// Shared behaviour for project report pages: scroll reveal + image lightbox.
(function () {
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in'));
    }

    // Click any figure image to view it full screen
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<button class="close" aria-label="Close">✕</button><img alt="">';
    document.body.appendChild(box);
    const boxImg = box.querySelector('img');

    const close = () => box.classList.remove('open');
    box.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    document.querySelectorAll('.figure img, .pair img, .tile img').forEach(img => {
        img.addEventListener('click', () => {
            boxImg.src = img.currentSrc || img.src;
            boxImg.alt = img.alt;
            box.classList.add('open');
        });
    });
})();
