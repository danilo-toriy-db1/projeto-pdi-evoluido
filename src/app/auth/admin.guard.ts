import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service/auth.service";
import { Roles } from "../models/enums/roles";

export const AdminGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.haveLogin() || authService.getRole() !== Roles.ADMIN) {
        router.navigate(['/login']);
        return false;
    }

    return true;
}