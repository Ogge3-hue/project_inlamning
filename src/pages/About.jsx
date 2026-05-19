import React from "react";
import AboutStyleh1 from "../Komponenter/AboutSidan/AboutStyleh1";
import AboutStyleP from "../Komponenter/AboutSidan/AboutStyleP";
export default function About() {
    return (
        <div>
            <p className="text-uppercase text-secondary mb-2">About Us</p>
            <AboutStyleh1 />
            <AboutStyleP />
        </div>
    )
}
