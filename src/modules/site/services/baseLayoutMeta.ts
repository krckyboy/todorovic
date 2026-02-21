const defaultGaMeasurementId = 'G-5BEM5384PJ';

interface BuildBaseLayoutMetaInput {
  pathname: string;
  site: URL;
  image?: string;
  isProd: boolean;
  publicGaMeasurementId?: string;
}

interface BaseLayoutMeta {
  canonicalURL: URL;
  socialImageURL: URL;
  gaMeasurementId: string;
  gaScriptUrl: string;
  gaInitScript: string;
}

function resolveGaMeasurementId({
  isProd,
  publicGaMeasurementId,
}: Pick<BuildBaseLayoutMetaInput, 'isProd' | 'publicGaMeasurementId'>) {
  if (!isProd) {
    return '';
  }

  return publicGaMeasurementId ?? defaultGaMeasurementId;
}

function buildGaInitScript(gaMeasurementId: string) {
  if (!gaMeasurementId) {
    return '';
  }

  return `window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`;
}

export function buildBaseLayoutMeta({
  pathname,
  site,
  image,
  isProd,
  publicGaMeasurementId,
}: BuildBaseLayoutMetaInput): BaseLayoutMeta {
  const canonicalURL = new URL(pathname, site);
  const socialImageURL = new URL(image ?? '/og-default.jpg', site);
  const gaMeasurementId = resolveGaMeasurementId({
    isProd,
    publicGaMeasurementId,
  });
  const gaScriptUrl = gaMeasurementId
    ? `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`
    : '';
  const gaInitScript = buildGaInitScript(gaMeasurementId);

  return {
    canonicalURL,
    socialImageURL,
    gaMeasurementId,
    gaScriptUrl,
    gaInitScript,
  };
}
