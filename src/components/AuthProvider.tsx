"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [Provider, setProvider] = useState<React.ComponentType<{ children: ReactNode }> | null>(
    null
  );
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    import("@workos-inc/authkit-nextjs/components")
      .then((mod) => {
        setProvider(() => mod.AuthKitProvider);
      })
      .catch(() => {
        // WorkOS not available — skip auth provider
      })
      .finally(() => setChecked(true));
  }, []);

  if (!checked) return null;
  if (Provider) return <Provider>{children}</Provider>;
  return <>{children}</>;
}
