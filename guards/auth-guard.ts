import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import state from "@/store";

interface AuthGuardProps {
  children: any;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const snap = useSnapshot(state);
  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  let isAuthenticated = snap.isAuthenitcated;
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      router
        .replace({
          pathname: "/login",
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady]);

  return children;
};

export default AuthGuard;
