"use client"

import { useEffect, useRef, useState } from "react";

import Intro from "@/components/Intro/Intro";
import Loader from "@/components/Loader/Loader";
import Main from "@/components/Main/Main";
import { useAppSelector } from "@/state/hooks";

const Home = () => {
	const { isIntro, isIntroOpening } = useAppSelector(state => state.app);

	const [isLoading, setIsLoading] = useState(true);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const audioPath = "/audio/ordinary.mp3";

	useEffect(() => {
		const preloadImages = () => {
			const images = Array.from(document.images);

			return Promise.all(
				images.map((img) => {
					if (img.complete) return Promise.resolve();

					return new Promise((resolve) => {
						img.onload = resolve;
						img.onerror = resolve;
					});
				})
			);
		};

		const init = async () => {
			await Promise.all([
                preloadImages(),
                document.fonts.ready 
            ]);

			await new Promise((res) => setTimeout(res, 300));

			setIsLoading(false);
		};

		init();
	}, []);

	useEffect(() => {
        const handleVisibilityChange = () => {
            const audio = audioRef.current;
            if (!audio) return;

            if (document.hidden) {
                audio.pause();
            } else {
                if (isIntroOpening) {
                    // 1. Сначала жестко сбрасываем скорость в дефолт
                    audio.playbackRate = 1.0;
                    audio.defaultPlaybackRate = 1.0;

                    // 2. Делаем микро-паузу перед воспроизведением. 
                    // Это дает мобильному браузеру время "проснуться"
                    setTimeout(() => {
                        // 3. Трюк для iOS: если скорость скачет, 
                        // кратковременно меняем её и возвращаем назад
                        audio.playbackRate = 1.1; 
                        
                        audio.play().then(() => {
                            // Как только заиграло — возвращаем на нормальную скорость
                            setTimeout(() => {
                                audio.playbackRate = 1.0;
                            }, 50);
                        }).catch(() => {
                            console.log("Play blocked");
                        });
                    }, 100); 
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isIntroOpening]);

	return (
		<div>
			{isLoading && <Loader />}

			{!isLoading && isIntro && <Intro audioRef={audioRef} />}
			
			{/* !isIntro */}
			{!isLoading && <Main audioRef={audioRef} />}

			<audio ref={audioRef} src={audioPath} preload="auto" />
		</div>
	);
}

export default Home;