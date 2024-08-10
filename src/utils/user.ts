import pb,{ PB } from "@/lib/db";
import { PBUserRecord, TUserSignUpFormFields } from "@/types/data";
interface ILoginUser {
    pb:PB;
    user: string;
    password: string;
}

export async function loginUser({ pb,user, password }: ILoginUser) {
    try {
        const authData = await pb.collection("users")
            .authWithPassword<PBUserRecord>(user, password);
        // update the cookie with the pb_auth data
        // document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
        return authData;
    } catch (error) {
        throw error;
    }
}

export interface ISignupuser {
    pb:PB;
    user: TUserSignUpFormFields;
}

export async function createUser({ pb,user }: ISignupuser) {
    try {
        await pb.collection("users").create(user);
        const logged_in_user = await loginUser({
            pb,user: user.email, password: user.password,
        });
        return logged_in_user;
    } catch (error) {
        throw error;
    }
}

export function logoutUser() {
    try {
        pb.authStore.clear();
        document.cookie=pb.authStore.exportToCookie({ httpOnly: false });
        
    } catch (error) {
        throw error;
    }
}