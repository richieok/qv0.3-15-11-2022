export function load({locals, cookies}) {
    let user = {}
    if (locals?.user?.id){
        console.log('layout, has sessionId');
        user.firstname = locals?.user?.firstname || locals?.user?.email
    }
    return {
        staticlinks: [
            {
                name: 'Home',
                href: '/'
            },
            {
                name: 'Contact Us',
                href: '/contact'
            },
        ],
        dynamiclinks: [
            {
                name: 'App',
                href: '/app',
                signedIn: true
            },
            {
                name: 'Sign up',
                href: '/signup',
                signedIn: false
            },
            {
                name: 'Login',
                href: '/login',
                signedIn: false
            },
            {
                name: 'Logout',
                href: '/logout',
                signedIn: true
            },
        ],
        user,
    }
}