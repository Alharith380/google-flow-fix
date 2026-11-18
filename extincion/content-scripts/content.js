(function () {
  function e(e) {
    return e;
  }
  var t =
      /^https:\/\/www\.gstatic\.com\/_\/mss\/boq-labs-ai-sandbox\/_\/js\/k=boq-labs-ai-sandbox\.AiSandboxAngularFrontend\./,
    n = /\/m=_b$/,
    r = [
      {
        name: `unsupported-country`,
        find: /if\(\s*!\s*[\w$]+\s*\.\s*[\w$]+\s*\(\s*\)\s*\)\s*(?=return\s+new\s+[\w$]+\(\s*_\s*\.\s*[\w$]+\(\s*[\w$]+\s*,\s*"\/unsupported-country"\s*\))/,
        replace: `if(false)`,
      },
      {
        name: `unavailable`,
        find: /return\s+new\s+[\w$]+\(\s*_\s*\.\s*[\w$]+\(\s*[\w$]+\s*,\s*"\/unavailable"\s*\)\s*\)/,
        replace: `return!0`,
      },
      {
        name: `unsupported-browser`,
        find: /if\(\s*(?:_\s*\.\s*)?[\w$]+\(\s*[\w$]+\s*\)\s*\)\s*(?=return\s+new\s+[\w$]+\(\s*[\w$]+\s*\.\s*[\w$]+\(\s*\[\s*"\/unsupported-browser"\s*\])/,
        replace: `if(false)`,
      },
    ],
    i = `[google-flow-fix]`,
    a = e({
      matches: [`https://flow.google.com/*`],
      runAt: `document_start`,
      world: `MAIN`,
      main() {
        let e = new MutationObserver((t) => {
          for (let n of t)
            for (let t of n.addedNodes)
              if (o(t)) {
                e.disconnect();
                try {
                  s(t);
                } catch (e) {
                  console.error(i, `left the page unpatched:`, e);
                }
                return;
              }
        });
        (e.observe(document, { childList: !0, subtree: !0 }),
          document.addEventListener(`DOMContentLoaded`, () => e.disconnect(), {
            once: !0,
          }));
      },
    });
  function o(e) {
    return !(e instanceof HTMLScriptElement) || !e.src
      ? !1
      : t.test(e.src) && (e.id === `base-js` || n.test(e.src));
  }
  function s(e) {
    let t = e.src,
      n = e.parentNode;
    if (!n) return;
    if (`default_AiSandboxAngularFrontend` in window) {
      console.warn(i, `bundle already executed, skipping:`, t);
      return;
    }
    let { code: r, applied: a, missed: o } = c(u(t));
    if (a.length === 0) {
      console.warn(i, `no pattern matched, leaving the page alone:`, t);
      return;
    }
    let s = d(e),
      l = document.createElement(`script`);
    ((l.nonce = e.nonce), h(l, r));
    let f = e.nextSibling;
    (e.remove(),
      n.insertBefore(s, f),
      n.insertBefore(l, f),
      console.info(i, `bypassed:`, a.join(`, `)),
      o.length &&
        console.warn(i, `patterns that need updating:`, o.join(`, `), t),
      showCredit());
  }
  function c(e) {
    let t = [],
      n = [],
      i = e;
    for (let { name: e, find: a, replace: o } of r) {
      let r = l(i, a);
      r === 1
        ? ((i = i.replace(a, o)), t.push(e))
        : n.push(`${e} (${r} matches)`);
    }
    return { code: i, applied: t, missed: n };
  }
  function l(e, t) {
    let n = new RegExp(
      t.source,
      t.flags.includes(`g`) ? t.flags : `${t.flags}g`,
    );
    return (e.match(n) ?? []).length;
  }
  function u(e) {
    let t = new XMLHttpRequest();
    if ((t.open(`GET`, e, !1), t.send(), t.status !== 200))
      throw Error(`${e} returned ${t.status}`);
    return t.responseText;
  }
  function d(e) {
    let t = document.createElement(`script`);
    t.type = `application/json`;
    for (let { name: n, value: r } of Array.from(e.attributes))
      n !== `type` && n !== `src` && t.setAttribute(n, r);
    return ((t.nonce = e.nonce), g(t, e.src), t);
  }
  var f,
    p = !1;
  function m() {
    if (p) return f;
    p = !0;
    let e = globalThis.trustedTypes;
    if (e?.createPolicy) {
      try {
        f = e.createPolicy(`google-flow-fix`, {
          createScript: (e) => e,
          createScriptURL: (e) => e,
        });
      } catch (e) {
        console.warn(i, `could not create a trusted types policy:`, e);
      }
      return f;
    }
  }
  function h(e, t) {
    let n = m();
    e.text = n ? n.createScript(t) : t;
  }
  function g(e, t) {
    let n = m();
    e.src = n ? n.createScriptURL(t) : t;
  }

  function showCredit() {
    var MESSAGE = "تم تخطي الحظر ✅ مع تحيات الحارث مياسا";
    function render() {
      if (document.getElementById("harith-credit-toast")) return;
      var toast = document.createElement("div");
      toast.id = "harith-credit-toast";
      toast.textContent = MESSAGE;
      toast.setAttribute("dir", "rtl");
      Object.assign(toast.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%) translateY(-20px)",
        background: "linear-gradient(135deg,#1a73e8,#0d47a1)",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "12px",
        fontSize: "16px",
        fontFamily: "Tahoma,Arial,sans-serif",
        fontWeight: "bold",
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
        zIndex: "2147483647",
        opacity: "0",
        transition: "opacity .4s ease, transform .4s ease",
        pointerEvents: "none",
      });
      document.documentElement.appendChild(toast);
      requestAnimationFrame(function () {
        toast.style.opacity = "1";
        toast.style.transform = "translateX(-50%) translateY(0)";
      });
      setTimeout(function () {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(-50%) translateY(-20px)";
        setTimeout(function () {
          toast.remove();
        }, 500);
      }, 5000);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", render);
    } else {
      render();
    }
  }

  var _ = {
    debug: (...e) => ([...e], void 0),
    log: (...e) => ([...e], void 0),
    warn: (...e) => ([...e], void 0),
    error: (...e) => ([...e], void 0),
  };
  return (async () => {
    try {
      return await a.main();
    } catch (e) {
      throw (_.error(`The content script "content" crashed on startup!`, e), e);
    }
  })();
})();
