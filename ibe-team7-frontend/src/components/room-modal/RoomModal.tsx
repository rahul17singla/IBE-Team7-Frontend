import "./RoomModal.scss";

export const RoomModal = ({ room }: any) => {
    return <div className="modal-container">{room.roomTypeName}</div>;
};
