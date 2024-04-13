import "./Admin.css";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import Avatar from "../assets/avatar.jpg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Page404 } from "../components/Page404";

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [tickets, setTickets] = useState({});
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState({});

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios.get("/ticket/allTickets").then((response) => setTickets(response.data));
  }, [updateTrigger]);

  const createTickets = async () => {
    try {
      const response = await axios.post("/ticket/createTickets");
      alert("Creados exitosamente");
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  const deleteTickets = async () => {
    try {
      const response = await axios.delete("/ticket/deleteAllTickets");
      alert(response.data);
      setUpdateTrigger(!updateTrigger);
      setSearchResult({});
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/ticket/search/${search}`);
      setSearchResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Error al buscar el ticket");
    }
  };

  const logOut = async () => {
    try {
      const response = await axios.post("/user/logout");
      navigate("/signIn");
    } catch (error) {
      alert(error.response.data);
    }
  };

  const renderDontUser = () => <Page404 />;
  const renderUser = () => (
    <>
      <header className="header-admin">
        <div className="logo-admin">
          <a href="#" className="logo">
            Rifas <span className="tree">Oscar</span>
          </a>
          <div className="search_box-admin">
            <input onChange={onSearchChange} type="text" placeholder="Search Ticket" />
            <FaSearch onClick={handleSearch} className="icon-search-admin" size={30} />
          </div>
        </div>
        <div className="header-icons-admin">
          <FaBell className="icon-bell-admin" />
          <div className="account">
            <img src={Avatar} alt="Imagen Avatar" />
            <h4>{user.email}</h4>
          </div>
        </div>
      </header>
      <div className="container-admin">
        <nav className="navbar-admin">
          <div className="side_navbar-admin">
            <span>Main Menu</span>
            <Link to="/" className="active-Link">
              Home
            </Link>
            <button onClick={createTickets}>Crear Tickets</button>
            <button onClick={deleteTickets}>Borrar Tickets</button>
            <button onClick={logOut}>Sign Out</button>
          </div>
        </nav>
        <div className="main-body-admin">
          <h2>Dashboard</h2>
          <div className="promo_card-admin">
            <div className="card-admin">
              {searchResult && (
                <div key={searchResult._id}>
                  <h3>{searchResult.ticketNumber}</h3>
                  <h3>{searchResult.buyerEmail}</h3>
                  <h3>{searchResult.buyerPhone}</h3>
                  <p>Ticket buscado</p>
                  <FaRegEye className="icon-admin-card" size={30} />
                </div>
              )}
            </div>
            <div className="card-admin">
              <h3>{tickets && tickets.ticketSold}</h3>
              <p>Sales</p>
              <FaShoppingCart className="icon-admin-card" size={30} />
            </div>
            <div className="card-admin">
              <h3>{tickets && tickets.stock}</h3>
              <p>Stock</p>
              <IoTicketOutline className="icon-admin-card" size={30} />
            </div>
          </div>
          <div className="history_lists-admin">
            <div className="list1">
              <div className="row-admin">
                <h4>History</h4>
              </div>
              <table className="table-admin">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.soldTickets &&
                    tickets.soldTickets
                      .filter((ticket) => ticket.buyerEmail)
                      .slice(0, 20)
                      .map((ticket, index) => {
                        return (
                          <tr key={ticket._id}>
                            <td>{index + 1}</td>
                            <td>{ticket.buyerName}</td>
                            <td>{ticket.buyerEmail}</td>
                            <td>{ticket.buyerPhone}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
            <div className="list2">
              <div className="row-admin">
                <h4>Documnets</h4>
              </div>
              <table className="table-admin">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Ticket Number</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.soldTickets &&
                    tickets.soldTickets
                      .filter((ticket) => ticket.buyerEmail)
                      .slice(0, 20)
                      .map((ticket, index) => {
                        return (
                          <tr key={ticket._id}>
                            <td>{index + 1}</td>
                            <td>{ticket.buyerName}</td>
                            <td>{ticket.ticketNumber}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return <div className="admin-body">{user ? renderUser() : renderDontUser()}</div>;
}
