const sleep = (ms: number): Promise<number> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const scrollTo = (element_id: string) => {
    const element = document.getElementById(element_id);

    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};

const validateEmail = (email: string): boolean => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(String(email).toLowerCase());
};

const strongPassword = (password: string): boolean => {
    const re =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#\$%\^\&*\)\(+=._-]{8,}$/i;
    return re.test(String(password));
};

const storeToken = async (token: string): Promise<void> => {
    try {
        localStorage.setItem("access_token", token);
    } catch (err) {
        console.log("Error setting token: " + err);
    }
};

const removeToken = async (): Promise<void> => {
    try {
        localStorage.removeItem("access_token");
    } catch (err) {
        console.log("Error removing token: " + err);
    }
};

const onlyCapitalLetters = (str: string) => {
    let newStr = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[A-Z]/)) {
            newStr += str[i];
        }
    }
    return newStr;
};

export {
    sleep,
    scrollTo,
    validateEmail,
    strongPassword,
    storeToken,
    removeToken,
    onlyCapitalLetters,
};