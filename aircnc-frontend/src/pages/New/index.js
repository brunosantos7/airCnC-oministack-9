import React, { useState, useMemo } from "react";

import LoggoutButton from "../../components/LoggoutButton";
import camera from "../../assets/camera.svg";

import api from "../../services/api";

import "./styles.css";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem("user_id");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("price", price);
    data.append("techs", techs);

    await api.post("/spots", data, {
      headers: { user_id },
    });

    history.push("/dashboard");
  }

  return (
    <>
      <LoggoutButton />
      <form onSubmit={handleSubmit}>
        <label
          id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          className={preview ? "has-preview" : ""}
        >
          <input
            type="file"
            onChange={(event) => setThumbnail(event.target.files[0])}
          ></input>
          <img src={camera} alt="Selecione uma imagem" />
        </label>

        <label htmlFor="company"> EMPRESA *</label>
        <input
          id="company"
          placeholder="Sua empresa"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        ></input>
        <label htmlFor="techs">
          TECNOLOGIAS * <span>(Separadas por virgula)</span>
        </label>

        <input
          id="techs"
          placeholder="Tecnologias que utiliza"
          value={techs}
          onChange={(event) => setTechs(event.target.value)}
        ></input>

        <label htmlFor="price">
          VALOR DA DIARIA{" "}
          <span>
            (Vazio para <strong>GRATUITO</strong>)
          </span>
        </label>
        <input
          id="price"
          placeholder="Valor por dia"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        ></input>
        <button className="btn">Cadastrar</button>
      </form>
    </>
  );
}
