"use client";

import { getCsrfToken } from "next-auth/react";
import React, { useState } from "react";

export default function CsrfTokenInput() {
  const [token, setToken] = useState<string | undefined>("");
  getCsrfToken().then((tokenResp) => setToken(tokenResp));

  return <input type="hidden" name="csrfToken" value={token} />;
}
