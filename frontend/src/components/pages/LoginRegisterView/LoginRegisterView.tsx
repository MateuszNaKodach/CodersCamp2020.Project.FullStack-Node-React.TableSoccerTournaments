import React, { useState} from 'react';
import {defaultObject, LoginRegisterContext} from "./LoginRegisterContext";
import LoginRegisterLabelTabs from "./LoginRegisterLabelTabs";
import {StyledCard} from "../../atoms/StyledCard/StyledCard";

export default function IconLabelTabs() {
   // const {isUserLogged}= useContext(LoginRegisterContext)
   const [isUserLogged, setIsUserLogged] = useState(defaultObject.isUserLogged)

   const toggleLoggedState = () => setIsUserLogged(prevValue => !prevValue)

   return (
      <LoginRegisterContext.Provider value={{isUserLogged, toggleLoggedState}}>
         <LoginRegisterLabelTabs/>
         <StyledCard>

         </StyledCard>
      </LoginRegisterContext.Provider>
   );
}