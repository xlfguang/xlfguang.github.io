import { useState } from "react";
import Script from "next/script";

export default function Home() {
  const [stripe, setStripe] = useState(null);

  return (
    <>
      <Script
        strategy="beforeInteractive"
        id="stripe-js"
        src="https://map.qq.com/api/gljs?v=1.exp&key=LL4BZ-SMRLU-NC4VR-BPAKJ-ETLX7-C6B2B"
        onLoad={() => {}}
      />
    </>
  );
}
