const LogoutService = {
    /**
     * Terminate the session by clearing cookies
     */
    logout: (res) => {
        res.clearCookie("token");
        return { message: "Logged out successfully" };
    }
};

export default LogoutService;
