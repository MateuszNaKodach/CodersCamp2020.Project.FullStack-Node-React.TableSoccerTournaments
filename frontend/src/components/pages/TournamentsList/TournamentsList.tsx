import CardTitleWithNavButton from "../../molecules/CardTitleWithNavButton/CardTitleWithNavButton";
import {VerticalSpace} from "../../atoms/Shared/VerticalSpace";
import TournamentCardsGallery from "../../organisms/TournamentsCardsGallery/TournamentsCardsGallery";
import PlusButton from "../../atoms/Shared/PlusButton/PlusButton";

const TournamentsList = () => {
    return (
        <>  <VerticalSpace height={10}/>
            <CardTitleWithNavButton title={"Turnieje"}/>
            <VerticalSpace height={40}/>
            <TournamentCardsGallery/>
            <VerticalSpace height={40}/>
            <PlusButton onLink={''}/>
        </>
    )
}

export default TournamentsList;