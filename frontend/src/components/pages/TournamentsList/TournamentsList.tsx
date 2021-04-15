import CardTitleWithNavButton from "../../molecules/CardTitleWithNavButton/CardTitleWithNavButton";
import {VerticalSpace} from "../../atoms/VerticalSpace";
import TournamentCardsGallery from "../../organisms/TournamentsCardsGallery/TournamentsCardsGallery";
import NewTournamentButton from "../../molecules/NewTournamentButton/NewTournamentButton";
import {styled} from "@material-ui/core";

const StyledWrapper = styled("div")({
    position: 'relative'
})

const TournamentsList = () => {
    return (
        <StyledWrapper>
            <CardTitleWithNavButton title={"Turnieje"}/>
            <VerticalSpace height={30}/>
            <TournamentCardsGallery/>
            <VerticalSpace height={30}/>
            <NewTournamentButton onLink={''}/>
        </StyledWrapper>
    )
}

export default TournamentsList;