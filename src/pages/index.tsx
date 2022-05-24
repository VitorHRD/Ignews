import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'

export default function Home() {
  return (
    <>
      <Head><title> Home | ig.news</title></Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Opa , Bem Vindo !</span>
          <h1>Notícias sobre o mundo do <span>React</span></h1>
          <p>
            Para ter acesso a todas publicações <br />
            <span>Somente R$9,90 Por mês</span>
          </p>
          <SubscribeButton/>
        </section>

        <img src="/images/avatar.svg" alt="Garota programando"></img>
      </main>
    </>
  )
}
