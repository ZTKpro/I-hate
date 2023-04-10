// ChatGPT APP

import React, { useState, useEffect } from "react";

import Content from "../../components/content";

import styled from "styled-components";

const StyledTitle = styled.h4`
  margin-bottom: 15px;
  span {
    background: -webkit-linear-gradient(#4ef9fe, #0696ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
`;

const Label = styled.label``;

const Input = styled.input`
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const ProductListContainer = styled.div`
  margin: 20px 0;
`;

const Product = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  gap: 15px;
`;

const ProductTitle = styled.h3`
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Cost = styled.p`
  display: flex;
  gap: 15px;
`;

const ProductLink = styled.p`
  display: flex;
  gap: 16px;
`;

const ProductLinkColor = styled.div`
  color: #007bff;
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = { name, link, price, link1, link2, link3 };
    setProducts([...products, newProduct]);
    setName("");
    setLink("");
    setPrice("");
    setLink1("");
    setLink2("");
    setLink3("");
  };

  const deleteProduct = (productName) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.name !== productName)
    );
  };

  return (
    <Content overflow="hidden">
      <StyledTitle>
        App created by <span> Chat GPT</span>
      </StyledTitle>
      <Form onSubmit={handleSubmit}>
        <Label>
          Nazwa produktu:
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Label>
        <Label>
          Link:
          <Input
            type="text"
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
        </Label>
        <Label>
          Cena:
          <Input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </Label>
        <Label>
          Allegro:
          <Input
            type="text"
            value={link1}
            onChange={(event) => setLink1(event.target.value)}
          />
        </Label>
        <Label>
          Olx:
          <Input
            type="text"
            value={link2}
            onChange={(event) => setLink2(event.target.value)}
          />
        </Label>

        <Label>
          Vinted:
          <Input
            type="text"
            value={link3}
            onChange={(event) => setLink3(event.target.value)}
          />
        </Label>

        <Button type="submit">Dodaj produkt</Button>
      </Form>
      <ProductListContainer>
        {products.map((product, index) => (
          <Product key={index}>
            <ProductTitle onClick={() => deleteProduct(product.name)}>
              {product.name}
            </ProductTitle>
            <ProductLinkColor>
              <a href={product.link} target="_blank" rel="noreferrer">
                From
              </a>
            </ProductLinkColor>
            <Cost>
              <h4>Cena:</h4>
              {product.price} zł
            </Cost>
            <ProductLink>
              <ProductLinkColor>
                <a href={product.link1} target="_blank" rel="noreferrer">
                  Allegro
                </a>
              </ProductLinkColor>
            </ProductLink>
            <ProductLink>
              <ProductLinkColor>
                <a href={product.link2} target="_blank" rel="noreferrer">
                  Olx
                </a>
              </ProductLinkColor>
            </ProductLink>
            <ProductLink>
              <ProductLinkColor>
                <a href={product.link3} target="_blank" rel="noreferrer">
                  Vinted
                </a>
              </ProductLinkColor>
            </ProductLink>
          </Product>
        ))}
      </ProductListContainer>
    </Content>
  );
}

export default ProductList;
