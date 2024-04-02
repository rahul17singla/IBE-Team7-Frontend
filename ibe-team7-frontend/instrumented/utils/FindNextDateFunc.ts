export const findnextDate = (currentdate: Date | undefined) => {
    // find next date from start date
    const nextDate = new Date(
        currentdate!.getFullYear(),
        currentdate!.getMonth(),
        currentdate!.getDate() + 1
    );
    console.log("NEXT DATE IT IS");
    console.log(nextDate.toISOString());
    return nextDate.toISOString();
};
