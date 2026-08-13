document.addEventListener("DOMContentLoaded", function () {

    const footer = document.querySelector("footer");

    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-logo">
            <img
                src="Asupan Hijab.png.jpg"
                alt="Asupan Hijab">
        </div>

        <p>
            © 2026 Asupan Hijab
        </p>

        <p>
            Semua hak dilindungi.
        </p>

        <div class="footer-links">

            <a href="syarat.html">
                Syarat & Ketentuan
            </a>

            <span>•</span>

            <a href="privasi.html">
                Kebijakan Privasi
            </a>

            <span>•</span>

            <a href="kontak.html">
                Kontak
            </a>

            <span>•</span>

            <a href="tentang.html">
                Tentang Kami
            </a>

            <span>•</span>

            <a href="dmca.html">
                DMCA
            </a>

        </div>
    `;
});
