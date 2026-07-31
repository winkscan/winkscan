(function() {
  var STORAGE_KEY = 'yedu-lang';
  var SUPPORTED = ['en', 'lv', 'ru', 'uk', 'pl'];
  var DEFAULT_LANG = 'en';

  function getLang() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* localStorage unavailable (private mode etc.) — fall back to default */ }
    return SUPPORTED.indexOf(saved) !== -1 ? saved : DEFAULT_LANG;
  }

  function resolve(dict, path) {
    var parts = path.split('.');
    var cur = dict;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  // Rebuilds the privacy policy body from data instead of static markup, so all 5 languages'
  // full legal text (ported from the app's own privacyPolicy.js) can live in one place.
  function renderPolicy(dict) {
    var container = document.querySelector('.policy-content');
    if (!container || !dict.policy) return;
    container.innerHTML = '';

    var updated = document.createElement('p');
    updated.className = 'policy-intro';
    updated.textContent = dict.privacyPage.updatedLabel + dict.policy.updated;
    container.appendChild(updated);

    var intro = document.createElement('p');
    intro.className = 'policy-intro';
    intro.textContent = dict.policy.intro;
    container.appendChild(intro);

    dict.policy.sections.forEach(function(sec) {
      var section = document.createElement('section');
      if (sec.heading) {
        var h = document.createElement('h2');
        h.textContent = sec.heading;
        section.appendChild(h);
      }
      sec.body.split('\n\n').forEach(function(para) {
        var p = document.createElement('p');
        p.textContent = para;
        section.appendChild(p);
      });
      container.appendChild(section);
    });
  }

  function applyTranslations(lang) {
    var dict = (window.YEDU_I18N && window.YEDU_I18N[lang]) || (window.YEDU_I18N && window.YEDU_I18N[DEFAULT_LANG]);
    if (!dict) return;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var value = resolve(dict, el.getAttribute('data-i18n'));
      if (typeof value === 'string') el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function(el) {
      var value = resolve(dict, el.getAttribute('data-i18n-alt'));
      if (typeof value === 'string') el.setAttribute('alt', value);
    });
    document.querySelectorAll('[data-i18n-content]').forEach(function(el) {
      var value = resolve(dict, el.getAttribute('data-i18n-content'));
      if (typeof value === 'string') el.setAttribute('content', value);
    });

    renderPolicy(dict);

    document.querySelectorAll('.lang-switch').forEach(function(sel) {
      sel.value = lang;
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* ignore — language just won't persist across visits */ }
    applyTranslations(lang);
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.lang-switch').forEach(function(sel) {
      sel.addEventListener('change', function() {
        setLang(sel.value);
      });
    });
    applyTranslations(getLang());
  });

  window.YEDU_setLang = setLang;
  window.YEDU_getLang = getLang;
})();
