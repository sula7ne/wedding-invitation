import Image from "next/image";
import coupleImg from "@/assets/images/path1.jpg";
import styles from "@/components/Main/Banner/Banner.module.scss";

const Banner = () => {
    return (
        <div className={styles.banner}>
            <Image src={coupleImg} alt="Фото пары" />
            
            <div className={styles.text}>
                <h1 className={styles.names}>Asylzhan & Kamila</h1>
                <p className={styles.date}>08/08</p>
            </div>
        </div>
    );
}

export default Banner;