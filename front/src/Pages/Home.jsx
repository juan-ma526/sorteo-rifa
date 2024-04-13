import "./Home.css";
import AvatarFoto from "../assets/AvatarFoto.png";
import { FaWhatsapp } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import play5 from "../assets/play5.png";
import { Buttom } from "../components/Buttom";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";

const imgSorteo = [
  {
    imagen: { play5 },
    title: "Playstation 5",
    alt: "Imagen play 5",
  },
];

function Home() {
  const [name, setName] = useState("");
  //const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  /* const onChangeLastName = (e) => {
    setLastName(e.target.value);
  }; */

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tickets === 0) {
      return console.log("necesitas comprar un ticket");
    }
    try {
      const response = await axios.post("/ticket/buyTickets", {
        buyerName: name,
        buyerEmail: email,
        buyerPhone: phone,
        quantity: tickets,
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTickets = (monto) => {
    const newTickets = tickets + monto;
    setTickets(newTickets);
  };
  const handleResetTickets = () => {
    setTickets(0);
  };
  const handleModal = () => {
    setOpenModal(!openModal);
    setData("");
  };

  return (
    <>
      <Navbar />
      <section id="home">
        <div className="content">
          <h2>
            Oscar <span>Herrera</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum natus reiciendis obcaecati ullam dicta
            voluptatibus maiores cupiditate sequi tempora repellendus, porro laboriosam blanditiis. Minima quod
            consequuntur molestias delectus corrupti maiores.
          </p>
          <a href="#" className="btn">
            Contact Us
          </a>
        </div>
        <img src={AvatarFoto} className="eth" alt="Ethereum" />
      </section>
      <section id="services">
        <div className="secText">
          <h2>
            <span>Nuestros</span> Sorteos
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis ducimus iste totam hic illo animi
            minus, molestias vero, numquam veniam iure architecto possimus iusto, repudiandae sit? Porro nisi optio
            quam.
          </p>
        </div>
        <div className="content">
          {imgSorteo.map((imagen, index) => (
            <div key={index} className="servicesBx">
              <img src={imagen.imagen.play5} alt={imagen.alt} />
              <h3>{imagen.title}</h3>
            </div>
          ))}
        </div>
        <div className="center">
          <a href="#" className="btn">
            Comprar
          </a>
        </div>
      </section>
      <section id="tickets">
        <div className="secText">
          <h2>Sorteo</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis ducimus iste totam hic illo animi
            minus, molestias vero, numquam veniam iure architecto possimus iusto, repudiandae sit? Porro nisi optio
            quam.
          </p>
        </div>
        <div className="content center">
          {/*Formulario*/}
          <form onSubmit={handleSubmit} id="formulario" className="container formu">
            <div className="form-group">
              <label htmlFor="nombre" className="label">
                Nombre:
              </label>
              <input
                onChange={onChangeName}
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingrese su nombre..."
                required
              />
            </div>
            {/*   <div className="form-group">
              <label htmlFor="apellidos" className="label">
                Apellidos:
              </label>
              <input
                onChange={onChangeLastName}
                type="text"
                id="apellidos"
                name="apellidos"
                placeholder="Ingrese su apellido..."
                required
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="telefono" className="label">
                Número de Teléfono:
              </label>
              <input
                onChange={onChangePhone}
                type="number"
                id="telefono"
                name="telefono"
                placeholder="Ingrese N° de telefono..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo" className="label">
                Correo Electrónico:
              </label>
              <input
                onChange={onChangeEmail}
                type="email"
                id="correo"
                name="correo"
                placeholder="Ingrese su correo..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numero_rifas" className="label">
                ¿Cuántos números de la rifa quiere?
              </label>
              <div className="botones-numero">
                <button onClick={() => handleAddTickets(2)} type="button" className="boton-numero">
                  +2
                </button>
                <button onClick={() => handleAddTickets(5)} type="button" className="boton-numero">
                  +5
                </button>
                <button onClick={() => handleAddTickets(10)} type="button" className="boton-numero">
                  +10
                </button>
                <button onClick={() => handleAddTickets(20)} type="button" className="boton-numero">
                  +20
                </button>
                <button onClick={handleResetTickets} type="button" className="boton-numero">
                  Reset
                </button>
              </div>
              <div className="numero_rifas">{tickets}</div>
            </div>
            <Buttom handleModal={handleModal} tickets={tickets} className="boton-submit" />
          </form>
          {/*Modal*/}
          <div id="modal" className={`${openModal ? "modal-open" : "modal-hidden"}`}>
            <div className="modal-content">
              <h2>Tus números de la rifa son:</h2>
              <p> {data.split(".")[0]}</p>
              <p> {data.split(".")[1]}</p>
              <main>
                <ul id="numeros"></ul>
              </main>
              <footer>
                <button onClick={handleModal} type="button" className="boton" id="cerrar-modal">
                  Cerrar
                </button>
              </footer>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-us">
        <div className="secText">
          <h2>Contact Us</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis ducimus iste totam hic illo animi
            minus, molestias vero, numquam veniam iure architecto possimus iusto, repudiandae sit? Porro nisi optio
            quam.
          </p>
        </div>
        <div className="content">
          <a href="#">
            <CiMail className="ion-icon" size={40} /> example@mail.name
          </a>
          <a href="#">
            <FaInstagram className="ion-icon" size={40} /> +123 456 789 000
          </a>
          <a href="#">
            <PiTelegramLogo className="ion-icon" size={40} />
            Telegram
          </a>
          <a href="#">
            <FaWhatsapp className="ion-icon" size={40} /> WhatsApp
          </a>
        </div>
        <div className="center">
          <p className="copyrights">
            Copyright © 2023 <a href="#">SnowDev</a>. All Right Reserved.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
