import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'login',
        meta: {
            isRequiresAuth: false,
        },
        component: () => import('@/components/views/LoginPage.vue'),
    },
    {
        path: '/404-page',
        name: '404Page',
        meta: {
            isRequiresAuth: false,
        },
        component: () => import('@/components/views/404Page.vue'),
    },
    {
        path: '/drive',
        name: 'drive',
        meta: {
            isRequiresAuth: true,
        },
        component: () => import('@/components/views/DriveHomePage.vue'),
        redirect: '/drive/my-drive',
        children: [
            {
                path: 'my-drive',
                name: 'my-drive',
                component: () => import('@/components/views/HomePageView/MyDrive.vue'),
            },
            {
                path: 'folders/:folderId(\\d+)',
                name: 'my-drive-folders',
                component: () => import('@/components/views/HomePageView/MyDrive.vue'),
            },
            {
                path: 'search',
                name: 'search-result-page',
                component: () => import('@/components/views/HomePageView/SearchResult.vue'),
            },
        ],
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/',
    },
];

const option: RouterOptions = {
    history: createWebHashHistory(),
    routes,
};

const router: Router = createRouter(option);

router.beforeEach((to) => {
    if (to.name !== 'login' && to.meta.isRequiresAuth) {
        if (window.sessionStorage.getItem('token') === null) {
            return { name: 'login' };
        }
    }
});

export default router;
