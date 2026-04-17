import { useEffect, useRef } from "react";

import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import outlineImg from "@/assets/images/outline.svg";
import styles from "@/components/Main/Date/Date.module.scss";

const Date = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLTableElement>(null);
    const outlineRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(tableRef.current, 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            )
            .fromTo(outlineRef.current, 
                { 
                    opacity: 0, 
                    scale: 0.5,
                    xPercent: -50, 
                    yPercent: -60,
                    left: "50%",
                    top: "50%",
                    rotate: 15
                }, 
                { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 0.6, 
                    ease: "back.out(1.7)" 
                },
                "-=0.2"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    
    return (
        <div ref={sectionRef} className={styles.date}>
            <table ref={tableRef} className={styles.table}>
                <thead>
                    <tr>
                        <th>Жұма</th>
                        <th>Сенбі</th>
                        <th>Жeксенбі</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.month}>тамыз</div>
                            <div className={styles.day}>7</div>
                        </td>
                        <td>
                            <div className={styles.month}>тамыз</div>
                            <div className={styles.day}>8</div>

                            <Image ref={outlineRef} src={outlineImg} alt="выделенная клетка таблицы" /> 
                        </td>
                        <td>
                            <div className={styles.month}>тамыз</div>
                            <div className={styles.day}>9</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Date;