import Script from 'next/script';
import { GA4_ID, GTM_ID } from '@/lib/analytics';

/**
 * GTM / GA4 BETÖLTÉS
 * ----------------------------------------------------------------------------
 * Csak akkor tölt be bármit, ha a `.env` fájlban meg van adva az azonosító.
 * Enélkül a `track()` hívások a `window.dataLayer` tömbbe gyűlnek, és semmilyen
 * külső kérés nem indul — így fejlesztés közben nincs mérési zaj.
 */
export function AnalyticsScripts() {
  if (!GTM_ID && !GA4_ID) return null;

  return (
    <>
      {GTM_ID ? (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      ) : null}

      {!GTM_ID && GA4_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4-loader" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());gtag('config','${GA4_ID}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
