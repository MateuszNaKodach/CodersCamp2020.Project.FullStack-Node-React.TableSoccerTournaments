import React from 'react';

import styled from "styled-components";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Card} from "@material-ui/core";

import {MIN_CARD_COMPONENT_WIDTH} from "../../atoms/constants/sizes";

export const StyledTabCard = styled(Card)({
   display: "block",
   boxSizing: "border-box",
   minWidth: MIN_CARD_COMPONENT_WIDTH,
   width: MIN_CARD_COMPONENT_WIDTH,
   margin: "2px",
});

export default function LoginRegisterLabelTabs() {
   const [value, setValue] = React.useState(0);

   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
   };

   return (
      <StyledTabCard>
         <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="primary"
            aria-label="icon label tabs example"
         >
            <Tab icon={<PermIdentityIcon/>} label="Login"/>
            <Tab icon={<PersonAddIcon/>} label="FAVORITES"/>
         </Tabs>
      </StyledTabCard>
   );
}