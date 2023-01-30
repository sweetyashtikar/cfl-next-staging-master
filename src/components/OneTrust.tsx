import Script from 'next/script';

export default function OneTrust() {
  return (
    <>
      <Script
        id="manage-onetrust"
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        data-domain-script={
          process.env.NODE_ENV === 'production'
            ? 'bf169abe-796a-4c5d-8db2-5f88c4ae73e6'
            : 'bf169abe-796a-4c5d-8db2-5f88c4ae73e6-test'
        }
        strategy="afterInteractive"
      />
    </>
  );
}
