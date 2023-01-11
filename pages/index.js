import Head from "next/head";

import Tech from "../components/data/tech";

import Content from "../components/content";
import {
  StyledTittle,
  StyledText,
  StyledFlex,
  StyledImage,
} from "../components/global";

export default function Home() {
  return (
    <>
      <Head>
        <title>DS website</title>
        <meta name="description" content="DS website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <StyledTittle>About page</StyledTittle>
        <StyledText margin="20px 0">
          Website to show my technical skills
        </StyledText>
        <StyledImage
          src="https://user-images.githubusercontent.com/48288156/209432145-6f03e80d-4177-44b0-b3f7-a0665fe3569b.gif"
          width={600}
          height={500}
          unoptimized={true}
        />
        <StyledText margin="20px 0">Tech:</StyledText>
        <StyledFlex justify="start">
          {Tech.map((tech) => (
            <StyledImage
              margin="0 10px 0 0"
              src={tech.image}
              width={50}
              height={50}
            />
          ))}
        </StyledFlex>
      </Content>
    </>
  );
}
