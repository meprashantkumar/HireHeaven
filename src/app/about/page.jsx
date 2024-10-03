import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen">
      <section className="container px-4 py-8">
        <img src={"/about.jpg"} className="w-[500px] m-auto mb-3" alt="" />
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl  font-bold mb-6">
            Our Mission At Hire <span className="text-red-500">Heaven</span>
          </h2>

          <p className="text-lg md:text-xl mb-8">
            At HireHaven, we're dedicated to revolutionizing the job search
            experience. Our mission is to create meaningful connections between
            talented individuals and forward-thinking companies, fostering
            growth and success for both.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="container px-4 text-center mx-auto">
          <h2 className="text-3xl md:text-4xl  font-bold mb-6">
            Ready to find your dream job?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Join thousands of successful job seekers on Hireheaven
          </p>
          <Link href={"/jobs"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
