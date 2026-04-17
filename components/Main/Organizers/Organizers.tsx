import { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "@/components/Main/Organizers/Organizers.module.scss";

const Organizers = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const namesRef = useRef<HTMLParagraphElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(titleRef.current, 
                { opacity: 0, y: 30 }, 
                { 
                    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                }
            );

            if (namesRef.current && svgRef.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: namesRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                });

                tl.fromTo(namesRef.current, 
                    { opacity: 0, y: 15 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.5, 
                        ease: "power3.out" 
                    }
                ).fromTo(svgRef.current,
                    { clipPath: "inset(0 100% 0 0)" }, 
                    { 
                        clipPath: "inset(0 0% 0 0)", 
                        duration: 0.4,
                        ease: "power2.out" 
                    }
                )
                
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    
    return (
        <div ref={sectionRef} className={styles.organizers}>
            <h2 ref={titleRef} className={styles.title}>Той иелері:</h2>
            <p ref={namesRef} className={styles.names}>
                Төлеу & Анар
                <svg 
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 500 100" 
                    preserveAspectRatio="none"
                >
                    <path d="M10,20 L490,15 L495,80 L15,85 L10,20 Z" fill="#e3ceb6" opacity="0.6"/>
                    <path d="M20,25 L480,20 L485,75 L25,80 L20,25 Z" fill="#e3ceb6" opacity="0.4"/>
                </svg>
            </p>
        </div>
    );
}

export default Organizers;