import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import {Card, withStyles} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & { children?: React.ReactElement<any, any> },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="up" ref={ref} {...props} />;
});

type MatchWinnerDeterminationDialogProps = {
   agreeCallback: (() => void),
   isOpen: boolean
   teamPlayersNames: number | string | undefined;
}

const FullParentButton = withStyles({
   root: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0,

   }
})(Card);

export default function MatchWinnerDeterminationDialog(
   {
      agreeCallback,
      isOpen,
      teamPlayersNames
   }: MatchWinnerDeterminationDialogProps) {

   const [open, setOpen] = React.useState(isOpen);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleAgreeAndClose = () => {
      setOpen(false);
      agreeCallback();
   };

   return (
      <div>
         <FullParentButton variant="outlined" color="primary" onClick={handleClickOpen}>
         </FullParentButton>
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
         >
            <DialogTitle id="alert-dialog-slide-title">{"Czy ustawić zwycięzcę meczu?"}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  Czy aby na pewno chcesz ustawić drużynę '{teamPlayersNames || "NN"}' jako zwycięzcę tego meczu?
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="primary">
                  Odrzuć
               </Button>
               <Button onClick={handleAgreeAndClose} color="primary">
                  Zaakceptuj
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}