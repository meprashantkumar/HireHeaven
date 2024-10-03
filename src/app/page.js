"use client";
import Hero from "@/components/Hero";
import Mid from "@/components/Mid";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

export default function Home() {
  const { loading } = useSelector((state) => state.user);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Hero />
          <Mid />
        </div>
      )}
    </>
  );
}
