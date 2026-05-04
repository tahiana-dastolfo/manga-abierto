import { useEffect, useState } from "react";
import styled from "styled-components";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router";
import { ROUTE } from "../../App";

const Home = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setName(session?.user?.user_metadata?.name ?? 'Sin nombre')
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate(ROUTE.LOGIN)
  }

  return (
    <Div>
      <h1>Bienvenido/a {name}!</h1>
      <button className="btn-logout" onClick={handleLogout}>Logout</button>
    </Div>
  )
}

export default Home;

const Div = styled.div`
  background: #FFE484;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;

  .btn-logout {
    margin: 1rem 0 0 0;
    padding: .5rem 1rem;
    border-radius: 15px;
    border: 3px solid #000000;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 5px 5px #000000;
    transition: box-shadow .2s ease;
  }

  @media (hover: hover) {
    .btn-logout:hover {
      box-shadow: -5px -5px #000000;
    }
  }
`