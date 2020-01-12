function loadScript(id) {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;

  document.body.appendChild(script);
}

const install = function(Vue, { id = null, enabled = true } = {}) {
  if (!id) {
    throw new Error("[vue-gtag]: id is required");
  }

  const inBrowser = typeof window !== "undefined";

  let dataLayer = [];

  if (inBrowser) {
    window.dataLayer = window.dataLayer || [];
    dataLayer = window.dataLayer;
  }

  const gtag = (...rest) => {
    dataLayer.push(...rest);
  };

  gtag({
    "gtm.start": new Date().getTime(),
    event: "gtm.js"
  });

  Vue.prototype.$gtag = gtag;
  Vue.prototype.$gact = (action, ...rest) =>
    gtag({
      event: "interaction",
      action,
      ...rest
    });

  if (enabled) {
    loadScript(id);
  }
};

export default { install };
