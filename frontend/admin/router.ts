import {hashLocationPlugin, ReactStateDeclaration, servicesPlugin, UIRouterReact} from "@uirouter/react";

export const router = new UIRouterReact();

const states: ReactStateDeclaration[] = [
    {
        name: "categories.**",
        url: "/categories",
        lazyLoad: () => import("./Category")
    },
    {
        name: "subCategory.**",
        url: "/sub-categories",
        lazyLoad: () => import("./SubCategory")
    },
    {
        name: "products.**",
        url: "/products",
        lazyLoad: () => import("./Products")
    },
    {
        name: "addProduct.**",
        url: "/add-product",
        lazyLoad: () => import("./AddProduct")
    },
    {
        name: "productVariation.**",
        url: "/product-variation",
        lazyLoad: () => import("./ProductVariation")
    },
    {
        name: "brandUnit.**",
        url: "/brand-and-unit",
        lazyLoad: () => import("./BrandUnit")
    },
    {
        name: "banners.**",
        url: "/banners",
        lazyLoad: () => import("./Banner")
    },
    {
        name: "addPromo.**",
        url: "/add-promotion",
        lazyLoad: () => import("./AddPromo")
    },
    {
        name: "promotions.**",
        url: "/promotions",
        lazyLoad: () => import("./Promotions")
    },
    {
        name: "loyalityCard.**",
        url: "/loyality-card",
        lazyLoad: () => import("./LoyalityCard")
    },
    {
        name: "notifications.**",
        url: "/notifications",
        lazyLoad: () => import("./Notifications")
    },
    {
        name: "feedbacks.**",
        url: "/feedbacks",
        lazyLoad: () => import("./FeedBack")
    }

];

states.forEach(state => router.stateRegistry.register(state));
//noinspection JSDeprecatedSymbols
router.urlRouter.otherwise("/categories");
router.plugin(hashLocationPlugin);
router.plugin(servicesPlugin);
export const $state = router.stateService;
export const $transition = router.transitionService;

