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
            if (!audioRef.current) return;

            if (document.hidden) {
                audioRef.current.pause();
            } else {
                if (isIntroOpening) {
					audioRef.current.playbackRate = 1.0;
					const currentTime = audioRef.current.currentTime;
                    audioRef.current.currentTime = currentTime;

                    audioRef.current.play().catch(() => {
                        console.log("Автоплей при возврате заблокирован");
                    });
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