"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "@/components/Main/Countdown/Countdown.module.scss";

const Countdown = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    
    const calculateTime = useCallback(() => {
        const targetDate = new Date("2026-08-08T16:00:00");
        
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();

        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0 }; // , seconds: 0 
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            // seconds: Math.floor((diff / 1000) % 60),
        };
    }, [])

    const [time, setTime] = useState(calculateTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTime());
        }, 60000); // минут

        return () => clearInterval(interval);
    }, [calculateTime]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            const items = containerRef.current.querySelectorAll(`.${styles.item}`);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            });

            if (titleRef.current) {
                tl.fromTo(titleRef.current, 
                    { opacity: 0, y: -20 }, 
                    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                );
            }

            if (items.length > 0) {
                tl.fromTo(items, 
                    { opacity: 0, y: 40 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8, 
                        stagger: 0.15,
                        ease: "power3.out" 
                    },
                    "-=0.3"
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const format = (n: number) => String(n).padStart(2, "0");

    return (
        <div ref={containerRef} className={styles.countdown}>
            <h2 className={styles.title} ref={titleRef}>Тойға дейін</h2>

            <div className={styles.container}>
                <div className={styles.item}>
                    <span>{format(time.days)}</span>
                    <p>Күн</p>
                </div>

                <div className={styles.item}>
                    <span>{format(time.hours)}</span>
                    <p>Сағат</p>
                </div>

                <div className={styles.item}>
                    <span>{format(time.minutes)}</span>
                    <p>Минут</p>
                </div>

                {/* <div className={styles.item}>
                    <span>{format(time.seconds)}</span>
                    <p>Секунд</p>
                </div> */}
            </div>
        </div>
    );
};

export default Countdown;