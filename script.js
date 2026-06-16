        // TICKER
        const msgs = ['١٢+ سنة خبرة', 'مليون متابع على يوتيوب', 'تدريب حضوري في دبي', 'تدريب أونلاين لكل العالم', 'نتائج حقيقية وموثقة', 'باقة مخصصة لكل عميل', 'استشارة مجانية عبر واتساب'];
        const track = document.getElementById('ticker');
        const full = [...msgs, ...msgs, ...msgs, ...msgs].map(m => `<span>${m}</span>`).join('');
        track.innerHTML = full;

        // MODAL
        let currentStep = 0, selectedPkg = 'online';
        const answers = {};

        function openModal(pkg) {
            selectedPkg = pkg;
            document.getElementById('modalPkgLabel').textContent = pkg === 'inperson' ? 'التدريب الحضوري · دبي' : 'التدريب أونلاين';
            currentStep = 0;
            Object.keys(answers).forEach(k => delete answers[k]);
            document.querySelectorAll('.modal-step').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.q-opt').forEach(o => o.classList.remove('selected'));
            document.getElementById('step0').classList.add('active');
            updateDots();
            document.getElementById('modal').classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeModal() { document.getElementById('modal').classList.remove('open'); document.body.style.overflow = ''; }
        function handleOverlayClick(e) { if (e.target === document.getElementById('modal')) closeModal(); }

        function selectOpt(el, key, val) {
            el.closest('.q-options').querySelectorAll('.q-opt').forEach(o => o.classList.remove('selected'));
            el.classList.add('selected');
            answers[key] = val;
        }
        function updateDots() {
            for (let i = 0; i < 3; i++) document.getElementById('dot' + i).classList.toggle('done', i <= currentStep);
        }
        function nextStep() {
            if (currentStep < 2) {
                document.getElementById('step' + currentStep).classList.remove('active');
                currentStep++;
                document.getElementById('step' + currentStep).classList.add('active');
                updateDots();
            }
        }
        function prevStep() {
            if (currentStep > 0) {
                document.getElementById('step' + currentStep).classList.remove('active');
                currentStep--;
                document.getElementById('step' + currentStep).classList.add('active');
                updateDots();
            }
        }
        function submitModal() {
            document.getElementById('step2').classList.remove('active');
            document.getElementById('stepResult').classList.add('active');
            const qualified = answers.invest !== 'no' && answers.commit !== 'low';
            const icon = document.getElementById('resultIcon');
            const title = document.getElementById('resultTitle');
            const text = document.getElementById('resultText');
            const waBtn = document.getElementById('resultWa');
            if (qualified) {
                icon.textContent = '🏆'; title.textContent = 'أنت مرشح ممتاز!';
                text.textContent = 'بناءً على إجاباتك، أنت جاد وجاهز. تواصل معي الآن وسنحجز لك جلسة استشارية مجانية خلال ٢٤ ساعة.';
                waBtn.style.display = 'inline-flex';
            } else {
                icon.textContent = '💡'; title.textContent = 'شكراً لصدقك!';
                text.textContent = 'يبدو إنك لسا في مرحلة الاستكشاف. ابدأ بمتابعة قناتي على يوتيوب — فيها كل المحتوى المجاني اللي تحتاجه للبداية.';
                waBtn.style.display = 'none';
            }
        }

        // NAV
        function toggleNav() { document.querySelector('nav').classList.toggle('mobile-nav-open'); }

        // SCROLL REVEAL
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible') } });
        }, { threshold: .12 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));