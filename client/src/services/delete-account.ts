const DeleteAccount = async (email: string) => {
    try {
      await fetch(`${process.env.REACT_APP_API}/api/user/deleteAccount`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  
  export default DeleteAccount;