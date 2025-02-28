// Theme Management
        function toggleTheme() {
            const body = document.body;
            const themeToggle = document.querySelector('.theme-toggle i');
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                body.removeAttribute('data-theme');
                themeToggle.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            }
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            document.querySelector('.theme-toggle i').className = 'fas fa-sun';
        }

        // Zakat Calculation
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => input.addEventListener('input', calculateZakat));

        function calculateZakat() {
            const values = {};
            ['cash', 'gold', 'business', 'other', 'debts', 'goldPrice', 'silverPrice'].forEach(id => {
                values[id] = parseFloat(document.getElementById(id).value) || 0;
            });

            const totalAssets = values.cash + values.gold + values.business + values.other;
            const netWealth = totalAssets - values.debts;
            const nisab = Math.min(87.48 * values.goldPrice, 612.36 * values.silverPrice);
            const zakatPayable = netWealth >= nisab;
            const zakatAmount = zakatPayable ? netWealth * 0.025 : 0;

            // Update UI with animations
            document.querySelectorAll('.results').forEach(el => {
                el.style.animation = 'none';
                setTimeout(() => el.style.animation = 'scaleUp 0.3s ease', 10);
            });

            document.getElementById('totalAssets').textContent = totalAssets.toFixed(2);
            document.getElementById('totalDebts').textContent = values.debts.toFixed(2);
            document.getElementById('netWealth').textContent = netWealth.toFixed(2);
            document.getElementById('nisab').textContent = nisab.toFixed(2);
            document.getElementById('zakatPayable').textContent = zakatPayable ? 'Yes' : 'No';
            document.getElementById('zakatAmount').textContent = zakatAmount.toFixed(2);

            const zakatPayableElement = document.getElementById('zakatPayable');
            zakatPayableElement.style.color = zakatPayable ? 'var(--primary)' : '#dc3545';
        }