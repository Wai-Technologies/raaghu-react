export const getYesterdayDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );
};

export const getTodayDate = (today: Date) => {
    return {
        todayDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ),
        newDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
        )
    };
};

export const getLastSevenDaysDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7 + 1
    );
};

export const getLastFourteenDaysDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 14 + 1
    );
};
