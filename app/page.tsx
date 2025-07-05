"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/numbers");
  }, [router]);

  return (
    <div>
      <p>Redirecting to Numbers page...</p>
    </div>
  );
};

export default Home;
