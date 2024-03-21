import { ListProperty } from "./Property";
import { RoomRate } from "./RoomRate";

export interface FilterStates {
    property: string;
    property3: string;
    beds: string;
    checkboxChecked: boolean;
    startDate: Date | undefined;
    endDate: Date | undefined;
    guestsAdult: number;
    guestsTeens: number;
    guestsChildren: number;
    showGuests: boolean;
    showGuestFeature: boolean;
    showChair: boolean;
    showAdult: boolean;
    showTeen: boolean;
    showKid: boolean;
    maxGuests: number;
    maxRooms: number;
    data: ListProperty[];
    rooms: RoomRate[];
    roomsShow: boolean;
}
