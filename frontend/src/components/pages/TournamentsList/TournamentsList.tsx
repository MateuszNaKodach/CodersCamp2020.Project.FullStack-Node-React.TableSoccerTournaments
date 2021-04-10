import CardTitleWithNavButton from "../../molecules/CardTitleWithNavButton/CardTitleWithNavButton";
import {VerticalSpace} from "../../atoms/Shared/VerticalSpace";
import TournamentCardsGallery from "../../organisms/TournamentsCardsGallery/TournamentsCardsGallery";
import PlusButton from "../../atoms/Shared/PlusButton/PlusButton";
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
            <PlusButton onLink={''}/>
        </StyledWrapper>
    )
}

export default TournamentsList;