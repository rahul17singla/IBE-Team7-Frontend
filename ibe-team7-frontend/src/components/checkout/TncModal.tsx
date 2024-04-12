import { Box, Modal } from "@mui/material";
import "./Checkout.scss";

export const TncModal = ({ onClose }: any) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            open={true}
            onClose={handleClose}
            className="cancel-room"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <div className="tnc-modal">
                    <div className="cancellation-title">
                        Terms and Conditions
                    </div>
                    <div className="cancel-otp-enter">
                        <button
                            className="cancellation-close-modal-btn"
                            onClick={handleClose}
                        >
                            X
                        </button>
                        <div className="cancel-btn-div">
                            No gatherings and parties of any nature are allowed
                            in the room. The Hotel reserves the right to evict
                            any additional occupants in the room. This
                            reservation is not transferable. In the event of
                            no-show, a fee of one night’s room charge (inclusive
                            of any applicable prevailing government tax) will be
                            charged to your credit card provided at the time of
                            reservation or as per any revised conditions of
                            booking as per the offer. Hotel reserves the right
                            to send guests away from the Hotel due to their
                            conduct and behaviour or for any other safety,
                            security, medical reasons. This applies in
                            particular, if Guests do not observe instructions
                            given by Hotel employees, express themselves in a
                            discriminating manner, harass or endanger other
                            guests. Guests will not be permitted to compromise
                            the health, safety and security aspects of the Hotel
                            at any point of time. Guests are bound to produce an
                            original proof of identity at the time arrival in
                            the Hotel Special terms of offer will be applicable
                            for the respective bookings and in case of conflict,
                            the terms of such special offers will prevail.
                            Guests are not allowed to bring food and beverage
                            from outside in the Hotel or order food from outside
                            the Hotel. The Hotel undertakes no liability for the
                            shelf life of the food which is taken away to the
                            Hotel after an event at the Hotel or taken outside
                            the Hotel for private consumption. In case of
                            conflict in the actual bill provided to you after
                            the receipt of services, the terms of the bill will
                            prevail. Neatness and hygiene should be adequately
                            maintained by the Guest. The Guest should always
                            adhere to the safety, security and hygiene advise
                            duly provided by the Hotel and should avoid
                            breaching the same. The Guest will be solely
                            responsible for any such violation if identified.
                            All the assets and valuables of the Hotel should be
                            duly maintained adequately and should not be damaged
                            or destroyed. The Hotel has the discretion to levy
                            any charges in future if it is proven beyond doubt
                            that such damage/destruction to the asset of the
                            Hotel (both movable and immovable) have been done or
                            caused by the Guest. If you have any allergies,
                            sensitivities or intolerance to, but not limited to:
                            a particular fabric, material, cleaning product or
                            food, it is not Hotel’s responsibility to advise
                            Hotel management prior to arrival. Your valuables
                            can be stored in a safety deposit box in your room
                            or the hotel can store your valuables upon request.
                            The hotel is entitled to collect a charge for
                            storage of these items. In case the items you wish
                            to store are exceptionally valuable you must notify
                            the hotel before storing. The hotel may refuse to
                            store this kind of valuables. Management and staff
                            work hard to provide a safe and secure environment.
                            We do everything possible to ensure a secure
                            environment is maintained and we ask that our guests
                            do also. The Hotel takes no responsibility for any
                            personal possessions that are lost, stolen or
                            misplaced whilst on the premises due to the acts and
                            omissions of the guests themselves. Lost property
                            found on the premises is logged and kept in a secure
                            location for a period of three (3) months.
                            Thereafter items are either disposed of or donated
                            to charity. The Hotel accepts no responsibility for
                            contacting individuals in relation to lost property.
                            Perishable items retrieved from rooms after check
                            out are only held until close of business that day.
                            Claimed items can be collected from the hotel with
                            valid identification or alternatively the hotel can
                            arrange postage on behalf of the guest at their
                            expense. The Hotel is not responsible for damage or
                            disappearance of vehicles kept in the parking area.
                            The hotel is obliged to clearly express in the
                            parking area that the area is not supervised and the
                            hotel is not responsible for the property kept in
                            there. Valet parking is always at the Guest’s risk
                            and advise from the Security Team needs to be
                            strictly adhered with by the Guest at the time of
                            checking in. Hotel will not be accountable for loss
                            of any valuables from such parked vehicles. The
                            Company reserves the right to change these terms and
                            conditions at any time without prior notice. In the
                            event that any changes are made, the revised terms
                            and conditions shall be posted on this website
                            immediately. Please check the latest information
                            posted herein to inform yourself of any changes. We
                            do our best to ensure reservation arrangements are
                            satisfactory, however, the Hotel does not accept any
                            liability for any loss financial or otherwise,
                            travel delay, injury, damage, additional expenses or
                            inconvenience caused directly or indirectly by any
                            events which are beyond our control. These include,
                            but not limited to, flight delays or cancellations,
                            civil disturbance, defects in vehicles, strikes,
                            theft, acts of terrorism, natural disaster, war,
                            fire, floods, acts of God, acts of Government or of
                            any other authorities, changes to Government
                            regulations, accident to or failure of machinery or
                            equipment, maintenance requirements or industrial
                            action. The transport to the airport is provided as
                            an ancillary service and the Hotel is not
                            accountable to whatsoever happens to the guests
                            during such transits.
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};
