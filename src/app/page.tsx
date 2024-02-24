import authOptions from '@/auth/authOptions'
import { getServerSession } from 'next-auth'
import styles from './Page.module.css';
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <div className={styles.imageContainer}>
        <Image
          src="/steventory-text.png"
          alt="Steventory"
          layout="fill"
          objectFit="contain"
          className={styles.textImage}
        />
      </div>
      <div className={styles.container}>
        <h1 className={styles.miniHeader}>Streamline Your Minecraft Mastery with Steventory:</h1>
        <p className={styles.header}>Where Every Steve Finds Their Treasure!</p>
      </div>

      <p className={styles.bottomLeft}>Steventory 1.21.37</p>
      <p className={styles.bottomRight}>Made with ♥ by make-it-right.</p>
    </div>
  );
}
