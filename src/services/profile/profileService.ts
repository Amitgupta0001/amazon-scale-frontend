import type { User } from "../../types/auth";

const USER_PROFILE_KEY = "amazonscale_user_profile";

export const profileService = {
    getStoredProfile(): User | null {
        try {
            const raw = localStorage.getItem(USER_PROFILE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    setStoredProfile(user: User): void {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(user));
    },

    clearStoredProfile(): void {
        localStorage.removeItem(USER_PROFILE_KEY);
    },
};

export default profileService;
