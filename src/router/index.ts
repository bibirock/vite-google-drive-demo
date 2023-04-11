import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'login',
        meta: {
            isRequiresAuth: false
        },
        component: () => import('@/components/layout/LoginLayout.vue')
    },
    {
        path: '/404-page',
        name: '404Page',
        meta: {
            isRequiresAuth: false
        },
        component: () => import('@/components/views/404Page.vue')
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        meta: {
            isRequiresAuth: false
        },
        component: () => import('@/components/views/PrivacyPolicyPage.vue')
    },
    {
        path: '/pub-server',
        name: 'pub-server',
        meta: {
            isRequiresAuth: false
        },
        component: () => import('@/components/views/PubServerPage.vue')
    },
    {
        path: '/drive',
        name: 'drive',
        meta: {
            isRequiresAuth: true
        },
        component: () => import('@/components/layout/MainLayout.vue'),
        redirect: '/drive/my-drive',
        children: [
            {
                path: 'my-drive',
                name: 'my-drive',
                component: () => import('@/components/views/MyDrivePage.vue')
            },
            {
                path: 'folders/:folderId',
                name: 'my-drive-folders',
                component: () => import('@/components/views/MyDrivePage.vue')
            },
            {
                path: 'search',
                name: 'search-result-page',
                component: () => import('@/components/views/SearchResultPage.vue')
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
];

const option: RouterOptions = {
    history: createWebHashHistory(),
    routes
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
