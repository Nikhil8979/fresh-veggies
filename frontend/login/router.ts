import {hashLocationPlugin, ReactStateDeclaration, servicesPlugin, UIRouterReact} from "@uirouter/react";

export const router = new UIRouterReact();

const states: ReactStateDeclaration[] = [
    {
        name: "login.**",
        url: "/login",
        lazyLoad: () => import("./LoginPage")
    },
];

states.forEach(state => router.stateRegistry.register(state));
//noinspection JSDeprecatedSymbols
router.urlRouter.otherwise("/login");
router.plugin(hashLocationPlugin);
router.plugin(servicesPlugin);
export const $state = router.stateService;
export const $transition = router.transitionService;

