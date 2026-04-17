import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import styles from "@/components/Main/Info/Info.module.scss";

const Info = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(titleRef.current, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            )
            .fromTo(textRef.current, 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.6"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={styles.info}>
            <h2 ref={titleRef} className={styles.title}>Құрметті қонақтар!</h2>
            <p ref={textRef} className={styles.description}>Біз бұл күнді ерекше өткізгіміз келеді, сондықтан сіздерді үйлену тойымызды бізбен бірге тойлауға шақырамыз!</p>
        </div>
    );
}

export default Info;