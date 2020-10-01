import React from "react";
import { useHistory } from "react-router-dom";
import Orders from "../components/Orders";

const AdminPage = () => {
  const history = useHistory()

  if (!localStorage.getItem('shopping-user')) {
    history.push('/login')
  }
  return (
    <div>
      <Orders />
    </div>
  );

}

export default AdminPage;
