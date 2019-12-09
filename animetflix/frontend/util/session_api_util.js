
export const signup = (userForm) => {
    return $.ajax({
        method: "POST",
        url: "/api/users"
    });
}

export const login = (userForm) => {
    return $.ajax({
        method: "POST",
        url: "/api/session"
    })
}

export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "/api/session"
    });
};