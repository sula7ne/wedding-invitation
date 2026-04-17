import Banner from "./Banner/Banner";
import Confetti from "../Animations/Confetti/Confetti";
import Countdown from "./Countdown/Countdown";
import Date from "./Date/Date";
import Form from "@/components/Form/Form";
import Info from "./Info/Info";
import Location from "./Location/Location";
import Organizers from "./Organizers/Organizers";
import { RefObject } from "react";
import TimePath from "./TimePath/TimePath";
import styles from "@/components/Main/Main.module.scss"

interface MainProps {
    audioRef: RefObject<HTMLAudioElement | null>;
}

const Main = ({ audioRef }: MainProps) => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Confetti audioRef={audioRef} />


                <Banner />

                <Info />

                <Date />

                <TimePath />

                <Countdown />

                <Location />

                <Organizers />
                
                <Form />
            </div>
        </main>
    );
}

export default Main;