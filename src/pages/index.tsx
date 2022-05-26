import styles from './home.module.scss'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { GetStaticProps } from 'next'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}
export default function Home({ product } : HomeProps) {
  return (
    <>
      <Head><title> Home | ig.news</title></Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Opa , Bem Vindo !</span>
          <h1>Notícias sobre o mundo do <span>React</span></h1>
          <p>
            Para ter acesso a todas publicações <br />
            <span>Somente {product.amount} Por mês</span>
          </p>
          <SubscribeButton priceId = {product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Garota programando"></img>
      </main>
    </>
  )
}
export const getStaticProps : GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1L3RA8AUFBYOfB4EKaDz5ddI')
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style:'currency',
      currency:'BRL'
    },).format(price.unit_amount / 100)
  }
  return {
    props: {
      product,
    },
    revalidate:60 * 60 * 24, // 24 hours
  }
}
