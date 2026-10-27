(function () {
  var b = document.querySelector(".menu"),
    n = document.getElementById("nav");
  function set(o) {
    b.setAttribute("aria-expanded", o);
    n.classList.toggle("open", o);
  }
  b.addEventListener("click", function () {
    set(b.getAttribute("aria-expanded") !== "true");
  });
  n.addEventListener("click", function (e) {
    if (e.target.tagName === "A") set(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && n.classList.contains("open")) {
      set(false);
      b.focus();
    }
  });
  document.getElementById("y").textContent = new Date().getFullYear();
  if ("IntersectionObserver" in window) {
    var links = [].slice.call(n.querySelectorAll("a"));
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            links.forEach(function (a) {
              var on = a.getAttribute("href") === "#" + e.target.id;
              a.classList.toggle("on", on);
              on
                ? a.setAttribute("aria-current", "true")
                : a.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute("href"));
      s && io.observe(s);
    });
  }
})();
