import {
    BehaviorSubject,
    Observable
} from 'rxjs';
import {
    useState,
    useEffect
} from 'react';

export interface AppRoute {
    name: string;
    component: any;
}

export interface IAppRouter {
    current: Observable<AppRoute>;
    goto(name: string): void;
}

function UnknownRoute() {
    return <div>
        <h1>Unknown route!</h1>
        <p>We have bumped into an unknown route. Please check your URL.</p>
    </div>
}

export const UNKNOWN_ROUTE: AppRoute = {
    name: 'unknown',
    component: UnknownRoute
};

class AppRouterImpl implements IAppRouter {

    private _available: Array<AppRoute> = [UNKNOWN_ROUTE];
    private _current: BehaviorSubject<AppRoute> = new BehaviorSubject<AppRoute>(UNKNOWN_ROUTE);

    constructor() {

    }

    get current(): Observable<AppRoute> {
        return this._current.asObservable();
    }

    goto(name: string): void {
        console.log(`[AppRouterImpl]`, `Routing to ${name}`);
        this._current.next({
            name,
            component: this._available.find(route => route.name === name)?.component || UNKNOWN_ROUTE.component
        });
    }

    public register(route: AppRoute) {
        this._available.push(route);
    }

}

export const $router = new AppRouterImpl();
export function $registerRoute(route: AppRoute) {
    console.log(`[$registerRoute]`, `Registering route`, route);
    $router.register(route);
}

export function RouterView() {
    const [route, setRoute] = useState<AppRoute>(UNKNOWN_ROUTE);
    useEffect(() => {
        console.log(`[RouterView]`, `Subscribing to router`);
        const sub = $router.current.subscribe(setRoute);
        return () => {
            console.log(`[RouterView]`, `Unsubscribing from router`);
            sub.unsubscribe();
        }
    }, []);
    console.log(`[RouterView]`, `Rendering route`, route);
    const Component = route.component;
    return <Component />;
}
