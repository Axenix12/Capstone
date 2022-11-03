import Head from "next/head";
import { Section } from "../components";
import {Layout} from "../components"

const Home = () => {
  return (
    <>
      <Head>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section>
        {
          <Layout/>
        }
      </Section>
    </>
  );
};

export default Home;
