/**
 * Client-side enquiry forms: validate → confirmation panel → copy message → open Instagram.
 */
(function () {
  const IG_URL = "https://www.instagram.com/crochetbyarfa/";

  function showToast(msg) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2500);
  }

  function clearErrors(form) {
    form.querySelectorAll(".form-group").forEach(function (g) {
      g.classList.remove("has-error");
    });
  }

  function setError(group, msg) {
    group.classList.add("has-error");
    const err = group.querySelector(".error");
    if (err && msg) err.textContent = msg;
  }

  function validateRequired(form) {
    clearErrors(form);
    let ok = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      const group = field.closest(".form-group");
      const val = (field.value || "").trim();
      if (!val) {
        ok = false;
        setError(group, "Please fill in this field.");
      } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        ok = false;
        setError(group, "Please enter a valid email address.");
      }
    });
    return ok;
  }

  function buildMessage(data) {
    const lines = [
      "Hello crochetbyarfa!",
      "",
      "I would like to enquire about your crochet pieces.",
      "",
    ];
    if (data.name) lines.push("Name: " + data.name);
    if (data.product) lines.push("Product / interest: " + data.product);
    if (data.category) lines.push("Category: " + data.category);
    if (data.colours) lines.push("Preferred colours: " + data.colours);
    if (data.size) lines.push("Size / details: " + data.size);
    if (data.city) lines.push("City (shipping): " + data.city);
    if (data.message) {
      lines.push("");
      lines.push("Message:");
      lines.push(data.message);
    }
    lines.push("");
    lines.push("Sent via the crochetbyarfa website enquiry form.");
    return lines.join("\n");
  }

  function collect(form) {
    const data = {};
    form.querySelectorAll("[name]").forEach(function (el) {
      if (el.type === "hidden" && el.name === "whatsapp") return;
      data[el.name] = (el.value || "").trim();
    });
    return data;
  }

  function wireForm(form) {
    const success = form.parentElement.querySelector(".form-success") || form.querySelector(".form-success");
    const fieldsWrap = form.querySelector(".form-fields") || form;
    const copyBtn = (success && success.querySelector("[data-copy]")) || null;
    const igBtn = (success && success.querySelector("[data-ig]")) || null;
    const againBtn = (success && success.querySelector("[data-again]")) || null;
    const preview = success && success.querySelector(".copy-box");

    let lastMessage = "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateRequired(form)) {
        const first = form.querySelector(".form-group.has-error");
        if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      const data = collect(form);
      lastMessage = buildMessage(data);

      if (preview) preview.textContent = lastMessage;

      if (fieldsWrap !== form) {
        fieldsWrap.hidden = true;
      } else {
        form.querySelectorAll(".form-fields-hide").forEach(function (el) {
          el.hidden = true;
        });
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) submitBtn.hidden = true;
      }

      if (success) {
        success.classList.add("is-visible");
        success.hidden = false;
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      try {
        window.open(IG_URL, "_blank", "noopener,noreferrer");
      } catch (err) {
        /* popup blocked — user can click Instagram button */
      }
    });

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        if (!lastMessage && preview) lastMessage = preview.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(lastMessage).then(function () {
            showToast("Enquiry copied — paste it in Instagram DM");
          }).catch(function () {
            fallbackCopy(lastMessage);
          });
        } else {
          fallbackCopy(lastMessage);
        }
      });
    }

    if (igBtn) {
      igBtn.addEventListener("click", function () {
        window.open(IG_URL, "_blank", "noopener,noreferrer");
      });
    }

    if (againBtn) {
      againBtn.addEventListener("click", function () {
        form.reset();
        clearErrors(form);
        if (success) {
          success.classList.remove("is-visible");
          success.hidden = true;
        }
        if (fieldsWrap !== form) fieldsWrap.hidden = false;
        form.querySelectorAll(".form-fields-hide").forEach(function (el) {
          el.hidden = false;
        });
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) submitBtn.hidden = false;
      });
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Enquiry copied — paste it in Instagram DM");
    } catch (e) {
      showToast("Could not copy — select the text manually");
    }
    document.body.removeChild(ta);
  }

  document.querySelectorAll("form[data-enquiry]").forEach(wireForm);

  /* Prefill product from query string on contact/custom */
  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");
  if (product) {
    const field = document.querySelector('[name="product"]');
    if (field) field.value = product;
  }
})();
